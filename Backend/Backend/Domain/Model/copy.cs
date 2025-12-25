using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Model;

[Index("book_id", "elerheto", Name = "book_id")]
[Index("leltari_szam", Name = "leltari_szam", IsUnique = true)]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class copy
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int book_id { get; set; }

    [StringLength(50)]
    public string leltari_szam { get; set; } = null!;

    [Required]
    public bool? elerheto { get; set; }

    [ForeignKey("book_id")]
    [InverseProperty("copies")]
    [JsonIgnore]
    public virtual book book { get; set; } = null!;

    [InverseProperty("copy")]
    [JsonIgnore]
    public virtual ICollection<rental> rentals { get; set; } = new List<rental>();
}
