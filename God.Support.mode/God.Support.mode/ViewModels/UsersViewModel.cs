using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Models;
using God.Support.mode.Services;

namespace God.Support.mode.ViewModels;

public partial class UsersViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;
    private List<UserDto> _allUsers = [];

    [ObservableProperty] private ObservableCollection<UserDto> users = [];
    [ObservableProperty] private string searchText = string.Empty;
    [ObservableProperty] private UserDto? selectedUser;
    [ObservableProperty] private bool isDetailOpen;
    [ObservableProperty] private bool isLoading;

    [ObservableProperty] private ObservableCollection<RentalDto> userRentals = [];
    [ObservableProperty] private ObservableCollection<CartItemDto> userCartItems = [];
    [ObservableProperty] private ObservableCollection<PaymentDto> userPayments = [];

    // Jelszó reset
    [ObservableProperty] private bool isPasswordResetOpen;
    [ObservableProperty] private string newPassword = string.Empty;
    [ObservableProperty] private string confirmPassword = string.Empty;
    [ObservableProperty] private string passwordError = string.Empty;

    // Role módosítás
    [ObservableProperty] private string selectedRole = "user";
    public List<string> AvailableRoles { get; } = ["user", "admin"];

    public UsersViewModel(IApiService apiService, INotificationService notification)
    {
        _apiService = apiService;
        _notification = notification;
        _ = LoadUsersAsync();
    }

    partial void OnSearchTextChanged(string value) => FilterUsers();

    partial void OnSelectedUserChanged(UserDto? value)
    {
        if (value != null)
        {
            IsDetailOpen = true;
            SelectedRole = value.Role ?? "user";
            IsPasswordResetOpen = false;
            _ = LoadUserDetailsAsync(value.Id);
        }
        else
        {
            IsDetailOpen = false;
        }
    }

    [RelayCommand]
    private void CloseDetail()
    {
        SelectedUser = null;
        IsDetailOpen = false;
    }

    [RelayCommand]
    private async Task LoadUsersAsync()
    {
        IsLoading = true;
        try
        {
            _allUsers = await _apiService.GetUsersAsync();
            FilterUsers();
            _notification.Show("Felhasznalok betoltve");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Felhasznalok betoltese sikertelen: {ex.Message}");
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void FilterUsers()
    {
        var filtered = string.IsNullOrWhiteSpace(SearchText)
            ? _allUsers
            : _allUsers.Where(u =>
                (u.Nev?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (u.Email?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (u.FirstName?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (u.LastName?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false)).ToList();
        Users = new ObservableCollection<UserDto>(filtered);
    }

    private async Task LoadUserDetailsAsync(int userId)
    {
        try
        {
            var rentalsTask = _apiService.GetRentalsByUserAsync(userId);
            var cartTask = _apiService.GetCartByUserAsync(userId);
            var paymentsTask = _apiService.GetPaymentsAsync();

            await Task.WhenAll(rentalsTask, cartTask, paymentsTask);

            UserRentals = new ObservableCollection<RentalDto>(rentalsTask.Result);
            UserCartItems = new ObservableCollection<CartItemDto>(cartTask.Result?.Items ?? []);
            UserPayments = new ObservableCollection<PaymentDto>(
                paymentsTask.Result.Where(p => p.UserId == userId));
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Reszletek betoltese sikertelen: {ex.Message}");
        }
    }

    [RelayCommand]
    private async Task DeleteUserAsync()
    {
        if (SelectedUser == null) return;
        try
        {
            await _apiService.DeleteUserAsync(SelectedUser.Id);
            _notification.Show("Felhasznalo torolve");
            CloseDetail();
            await LoadUsersAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Torles sikertelen: {ex.Message}");
        }
    }

    // === Jelszó reset ===

    [RelayCommand]
    private void OpenPasswordReset()
    {
        NewPassword = string.Empty;
        ConfirmPassword = string.Empty;
        PasswordError = string.Empty;
        IsPasswordResetOpen = true;
    }

    [RelayCommand]
    private void CancelPasswordReset()
    {
        IsPasswordResetOpen = false;
        NewPassword = string.Empty;
        ConfirmPassword = string.Empty;
        PasswordError = string.Empty;
    }

    [RelayCommand]
    private async Task ResetPasswordAsync()
    {
        if (SelectedUser == null) return;

        if (string.IsNullOrWhiteSpace(NewPassword))
        {
            PasswordError = "Az uj jelszo megadasa kotelezo!";
            return;
        }

        if (NewPassword.Length < 6)
        {
            PasswordError = "A jelszónak legalabb 6 karakter hosszunak kell lennie!";
            return;
        }

        if (NewPassword != ConfirmPassword)
        {
            PasswordError = "A ket jelszo nem egyezik!";
            return;
        }

        try
        {
            await _apiService.AdminResetPasswordAsync(SelectedUser.Id, NewPassword);
            _notification.Show($"{SelectedUser.Nev} jelszava sikeresen visszaallitva");
            CancelPasswordReset();
        }
        catch (Exception ex)
        {
            PasswordError = $"Hiba: {ex.Message}";
        }
    }

    // === Role módosítás ===

    [RelayCommand]
    private async Task SaveRoleAsync()
    {
        if (SelectedUser == null) return;

        try
        {
            await _apiService.UpdateUserRoleAsync(SelectedUser.Id, SelectedRole);
            SelectedUser.Role = SelectedRole;
            _notification.Show($"{SelectedUser.Nev} szerepkore modositva: {SelectedRole}");
            await LoadUsersAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Szerepkor mentese sikertelen: {ex.Message}");
        }
    }
}
