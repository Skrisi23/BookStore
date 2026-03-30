using System.Windows;
using System.Windows.Controls;
using God.Support.mode.ViewModels;

namespace God.Support.mode.Views;

public partial class UsersPage : UserControl
{
    public UsersPage()
    {
        InitializeComponent();
    }

    private void NewPasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
    {
        if (DataContext is UsersViewModel vm && sender is PasswordBox pb)
        {
            vm.NewPassword = pb.Password;
        }
    }

    private void ConfirmPasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
    {
        if (DataContext is UsersViewModel vm && sender is PasswordBox pb)
        {
            vm.ConfirmPassword = pb.Password;
        }
    }
}
