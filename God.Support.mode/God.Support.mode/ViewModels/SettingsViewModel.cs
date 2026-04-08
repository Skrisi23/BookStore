using System.Reflection;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Services;
using MaterialDesignThemes.Wpf;

namespace God.Support.mode.ViewModels;

public partial class SettingsViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;
    private readonly SettingsService _settings;

    [ObservableProperty] private string apiBaseUrl = string.Empty;
    [ObservableProperty] private int adminUserId;
    [ObservableProperty] private bool isDarkTheme = true;
    [ObservableProperty] private bool isConnectionOk;
    [ObservableProperty] private bool hasTestedConnection;

    public string AppVersion => Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "1.0.0";

    public SettingsViewModel(IApiService apiService, INotificationService notification, SettingsService settings)
    {
        _apiService = apiService;
        _notification = notification;
        _settings = settings;

        ApiBaseUrl = _settings.ApiBaseUrl;
        AdminUserId = _settings.AdminUserId;

        IsDarkTheme = _settings.IsDarkTheme;
    }

    partial void OnIsDarkThemeChanged(bool value)
    {
        var paletteHelper = new PaletteHelper();
        var theme = paletteHelper.GetTheme();
        theme.SetBaseTheme(value ? BaseTheme.Dark : BaseTheme.Light);
        paletteHelper.SetTheme(theme);
        _settings.IsDarkTheme = value;
    }

    [RelayCommand]
    private void SaveSettings()
    {
        try
        {
            _settings.ApiBaseUrl = ApiBaseUrl;
            _settings.AdminUserId = AdminUserId;
            _notification.Show("Beallitasok mentve");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Beallitasok mentese sikertelen: {ex.Message}");
        }
    }

    [RelayCommand]
    private async Task TestConnectionAsync()
    {
        HasTestedConnection = false;
        try
        {
            IsConnectionOk = await _apiService.TestConnectionAsync();
            HasTestedConnection = true;
            if (IsConnectionOk)
                _notification.Show("Kapcsolat sikeres!");
            else
                _notification.ShowError("Kapcsolat sikertelen");
        }
        catch (Exception ex)
        {
            IsConnectionOk = false;
            HasTestedConnection = true;
            _notification.ShowError($"Kapcsolat sikertelen: {ex.Message}");
        }
    }
}
