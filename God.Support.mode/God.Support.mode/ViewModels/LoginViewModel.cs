using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Services;

namespace God.Support.mode.ViewModels;

public partial class LoginViewModel : ObservableObject
{
    private readonly IAuthService _authService;

    [ObservableProperty] private string email = string.Empty;
    [ObservableProperty] private string password = string.Empty;
    [ObservableProperty] private string errorMessage = string.Empty;
    [ObservableProperty] private bool isLoading;
    [ObservableProperty] private bool hasError;

    /// <summary>
    /// Sikeres admin login esetén true-ra állítjuk – a Window lezárásához
    /// </summary>
    public bool LoginSuccess { get; private set; }

    /// <summary>
    /// Esemény, amit a Window-nak jelezünk, hogy zárja be magát
    /// </summary>
    public event Action? RequestClose;

    public LoginViewModel(IAuthService authService)
    {
        _authService = authService;
    }

    [RelayCommand]
    private async Task LoginAsync()
    {
        HasError = false;
        ErrorMessage = string.Empty;

        if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
        {
            ErrorMessage = "Email és jelszó megadása kötelező!";
            HasError = true;
            return;
        }

        IsLoading = true;
        try
        {
            var result = await _authService.LoginAsync(Email, Password);

            if (!result.Success)
            {
                ErrorMessage = result.Message ?? "Sikertelen bejelentkezés";
                HasError = true;
                return;
            }

            // Csak admin léphet be a Desktop alkalmazásba
            if (result.User?.Role != "admin")
            {
                ErrorMessage = "Csak admin felhasználók léphetnek be!";
                HasError = true;
                await _authService.LogoutAsync();
                return;
            }

            LoginSuccess = true;
            RequestClose?.Invoke();
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Kapcsolódási hiba: {ex.Message}";
            HasError = true;
        }
        finally
        {
            IsLoading = false;
        }
    }
}
