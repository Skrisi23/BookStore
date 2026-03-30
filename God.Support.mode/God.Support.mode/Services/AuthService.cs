using System.Net.Http;
using System.Text;
using God.Support.mode.Models;
using Newtonsoft.Json;

namespace God.Support.mode.Services;

public class AuthService : IAuthService
{
    private readonly HttpClient _http;
    private readonly SettingsService _settings;

    public AuthService(HttpClient http, SettingsService settings)
    {
        _http = http;
        _settings = settings;
    }

    private string Base => _settings.ApiBaseUrl.TrimEnd('/');

    public bool IsLoggedIn => !string.IsNullOrEmpty(Token) && CurrentUser != null;
    public string? Token { get; private set; }
    public string? RefreshToken { get; private set; }
    public UserDto? CurrentUser { get; private set; }

    public async Task<LoginResponse> LoginAsync(string email, string password)
    {
        var body = new LoginRequest { Email = email, Jelszo = password };
        var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");

        var response = await _http.PostAsync($"{Base}/api/Auth/login", content);
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<LoginResponse>(json)!;

        if (result.Success && result.Token != null)
        {
            Token = result.Token;
            RefreshToken = result.RefreshToken;
            CurrentUser = result.User;

            // Authorization header beállítása a HttpClient-en
            _http.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", Token);
        }

        return result;
    }

    public async Task<bool> RefreshTokenAsync()
    {
        if (string.IsNullOrEmpty(Token) || string.IsNullOrEmpty(RefreshToken))
            return false;

        try
        {
            var body = new RefreshTokenRequest { Token = Token, RefreshToken = RefreshToken };
            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");

            var response = await _http.PostAsync($"{Base}/api/Auth/refresh-token", content);
            if (!response.IsSuccessStatusCode)
                return false;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<TokenResponse>(json)!;

            if (result.Success && result.Token != null)
            {
                Token = result.Token;
                RefreshToken = result.RefreshToken;
                if (result.User != null)
                    CurrentUser = result.User;

                _http.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", Token);
                return true;
            }
        }
        catch
        {
            // Token refresh sikertelen
        }

        return false;
    }

    public async Task LogoutAsync()
    {
        try
        {
            if (IsLoggedIn)
            {
                await _http.PostAsync($"{Base}/api/Auth/logout", null);
            }
        }
        catch
        {
            // Logout hiba figyelmen kívül hagyása
        }
        finally
        {
            Token = null;
            RefreshToken = null;
            CurrentUser = null;
            _http.DefaultRequestHeaders.Authorization = null;
        }
    }
}
