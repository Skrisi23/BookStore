using Newtonsoft.Json;

namespace God.Support.mode.Models;

public class PaymentDto
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("user_id")]
    public int UserId { get; set; }

    [JsonProperty("user_name")]
    public string? UserName { get; set; }

    [JsonProperty("user_email")]
    public string? UserEmail { get; set; }

    [JsonProperty("order_type")]
    public string? OrderType { get; set; }

    [JsonProperty("amount")]
    public decimal Amount { get; set; }

    [JsonProperty("payment_date")]
    public DateTime? PaymentDate { get; set; }

    [JsonProperty("payment_method")]
    public string? PaymentMethod { get; set; }

    [JsonProperty("status")]
    public string? Status { get; set; }

    [JsonProperty("items")]
    public List<PaymentItemDto>? Items { get; set; }
}

public class PaymentItemDto
{
    [JsonProperty("book_title")]
    public string? BookTitle { get; set; }

    [JsonProperty("book_id")]
    public int BookId { get; set; }

    [JsonProperty("quantity")]
    public int Quantity { get; set; }

    [JsonProperty("unit_price")]
    public decimal UnitPrice { get; set; }

    [JsonProperty("is_rental")]
    public bool IsRental { get; set; }
}
