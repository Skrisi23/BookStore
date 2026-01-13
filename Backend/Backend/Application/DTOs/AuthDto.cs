namespace Backend.Application.DTOs;

public class LoginRequest
{
    public string Email { get; set; } = null!;
    public string Jelszo { get; set; } = null!;
}

public class LoginResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public UserDto? User { get; set; }
}

public class UserDto
{
    public int Id { get; set; }
    public string Nev { get; set; } = null!;
    public string Email { get; set; } = null!;
    public DateTime? Letrehozva { get; set; }
}
