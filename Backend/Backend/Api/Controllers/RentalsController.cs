using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalsController : ControllerBase
    {        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;
        private readonly RentalNotificationService _notificationService;
        private readonly IEmailService _emailService;

        public RentalsController(BookStoreContext context, IMapper mapper, RentalNotificationService notificationService, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _notificationService = notificationService;
            _emailService = emailService;
        }

        /// <summary>
        /// Összes kölcsönzés lekérdezése (admin) - enriched adatokkal
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rentals = await _context.rentals
                .Include(r => r.user)
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .OrderByDescending(r => r.kolcsonzes_datuma)
                .ToListAsync();

            var rentalDtos = _mapper.Map<List<RentalDto>>(rentals);
            return Ok(rentalDtos);
        }

        /// <summary>
        /// Kölcsönzés lekérdezése ID alapján
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var rental = await _context.rentals
                .Include(r => r.user)
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .FirstOrDefaultAsync(r => r.id == id);

            if (rental == null)
            {
                return NotFound(new { message = $"Nem található kölcsönzés ezzel az ID-vel: {id}" });
            }

            var rentalDto = _mapper.Map<RentalDto>(rental);
            return Ok(rentalDto);
        }

        /// <summary>
        /// Egy felhasználó kölcsönzéseinek lekérdezése
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var rentals = await _context.rentals
                .Include(r => r.user)
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .Where(r => r.user_id == userId)
                .OrderByDescending(r => r.kolcsonzes_datuma)
                .ToListAsync();

            var rentalDtos = _mapper.Map<List<RentalDto>>(rentals);
            return Ok(rentalDtos);
        }

        /// <summary>
        /// Könyv visszahozása (felhasználó vagy admin)
        /// </summary>
        [HttpPatch("{id}/return")]
        public async Task<IActionResult> ReturnBook(int id)
        {
            var rental = await _context.rentals
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .Include(r => r.user)
                .FirstOrDefaultAsync(r => r.id == id);

            if (rental == null)
            {
                return NotFound(new { message = $"Nem található kölcsönzés ezzel az ID-vel: {id}" });
            }

            if (rental.visszahozva_datuma != null)
            {
                return BadRequest(new { message = "Ez a kölcsönzés már vissza lett hozva" });
            }

            // Visszahozás dátuma beállítása
            rental.visszahozva_datuma = DateOnly.FromDateTime(DateTime.Now);

            // Példány újra elérhetővé tétele
            if (rental.copy != null)
            {
                rental.copy.elerheto = true;
            }

            await _context.SaveChangesAsync();

            var rentalDto = _mapper.Map<RentalDto>(rental);
            
            bool wasLate = rental.lejarat_datum.HasValue && 
                           rental.visszahozva_datuma > rental.lejarat_datum;

            return Ok(new
            {
                message = wasLate 
                    ? "Könyv visszahozva (késve!)" 
                    : "Könyv sikeresen visszahozva",
                rental = rentalDto,
                was_late = wasLate
            });
        }

        /// <summary>
        /// Értesítő emailek manuális küldése (admin)
        /// </summary>
        [HttpPost("send-notifications")]
        public async Task<IActionResult> SendNotifications()
        {
            try
            {
                var (remindersSent, overduesSent) = await _notificationService.SendNotificationsNow();
                return Ok(new
                {
                    message = "Értesítések elküldve",
                    reminders_sent = remindersSent,
                    overdue_sent = overduesSent,
                    total = remindersSent + overduesSent
                });
            }            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Hiba az értesítések küldésekor: {ex.Message}" });
            }
        }

        /// <summary>
        /// Felszólító email küldése egy konkrét kölcsönzéshez (admin)
        /// </summary>
        [HttpPost("{id}/send-reminder")]
        public async Task<IActionResult> SendReminderForRental(int id)
        {
            var rental = await _context.rentals
                .Include(r => r.user)
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .FirstOrDefaultAsync(r => r.id == id);

            if (rental == null)
                return NotFound(new { message = "Kölcsönzés nem található" });

            if (rental.visszahozva_datuma != null)
                return BadRequest(new { message = "Ez a kölcsönzés már vissza lett hozva" });

            if (rental.user == null || rental.copy?.book == null)
                return BadRequest(new { message = "Hiányzó felhasználó vagy könyv adat" });

            try
            {
                var today = DateOnly.FromDateTime(DateTime.Now);
                var dueDate = rental.lejarat_datum ?? today.AddDays(14);
                var daysUntilDue = dueDate.DayNumber - today.DayNumber;

                if (daysUntilDue < 0)
                {
                    await _emailService.SendRentalOverdueEmailAsync(
                        rental.user.email, rental.user.nev,
                        rental.copy.book.cim, dueDate, Math.Abs(daysUntilDue));
                }
                else
                {
                    await _emailService.SendRentalReminderEmailAsync(
                        rental.user.email, rental.user.nev,
                        rental.copy.book.cim, dueDate, daysUntilDue);
                }

                return Ok(new { message = $"Felszólító email elküldve: {rental.user.email}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Email küldés sikertelen: {ex.Message}" });
            }
        }

        /// <summary>
        /// Custom email küldése egy felhasználónak (admin)
        /// </summary>
        [HttpPost("send-custom-email")]
        public async Task<IActionResult> SendCustomEmail([FromBody] CustomEmailRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ToEmail))
                return BadRequest(new { message = "Email cím megadása kötelező" });

            if (string.IsNullOrWhiteSpace(request.Subject))
                return BadRequest(new { message = "Tárgy megadása kötelező" });

            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest(new { message = "Üzenet megadása kötelező" });

            try
            {
                await _emailService.SendCustomEmailAsync(
                    request.ToEmail,
                    request.ToName ?? "Felhasználó",
                    request.Subject,
                    request.Message);

                return Ok(new { message = $"Email sikeresen elküldve: {request.ToEmail}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Email küldés sikertelen: {ex.Message}" });
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] rental rental)
        {
            _context.rentals.Add(rental);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = rental.id }, rental);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] rental rental)
        {
            _context.Entry(rental).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var rental = await _context.rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound(new { message = $"Nem található kölcsönzés ezzel az ID-vel: {id}" });
            }
            _context.rentals.Remove(rental);            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class CustomEmailRequest
    {
        public string ToEmail { get; set; } = "";
        public string? ToName { get; set; }
        public string Subject { get; set; } = "";
        public string Message { get; set; } = "";
    }
}
