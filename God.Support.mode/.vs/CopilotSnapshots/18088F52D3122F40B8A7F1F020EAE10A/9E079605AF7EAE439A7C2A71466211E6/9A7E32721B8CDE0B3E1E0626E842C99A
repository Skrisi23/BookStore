using System.Net.Http;
using System.Windows;
using God.Support.mode.Services;
using God.Support.mode.ViewModels;
using Microsoft.Extensions.DependencyInjection;

namespace God.Support.mode;

public partial class App : Application
{
    private ServiceProvider? _serviceProvider;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        var services = new ServiceCollection();

        // Services
        services.AddSingleton<SettingsService>();
        services.AddSingleton<HttpClient>();
        services.AddSingleton<IApiService, ApiService>();
        services.AddSingleton<INotificationService, NotificationService>();

        // ViewModels
        services.AddTransient<DashboardViewModel>();
        services.AddTransient<UsersViewModel>();
        services.AddTransient<BooksViewModel>();
        services.AddTransient<RentalsViewModel>();
        services.AddTransient<OrdersViewModel>();
        services.AddTransient<CartsViewModel>();
        services.AddTransient<SettingsViewModel>();
        services.AddSingleton<MainViewModel>();

        _serviceProvider = services.BuildServiceProvider();

        var mainWindow = new MainWindow
        {
            DataContext = _serviceProvider.GetRequiredService<MainViewModel>()
        };
        mainWindow.Show();
    }

    protected override void OnExit(ExitEventArgs e)
    {
        _serviceProvider?.Dispose();
        base.OnExit(e);
    }
}
