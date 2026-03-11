using Newtonsoft.Json;

using Newtonsoft.Json;

namespace God.Support.mode.Models;

public class UpdateBookDto
{
    [JsonProperty("cim")]
    public string? Cim { get; set; }

    [JsonProperty("boritokep")]
    public string? Boritokep { get; set; }

    [JsonProperty("kiadasi_datum")]
    public DateTime? KiadasiDatum { get; set; }

    [JsonProperty("tartalom")]
    public string? Tartalom { get; set; }

    [JsonProperty("ar")]
    public decimal? Ar { get; set; }

    [JsonProperty("kategoria")]
    public string? Kategoria { get; set; }

    [JsonProperty("author_id")]
    public int? AuthorId { get; set; }
}
