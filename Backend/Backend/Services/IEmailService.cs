namespace Backend.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmailAsync(string toEmail, string toName, string verificationToken);
        Task SendRentalReminderEmailAsync(string toEmail, string toName, string bookTitle, DateOnly dueDate, int daysLeft);
        Task SendRentalOverdueEmailAsync(string toEmail, string toName, string bookTitle, DateOnly dueDate, int daysOverdue);
        Task SendCustomEmailAsync(string toEmail, string toName, string subject, string messageBody);
    }
}
