using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Model;

[Index("payment_id", Name = "idx_purchase_items_payment")]
[Index("book_id", Name = "idx_purchase_items_book")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class purchase_item
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int payment_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int book_id { get; set; }

    [Column(TypeName = "int(11)")]
    public int quantity { get; set; } = 1;

    [Column(TypeName = "decimal(10,2)")]
    public decimal unit_price { get; set; }

    [ForeignKey("payment_id")]
    [InverseProperty("purchase_items")]
    [JsonIgnore]
    public virtual payment payment { get; set; } = null!;

    [ForeignKey("book_id")]
    [InverseProperty("purchase_items")]
    [JsonIgnore]
    public virtual book book { get; set; } = null!;
}
