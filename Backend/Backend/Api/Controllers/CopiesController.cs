using Backend.Domain.Model;
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

        [HttpPost]
        public IActionResult Create(copy copy)
        {
            _context.copies.Add(copy);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = copy.id }, copy);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, copy copy)
        {
            _context.Entry(copy).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var copy = _context.copies.Find(id);
            _context.copies.Remove(copy);
            _context.SaveChanges();
            return NoContent();
        }

        /// <summary>
        /// Toggles availability of all copies for a specific book
        /// If any copy is available, sets all to unavailable
        /// If all copies are unavailable, sets all to available
        /// </summary>
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

            // Ha van legalább egy elérhető példány, akkor mindet elérhetetlenné tesszük
            // Ha egyik sem elérhető, akkor mindet elérhetővé tesszük
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
