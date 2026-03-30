using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class UserGetDto
    {
        public int id { get; set; }

        public string nev { get; set; } = null!;        public string? last_name { get; set; }

        public string? first_name { get; set; }

        public string? default_address { get; set; }

        public string email { get; set; } = null!;

        public string role { get; set; } = "user";
    }
}
