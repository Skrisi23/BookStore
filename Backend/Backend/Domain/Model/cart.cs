using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Index("user_id", Name = "user_id")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class cart
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int user_id { get; set; }

    [Column("creation_date", TypeName = "timestamp")]
    public DateTime created_at { get; set; }

    [Column("update_time", TypeName = "timestamp")]
    public DateTime? updated_at { get; set; }

    [StringLength(20)]
    public string status { get; set; } = "active"; // active, checked_out, abandoned

    // Navigation properties
    [ForeignKey("user_id")]
    [InverseProperty("carts")]
    [JsonIgnore]
    public virtual users user { get; set; } = null!;

    [InverseProperty("cart")]
    public virtual ICollection<cart_item> cart_items { get; set; } = new List<cart_item>();
}
