using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Index("email", Name = "email", IsUnique = true)]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class user
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [StringLength(255)]
    public string nev { get; set; } = null!;

    public string email { get; set; } = null!;

    [StringLength(255)]
    public string jelszo_hash { get; set; } = null!;

    [Column(TypeName = "timestamp")]
    public DateTime? letrehozva { get; set; }

    [InverseProperty("user")]
    public virtual ICollection<rental> rentals { get; set; } = new List<rental>();
}
