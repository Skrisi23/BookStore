using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CopiesController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public CopiesController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.copies.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var copy = _context.copies.Find(id);
            return Ok(copy);
        }

        /// <summary>
        /// Egy könyv példányainak lekérdezése book_id alapján
        /// </summary>
        [HttpGet("by-book/{bookId}")]
        public async Task<IActionResult> GetByBookId(int bookId)
        {
            var copies = await _context.copies
                .Where(c => c.book_id == bookId)
                .ToListAsync();

            return Ok(new
            {
                book_id = bookId,
                count = copies.Count,
                copies = copies
            });
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CopiesDto dto)
        {
            var bookExists = await _context.books.AnyAsync(b => b.id == dto.book_id);
            if (!bookExists)
            {
                return BadRequest(new { message = $"Nem található könyv ezzel az ID-vel: {dto.book_id}" });
            }

            var newCopy = new copy
            {
                book_id = dto.book_id,
                leltari_szam = dto.leltari_szam,
                elerheto = dto.elerheto ?? true
            };

            _context.copies.Add(newCopy);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = newCopy.id }, newCopy);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, copy copy)
        {
            _context.Entry(copy).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var copy = await _context.copies.FindAsync(id);
            if (copy == null)
            {
                return NotFound(new { message = $"Nem található példány ezzel az ID-vel: {id}" });
            }
            
            _context.copies.Remove(copy);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Toggles availability of all copies for a specific book
        /// </summary>
        [Authorize(Roles = "admin")]
        [HttpPut("toggle-book-availability/{bookId}")]
        public async Task<IActionResult> ToggleBookAvailability(int bookId)
        {
            var copies = await _context.copies
                .Where(c => c.book_id == bookId)
                .ToListAsync();

            if (!copies.Any())
            {
                return NotFound(new { message = "Ennek a könyvnek nincs egyetlen példánya sem" });
            }

            bool hasAvailable = copies.Any(c => c.elerheto == true);
            bool newAvailability = !hasAvailable;

            foreach (var copy in copies)
            {
                copy.elerheto = newAvailability;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = newAvailability 
                    ? $"{copies.Count} példány elérhetővé téve" 
                    : $"{copies.Count} példány elérhetetlenné téve",
                book_id = bookId,
                copies_count = copies.Count,
                new_availability = newAvailability
            });
        }
    }
}
