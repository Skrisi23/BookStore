using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Model;

[Index("copy_id", "visszahozva_datuma", Name = "copy_id")]
[Index("user_id", Name = "user_id")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class rental
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int user_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int copy_id { get; set; }

    public DateOnly kolcsonzes_datuma { get; set; }

    public DateOnly? visszahozva_datuma { get; set; }

    [ForeignKey("copy_id")]
    [InverseProperty("rentals")]
    [JsonIgnore]
    public virtual copy copy { get; set; } = null!;

    [ForeignKey("user_id")]
    [InverseProperty("rentals")]
    [JsonIgnore]
    public virtual users user { get; set; } = null!;
}
