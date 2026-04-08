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
    private List<CartDto> _allCarts = [];

    [ObservableProperty] private ObservableCollection<CartDto> carts = [];
    [ObservableProperty] private CartDto? selectedCart;
    [ObservableProperty] private ObservableCollection<CartItemDto> cartItems = [];
    [ObservableProperty] private bool isLoading;
    [ObservableProperty] private bool showOnlyActive = true;

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

    partial void OnShowOnlyActiveChanged(bool value) => FilterCarts();

    private void FilterCarts()
    {
        var filtered = ShowOnlyActive
            ? _allCarts.Where(c => string.Equals(c.Status, "active", StringComparison.OrdinalIgnoreCase)).ToList()
            : _allCarts;
        Carts = new ObservableCollection<CartDto>(filtered);
    }

    [RelayCommand]
    private async Task LoadCartsAsync()
    {
        IsLoading = true;
        try
        {
            _allCarts = await _apiService.GetCartsAsync();
            FilterCarts();
            _notification.Show("Kosarak betoltve");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Kosarak betoltese sikertelen: {ex.Message}");
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
            _notification.Show("Kosar uriteve");
            SelectedCart = null;
            await LoadCartsAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Kosar uritese sikertelen: {ex.Message}");
        }
    }
}
