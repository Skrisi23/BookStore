using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Services;
using LiveChartsCore;
using LiveChartsCore.SkiaSharpView;
using LiveChartsCore.SkiaSharpView.Painting;
using SkiaSharp;

namespace God.Support.mode.ViewModels;

public partial class DashboardViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;

    [ObservableProperty] private int totalUsers;
    [ObservableProperty] private int activeRentals;
    [ObservableProperty] private int overdueRentals;
    [ObservableProperty] private int totalBooks;
    [ObservableProperty] private decimal totalRevenue;
    [ObservableProperty] private int totalOrders;
    [ObservableProperty] private bool isLoading;

    [ObservableProperty] private ISeries[] rentalsSeries = [];
    [ObservableProperty] private Axis[] xAxes = [];
    [ObservableProperty] private Axis[] yAxes = [new Axis { Name = "Rentals" }];

    public DashboardViewModel(IApiService apiService, INotificationService notification)
    {
        _apiService = apiService;
        _notification = notification;
        _ = LoadDataAsync();
    }

    [RelayCommand]
    private async Task RefreshAsync()
    {
        await LoadDataAsync();
    }

    private async Task LoadDataAsync()
    {
        IsLoading = true;
        try
        {
            var usersTask = _apiService.GetUsersAsync();
            var booksTask = _apiService.GetBooksAsync();
            var rentalsTask = _apiService.GetRentalsAsync();
            var paymentsTask = _apiService.GetPaymentsAsync();

            await Task.WhenAll(usersTask, booksTask, rentalsTask, paymentsTask);

            var users = usersTask.Result;
            var books = booksTask.Result;
            var rentals = rentalsTask.Result;
            var payments = paymentsTask.Result;

            TotalUsers = users.Count;
            TotalBooks = books.Count;
            TotalOrders = payments.Count;
            TotalRevenue = payments.Sum(p => p.Amount);

            var now = DateTime.Now;
            ActiveRentals = rentals.Count(r => r.VisszahozvaDatuma == null && r.LejaratDatum >= now);
            OverdueRentals = rentals.Count(r => r.VisszahozvaDatuma == null && r.LejaratDatum < now);

            var last30Days = Enumerable.Range(0, 30)
                .Select(i => now.Date.AddDays(-29 + i))
                .ToList();

            var rentalsPerDay = last30Days
                .Select(d => (double)rentals.Count(r => r.KolcsonzesDatuma?.Date == d))
                .ToArray();

            RentalsSeries =
            [
                new LineSeries<double>
                {
                    Values = rentalsPerDay,
                    Name = "Rentals",
                    Stroke = new SolidColorPaint(SKColors.OrangeRed) { StrokeThickness = 2 },
                    GeometryStroke = new SolidColorPaint(SKColors.OrangeRed),
                    GeometrySize = 6,
                    Fill = null
                }
            ];

            XAxes =
            [
                new Axis
                {
                    Labels = last30Days.Select(d => d.ToString("MM/dd")).ToArray(),
                    LabelsRotation = 45,
                    TextSize = 10
                }
            ];

            _notification.Show("Dashboard refreshed");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to load dashboard: {ex.Message}");
        }
        finally
        {
            IsLoading = false;
        }
    }
}
