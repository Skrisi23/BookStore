using God.Support.mode.Models;

namespace God.Support.mode.Services;

public interface IAuthService
{
    /// <summary>
    /// Bejelentkezés email és jelszó alapján
    /// </summary>
    Task<LoginResponse> LoginAsync(string email, string password);

    /// <summary>
    /// Access token megújítása a refresh token segítségével
    /// </summary>
    Task<bool> RefreshTokenAsync();

    /// <summary>
    /// Kijelentkezés
    /// </summary>
    Task LogoutAsync();

    /// <summary>
    /// Be van-e jelentkezve a felhasználó
    /// </summary>
    bool IsLoggedIn { get; }

    /// <summary>
    /// Aktuális JWT access token
    /// </summary>
    string? Token { get; }

    /// <summary>
    /// Aktuális refresh token
    /// </summary>
    string? RefreshToken { get; }

    /// <summary>
    /// Bejelentkezett felhasználó adatai
    /// </summary>
    UserDto? CurrentUser { get; }
}
