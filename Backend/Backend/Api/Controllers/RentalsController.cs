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

        public RentalsController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.rentals.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var rental = _context.rentals.Find(id);
            return Ok(rental);
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
        public IActionResult Delete(int id)
        {
            var rental = _context.rentals.Find(id);
            _context.rentals.Remove(rental);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
