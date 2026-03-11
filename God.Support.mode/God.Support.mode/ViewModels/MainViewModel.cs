using CommunityToolkit.Mvvm.ComponentModel;
using MaterialDesignThemes.Wpf;
using Microsoft.Extensions.DependencyInjection;
using God.Support.mode.Services;

namespace God.Support.mode.ViewModels;

public partial class MainViewModel : ObservableObject
{
    private readonly IServiceProvider _serviceProvider;
    private readonly INotificationService _notificationService;

    [ObservableProperty]
    private object? currentViewModel;

    [ObservableProperty]
    private int selectedNavIndex;

    public SnackbarMessageQueue MessageQueue => _notificationService.MessageQueue;

    public string[] NavItems { get; } =
    [
        "Dashboard",
        "Users",
        "Books",
        "Rentals",
        "Orders / Payments",
        "Carts",
        "Settings"
    ];

    public MainViewModel(IServiceProvider serviceProvider, INotificationService notificationService)
    {
        _serviceProvider = serviceProvider;
        _notificationService = notificationService;
        SelectedNavIndex = 0;
        NavigateToPage(0);
    }

    partial void OnSelectedNavIndexChanged(int value)
    {
        NavigateToPage(value);
    }

    private void NavigateToPage(int index)
    {
        CurrentViewModel = index switch
        {
            0 => _serviceProvider.GetRequiredService<DashboardViewModel>(),
            1 => _serviceProvider.GetRequiredService<UsersViewModel>(),
            2 => _serviceProvider.GetRequiredService<BooksViewModel>(),
            3 => _serviceProvider.GetRequiredService<RentalsViewModel>(),
            4 => _serviceProvider.GetRequiredService<OrdersViewModel>(),
            5 => _serviceProvider.GetRequiredService<CartsViewModel>(),
            6 => _serviceProvider.GetRequiredService<SettingsViewModel>(),
            _ => CurrentViewModel
        };
    }
}
