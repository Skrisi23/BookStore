using God.Support.mode.Models;

namespace God.Support.mode.Services;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(string email, string password);

    Task<bool> RefreshTokenAsync();

    Task LogoutAsync();

    bool IsLoggedIn { get; }

    string? Token { get; }

    string? RefreshToken { get; }

    UserDto? CurrentUser { get; }
}
