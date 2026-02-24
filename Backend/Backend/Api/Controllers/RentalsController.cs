using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalsController : ControllerBase
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;

        public RentalsController(BookStoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            _context.rentals.Remove(rental);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
