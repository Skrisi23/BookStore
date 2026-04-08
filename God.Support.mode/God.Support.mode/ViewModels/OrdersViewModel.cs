using System.Collections.ObjectModel;
using System.IO;
using System.Text;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using God.Support.mode.Models;
using God.Support.mode.Services;
using Microsoft.Win32;

namespace God.Support.mode.ViewModels;

public partial class OrdersViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly INotificationService _notification;
    private List<PaymentDto> _allPayments = [];

    [ObservableProperty] private ObservableCollection<PaymentDto> payments = [];
    [ObservableProperty] private string searchText = string.Empty;
    [ObservableProperty] private DateTime? dateFrom;
    [ObservableProperty] private DateTime? dateTo;
    [ObservableProperty] private string selectedOrderType = "Mind";
    [ObservableProperty] private PaymentDto? selectedPayment;
    [ObservableProperty] private bool isLoading;

    public List<string> OrderTypeFilters { get; } = ["Mind", "purchase", "rental", "mixed"];

    public OrdersViewModel(IApiService apiService, INotificationService notification)
    {
        _apiService = apiService;
        _notification = notification;
        _ = LoadPaymentsAsync();
    }

    partial void OnSearchTextChanged(string value) => FilterPayments();
    partial void OnDateFromChanged(DateTime? value) => FilterPayments();
    partial void OnDateToChanged(DateTime? value) => FilterPayments();
    partial void OnSelectedOrderTypeChanged(string value) => FilterPayments();

    [RelayCommand]
    private async Task LoadPaymentsAsync()
    {
        IsLoading = true;
        try
        {
            _allPayments = await _apiService.GetPaymentsAsync();
            await CalculateRentalPricesAsync();
            FilterPayments();
            _notification.Show("Rendelesek betoltve");
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Rendelesek betoltese sikertelen: {ex.Message}");
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void FilterPayments()
    {
        var filtered = _allPayments.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(SearchText))
        {
            filtered = filtered.Where(p =>
                (p.UserEmail?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (p.UserName?.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ?? false));
        }

        if (DateFrom.HasValue)
            filtered = filtered.Where(p => p.PaymentDate >= DateFrom.Value);

        if (DateTo.HasValue)
            filtered = filtered.Where(p => p.PaymentDate <= DateTo.Value.Date.AddDays(1));

        if (!string.IsNullOrEmpty(SelectedOrderType) && SelectedOrderType != "Mind")
            filtered = filtered.Where(p =>
                string.Equals(p.OrderType, SelectedOrderType, StringComparison.OrdinalIgnoreCase));

        Payments = new ObservableCollection<PaymentDto>(filtered);
    }

    private async Task CalculateRentalPricesAsync()
    {
        Dictionary<int, decimal> bookPrices = [];
        try
        {
            var books = await _apiService.GetBooksAsync();
            bookPrices = books.ToDictionary(b => b.Id, b => b.Ar);
        }
        catch
        {
            return;
        }

        foreach (var payment in _allPayments)
        {
            if (payment.Items == null || payment.Items.Count == 0) continue;

            var rentalItems = payment.Items.Where(i => i.IsRental).ToList();
            if (rentalItems.Count == 0) continue;

            var purchaseTotal = payment.Items
                .Where(i => !i.IsRental)
                .Sum(i => i.UnitPrice * i.Quantity);

            var rentalTotal = payment.Amount - purchaseTotal;

            // Konyvarakkal sulyozott aranyos elosztas
            var weightedItems = rentalItems.Select(i => new
            {
                Item = i,
                BookPrice = bookPrices.GetValueOrDefault(i.BookId, 0m)
            }).ToList();

            var totalWeight = weightedItems.Sum(w => w.BookPrice * w.Item.Quantity);

            if (totalWeight > 0)
            {
                foreach (var w in weightedItems)
                {
                    var proportion = (w.BookPrice * w.Item.Quantity) / totalWeight;
                    w.Item.UnitPrice = Math.Round((rentalTotal * proportion) / w.Item.Quantity, 0);
                }
            }
            else
            {
                var totalQty = rentalItems.Sum(i => i.Quantity);
                if (totalQty > 0)
                {
                    var perUnit = Math.Round(rentalTotal / totalQty, 0);
                    foreach (var item in rentalItems)
                    {
                        item.UnitPrice = perUnit;
                    }
                }
            }
        }
    }

    [RelayCommand]
    private void ExportCsv()
    {
        try
        {
            var dialog = new SaveFileDialog
            {
                Filter = "CSV files (*.csv)|*.csv",
                FileName = $"payments_export_{DateTime.Now:yyyyMMdd_HHmmss}.csv"
            };

            if (dialog.ShowDialog() == true)
            {
                var sb = new StringBuilder();
                sb.AppendLine("Payment ID,User Name,User Email,Order Type,Amount,Date,Payment Method,Status,Items Count");

                foreach (var p in Payments)
                {
                    sb.AppendLine($"{p.Id},\"{p.UserName}\",\"{p.UserEmail}\",\"{p.OrderType}\",{p.Amount},{p.PaymentDate:yyyy-MM-dd},\"{p.PaymentMethod}\",\"{p.Status}\",{p.Items?.Count ?? 0}");
                }

                File.WriteAllText(dialog.FileName, sb.ToString(), Encoding.UTF8);
                _notification.Show($"Exported to {dialog.FileName}");
            }
        }
        catch (Exception ex)
        {
            _notification.ShowError($"Failed to export: {ex.Message}");
        }
    }
}
