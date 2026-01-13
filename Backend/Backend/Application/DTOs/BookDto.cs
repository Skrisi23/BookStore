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
