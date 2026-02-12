using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    // Checkout kérés DTO
    public class CheckoutDto
    {
        [Required(ErrorMessage = "A user_id kötelező")]
        public int user_id { get; set; }

        [Required(ErrorMessage = "A payment_method kötelező")]
        [StringLength(50)]
        public string payment_method { get; set; } = null!;

        [StringLength(255)]
        public string? transaction_id { get; set; }

        // Opcionális: hány napra kölcsönzik (default: 14)
        [Range(1, 90, ErrorMessage = "A kölcsönzési időszak 1 és 90 nap között lehet")]
        public int rental_days { get; set; } = 14;
    }

    // Checkout válasz DTO
    public class CheckoutResponseDto
    {
        public PaymentDto payment { get; set; } = null!;
        public List<RentalDto> rentals { get; set; } = new List<RentalDto>();
        public string message { get; set; } = null!;
    }
}
