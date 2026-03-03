using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Model;

[Index("author_id", Name = "author_id")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class book
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column("title")]
    [StringLength(255)]
    public string cim { get; set; } = null!;

    [Column(TypeName = "int(11)")]
    public int author_id { get; set; }

    [Column("image")]
    [StringLength(255)]
    public string? boritokep { get; set; }

    [Column("release_date")]
    public DateOnly? kiadasi_datum { get; set; }

    [Column("content", TypeName = "text")]
    public string? tartalom { get; set; }

    [Column("price", TypeName = "decimal(10,2)")]
    public decimal ar { get; set; }

    [Column("category")]
    [StringLength(100)]
    public string kategoria { get; set; } = "Egyéb";

    [ForeignKey("author_id")]
    [InverseProperty("books")]
    [JsonIgnore]
    public virtual author author { get; set; } = null!;

    [InverseProperty("book")]
    [JsonIgnore]
    public virtual ICollection<copy> copies { get; set; } = new List<copy>();

    [InverseProperty("book")]
    [JsonIgnore]
    public virtual ICollection<purchase_item> purchase_items { get; set; } = new List<purchase_item>();
}
