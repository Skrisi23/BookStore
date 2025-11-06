using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs
{
    public class UserSendDto
    {

        public string nev { get; set; } = null!;

        public string email { get; set; } = null!;

        public string jelszo_hash { get; set; } = null!;

    }
}
