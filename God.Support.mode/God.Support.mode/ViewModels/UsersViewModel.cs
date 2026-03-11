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
            _notification.Show("Users loaded");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to load users: {ex.Message}");
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
            _notification.ShowError($"Failed to load user details: {ex.Message}");
        }
    }

    [RelayCommand]
    private async Task DeleteUserAsync()
    {
        if (SelectedUser == null) return;
        try
        {
            await _apiService.DeleteUserAsync(SelectedUser.Id);
            _notification.Show("User deleted");
            CloseDetail();
            await LoadUsersAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to delete user: {ex.Message}");
        }
    }
}
