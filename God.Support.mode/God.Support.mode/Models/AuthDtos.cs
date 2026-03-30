using Newtonsoft.Json;

namespace God.Support.mode.Models;

public class LoginRequest
{
    [JsonProperty("email")]
    public string Email { get; set; } = null!;

    [JsonProperty("jelszo")]
    public string Jelszo { get; set; } = null!;
}

public class LoginResponse
{
    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("message")]
    public string? Message { get; set; }

    [JsonProperty("token")]
    public string? Token { get; set; }

    [JsonProperty("refreshToken")]
    public string? RefreshToken { get; set; }

    [JsonProperty("user")]
    public UserDto? User { get; set; }
}

public class RefreshTokenRequest
{
    [JsonProperty("token")]
    public string Token { get; set; } = null!;

    [JsonProperty("refreshToken")]
    public string RefreshToken { get; set; } = null!;
}

public class TokenResponse
{
    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("message")]
    public string? Message { get; set; }

    [JsonProperty("token")]
    public string? Token { get; set; }

    [JsonProperty("refreshToken")]
    public string? RefreshToken { get; set; }

    [JsonProperty("user")]
    public UserDto? User { get; set; }
}

public class AdminResetPasswordRequest
{
    [JsonProperty("newPassword")]
    public string NewPassword { get; set; } = null!;
}
