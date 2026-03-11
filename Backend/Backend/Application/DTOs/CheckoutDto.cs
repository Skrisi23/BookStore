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

        // Alapértelmezett kölcsönzési napok (ha nincs tételenként megadva)
        [Range(14, 90, ErrorMessage = "A kölcsönzési időszak 14 és 90 nap között lehet")]
        public int rental_days { get; set; } = 14;

        // Tételenkénti kölcsönzési napok: cart_item_id -> napok száma
        // Ha egy tétel nincs benne, a rental_days alapértéket használjuk
        public Dictionary<string, int>? rental_days_per_item { get; set; }
    }

    // Checkout válasz DTO
    public class CheckoutResponseDto
    {
        public PaymentDto payment { get; set; } = null!;
        public List<RentalDto> rentals { get; set; } = new List<RentalDto>();
        public string message { get; set; } = null!;
    }
}
