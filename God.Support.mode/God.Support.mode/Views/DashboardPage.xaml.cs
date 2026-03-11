using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using LiveChartsCore.SkiaSharpView.WPF;

namespace God.Support.mode.Views;

public partial class DashboardPage : UserControl
{
    public DashboardPage()
    {
        InitializeComponent();
        Loaded += OnLoaded;
    }

    private void OnLoaded(object sender, RoutedEventArgs e)
    {
        var chart = new CartesianChart();
        chart.SetBinding(CartesianChart.SeriesProperty, new Binding("RentalsSeries"));
        chart.SetBinding(CartesianChart.XAxesProperty, new Binding("XAxes"));
        chart.SetBinding(CartesianChart.YAxesProperty, new Binding("YAxes"));
        ChartHost.Content = chart;
    }
}
