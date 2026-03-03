using System.ComponentModel.DataAnnotations;

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

public class RegisterRequest
{
    public string Nev { get; set; } = null!;
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public string? DefaultAddress { get; set; }
    public string Email { get; set; } = null!;
    public string Jelszo { get; set; } = null!;
}

public class RegisterResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public UserDto? User { get; set; }
}

public class VerifyEmailRequest
{
    public string Token { get; set; } = null!;
}

public class VerifyEmailResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
}

public class UserDto
{
    public int Id { get; set; }
    public string Nev { get; set; } = null!;
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public string? DefaultAddress { get; set; }
    public string Email { get; set; } = null!;
    public DateTime? Letrehozva { get; set; }
}

public class ChangePasswordDto
{
    [Required(ErrorMessage = "Jelenlegi jelszó megadása kötelező")]
    public string CurrentPassword { get; set; } = null!;

    [Required(ErrorMessage = "Új jelszó megadása kötelező")]
    [MinLength(6, ErrorMessage = "Az új jelszónak legalább 6 karakter hosszúnak kell lennie")]
    public string NewPassword { get; set; } = null!;
}

public class UpdateProfileDto
{
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public string? DefaultAddress { get; set; }
}
