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
        /// Könyv hozzáadása a kosárhoz
        /// </summary>
        [HttpPost("add")]
        public async Task<ActionResult<CartDto>> AddToCart([FromQuery] int userId, [FromBody] AddToCartDto addToCartDto)
        {
            // 1. Ellenőrizzük, hogy létezik-e a copy
            var copy = await _context.copies
                .Include(c => c.book)
                .FirstOrDefaultAsync(c => c.id == addToCartDto.copy_id);

            if (copy == null)
            {
                return NotFound(new { message = $"Nem található könyvpéldány ezzel az ID-vel: {addToCartDto.copy_id}" });
            }

            // 2. Ellenőrizzük, hogy elérhető-e a könyv
            if (copy.elerheto == false)
            {
                return BadRequest(new { message = $"Ez a könyvpéldány nem elérhető (leltári szám: {copy.leltari_szam})" });
            }

            // 3. Aktív kosár keresése vagy létrehozása
            var cart = await _context.carts
                .Include(c => c.cart_items)
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
            }

            // 4. Ellenőrizzük, hogy már van-e ez a copy a kosárban
            var existingItem = cart.cart_items.FirstOrDefault(ci => ci.copy_id == addToCartDto.copy_id);
            if (existingItem != null)
            {
                return BadRequest(new { message = "Ez a könyvpéldány már a kosárban van" });
            }

            // 5. Új cart_item létrehozása
            var cartItem = new cart_item
            {
                cart_id = cart.id,
                copy_id = addToCartDto.copy_id,
                quantity = 1,
                price = copy.book.ar,
                added_at = DateTime.Now
            };

            _context.cart_items.Add(cartItem);
            cart.updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

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
    }
}
