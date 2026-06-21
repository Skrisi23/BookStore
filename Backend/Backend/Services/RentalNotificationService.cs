using Backend.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class RentalNotificationService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<RentalNotificationService> _logger;
        private int _lastRemindersSent = 0;
        private int _lastOverduesSent = 0;

        public RentalNotificationService(IServiceProvider serviceProvider, ILogger<RentalNotificationService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("RentalNotificationService started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await SendNotificationsNow();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in RentalNotificationService");
                }

                // 24 óránként fut
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }

        /// <summary>
        /// Értesítések azonnali küldése (admin endpoint-ból is hívható)
        /// </summary>
        public async Task<(int remindersSent, int overduesSent)> SendNotificationsNow()
        {
            int remindersSent = 0;
            int overduesSent = 0;

            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<BookStoreContext>();
            var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

            var today = DateOnly.FromDateTime(DateTime.Now);

            var activeRentals = await context.rentals
                .Include(r => r.user)
                .Include(r => r.copy)
                    .ThenInclude(c => c.book)
                .Where(r => r.visszahozva_datuma == null && r.lejarat_datum != null)
                .ToListAsync();

            _logger.LogInformation($"Found {activeRentals.Count} active rentals to check.");

            foreach (var rental in activeRentals)
            {
                if (rental.user == null || rental.copy?.book == null || rental.lejarat_datum == null)
                    continue;

                var dueDate = rental.lejarat_datum.Value;
                var daysUntilDue = dueDate.DayNumber - today.DayNumber;

                if (daysUntilDue < 0)
                {
                    // Lejárt - overdue email
                    int daysOverdue = Math.Abs(daysUntilDue);
                    try
                    {
                        await emailService.SendRentalOverdueEmailAsync(
                            rental.user.email,
                            rental.user.nev,
                            rental.copy.book.cim,
                            dueDate,
                            daysOverdue
                        );
                        overduesSent++;
                        _logger.LogInformation($"Overdue email sent to {rental.user.email} for '{rental.copy.book.cim}' ({daysOverdue} days overdue)");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Failed to send overdue email to {rental.user.email}");
                    }
                }
                else if (daysUntilDue <= 2)
                {
                    // 2 napon belül lejár - reminder email
                    try
                    {
                        await emailService.SendRentalReminderEmailAsync(
                            rental.user.email,
                            rental.user.nev,
                            rental.copy.book.cim,
                            dueDate,
                            daysUntilDue
                        );
                        remindersSent++;
                        _logger.LogInformation($"Reminder email sent to {rental.user.email} for '{rental.copy.book.cim}' ({daysUntilDue} days left)");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Failed to send reminder email to {rental.user.email}");
                    }
                }
            }

            _lastRemindersSent = remindersSent;
            _lastOverduesSent = overduesSent;

            _logger.LogInformation($"Notification run complete: {remindersSent} reminders, {overduesSent} overdue emails sent.");
            return (remindersSent, overduesSent);
        }
    }
}
