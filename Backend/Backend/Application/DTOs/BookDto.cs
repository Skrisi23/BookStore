using Backend.Domain.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.DTOs
{
    public class BookDto
    {
        public int id { get; set; }

        public string cim { get; set; } = null!;

        public int author_id { get; set; }

        public DateOnly? kiadasi_datum { get; set; }

        public string? tartalom { get; set; }

    }
}
