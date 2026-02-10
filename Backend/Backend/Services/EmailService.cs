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
                var smtpPort = int.Parse(_configuration["Smtp:Port"]);
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
    }
}
