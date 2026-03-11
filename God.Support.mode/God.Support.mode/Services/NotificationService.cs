using MaterialDesignThemes.Wpf;

namespace God.Support.mode.Services;

public interface INotificationService
{
    SnackbarMessageQueue MessageQueue { get; }
    void Show(string message);
    void ShowError(string message);
}

public class NotificationService : INotificationService
{
    public SnackbarMessageQueue MessageQueue { get; } = new(TimeSpan.FromSeconds(3));

    public void Show(string message)
    {
        MessageQueue.Enqueue(message);
    }

    public void ShowError(string message)
    {
        MessageQueue.Enqueue($"⚠ {message}", null, null, null, false, true, TimeSpan.FromSeconds(5));
    }
}
