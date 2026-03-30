using System.Net.Http;
using System.Windows;
using God.Support.mode.Services;
using God.Support.mode.ViewModels;
using God.Support.mode.Views;
using Microsoft.Extensions.DependencyInjection;

namespace God.Support.mode;

public partial class App : Application
{
    private ServiceProvider? _serviceProvider;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        // Ne álljon le az app, amikor a LoginWindow bezáródik
        ShutdownMode = ShutdownMode.OnExplicitShutdown;

        var services = new ServiceCollection();

        // Services
        services.AddSingleton<SettingsService>();
        services.AddSingleton<HttpClient>();
        services.AddSingleton<IAuthService, AuthService>();
        services.AddSingleton<IApiService, ApiService>();
        services.AddSingleton<INotificationService, NotificationService>();

        // ViewModels
        services.AddTransient<LoginViewModel>();
        services.AddTransient<DashboardViewModel>();
        services.AddTransient<UsersViewModel>();
        services.AddTransient<BooksViewModel>();
        services.AddTransient<RentalsViewModel>();
        services.AddTransient<OrdersViewModel>();
        services.AddTransient<CartsViewModel>();
        services.AddTransient<SettingsViewModel>();
        services.AddSingleton<MainViewModel>();

        _serviceProvider = services.BuildServiceProvider();

        // Először a login ablak jelenik meg
        var loginVm = _serviceProvider.GetRequiredService<LoginViewModel>();
        var loginWindow = new LoginWindow(loginVm);
        var loginResult = loginWindow.ShowDialog();

        if (loginResult != true)
        {
            // Login ablakot bezárták vagy nem admin → kilépés
            Shutdown();
            return;
        }

        // Sikeres admin login → főablak megnyitása
        var mainWindow = new MainWindow
        {
            DataContext = _serviceProvider.GetRequiredService<MainViewModel>()
        };

        // Most már a MainWindow bezárása állítsa le az alkalmazást
        ShutdownMode = ShutdownMode.OnMainWindowClose;
        MainWindow = mainWindow;
        mainWindow.Show();
    }

    protected override void OnExit(ExitEventArgs e)
    {
        _serviceProvider?.Dispose();
        base.OnExit(e);
    }
}
