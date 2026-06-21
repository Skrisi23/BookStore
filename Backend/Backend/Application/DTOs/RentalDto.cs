using Backend.Domain.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.DTOs
{
    public class RentalDto
    {
        public int id { get; set; }

        public int user_id { get; set; }

        public int copy_id { get; set; }

        public DateOnly kolcsonzes_datuma { get; set; }

        public DateOnly? visszahozva_datuma { get; set; }

        public DateOnly? lejarat_datum { get; set; }

        public string? user_name { get; set; }

        public string? user_email { get; set; }

        public string? book_title { get; set; }

        public int? book_id { get; set; }

        public int? payment_id { get; set; }
    }
}
