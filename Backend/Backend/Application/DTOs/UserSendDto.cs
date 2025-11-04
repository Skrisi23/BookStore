using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class UserDto
    {

        public string nev { get; set; } = null!;

        public string email { get; set; } = null!;

        public string jelszo_hash { get; set; } = null!;

    }
}
