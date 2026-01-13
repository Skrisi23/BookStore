using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

namespace Backend.Api.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{

    private readonly BookStoreContext _context;

    public BooksController(BookStoreContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Az összes könyv lekérése
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetAllBooks()
    {
        var books = await _context.books
            .Include(b => b.author)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                Kategoria = b.kategoria,
                AuthorNev = b.author.nev
            })
            .ToListAsync();

        return Ok(books);
    }

    /// <summary>
    /// Könyvek lekérése ártartomány alapján
    /// </summary>
    [HttpGet("by-price")]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooksByPriceRange(
        [FromQuery] decimal minAr,
        [FromQuery] decimal maxAr)
    {
        var books = await _context.books
            .Include(b => b.author)
            .Where(b => b.ar >= minAr && b.ar <= maxAr)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                Kategoria = b.kategoria,
                AuthorNev = b.author.nev
            })
            .ToListAsync();

        return Ok(books);
    }

    /// <summary>
    /// Könyvek lekérése kategória alapján
    /// </summary>
    [HttpGet("by-category/{kategoria}")]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooksByCategory(string kategoria)
    {
        var books = await _context.books
            .Include(b => b.author)
            .Where(b => b.kategoria == kategoria)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                Kategoria = b.kategoria,
                AuthorNev = b.author.nev
            })
            .ToListAsync();

        return Ok(books);
    }

    /// <summary>
    /// Az összes elérhető kategória lekérése
    /// </summary>
    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<string>>> GetAllCategories()
    {
        var categories = await _context.books
            .Select(b => b.kategoria)
            .Distinct()
            .ToListAsync();

        return Ok(categories);
    }

    /// <summary>
    /// Ár statisztikák lekérése
    /// </summary>
    [HttpGet("price-stats")]
    public async Task<ActionResult<object>> GetPriceStats()
    {
        var stats = await _context.books
            .GroupBy(b => 1)
            .Select(g => new
            {
                MinAr = g.Min(b => b.ar),
                MaxAr = g.Max(b => b.ar),
                AtlagAr = g.Average(b => b.ar)
            })
            .FirstOrDefaultAsync();

        return Ok(stats);
    }

    /// <summary>
    /// Egy könyv lekérése ID alapján
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBook(int id)
    {
        var book = await _context.books
            .Include(b => b.author)
            .Where(b => b.id == id)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                Kategoria = b.kategoria,
                AuthorNev = b.author.nev
            })
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound(new { message = "Könyv nem található" });
        }

        return Ok(book);
    }
}
