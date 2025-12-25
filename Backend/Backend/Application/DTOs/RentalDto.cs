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

        public virtual copy copy { get; set; } = null!;

        public virtual users user { get; set; } = null!;
    }
}
