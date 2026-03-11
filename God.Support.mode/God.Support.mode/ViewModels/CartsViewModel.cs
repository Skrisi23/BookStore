using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Models;
using God.Support.mode.Services;

namespace God.Support.mode.ViewModels;

public partial class CartsViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;

    [ObservableProperty] private ObservableCollection<CartDto> carts = [];
    [ObservableProperty] private CartDto? selectedCart;
    [ObservableProperty] private ObservableCollection<CartItemDto> cartItems = [];
    [ObservableProperty] private bool isLoading;

    public CartsViewModel(IApiService apiService, INotificationService notification)
    {
        _apiService = apiService;
        _notification = notification;
        _ = LoadCartsAsync();
    }

    partial void OnSelectedCartChanged(CartDto? value)
    {
        CartItems = new ObservableCollection<CartItemDto>(value?.Items ?? []);
    }

    [RelayCommand]
    private async Task LoadCartsAsync()
    {
        IsLoading = true;
        try
        {
            var carts = await _apiService.GetCartsAsync();
            Carts = new ObservableCollection<CartDto>(carts);
            _notification.Show("Carts loaded");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to load carts: {ex.Message}");
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private async Task ClearCartAsync()
    {
        if (SelectedCart == null) return;
        try
        {
            await _apiService.ClearCartAsync(SelectedCart.UserId);
            _notification.Show("Cart cleared");
            SelectedCart = null;
            await LoadCartsAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to clear cart: {ex.Message}");
        }
    }
}
