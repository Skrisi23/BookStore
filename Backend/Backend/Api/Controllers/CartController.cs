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
    [Authorize]
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
            var cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.category)
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
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.category)
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
        {
            if (!addToCartDto.copy_id.HasValue && !addToCartDto.book_id.HasValue)
            {
                return BadRequest(new { message = "A copy_id vagy book_id megadása kötelező" });
            }

            var orderType = addToCartDto.order_type ?? "rental";
            if (orderType != "rental" && orderType != "purchase")
            {
                return BadRequest(new { message = "Az order_type értéke 'rental' vagy 'purchase' lehet" });
            }

            var quantity = addToCartDto.quantity > 0 ? addToCartDto.quantity : 1;
            if (orderType == "rental" && quantity > 1)
            {
                quantity = 1;
            }

            var cart = await _context.carts
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                .FirstOrDefaultAsync(c => c.user_id == userId && c.status == "active");

            var copyIdsInCart = cart?.cart_items.Select(ci => ci.copy_id).ToList() ?? new List<int>();

            copy? copy = null;

            if (addToCartDto.copy_id.HasValue)
            {
                copy = await _context.copies
                    .Include(c => c.book)
                    .FirstOrDefaultAsync(c => c.id == addToCartDto.copy_id.Value);

                if (copy == null)
                {
                    return NotFound(new { message = $"Nem található könyvpéldány ezzel az ID-vel: {addToCartDto.copy_id}" });
                }

                if (copyIdsInCart.Contains(copy.id))
                {
                    var existingType = cart!.cart_items.First(ci => ci.copy_id == copy.id).order_type;
                    if (existingType == orderType)
                    {
                        var typeLabel = orderType == "rental" ? "kölcsönzésre" : "megvásárolásra";
                        return BadRequest(new { message = $"Ez a könyv már a kosárban van {typeLabel}" });
                    }
                    else
                    {
                        var existingLabel = existingType == "rental" ? "kölcsönzésre" : "megvásárolásra";
                        var requestedLabel = orderType == "rental" ? "kölcsönözni" : "megvásárolni";
                        return BadRequest(new { message = $"Ez a könyv már a kosárban van {existingLabel}. Nem lehet ugyanazt a példányt {requestedLabel} is." });
                    }
                }
            }
            else if (addToCartDto.book_id.HasValue)
            {
                copy = await _context.copies
                    .Include(c => c.book)
                    .Where(c => c.book_id == addToCartDto.book_id.Value
                                && c.elerheto == true
                                && !copyIdsInCart.Contains(c.id))
                    .FirstOrDefaultAsync();

                if (copy == null)
                {
                    var anyExists = await _context.copies
                        .AnyAsync(c => c.book_id == addToCartDto.book_id.Value);

                    if (!anyExists)
                    {
                        return NotFound(new { message = $"Nincs példány ehhez a könyvhöz (book_id: {addToCartDto.book_id})" });
                    }

                    // Van-e olyan példány ami a kosárban van már (bármilyen típussal)?
                    var alreadyInCartForThisBook = cart?.cart_items
                        .Any(ci => ci.copy != null && ci.copy.book_id == addToCartDto.book_id.Value) ?? false;

                    if (alreadyInCartForThisBook)
                    {
                        var cartItemForBook = cart!.cart_items.First(ci => ci.copy != null && ci.copy.book_id == addToCartDto.book_id.Value);
                        var existingLabel = cartItemForBook.order_type == "rental" ? "kölcsönzésre" : "megvásárolásra";
                        return BadRequest(new { message = $"Ez a könyv már a kosárban van {existingLabel}." });
                    }

                    return BadRequest(new { message = "Jelenleg nincs elérhető példány ebből a könyvből." });
                }
            }

            if (copy == null)
            {
                return NotFound(new { message = "Könyvpéldány nem található" });
            }

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
            }            if (orderType == "purchase")
            {
                var bookId = copy.book_id;

                var availableCopiesCount = await _context.copies
                    .CountAsync(c => c.book_id == bookId && c.elerheto == true);

                var inOtherCartsQty = await _context.cart_items
                    .Include(ci => ci.cart)
                    .Include(ci => ci.copy)
                    .Where(ci => ci.cart.status == "active"
                                 && ci.cart.user_id != userId
                                 && ci.copy.book_id == bookId
                                 && ci.order_type == "purchase")
                    .SumAsync(ci => ci.quantity);

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

            var existingItem = cart.cart_items.FirstOrDefault(ci => ci.copy_id == copy.id && ci.order_type == orderType);
            if (existingItem != null)
            {
                if (orderType == "rental")
                {
                    return BadRequest(new { message = "Ez a könyv már a kosárban van kölcsönzésre" });
                }
                existingItem.quantity += quantity;
                cart.updated_at = DateTime.Now;
                await _context.SaveChangesAsync();
            }
            else
            {                var itemPrice = orderType == "rental"
                    ? Math.Round(copy.book.ar * 0.05m, 0)
                    : copy.book.ar;

                var cartItem = new cart_item
                {
                    cart_id = cart.id,
                    copy_id = copy.id,
                    quantity = quantity,
                    price = itemPrice,
                    order_type = orderType,
                    added_at = DateTime.Now
                };

                _context.cart_items.Add(cartItem);
                cart.updated_at = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.category)
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

            if (cartItem.cart.user_id != userId)
            {
                return Forbid();
            }

            var cartId = cartItem.cart_id;
            _context.cart_items.Remove(cartItem);
            
            var cart = await _context.carts.FindAsync(cartId);
            if (cart != null)
            {
                cart.updated_at = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            cart = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.category)
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
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartDto>>> GetAllCarts()
        {
            var carts = await _context.carts
                .Include(c => c.user)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.author)
                .Include(c => c.cart_items)
                    .ThenInclude(ci => ci.copy)
                        .ThenInclude(cp => cp.book)
                            .ThenInclude(b => b.category)
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
            {                var cart = await _context.carts
                    .Include(c => c.cart_items)
                        .ThenInclude(ci => ci.copy)
                            .ThenInclude(cp => cp.book)
                                .ThenInclude(b => b.author)
                    .Include(c => c.cart_items)
                        .ThenInclude(ci => ci.copy)
                            .ThenInclude(cp => cp.book)
                                .ThenInclude(b => b.category)
                    .FirstOrDefaultAsync(c => c.user_id == checkoutDto.user_id && c.status == "active");

                if (cart == null)
                {
                    return NotFound(new { message = "Nincs aktív kosár" });
                }

                if (!cart.cart_items.Any())
                {
                    return BadRequest(new { message = "A kosár üres" });
                }                var rentalItems = cart.cart_items.Where(ci => ci.order_type == "rental").ToList();
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
                }                foreach (var rentalItem in rentalItems)
                {
                    var itemDays = checkoutDto.rental_days;
                    if (checkoutDto.rental_days_per_item != null
                        && checkoutDto.rental_days_per_item.TryGetValue(rentalItem.id.ToString(), out var perItemDays))
                    {
                        itemDays = Math.Clamp(perItemDays, 14, 90);
                    }

                    var bookPrice = rentalItem.copy.book.ar;
                    var baseRate = 0.05m;
                    var extraWeeks = Math.Max(0, (itemDays - 14) / 7);
                    var extraRate = extraWeeks * 0.03m;
                    var rentalPrice = Math.Round(bookPrice * (baseRate + extraRate), 0);
                    rentalItem.price = rentalPrice;
                }
                await _context.SaveChangesAsync();

                decimal totalAmount = cart.cart_items.Sum(ci => ci.price * ci.quantity);

                var hasRentals = rentalItems.Any();
                var hasPurchases = purchaseItems.Any();
                var paymentOrderType = hasRentals && hasPurchases ? "mixed" : hasRentals ? "rental" : "purchase";                var payment = new payment
                {
                    user_id = checkoutDto.user_id,
                    order_type = paymentOrderType,
                    amount = totalAmount,
                    payment_method = checkoutDto.payment_method,
                    payment_date = DateTime.Now,
                    status = "completed"
                };

                _context.payments.Add(payment);
                await _context.SaveChangesAsync();

                var rentals = new List<rental>();
                var kolcsonzesDatum = DateOnly.FromDateTime(DateTime.Now);
                
                foreach (var cartItem in rentalItems)
                {
                    var itemDays = checkoutDto.rental_days;
                    if (checkoutDto.rental_days_per_item != null
                        && checkoutDto.rental_days_per_item.TryGetValue(cartItem.id.ToString(), out var perItemDays))
                    {
                        itemDays = Math.Clamp(perItemDays, 14, 90);
                    }

                    var lejaratDatum = DateOnly.FromDateTime(DateTime.Now.AddDays(itemDays));

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

                    cartItem.copy.elerheto = false;

                    var rentalPurchaseRecord = new purchase_item
                    {
                        payment_id = payment.id,
                        book_id = cartItem.copy.book_id,
                        quantity = 1,
                        unit_price = cartItem.price
                    };
                    _context.purchase_items.Add(rentalPurchaseRecord);
                }                foreach (var purchaseItem in purchaseItems)
                {
                    var bookId = purchaseItem.copy.book_id;

                    var purchaseRecord = new purchase_item
                    {
                        payment_id = payment.id,
                        book_id = bookId,
                        quantity = purchaseItem.quantity,
                        unit_price = purchaseItem.price
                    };
                    _context.purchase_items.Add(purchaseRecord);

                    var copiesToMark = await _context.copies
                        .Where(c => c.book_id == bookId && c.elerheto == true)
                        .Take(purchaseItem.quantity)
                        .ToListAsync();

                    foreach (var c in copiesToMark)
                    {
                        c.elerheto = false;
                    }
                }

                cart.status = "checked_out";
                cart.updated_at = DateTime.Now;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                payment = await _context.payments
                    .Include(p => p.user)
                    .FirstOrDefaultAsync(p => p.id == payment.id);

                var rentalsList = await _context.rentals
                    .Include(r => r.user)
                    .Include(r => r.copy)
                        .ThenInclude(c => c.book)
                    .Where(r => r.payment_id == payment!.id)
                    .ToListAsync();                var rentalCount = rentalsList.Count;
                var purchaseCount = purchaseItems.Sum(ci => ci.quantity);
                var messageParts = new List<string>();
                if (rentalCount > 0) messageParts.Add($"{rentalCount} könyv kölcsönözve");
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
