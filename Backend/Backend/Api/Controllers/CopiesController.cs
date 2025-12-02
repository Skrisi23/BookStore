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
    }
}
