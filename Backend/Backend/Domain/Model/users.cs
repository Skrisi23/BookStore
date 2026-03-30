using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Index("email", Name = "email", IsUnique = true)]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class users
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column("name")]
    [StringLength(255)]
    public string nev { get; set; } = null!;    [Column("last_name")]
    [StringLength(255)]
    public string? last_name { get; set; }

    [Column("first_name")]
    [StringLength(255)]
    public string? first_name { get; set; }

    [Column("default_address")]
    [StringLength(500)]
    public string? default_address { get; set; }

    [Column("role")]
    [StringLength(50)]
    public string role { get; set; } = "user";

    [Column("refresh_token")]
    [StringLength(500)]
    public string? refresh_token { get; set; }

    [Column("refresh_token_expires", TypeName = "datetime")]
    public DateTime? refresh_token_expires { get; set; }

    public string email { get; set; } = null!;

    [Column("password_hash")]
    [StringLength(255)]
    public string jelszo_hash { get; set; } = null!;

    [Column("created", TypeName = "timestamp")]
    public DateTime? letrehozva { get; set; }

    [Column(TypeName = "tinyint(1)")]
    public bool is_verified { get; set; } = false;

    [StringLength(255)]
    public string? verification_token { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? token_expires { get; set; }

    [InverseProperty("user")]
    public virtual ICollection<rental> rentals { get; set; } = new List<rental>();

    [InverseProperty("user")]
    public virtual ICollection<payment> payments { get; set; } = new List<payment>();

    [InverseProperty("user")]
    public virtual ICollection<cart> carts { get; set; } = new List<cart>();
}