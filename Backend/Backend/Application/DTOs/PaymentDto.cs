using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    // Teljes payment adat - lekérdezésekhez
    public class PaymentDto
    {
        public int id { get; set; }

        public int user_id { get; set; }

        public string order_type { get; set; } = null!;

        public decimal amount { get; set; }

        public string payment_method { get; set; } = null!;

        public DateTime payment_date { get; set; }

        public string status { get; set; } = null!;

        public string? order_details { get; set; }

        public string? transaction_id { get; set; }

        // Opcionális: user adatok is
        public string? user_name { get; set; }
        public string? user_email { get; set; }
    }

    // Új payment létrehozásához
    public class CreatePaymentDto
    {
        [Required(ErrorMessage = "A user_id kötelező")]
        public int user_id { get; set; }

        [Required(ErrorMessage = "Az order_type kötelező")]
        [StringLength(50, ErrorMessage = "Az order_type maximum 50 karakter lehet")]
        public string order_type { get; set; } = null!;

        [Required(ErrorMessage = "Az amount kötelező")]
        [Range(0.01, 999999.99, ErrorMessage = "Az összeg 0.01 és 999999.99 között kell legyen")]
        public decimal amount { get; set; }

        [Required(ErrorMessage = "A payment_method kötelező")]
        [StringLength(50, ErrorMessage = "A payment_method maximum 50 karakter lehet")]
        public string payment_method { get; set; } = null!;

        [Required(ErrorMessage = "A status kötelező")]
        [StringLength(20, ErrorMessage = "A status maximum 20 karakter lehet")]
        public string status { get; set; } = "pending";

        public string? order_details { get; set; }

        public string? transaction_id { get; set; }
    }

    // Payment status frissítéséhez
    public class UpdatePaymentStatusDto
    {
        [Required(ErrorMessage = "A status kötelező")]
        [StringLength(20)]
        public string status { get; set; } = null!;

        public string? transaction_id { get; set; }
    }
}
