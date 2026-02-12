using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;

        public PaymentsController(BookStoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Összes fizetés lekérdezése
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetAllPayments()
        {
            var payments = await _context.payments
                .Include(p => p.user)
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var paymentDtos = _mapper.Map<List<PaymentDto>>(payments);
            return Ok(paymentDtos);
        }

        /// <summary>
        /// Egy fizetés lekérdezése ID alapján
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDto>> GetPaymentById(int id)
        {
            var payment = await _context.payments
                .Include(p => p.user)
                .FirstOrDefaultAsync(p => p.id == id);

            if (payment == null)
            {
                return NotFound(new { message = $"Nem található fizetés ezzel az ID-vel: {id}" });
            }

            var paymentDto = _mapper.Map<PaymentDto>(payment);
            return Ok(paymentDto);
        }

        /// <summary>
        /// Egy felhasználó összes fizetésének lekérdezése
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetPaymentsByUserId(int userId)
        {
            // Ellenőrizzük, hogy létezik-e a user
            var userExists = await _context.users.AnyAsync(u => u.id == userId);
            if (!userExists)
            {
                return NotFound(new { message = $"Nem található felhasználó ezzel az ID-vel: {userId}" });
            }

            var payments = await _context.payments
                .Include(p => p.user)
                .Where(p => p.user_id == userId)
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var paymentDtos = _mapper.Map<List<PaymentDto>>(payments);
            return Ok(paymentDtos);
        }

        /// <summary>
        /// Fizetések lekérdezése státusz szerint
        /// </summary>
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetPaymentsByStatus(string status)
        {
            var payments = await _context.payments
                .Include(p => p.user)
                .Where(p => p.status == status)
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var paymentDtos = _mapper.Map<List<PaymentDto>>(payments);
            return Ok(paymentDtos);
        }

        /// <summary>
        /// Új fizetés létrehozása
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePayment([FromBody] CreatePaymentDto createPaymentDto)
        {
            // Validáljuk, hogy létezik-e a user
            var userExists = await _context.users.AnyAsync(u => u.id == createPaymentDto.user_id);
            if (!userExists)
            {
                return BadRequest(new { message = $"Nem található felhasználó ezzel az ID-vel: {createPaymentDto.user_id}" });
            }

            // DTO -> Entity mapping (AutoMapper beállítja a payment_date-t)
            var payment = _mapper.Map<payment>(createPaymentDto);

            _context.payments.Add(payment);
            await _context.SaveChangesAsync();

            // Visszatöltjük a user adatokkal
            await _context.Entry(payment).Reference(p => p.user).LoadAsync();

            var paymentDto = _mapper.Map<PaymentDto>(payment);
            return CreatedAtAction(nameof(GetPaymentById), new { id = payment.id }, paymentDto);
        }

        /// <summary>
        /// Fizetés státuszának frissítése
        /// </summary>
        [HttpPut("{id}/status")]
        public async Task<ActionResult<PaymentDto>> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusDto updateDto)
        {
            var payment = await _context.payments
                .Include(p => p.user)
                .FirstOrDefaultAsync(p => p.id == id);

            if (payment == null)
            {
                return NotFound(new { message = $"Nem található fizetés ezzel az ID-vel: {id}" });
            }

            // Státusz frissítése
            payment.status = updateDto.status;
            
            // Transaction ID frissítése, ha meg van adva
            if (!string.IsNullOrEmpty(updateDto.transaction_id))
            {
                payment.transaction_id = updateDto.transaction_id;
            }

            await _context.SaveChangesAsync();

            var paymentDto = _mapper.Map<PaymentDto>(payment);
            return Ok(paymentDto);
        }

        /// <summary>
        /// Fizetés törlése (opcionális - ha szükséges)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.payments.FindAsync(id);

            if (payment == null)
            {
                return NotFound(new { message = $"Nem található fizetés ezzel az ID-vel: {id}" });
            }

            _context.payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
