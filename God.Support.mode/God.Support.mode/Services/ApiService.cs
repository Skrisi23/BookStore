using System.Net;
using System.Net.Http;
using System.Text;
using God.Support.mode.Models;
using Newtonsoft.Json;

namespace God.Support.mode.Services;

public class ApiService : IApiService
{
    private readonly HttpClient _http;
    private readonly SettingsService _settings;
    private readonly IAuthService _authService;

    public ApiService(HttpClient http, SettingsService settings, IAuthService authService)
    {
        _http = http;
        _settings = settings;
        _authService = authService;
    }

    private string Base => _settings.ApiBaseUrl.TrimEnd('/');

    private void EnsureAuthHeader()
    {
        if (!string.IsNullOrEmpty(_authService.Token))
        {
            _http.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _authService.Token);
        }
    }

    private async Task<HttpResponseMessage> SendWithRetryAsync(Func<Task<HttpResponseMessage>> request)
    {
        EnsureAuthHeader();
        var response = await request();

        if (response.StatusCode == HttpStatusCode.Unauthorized)
        {
            // Próbáljuk megújítani a tokent
            if (await _authService.RefreshTokenAsync())
            {
                EnsureAuthHeader();
                response = await request();
            }
        }

        return response;
    }

    private async Task<T> GetAsync<T>(string url)
    {
        var response = await SendWithRetryAsync(() => _http.GetAsync($"{Base}{url}"));
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<T>(json)!;
    }

    private async Task<T?> PostAsync<T>(string url, object body)
    {
        var response = await SendWithRetryAsync(() =>
        {
            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");
            return _http.PostAsync($"{Base}{url}", content);
        });
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();
            throw new HttpRequestException($"HTTP {(int)response.StatusCode}: {errorBody}");
        }
        var json = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<T>(json);
    }

    private async Task PostAsync(string url, object? body = null)
    {
        var response = await SendWithRetryAsync(() =>
        {
            var content = body != null
                ? new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json")
                : null;
            return _http.PostAsync($"{Base}{url}", content);
        });
        response.EnsureSuccessStatusCode();
    }

    private async Task PutAsync(string url, object body)
    {
        var response = await SendWithRetryAsync(() =>
        {
            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");
            return _http.PutAsync($"{Base}{url}", content);
        });
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();
            throw new HttpRequestException($"HTTP {(int)response.StatusCode}: {errorBody}");
        }
    }

    private async Task PatchAsync(string url)
    {
        var response = await SendWithRetryAsync(() =>
        {
            var request = new HttpRequestMessage(HttpMethod.Patch, $"{Base}{url}");
            return _http.SendAsync(request);
        });
        response.EnsureSuccessStatusCode();
    }

    private async Task PatchAsync(string url, object body)
    {
        var response = await SendWithRetryAsync(() =>
        {
            var request = new HttpRequestMessage(HttpMethod.Patch, $"{Base}{url}")
            {
                Content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json")
            };
            return _http.SendAsync(request);
        });
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();
            throw new HttpRequestException($"HTTP {(int)response.StatusCode}: {errorBody}");
        }
    }

    private async Task DeleteAsync(string url)
    {
        var response = await SendWithRetryAsync(() => _http.DeleteAsync($"{Base}{url}"));
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();
            throw new HttpRequestException($"HTTP {(int)response.StatusCode}: {errorBody}");
        }
    }

    // Users
    public Task<List<UserDto>> GetUsersAsync() => GetAsync<List<UserDto>>("/api/Users");
    public Task DeleteUserAsync(int id) => DeleteAsync($"/api/Users/{id}");
    public Task AdminResetPasswordAsync(int userId, string newPassword)
        => PatchAsync($"/api/Auth/{userId}/admin-reset-password", new AdminResetPasswordRequest { NewPassword = newPassword });
    public Task UpdateUserRoleAsync(int userId, string role)
        => PatchAsync($"/api/Users/{userId}/role", new { Role = role });

    // Books
    public Task<List<BookDto>> GetBooksAsync() => GetAsync<List<BookDto>>("/api/Books");
    public Task<BookDto?> CreateBookAsync(CreateBookDto book) => PostAsync<BookDto>("/api/Books", book);
    public Task UpdateBookAsync(int id, UpdateBookDto book) => PutAsync($"/api/Books/{id}", book);
    public Task DeleteBookAsync(int id) => DeleteAsync($"/api/Books/{id}");

    // Authors
    public Task<List<AuthorDto>> GetAuthorsAsync() => GetAsync<List<AuthorDto>>("/api/Author");

    // Copies
    public Task<List<CopyDto>> GetCopiesAsync() => GetAsync<List<CopyDto>>("/api/Copies");
    public async Task<List<CopyDto>> GetCopiesByBookAsync(int bookId)
    {
        var response = await GetAsync<CopiesByBookResponse>($"/api/Copies/by-book/{bookId}");
        return response.Copies;
    }
    public Task<CopyDto?> CreateCopyAsync(CopyDto copy) => PostAsync<CopyDto>("/api/Copies", copy);
    public Task DeleteCopyAsync(int id) => DeleteAsync($"/api/Copies/{id}");

    // Rentals
    public Task<List<RentalDto>> GetRentalsAsync() => GetAsync<List<RentalDto>>("/api/Rentals");
    public Task<List<RentalDto>> GetRentalsByUserAsync(int userId) => GetAsync<List<RentalDto>>($"/api/Rentals/user/{userId}");
    public Task MarkRentalReturnedAsync(int rentalId, int adminUserId) => PatchAsync($"/api/Rentals/{rentalId}/return?userId={adminUserId}");
    public Task SendRentalReminderAsync(int rentalId) => PostAsync($"/api/Rentals/{rentalId}/send-reminder");

    // Payments
    public Task<List<PaymentDto>> GetPaymentsAsync() => GetAsync<List<PaymentDto>>("/api/Payments");

    // Cart
    public Task<List<CartDto>> GetCartsAsync() => GetAsync<List<CartDto>>("/api/Cart");
    public Task<CartDto?> GetCartByUserAsync(int userId) => GetAsync<CartDto?>($"/api/Cart/my-cart?userId={userId}");
    public Task ClearCartAsync(int userId) => DeleteAsync($"/api/Cart/clear?userId={userId}");

    // Health
    public async Task<bool> TestConnectionAsync()
    {
        try
        {
            await GetBooksAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }
}
