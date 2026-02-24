namespace Backend.Application.DTOs;

public class BookDto
{
    public int Id { get; set; }
    public string Cim { get; set; } = null!;
    public string? Boritokep { get; set; }
    public DateOnly? KiadasiDatum { get; set; }
    public string? Tartalom { get; set; }
    public decimal Ar { get; set; }
    public string Kategoria { get; set; } = null!;
    public string AuthorNev { get; set; } = null!;
    public int author_id { get; set; }  // Szerző ID a szerkesztéshez
    public bool Elerheto { get; set; }  // Van-e legalább 1 elérhető példány
}

public class BooksByPriceRangeRequest
{
    public decimal MinAr { get; set; }
    public decimal MaxAr { get; set; }
}

public class BooksByCategoryRequest
{
    public string Kategoria { get; set; } = null!;
}

public class CreateBookDto
{
    public string cim { get; set; } = null!;
    public string? boritokep { get; set; }
    public DateOnly? kiadasi_datum { get; set; }
    public string? tartalom { get; set; }
    public decimal ar { get; set; }
    public string kategoria { get; set; } = null!;
    public int author_id { get; set; }
}

public class UpdateBookDto
{
    public string? cim { get; set; }
    public string? boritokep { get; set; }
    public DateOnly? kiadasi_datum { get; set; }
    public string? tartalom { get; set; }
    public decimal? ar { get; set; }
    public string? kategoria { get; set; }
    public int? author_id { get; set; }
}
