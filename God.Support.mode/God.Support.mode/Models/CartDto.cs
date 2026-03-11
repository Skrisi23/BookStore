using Newtonsoft.Json;

namespace God.Support.mode.Models;

public class CartDto
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("user_id")]
    public int UserId { get; set; }

    [JsonProperty("user_name")]
    public string? UserName { get; set; }

    [JsonProperty("user_email")]
    public string? UserEmail { get; set; }

    [JsonProperty("status")]
    public string? Status { get; set; }

    [JsonProperty("created_at")]
    public DateTime? CreatedAt { get; set; }

    [JsonProperty("updated_at")]
    public DateTime? UpdatedAt { get; set; }

    [JsonProperty("items")]
    public List<CartItemDto>? Items { get; set; }

    [JsonProperty("total_price")]
    public decimal TotalPrice { get; set; }

    [JsonProperty("total_items")]
    public int TotalItems { get; set; }
}

public class CartItemDto
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("cart_id")]
    public int CartId { get; set; }

    [JsonProperty("copy_id")]
    public int CopyId { get; set; }

    [JsonProperty("quantity")]
    public int Quantity { get; set; }

    [JsonProperty("price")]
    public decimal Price { get; set; }

    [JsonProperty("order_type")]
    public string? OrderType { get; set; }

    [JsonProperty("added_at")]
    public DateTime? AddedAt { get; set; }

    [JsonProperty("book_id")]
    public int? BookId { get; set; }

    [JsonProperty("book_cim")]
    public string? BookCim { get; set; }

    [JsonProperty("book_boritokep")]
    public string? BookBoritokep { get; set; }

    [JsonProperty("book_kategoria")]
    public string? BookKategoria { get; set; }

    [JsonProperty("author_nev")]
    public string? AuthorNev { get; set; }
}
