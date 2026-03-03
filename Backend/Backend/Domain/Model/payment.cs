using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Index("user_id", Name = "user_id")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class payment
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column(TypeName = "int(11)")]
    public int user_id { get; set; }

    [StringLength(50)]
    public string order_type { get; set; } = null!;

    [Column(TypeName = "decimal(10,2)")]
    public decimal amount { get; set; }

    [StringLength(50)]
    public string payment_method { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime payment_date { get; set; }

    [StringLength(20)]    public string status { get; set; } = null!;

    // Navigation property - kapcsolat a users táblához
    [ForeignKey("user_id")]
    [InverseProperty("payments")]
    [JsonIgnore]
    public virtual users user { get; set; } = null!;

    [InverseProperty("payment")]
    public virtual ICollection<rental> rentals { get; set; } = new List<rental>();

    [InverseProperty("payment")]
    public virtual ICollection<purchase_item> purchase_items { get; set; } = new List<purchase_item>();
}
