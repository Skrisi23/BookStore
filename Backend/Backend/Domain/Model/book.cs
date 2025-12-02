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

    [StringLength(255)]
    public string cim { get; set; } = null!;

    [Column(TypeName = "int(11)")]
    public int author_id { get; set; }

    
    [StringLength(255)]
    public string? boritokep { get; set; }
    public DateOnly? kiadasi_datum { get; set; }

    [Column(TypeName = "text")]
    public string? tartalom { get; set; }

    [ForeignKey("author_id")]
    [InverseProperty("books")]
    [JsonIgnore]
    public virtual author author { get; set; } = null!;

    [InverseProperty("book")]
    [JsonIgnore]
    public virtual ICollection<copy> copies { get; set; } = new List<copy>();
}
