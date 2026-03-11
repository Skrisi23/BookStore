using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Models;
using God.Support.mode.Services;

namespace God.Support.mode.ViewModels;

public partial class RentalsViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;
    private readonly SettingsService _settings;
    private List<RentalDto> _allRentals = [];

    [ObservableProperty] private ObservableCollection<RentalViewModel> rentals = [];
    [ObservableProperty] private string searchText = string.Empty;
    [ObservableProperty] private string selectedStatusFilter = "All";
    [ObservableProperty] private bool isLoading;

    [ObservableProperty] private int totalActive;
    [ObservableProperty] private int totalOverdue;
    [ObservableProperty] private int totalReturned;

    public string[] StatusFilters { get; } = ["All", "Active", "Overdue", "Returned"];

    public RentalsViewModel(IApiService apiService, INotificationService notification, SettingsService settings)
    {
        _apiService = apiService;
        _notification = notification;
        _settings = settings;
        _ = LoadRentalsAsync();
    }

    partial void OnSearchTextChanged(string value) => FilterRentals();
    partial void OnSelectedStatusFilterChanged(string value) => FilterRentals();

    [RelayCommand]
    private async Task LoadRentalsAsync()
    {
        IsLoading = true;
        try
        {
            _allRentals = await _apiService.GetRentalsAsync();
            FilterRentals();
            UpdateSummary();
            _notification.Show("Rentals loaded");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to load rentals: {ex.Message}");
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void FilterRentals()
    {
        var filtered = _allRentals.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(SearchText))
        {
            filtered = filtered.Where(r =>
                (r.UserName?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (r.UserEmail?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (r.BookTitle?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false));
        }

        if (SelectedStatusFilter != "All")
        {
            filtered = filtered.Where(r => GetStatus(r) == SelectedStatusFilter);
        }

        Rentals = new ObservableCollection<RentalViewModel>(
            filtered.Select(r => new RentalViewModel(r)));

        UpdateSummary();
    }

    private void UpdateSummary()
    {
        var now = DateTime.Now;
        TotalActive = _allRentals.Count(r => r.VisszahozvaDatuma == null && r.LejaratDatum >= now);
        TotalOverdue = _allRentals.Count(r => r.VisszahozvaDatuma == null && r.LejaratDatum < now);
        TotalReturned = _allRentals.Count(r => r.VisszahozvaDatuma != null);
    }

    private static string GetStatus(RentalDto r)
    {
        if (r.VisszahozvaDatuma != null) return "Returned";
        if (r.LejaratDatum == null) return "Active";
        var daysLeft = (r.LejaratDatum.Value - DateTime.Now).TotalDays;
        if (daysLeft < 0) return "Overdue";
        return "Active";
    }

    [RelayCommand]
    private async Task MarkReturnedAsync(RentalViewModel rental)
    {
        try
        {
            await _apiService.MarkRentalReturnedAsync(rental.Rental.Id, _settings.AdminUserId);
            _notification.Show("Rental marked as returned");
            await LoadRentalsAsync();
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to mark returned: {ex.Message}");
        }
    }

    [RelayCommand]
    private async Task SendReminderAsync(RentalViewModel rental)
    {
        try
        {
            await _apiService.SendRentalReminderAsync(rental.Rental.Id);
            _notification.Show("Reminder sent");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to send reminder: {ex.Message}");
        }
    }
}

public class RentalViewModel
{
    public RentalDto Rental { get; }
    public string Status { get; }
    public string DaysInfo { get; }

    public RentalViewModel(RentalDto rental)
    {
        Rental = rental;

        if (rental.VisszahozvaDatuma != null)
        {
            Status = "Returned";
            DaysInfo = "—";
        }
        else if (rental.LejaratDatum == null)
        {
            Status = "Active";
            DaysInfo = "N/A";
        }
        else
        {
            var days = (rental.LejaratDatum.Value - DateTime.Now).TotalDays;
            if (days < 0)
            {
                Status = "Overdue";
                DaysInfo = $"{Math.Abs((int)days)} days overdue";
            }
            else if (days <= 3)
            {
                Status = "Warning";
                DaysInfo = $"{(int)days} days left";
            }
            else
            {
                Status = "Active";
                DaysInfo = $"{(int)days} days left";
            }
        }
    }
}
