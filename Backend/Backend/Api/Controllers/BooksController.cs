using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

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
            .Include(b => b.category)
            .Include(b => b.copies)
            .OrderBy(b => b.id)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                CategoryId = b.category_id,
                Kategoria = b.category.name,
                AuthorNev = b.author.nev,
                author_id = b.author_id,
                Elerheto = b.copies.Any(c => c.elerheto == true)
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
            .Include(b => b.category)
            .Where(b => b.ar >= minAr && b.ar <= maxAr)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                CategoryId = b.category_id,
                Kategoria = b.category.name,
                AuthorNev = b.author.nev,
                author_id = b.author_id
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
            .Include(b => b.category)
            .Where(b => b.category.name == kategoria)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                CategoryId = b.category_id,
                Kategoria = b.category.name,
                AuthorNev = b.author.nev,
                author_id = b.author_id
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
        var categories = await _context.categories
            .Select(c => c.name)
            .OrderBy(n => n)
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
            .Include(b => b.category)
            .Where(b => b.id == id)
            .Select(b => new BookDto
            {
                Id = b.id,
                Cim = b.cim,
                Boritokep = b.boritokep,
                KiadasiDatum = b.kiadasi_datum,
                Tartalom = b.tartalom,
                Ar = b.ar,
                CategoryId = b.category_id,
                Kategoria = b.category.name,
                AuthorNev = b.author.nev,
                author_id = b.author_id
            })
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound(new { message = "Könyv nem található" });
        }

        return Ok(book);
    }

    /// <summary>
    /// Új könyv létrehozása
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook([FromBody] CreateBookDto createBookDto)
    {
        // Ellenőrizzük hogy létezik-e a szerző
        var authorExists = await _context.authors.AnyAsync(a => a.id == createBookDto.author_id);
        if (!authorExists)
        {
            return BadRequest(new { message = $"Nem található szerző ezzel az ID-vel: {createBookDto.author_id}" });
        }

        // Kategória keresése név alapján, ha nem létezik, létrehozzuk
        var cat = await _context.categories.FirstOrDefaultAsync(c => c.name == createBookDto.kategoria);
        if (cat == null)
        {
            cat = new category { name = createBookDto.kategoria };
            _context.categories.Add(cat);
            await _context.SaveChangesAsync();
        }

        var book = new book
        {
            cim = createBookDto.cim,
            boritokep = createBookDto.boritokep,
            kiadasi_datum = createBookDto.kiadasi_datum,
            tartalom = createBookDto.tartalom,
            ar = createBookDto.ar,
            category_id = cat.id,
            author_id = createBookDto.author_id
        };

        _context.books.Add(book);
        await _context.SaveChangesAsync();

        // Reload with author and category
        book = await _context.books
            .Include(b => b.author)
            .Include(b => b.category)
            .FirstOrDefaultAsync(b => b.id == book.id);

        var bookDto = new BookDto
        {
            Id = book!.id,
            Cim = book.cim,
            Boritokep = book.boritokep,
            KiadasiDatum = book.kiadasi_datum,
            Tartalom = book.tartalom,
            Ar = book.ar,
            CategoryId = book.category_id,
            Kategoria = book.category.name,
            AuthorNev = book.author.nev,
            author_id = book.author_id
        };

        return CreatedAtAction(nameof(GetBook), new { id = book.id }, bookDto);
    }

    /// <summary>
    /// Könyv módosítása
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<BookDto>> UpdateBook(int id, [FromBody] UpdateBookDto updateBookDto)
    {
        var book = await _context.books
            .Include(b => b.author)
            .Include(b => b.category)
            .FirstOrDefaultAsync(b => b.id == id);

        if (book == null)
        {
            return NotFound(new { message = $"Nem található könyv ezzel az ID-vel: {id}" });
        }

        // Ha author_id változik, ellenőrizzük hogy létezik-e
        if (updateBookDto.author_id.HasValue && updateBookDto.author_id.Value != book.author_id)
        {
            var authorExists = await _context.authors.AnyAsync(a => a.id == updateBookDto.author_id.Value);
            if (!authorExists)
            {
                return BadRequest(new { message = $"Nem található szerző ezzel az ID-vel: {updateBookDto.author_id}" });
            }
            book.author_id = updateBookDto.author_id.Value;
        }

        // Frissítjük a mezőket ha meg vannak adva
        if (!string.IsNullOrEmpty(updateBookDto.cim)) book.cim = updateBookDto.cim;
        if (updateBookDto.boritokep != null) book.boritokep = updateBookDto.boritokep;
        if (updateBookDto.kiadasi_datum.HasValue) book.kiadasi_datum = updateBookDto.kiadasi_datum;
        if (updateBookDto.tartalom != null) book.tartalom = updateBookDto.tartalom;
        if (updateBookDto.ar.HasValue) book.ar = updateBookDto.ar.Value;
        if (!string.IsNullOrEmpty(updateBookDto.kategoria))
        {
            var cat = await _context.categories.FirstOrDefaultAsync(c => c.name == updateBookDto.kategoria);
            if (cat == null)
            {
                cat = new category { name = updateBookDto.kategoria };
                _context.categories.Add(cat);
                await _context.SaveChangesAsync();
            }
            book.category_id = cat.id;
        }

        await _context.SaveChangesAsync();

        // Reload with author and category
        book = await _context.books
            .Include(b => b.author)
            .Include(b => b.category)
            .FirstOrDefaultAsync(b => b.id == id);

        var bookDto = new BookDto
        {
            Id = book!.id,
            Cim = book.cim,
            Boritokep = book.boritokep,
            KiadasiDatum = book.kiadasi_datum,
            Tartalom = book.tartalom,
            Ar = book.ar,
            CategoryId = book.category_id,
            Kategoria = book.category.name,
            AuthorNev = book.author.nev,
            author_id = book.author_id
        };

        return Ok(bookDto);
    }

    /// <summary>
    /// Könyv törlése
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.books.FindAsync(id);

        if (book == null)
        {
            return NotFound(new { message = $"Nem található könyv ezzel az ID-vel: {id}" });
        }

        // Ellenőrizzük hogy vannak-e hozzá kapcsolódó copies
        var hasCopies = await _context.copies.AnyAsync(c => c.book_id == id);
        if (hasCopies)
        {
            return BadRequest(new { message = "A könyv nem törölhető, mert vannak hozzá kapcsolódó példányok (copies)" });
        }

        _context.books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
