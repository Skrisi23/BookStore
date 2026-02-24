using MailKit.Net.Smtp;
using MimeKit;

namespace Backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendVerificationEmailAsync(string toEmail, string toName, string verificationToken)
        {
            try
            {
                var smtpHost = _configuration["Smtp:Host"];
                var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "2525");
                var smtpUsername = _configuration["Smtp:Username"];
                var smtpPassword = _configuration["Smtp:Password"];
                var fromEmail = _configuration["Smtp:FromEmail"];
                var fromName = _configuration["Smtp:FromName"];

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress(toName, toEmail));
                message.Subject = "Email cím megerősítése - BookStore";

                var verificationUrl = $"http://localhost:3000/verify?token={verificationToken}";

                message.Body = new TextPart("html")
                {
                    Text = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif;'>
                            <h2>Üdvözlünk a BookStore könyvtárban!</h2>
                            <p>Kedves {toName},</p>
                            <p>Köszönjük a regisztrációt! Kérjük, erősítsd meg az email címedet az alábbi linkre kattintva:</p>
                            <p>
                                <a href='{verificationUrl}' 
                                   style='background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;'>
                                    Email cím megerősítése
                                </a>
                            </p>
                            <p>Vagy másold be ezt a linket a böngésződbe:</p>
                            <p><a href='{verificationUrl}'>{verificationUrl}</a></p>
                            <p>Ez a link 24 óráig érvényes.</p>
                            <p>Ha nem te regisztráltál, kérjük figyelmen kívül hagyni ezt az emailt.</p>
                            <br>
                            <p>Üdvözlettel,<br>BookStore csapata</p>
                        </body>
                        </html>
                    "
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(smtpUsername, smtpPassword);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                _logger.LogInformation($"Verification email sent to {toEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send verification email to {toEmail}: {ex.Message}");
                throw;
            }
        }

        public async Task SendRentalReminderEmailAsync(string toEmail, string toName, string bookTitle, DateOnly dueDate, int daysLeft)
        {
            try
            {
                var message = CreateBaseMessage(toName, toEmail);
                message.Subject = "Kölcsönzési határidő közeledik - BookStore";

                message.Body = new TextPart("html")
                {
                    Text = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif;'>
                            <h2>⏰ Kölcsönzési határidő figyelmeztetés</h2>
                            <p>Kedves {toName},</p>
                            <p>Szeretnénk emlékeztetni, hogy a következő könyv kölcsönzési határideje hamarosan lejár:</p>
                            <div style='background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                                <strong>📖 Könyv:</strong> {bookTitle}<br>
                                <strong>📅 Határidő:</strong> {dueDate:yyyy. MMMM dd.}<br>
                                <strong>⏳ Hátralévő napok:</strong> {daysLeft} nap
                            </div>
                            <p>Kérjük, hozd vissza a könyvet időben, hogy elkerüld a késedelmet!</p>
                            <br>
                            <p>Üdvözlettel,<br>BookStore csapata</p>
                        </body>
                        </html>
                    "
                };

                await SendEmailAsync(message);
                _logger.LogInformation($"Rental reminder email sent to {toEmail} for book: {bookTitle}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send rental reminder email to {toEmail}: {ex.Message}");
            }
        }

        public async Task SendRentalOverdueEmailAsync(string toEmail, string toName, string bookTitle, DateOnly dueDate, int daysOverdue)
        {
            try
            {
                var message = CreateBaseMessage(toName, toEmail);
                message.Subject = "⚠️ Lejárt kölcsönzés - BookStore";

                message.Body = new TextPart("html")
                {
                    Text = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif;'>
                            <h2>🚨 Lejárt kölcsönzési határidő!</h2>
                            <p>Kedves {toName},</p>
                            <p>A következő könyv kölcsönzési határideje <strong>lejárt</strong>:</p>
                            <div style='background-color: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                                <strong>📖 Könyv:</strong> {bookTitle}<br>
                                <strong>📅 Határidő volt:</strong> {dueDate:yyyy. MMMM dd.}<br>
                                <strong>❌ Késés:</strong> {daysOverdue} nap
                            </div>
                            <p><strong>Kérjük, mielőbb hozd vissza a könyvet!</strong></p>
                            <br>
                            <p>Üdvözlettel,<br>BookStore csapata</p>
                        </body>
                        </html>
                    "
                };

                await SendEmailAsync(message);
                _logger.LogInformation($"Rental overdue email sent to {toEmail} for book: {bookTitle}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send rental overdue email to {toEmail}: {ex.Message}");
            }
        }

        private MimeMessage CreateBaseMessage(string toName, string toEmail)
        {
            var fromEmail = _configuration["Smtp:FromEmail"];
            var fromName = _configuration["Smtp:FromName"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, fromEmail));
            message.To.Add(new MailboxAddress(toName, toEmail));
            return message;
        }

        private async Task SendEmailAsync(MimeMessage message)
        {
            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "2525");
            var smtpUsername = _configuration["Smtp:Username"];
            var smtpPassword = _configuration["Smtp:Password"];

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpUsername, smtpPassword);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
