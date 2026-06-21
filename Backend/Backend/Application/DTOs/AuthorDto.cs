using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class AuthorDto
    {
        public int id { get; set; }

        public string nev { get; set; } = null!;
    }
}
