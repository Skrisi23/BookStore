using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace God.Support.mode.Converters;

public class StatusToBrushConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var status = value as string;
        return status switch
        {
            "Active" => new SolidColorBrush(Color.FromRgb(76, 175, 80)),
            "Warning" => new SolidColorBrush(Color.FromRgb(255, 152, 0)),
            "Overdue" => new SolidColorBrush(Color.FromRgb(244, 67, 54)),
            "Returned" => new SolidColorBrush(Color.FromRgb(158, 158, 158)),
            _ => new SolidColorBrush(Color.FromRgb(158, 158, 158))
        };
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
