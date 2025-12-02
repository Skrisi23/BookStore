using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class AuthorController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public AuthorController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.authors.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id) 
        {
            var author = _context.authors.Find(id);
            return Ok(author);
        }
        [HttpPost]
        public IActionResult Create(author author) 
        { 
            _context.authors.Add(author);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new {id = author.id}, author);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, author author)
        {
            _context.Entry(author).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var author = _context.authors.Find(id);
            _context.authors.Remove(author);
            _context.SaveChanges();
            return NoContent();

        }
    }
}
