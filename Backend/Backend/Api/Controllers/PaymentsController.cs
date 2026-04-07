using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
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
                .Include(p => p.purchase_items)
                    .ThenInclude(pi => pi.book)
                .Include(p => p.rentals)
                    .ThenInclude(r => r.copy)
                        .ThenInclude(c => c.book)
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var paymentDtos = _mapper.Map<List<PaymentDto>>(payments);

            foreach (var dto in paymentDtos)
            {
                var payment = payments.First(p => p.id == dto.id);

                // Üres order_type javítás
                if (string.IsNullOrWhiteSpace(dto.order_type))
                {
                    if (payment.rentals.Any() && payment.purchase_items.Any())
                        dto.order_type = "mixed";
                    else if (payment.rentals.Any())
                        dto.order_type = "rental";
                    else
                        dto.order_type = "purchase";
                }

                // is_rental meghatározása a purchase_items tételeknél
                var rentalBookIds = payment.rentals
                    .Where(r => r.copy != null)
                    .Select(r => r.copy.book_id)
                    .ToHashSet();

                foreach (var item in dto.items)
                {
                    item.is_rental = payment.order_type == "rental" || rentalBookIds.Contains(item.book_id);
                }

                // Kölcsönzés tételek hozzáadása az items listához (ha nincsenek a purchase_items-ben)
                foreach (var rental in payment.rentals)
                {
                    if (rental.copy?.book != null && !dto.items.Any(i => i.book_id == rental.copy.book_id))
                    {
                        dto.items.Add(new PurchaseItemDto
                        {
                            book_id = rental.copy.book_id,
                            book_title = rental.copy.book.cim,
                            quantity = 1,
                            unit_price = 0,
                            is_rental = true
                        });
                    }
                }
            }

            return Ok(paymentDtos);
        }

        /// <summary>
        /// Egy fizetés lekérdezése ID alapján
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PaymentDto>> GetPaymentById(int id)
        {
            var payment = await _context.payments
                .Include(p => p.user)
                .Include(p => p.purchase_items)
                    .ThenInclude(pi => pi.book)
                .Include(p => p.rentals)
                    .ThenInclude(r => r.copy)
                        .ThenInclude(c => c.book)
                .FirstOrDefaultAsync(p => p.id == id);

            if (payment == null)
            {
                return NotFound(new { message = $"Nem található fizetés ezzel az ID-vel: {id}" });
            }

            var paymentDto = _mapper.Map<PaymentDto>(payment);

            // Üres order_type javítás
            if (string.IsNullOrWhiteSpace(paymentDto.order_type))
            {
                if (payment.rentals.Any() && payment.purchase_items.Any())
                    paymentDto.order_type = "mixed";
                else if (payment.rentals.Any())
                    paymentDto.order_type = "rental";
                else
                    paymentDto.order_type = "purchase";
            }

            var rentalBookIds = payment.rentals
                .Where(r => r.copy != null)
                .Select(r => r.copy.book_id)
                .ToHashSet();

            foreach (var item in paymentDto.items)
            {
                item.is_rental = payment.order_type == "rental" || rentalBookIds.Contains(item.book_id);
            }

            // Kölcsönzés tételek hozzáadása
            foreach (var rental in payment.rentals)
            {
                if (rental.copy?.book != null && !paymentDto.items.Any(i => i.book_id == rental.copy.book_id))
                {
                    paymentDto.items.Add(new PurchaseItemDto
                    {
                        book_id = rental.copy.book_id,
                        book_title = rental.copy.book.cim,
                        quantity = 1,
                        unit_price = 0,
                        is_rental = true
                    });
                }
            }

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
                .Include(p => p.purchase_items)
                    .ThenInclude(pi => pi.book)
                .Include(p => p.rentals)
                    .ThenInclude(r => r.copy)
                        .ThenInclude(c => c.book)
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
                .Include(p => p.purchase_items)
                    .ThenInclude(pi => pi.book)
                .Include(p => p.rentals)
                    .ThenInclude(r => r.copy)
                        .ThenInclude(c => c.book)
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
        [HttpPut("{id:int}/status")]
        public async Task<ActionResult<PaymentDto>> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusDto updateDto)
        {
            var payment = await _context.payments
                .Include(p => p.user)
                .FirstOrDefaultAsync(p => p.id == id);

            if (payment == null)
            {
                return NotFound(new { message = $"Nem található fizetés ezzel az ID-vel: {id}" });
            }            // Státusz frissítése
            payment.status = updateDto.status;

            await _context.SaveChangesAsync();

            var paymentDto = _mapper.Map<PaymentDto>(payment);
            return Ok(paymentDto);
        }

        /// <summary>
        /// Mai bevétel lekérdezése
        /// </summary>
        [HttpGet("today-revenue")]
        public async Task<ActionResult<object>> GetTodayRevenue()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);

            var todayPayments = await _context.payments
                .Where(p => p.payment_date >= today && p.payment_date < tomorrow)
                .Where(p => p.status == "completed")
                .ToListAsync();

            var totalRevenue = todayPayments.Sum(p => p.amount);
            var paymentsCount = todayPayments.Count;

            return Ok(new
            {
                date = today.ToString("yyyy-MM-dd"),
                total_revenue = totalRevenue,
                payments_count = paymentsCount
            });
        }
               
        /// <summary>
        /// Vásárlások lekérdezése (purchase_items táblából)
        /// </summary>
        [HttpGet("purchases")]
        public async Task<ActionResult> GetPurchases()
        {
            var payments = await _context.payments
                .Include(p => p.user)
                .Include(p => p.purchase_items)
                    .ThenInclude(pi => pi.book)
                        .ThenInclude(b => b.author)
                .Where(p => p.status == "completed")
                .Where(p => p.purchase_items.Any())
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var result = payments.Select(p => new
            {
                payment_id = p.id,
                user_id = p.user_id,
                user_name = p.user?.nev,
                user_email = p.user?.email,
                amount = p.amount,
                payment_method = p.payment_method,
                payment_date = p.payment_date,
                status = p.status,
                order_type = p.order_type,
                books = p.purchase_items.Select(pi => new
                {
                    book_id = pi.book_id,
                    book_title = pi.book.cim,
                    book_cover = pi.book.boritokep,
                    author_name = pi.book.author?.nev,
                    price = pi.unit_price,
                    quantity = pi.quantity
                }).ToList()
            }).ToList();

            return Ok(result);
        }

        /// <summary>
        /// Fizetés törlése (opcionális - ha szükséges)
        /// </summary>
        [HttpDelete("{id:int}")]
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
