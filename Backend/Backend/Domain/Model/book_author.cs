using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Table("book_authors")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class book_author
{
    [Column(TypeName = "int(11)")]
    public int book_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int author_id { get; set; }

    [Column("is_primary")]
    public bool is_primary { get; set; } = true;

    [ForeignKey("book_id")]
    [JsonIgnore]
    public virtual book book { get; set; } = null!;

    [ForeignKey("author_id")]
    [JsonIgnore]
    public virtual author author { get; set; } = null!;
}
