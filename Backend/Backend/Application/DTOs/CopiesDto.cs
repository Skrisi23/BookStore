using Backend.Domain.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.DTOs
{
    public class CopiesDto
    {
        public int id { get; set; }

        public int book_id { get; set; }

        public string leltari_szam { get; set; } = null!;

        public bool? elerheto { get; set; }

    }
}
