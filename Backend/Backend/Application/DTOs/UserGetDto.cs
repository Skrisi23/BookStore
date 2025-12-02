using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class UserGetDto
    {
        public int id { get; set; }

        public string nev { get; set; } = null!;

        public string email { get; set; } = null!;
    }
}
