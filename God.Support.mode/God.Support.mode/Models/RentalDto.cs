using Newtonsoft.Json;

namespace God.Support.mode.Models;

public class RentalDto
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("copy_id")]
    public int CopyId { get; set; }

    [JsonProperty("user_id")]
    public int UserId { get; set; }

    [JsonProperty("book_title")]
    public string? BookTitle { get; set; }

    [JsonProperty("user_name")]
    public string? UserName { get; set; }

    [JsonProperty("user_email")]
    public string? UserEmail { get; set; }

    [JsonProperty("kolcsonzes_datuma")]
    public DateTime? KolcsonzesDatuma { get; set; }

    [JsonProperty("lejarat_datum")]
    public DateTime? LejaratDatum { get; set; }

    [JsonProperty("visszahozva_datuma")]
    public DateTime? VisszahozvaDatuma { get; set; }

    [JsonProperty("book_id")]
    public int? BookId { get; set; }

    [JsonProperty("payment_id")]
    public int? PaymentId { get; set; }
}
