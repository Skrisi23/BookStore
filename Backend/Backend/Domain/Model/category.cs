using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Model;

[Table("categories")]
[MySqlCharSet("utf8mb4")]
[MySqlCollation("utf8mb4_hungarian_ci")]
public partial class category
{
    [Key]
    [Column(TypeName = "int(11)")]
    public int id { get; set; }

    [Column("name")]
    [StringLength(100)]
    public string name { get; set; } = null!;

    [InverseProperty("category")]
    [JsonIgnore]
    public virtual ICollection<book> books { get; set; } = new List<book>();
}
