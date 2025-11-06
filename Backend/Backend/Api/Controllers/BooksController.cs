using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]

    public class BooksController : Controller
    {

        private readonly BookStoreContext _context;

        public BooksController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            return Ok(_context.books.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(ulong id)
        {
            var user = _context.books.Find(id);
            return Ok(user);
        }


        [HttpPost]
        public IActionResult Create(book book)
        {
            _context.books.Add(book);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new {id = book.id }, book);
        }
        

        [HttpPut("{id}")]
        public IActionResult Update(ulong id, book book)
        {
            _context.Entry(book).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteById(ulong id)
        {
            var book = _context.books.Find(id);
            _context.Remove(book);
            _context.SaveChanges();
            return NoContent();
        }


    }
}
