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
        }        /// <summary>
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
        /// Vásárlások lekérdezése (purchase és mixed típusú payment-ek)
        /// </summary>
        [HttpGet("purchases")]
        public async Task<ActionResult> GetPurchases()
        {
            var payments = await _context.payments
                .Include(p => p.user)
                .Where(p => p.order_type == "purchase" || p.order_type == "mixed")
                .Where(p => p.status == "completed")
                .OrderByDescending(p => p.payment_date)
                .ToListAsync();

            var result = new List<object>();

            foreach (var payment in payments)
            {
                // order_details JSON-ból kinyerjük a könyveket
                var purchasedBooks = new List<object>();

                if (!string.IsNullOrEmpty(payment.order_details))
                {
                    try
                    {
                        using var doc = System.Text.Json.JsonDocument.Parse(payment.order_details);
                        var root = doc.RootElement;

                        if (root.TryGetProperty("books", out var booksElement))
                        {
                            foreach (var bookItem in booksElement.EnumerateArray())
                            {
                                var orderType = bookItem.TryGetProperty("order_type", out var ot) ? ot.GetString() : "rental";
                                if (orderType != "purchase") continue;

                                var copyId = bookItem.TryGetProperty("copy_id", out var ci) ? ci.GetInt32() : 0;
                                var bookTitle = bookItem.TryGetProperty("book_title", out var bt) ? bt.GetString() : "Ismeretlen";
                                var price = bookItem.TryGetProperty("price", out var pr) ? pr.GetDecimal() : 0;
                                var quantity = bookItem.TryGetProperty("quantity", out var qt) ? qt.GetInt32() : 1;

                                // Copy-ból próbáljuk bővíteni a könyvadatokat
                                var copy = copyId > 0 ? await _context.copies
                                    .Include(c => c.book)
                                        .ThenInclude(b => b.author)
                                    .FirstOrDefaultAsync(c => c.id == copyId) : null;

                                purchasedBooks.Add(new
                                {
                                    copy_id = copyId,
                                    book_title = copy?.book?.cim ?? bookTitle,
                                    book_id = copy?.book_id,
                                    book_cover = copy?.book?.boritokep,
                                    author_name = copy?.book?.author?.nev,
                                    price = price,
                                    quantity = quantity
                                });
                            }
                        }
                    }
                    catch
                    {
                        // Ha a JSON parse nem sikerül, átugorjuk
                    }
                }

                if (purchasedBooks.Any())
                {
                    result.Add(new
                    {
                        payment_id = payment.id,
                        user_id = payment.user_id,
                        user_name = payment.user?.nev,
                        user_email = payment.user?.email,
                        amount = payment.amount,
                        payment_method = payment.payment_method,
                        payment_date = payment.payment_date,
                        status = payment.status,
                        order_type = payment.order_type,
                        books = purchasedBooks
                    });
                }
            }

            return Ok(result);
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
