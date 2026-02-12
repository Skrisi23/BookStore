using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    // Teljes kosár adat lekérdezéshez - tartalmazza a cart itemeket is
    public class CartDto
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime? updated_at { get; set; }
        public string status { get; set; } = null!;
        
        // User adatok
        public string? user_name { get; set; }
        public string? user_email { get; set; }
        
        // Kosárban lévő elemek
        public List<CartItemDto> items { get; set; } = new List<CartItemDto>();
        
        // Számított értékek
        public decimal total_price { get; set; }
        public int total_items { get; set; }
    }

    // Kosár elem DTO - részletes könyv adatokkal
    public class CartItemDto
    {
        public int id { get; set; }
        public int cart_id { get; set; }
        public int copy_id { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
        public DateTime added_at { get; set; }
        
        // Copy/Book adatok
        public string? leltari_szam { get; set; }
        public bool? copy_elerheto { get; set; }
        
        // Book részletek
        public int? book_id { get; set; }
        public string? book_cim { get; set; }
        public string? book_boritokep { get; set; }
        public string? book_kategoria { get; set; }
        public string? author_nev { get; set; }
    }

    // Könyv kosárba helyezése
    public class AddToCartDto
    {
        // Vagy copy_id vagy book_id kötelező
        public int? copy_id { get; set; }
        public int? book_id { get; set; }

        [Range(1, 1, ErrorMessage = "Egy könyvpéldányból csak 1 darab lehet a kosárban")]
        public int quantity { get; set; } = 1;
    }

    // Kosár elem módosítása (pl. eltávolítás)
    public class UpdateCartItemDto
    {
        [Range(0, 1, ErrorMessage = "A quantity 0 (törlés) vagy 1 lehet")]
        public int quantity { get; set; }
    }

    // Kosár létrehozása (általában automatikus az első addToCart híváskor)
    public class CreateCartDto
    {
        [Required]
        public int user_id { get; set; }
    }
}
