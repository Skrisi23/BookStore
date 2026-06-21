using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Index("cart_id", Name = "cart_id")]
[Index("copy_id", Name = "copy_id")]
[Index("cart_id", "copy_id", Name = "unique_cart_copy", IsUnique = true)]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class cart_item
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int cart_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int copy_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int quantity { get; set; } = 1;

    [Column(TypeName = "decimal(10,2)")]
    public decimal price { get; set; }    [Column("order_type")]
    [StringLength(20)]
    public string order_type { get; set; } = "rental"; // "rental" or "purchase"

    [Column(TypeName = "timestamp")]
    public DateTime added_at { get; set; }

    // Navigation properties
    [ForeignKey("cart_id")]
    [InverseProperty("cart_items")]
    [JsonIgnore]
    public virtual cart cart { get; set; } = null!;

    [ForeignKey("copy_id")]
    [InverseProperty("cart_items")]
    [JsonIgnore]
    public virtual copy copy { get; set; } = null!;
}
