using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;

        public CartController(BookStoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Bejelentkezett felhasználó aktív kosarának lekérdezése
        /// </summary>
        [HttpGet("my-cart")]
        public async Task<ActionResult<CartDto>> GetMyCart([FromQuery] int userId)
        {
            // Aktív kosár keresése
            var cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .FirstOrDefaultAsync(c => c.user_id == userId && c.status == "active");

            // Ha nincs kosár, létrehozunk egyet
            if (cart == null)
            {
                cart = new cart
                {
                    user_id = userId,
                    created_at = DateTime.Now,
                    status = "active"
                };

                _context.carts.Add(cart);
                await _context.SaveChangesAsync();

                // Reload with includes
                cart = await _context.carts
                    .Include(c => c.user)
                    .Include(c => c.cart_items)
                    .FirstOrDefaultAsync(c => c.id == cart.id);
            }

            var cartDto = _mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        /// <summary>
        /// Kosár lekérdezése ID alapján (admin)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CartDto>> GetCartById(int id)
        {
            var cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .FirstOrDefaultAsync(c => c.id == id);

            if (cart == null)
            {
                return NotFound(new { message = $"Nem található kosár ezzel az ID-vel: {id}" });
            }

            var cartDto = _mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        /// <summary>
        /// Könyv hozzáadása a kosárhoz (copy_id vagy book_id alapján)
        /// </summary>
        [HttpPost("add")]
        public async Task<ActionResult<CartDto>> AddToCart([FromQuery] int userId, [FromBody] AddToCartDto addToCartDto)
        {            // Validáció: legalább copy_id vagy book_id kötelező
            if (!addToCartDto.copy_id.HasValue && !addToCartDto.book_id.HasValue)
            {
                return BadRequest(new { message = "A copy_id vagy book_id megadása kötelező" });
            }

            var orderType = addToCartDto.order_type ?? "rental";
            if (orderType != "rental" && orderType != "purchase")
            {
                return BadRequest(new { message = "Az order_type értéke 'rental' vagy 'purchase' lehet" });
            }

            // Kölcsönzésnél max 1 db
            var quantity = addToCartDto.quantity > 0 ? addToCartDto.quantity : 1;
            if (orderType == "rental" && quantity > 1)
            {
                quantity = 1;
            }

            copy? copy = null;

            // 1a. Ha copy_id meg van adva, azt használjuk
            if (addToCartDto.copy_id.HasValue)
            {
                copy = await _context.copies
                    .Include(c => c.book)
                    .FirstOrDefaultAsync(c => c.id == addToCartDto.copy_id.Value);

                if (copy == null)
                {
                    return NotFound(new { message = $"Nem található könyvpéldány ezzel az ID-vel: {addToCartDto.copy_id}" });
                }
            }
            // 1b. Ha book_id van megadva, automatikusan választunk egy példányt (bármilyen állapotban)
            else if (addToCartDto.book_id.HasValue)
            {
                copy = await _context.copies
                    .Include(c => c.book)
                    .Where(c => c.book_id == addToCartDto.book_id.Value)
                    .FirstOrDefaultAsync();

                if (copy == null)
                {
                    return NotFound(new { message = $"Nincs példány ehhez a könyvhöz (book_id: {addToCartDto.book_id})" });
                }
            }

            // 2. Ellenőrizzük hogy létezik-e a copy
            if (copy == null)
            {
                return NotFound(new { message = "Könyvpéldány nem található" });
            }            // 3. Aktív kosár keresése vagy létrehozása
            var cart = await _context.carts
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                .FirstOrDefaultAsync(c => c.user_id == userId && c.status == "active");

            if (cart == null)
            {
                cart = new cart
                {
                    user_id = userId,
                    created_at = DateTime.Now,
                    status = "active"
                };
                _context.carts.Add(cart);
                await _context.SaveChangesAsync();
            }            // 4. Vásárlásnál ellenőrizzük a készletet
            if (orderType == "purchase")
            {
                var bookId = copy.book_id;

                // Összes elérhető példány a könyvből
                var availableCopiesCount = await _context.copies
                    .CountAsync(c => c.book_id == bookId && c.elerheto == true);

                // Más felhasználók aktív kosaraiban lévő mennyiség (ugyanez a könyv, purchase)
                var inOtherCartsQty = await _context.cart_items
                    .Include(ci => ci.cart)
                    .Include(ci => ci.copy)
                    .Where(ci => ci.cart.status == "active"
                                 && ci.cart.user_id != userId
                                 && ci.copy.book_id == bookId
                                 && ci.order_type == "purchase")
                    .SumAsync(ci => ci.quantity);

                // A jelenlegi felhasználó kosarában már benne lévő mennyiség (ugyanez a könyv, purchase)
                var alreadyInMyCart = cart.cart_items
                    .Where(ci => ci.copy.book_id == bookId && ci.order_type == "purchase")
                    .Sum(ci => ci.quantity);

                var totalRequested = alreadyInMyCart + quantity;
                var realAvailable = availableCopiesCount - inOtherCartsQty;

                if (totalRequested > realAvailable)
                {
                    return BadRequest(new
                    {
                        message = $"Nincs elég készlet! Elérhető: {Math.Max(0, realAvailable)} db, kosárban már: {alreadyInMyCart} db"
                    });
                }
            }

            // 5. Ellenőrizzük, hogy már van-e ez a könyv a kosárban (ugyanazzal a típussal)
            var existingItem = cart.cart_items.FirstOrDefault(ci => ci.copy_id == copy.id && ci.order_type == orderType);
            if (existingItem != null)
            {
                if (orderType == "rental")
                {
                    return BadRequest(new { message = "Ez a könyv már a kosárban van kölcsönzésre" });
                }
                // Vásárlásnál növeljük a mennyiséget
                existingItem.quantity += quantity;
                cart.updated_at = DateTime.Now;
                await _context.SaveChangesAsync();
            }
            else
            {
                // 6. Új cart_item létrehozása
                var cartItem = new cart_item
                {
                    cart_id = cart.id,
                    copy_id = copy.id,
                    quantity = quantity,
                    price = copy.book.ar,
                    order_type = orderType,
                    added_at = DateTime.Now
                };

                _context.cart_items.Add(cartItem);
                cart.updated_at = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            // 6. Frissített kosár visszaküldése
            cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .FirstOrDefaultAsync(c => c.id == cart.id);

            var cartDto = _mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        /// <summary>
        /// Kosár elem eltávolítása
        /// </summary>
        [HttpDelete("item/{cartItemId}")]
        public async Task<ActionResult<CartDto>> RemoveCartItem(int cartItemId, [FromQuery] int userId)
        {
            var cartItem = await _context.cart_items
                .Include(ci => ci.cart)
                .FirstOrDefaultAsync(ci => ci.id == cartItemId);

            if (cartItem == null)
            {
                return NotFound(new { message = $"Nem található kosár elem ezzel az ID-vel: {cartItemId}" });
            }

            // Ellenőrizzük, hogy a user kosarához tartozik-e
            if (cartItem.cart.user_id != userId)
            {
                return Forbid();
            }

            var cartId = cartItem.cart_id;
            _context.cart_items.Remove(cartItem);
            
            // Cart updated_at frissítése
            var cart = await _context.carts.FindAsync(cartId);
            if (cart != null)
            {
                cart.updated_at = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            // Frissített kosár visszaküldése
            cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .FirstOrDefaultAsync(c => c.id == cartId);

            var cartDto = _mapper.Map<CartDto>(cart!);
            return Ok(cartDto);
        }

        /// <summary>
        /// Teljes kosár kiürítése
        /// </summary>
        [HttpDelete("clear")]
        public async Task<ActionResult<CartDto>> ClearCart([FromQuery] int userId)
        {
            var cart = await _context.carts
                .Include(c => c.cart_items)
                .FirstOrDefaultAsync(c => c.user_id == userId && c.status == "active");

            if (cart == null)
            {
                return NotFound(new { message = "Nincs aktív kosár" });
            }

            _context.cart_items.RemoveRange(cart.cart_items);
            cart.updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

            // Frissített (üres) kosár visszaküldése
            cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                .FirstOrDefaultAsync(c => c.id == cart.id);

            var cartDto = _mapper.Map<CartDto>(cart!);
            return Ok(cartDto);
        }

        /// <summary>
        /// Összes kosár lekérdezése (admin)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartDto>>> GetAllCarts()
        {
            var carts = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .OrderByDescending(c => c.created_at)
                .ToListAsync();

            var cartDtos = _mapper.Map<List<CartDto>>(carts);
            return Ok(cartDtos);
        }

        /// <summary>
        /// Checkout - Kosár fizetése és kölcsönzések létrehozása
        /// </summary>
        [HttpPost("checkout")]
        public async Task<ActionResult<CheckoutResponseDto>> Checkout([FromBody] CheckoutDto checkoutDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1. Aktív kosár keresése
                var cart = await _context.carts
                    .Include(c => c.cart_items)
                        .ThenInclude(ci => ci.copy)
                            .ThenInclude(cp => cp.book)
                    .FirstOrDefaultAsync(c => c.user_id == checkoutDto.user_id && c.status == "active");

                if (cart == null)
                {
                    return NotFound(new { message = "Nincs aktív kosár" });
                }

                if (!cart.cart_items.Any())
                {
                    return BadRequest(new { message = "A kosár üres" });
                }                // 2. Kölcsönzéseknél ellenőrizzük, hogy a copy elérhető-e
                var rentalItems = cart.cart_items.Where(ci => ci.order_type == "rental").ToList();
                var purchaseItems = cart.cart_items.Where(ci => ci.order_type == "purchase").ToList();

                var unavailableRentals = rentalItems
                    .Where(ci => ci.copy.elerheto == false)
                    .Select(ci => new { ci.copy.leltari_szam, ci.copy.book.cim })
                    .ToList();                if (unavailableRentals.Any())
                {
                    return BadRequest(new
                    {
                        message = "Néhány könyv már nem elérhető kölcsönzésre",
                        unavailable_books = unavailableRentals
                    });
                }

                // 2b. Vásárlásoknál ellenőrizzük a készletet
                foreach (var purchaseItem in purchaseItems)
                {
                    var bookId = purchaseItem.copy.book_id;
                    var availableCount = await _context.copies
                        .CountAsync(c => c.book_id == bookId && c.elerheto == true);

                    if (purchaseItem.quantity > availableCount)
                    {
                        return BadRequest(new
                        {
                            message = $"Nincs elég készlet a(z) \"{purchaseItem.copy.book.cim}\" könyvből. Elérhető: {availableCount} db, kért: {purchaseItem.quantity} db"
                        });
                    }
                }

                // 3. Összeg számítása
                decimal totalAmount = cart.cart_items.Sum(ci => ci.price * ci.quantity);

                // 4. Payment létrehozása
                var hasRentals = rentalItems.Any();
                var hasPurchases = purchaseItems.Any();
                var paymentOrderType = hasRentals && hasPurchases ? "mixed" : hasRentals ? "rental" : "purchase";

                var orderDetailsJson = System.Text.Json.JsonSerializer.Serialize(new
                {
                    cart_id = cart.id,
                    items_count = cart.cart_items.Count,
                    books = cart.cart_items.Select(ci => new
                    {
                        copy_id = ci.copy_id,
                        book_title = ci.copy.book.cim,
                        price = ci.price,
                        quantity = ci.quantity,
                        order_type = ci.order_type
                    }).ToList()
                });

                var payment = new payment
                {
                    user_id = checkoutDto.user_id,
                    order_type = paymentOrderType,
                    amount = totalAmount,
                    payment_method = checkoutDto.payment_method,
                    payment_date = DateTime.Now,
                    status = "completed",
                    transaction_id = checkoutDto.transaction_id,
                    order_details = orderDetailsJson
                };

                _context.payments.Add(payment);
                await _context.SaveChangesAsync();

                // 5. Kölcsönzések létrehozása (csak rental típusú itemekhez)
                var rentals = new List<rental>();
                var kolcsonzesDatum = DateOnly.FromDateTime(DateTime.Now);
                var lejaratDatum = DateOnly.FromDateTime(DateTime.Now.AddDays(checkoutDto.rental_days));
                
                foreach (var cartItem in rentalItems)
                {
                    var rental = new rental
                    {
                        user_id = checkoutDto.user_id,
                        copy_id = cartItem.copy_id,
                        payment_id = payment.id,
                        kolcsonzes_datuma = kolcsonzesDatum,
                        lejarat_datum = lejaratDatum,
                        visszahozva_datuma = null
                    };

                    _context.rentals.Add(rental);
                    rentals.Add(rental);

                    // Copy lefoglalása kölcsönzéskor
                    cartItem.copy.elerheto = false;
                }                // 6. Vásárlásoknál a megfelelő számú copy-t elérhetetlenné tesszük
                foreach (var purchaseItem in purchaseItems)
                {
                    var bookId = purchaseItem.copy.book_id;
                    var copiesToMark = await _context.copies
                        .Where(c => c.book_id == bookId && c.elerheto == true)
                        .Take(purchaseItem.quantity)
                        .ToListAsync();

                    foreach (var c in copiesToMark)
                    {
                        c.elerheto = false;
                    }
                }

                // 7. Kosár státuszának frissítése
                cart.status = "checked_out";
                cart.updated_at = DateTime.Now;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                // 8. Válasz összeállítása
                // Payment reload user adatokkal
                payment = await _context.payments
                    .Include(p => p.user)
                    .FirstOrDefaultAsync(p => p.id == payment.id);

                // Rentals reload teljes adatokkal
                var rentalsList = await _context.rentals
                    .Include(r => r.user)
                    .Include(r => r.copy)
                        .ThenInclude(c => c.book)
                    .Where(r => r.payment_id == payment!.id)
                    .ToListAsync();                var rentalCount = rentalsList.Count;
                var purchaseCount = purchaseItems.Sum(ci => ci.quantity);
                var messageParts = new List<string>();
                if (rentalCount > 0) messageParts.Add($"{rentalCount} könyv kölcsönözve {checkoutDto.rental_days} napra");
                if (purchaseCount > 0) messageParts.Add($"{purchaseCount} könyv megvásárolva");

                var response = new CheckoutResponseDto
                {
                    payment = _mapper.Map<PaymentDto>(payment!),
                    rentals = _mapper.Map<List<RentalDto>>(rentalsList),
                    message = $"Sikeres fizetés! {string.Join(", ", messageParts)}."
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new
                {
                    message = "Hiba történt a checkout során",
                    error = ex.Message
                });
            }
        }
    }
}
