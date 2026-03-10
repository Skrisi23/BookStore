using Backend.Application.DTOs;
using Backend.Domain.Model;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly BookStoreContext _context;
    private readonly IEmailService _emailService;

    public AuthController(BookStoreContext context, IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    /// <summary>
    /// Felhasználó jelszavának módosítása
    /// </summary>
    [HttpPatch("{id}/change-password")]
    public async Task<ActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto dto)
    {
        // Ellenőrizzük, hogy a bejelentkezett user a saját jelszavát módosítja-e (ha van auth middleware)
        var currentUserId = User.FindFirst("UserId")?.Value;
        if (!string.IsNullOrEmpty(currentUserId) && currentUserId != id.ToString())
        {
            return Forbid();
        }

        // 1. Keressük meg a felhasználót
        var user = await _context.users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Felhasználó nem található" });
        }

        // 2. Ellenőrizzük a jelenlegi jelszót
        bool isCurrentPasswordValid = false;
        try
        {
            isCurrentPasswordValid = BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.jelszo_hash);
        }
        catch
        {
            // Ha nem BCrypt hash, egyszerű összehasonlítás (fejlesztési fallback)
            isCurrentPasswordValid = user.jelszo_hash == dto.CurrentPassword;
        }

        if (!isCurrentPasswordValid)
        {
            return BadRequest(new { message = "Hibás jelenlegi jelszó" });
        }

        // 3. Hash-eljük az új jelszót
        string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        // 4. Frissítsük az adatbázisban
        user.jelszo_hash = newPasswordHash;
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Jelszó sikeresen módosítva" });
    }

    /// <summary>
    /// Felhasználó bejelentkezés
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Jelszo))
        {
            return BadRequest(new LoginResponse
            {
                Success = false,
                Message = "Email és jelszó megadása kötelező"
            });
        }

        var user = await _context.users
            .FirstOrDefaultAsync(u => u.email == request.Email);

        if (user == null)
        {
            return Unauthorized(new LoginResponse
            {
                Success = false,
                Message = "Hibás email vagy jelszó"
            });
        }

        // Jelszó ellenőrzés - BCrypt hash összehasonlítás
        bool isValidPassword = false;

        try
        {
            isValidPassword = BCrypt.Net.BCrypt.Verify(request.Jelszo, user.jelszo_hash);
        }
        catch
        {
            // Ha a hash nem BCrypt formátumú, egyszerű összehasonlítás (fejlesztési célra)
            isValidPassword = user.jelszo_hash == request.Jelszo;
        }

        if (!isValidPassword)
        {
            return Unauthorized(new LoginResponse
            {
                Success = false,
                Message = "Hibás email vagy jelszó"
            });
        }

        // Email verifikáció ellenőrzése
        if (!user.is_verified)
        {
            return Unauthorized(new LoginResponse
            {
                Success = false,
                Message = "Kérlek, erősítsd meg az email címedet a bejelentkezéshez"
            });
        }        return Ok(new LoginResponse
        {
            Success = true,
            Message = "Sikeres bejelentkezés",            User = new UserDto
            {
                Id = user.id,
                Nev = user.nev,
                LastName = user.last_name,
                FirstName = user.first_name,
                DefaultAddress = user.default_address,
                Email = user.email,
                Letrehozva = user.letrehozva
            }
        });
    }

    /// <summary>
    /// Új felhasználó regisztrálása
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Jelszo) || string.IsNullOrEmpty(request.Nev))
        {
            return BadRequest(new RegisterResponse
            {
                Success = false,
                Message = "Név, email és jelszó megadása kötelező"
            });
        }

        // Email ellenőrzés - létezik-e már
        var existingUser = await _context.users
            .FirstOrDefaultAsync(u => u.email == request.Email);

        if (existingUser != null)
        {
            return BadRequest(new RegisterResponse
            {
                Success = false,
                Message = "Ez az email cím már használatban van"
            });
        }

        // Jelszó hashelés BCrypt-tel
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Jelszo);

        // Verifikációs token generálás (GUID)
        string verificationToken = Guid.NewGuid().ToString();        DateTime tokenExpires = DateTime.Now.AddHours(24); // 24 óra érvényesség

        // Új user létrehozása
        var newUser = new users
        {
            nev = request.Nev,
            last_name = request.LastName,
            first_name = request.FirstName,
            default_address = request.DefaultAddress,
            email = request.Email,
            jelszo_hash = hashedPassword,
            letrehozva = DateTime.Now,
            is_verified = false,
            verification_token = verificationToken,
            token_expires = tokenExpires
        };

        _context.users.Add(newUser);
        await _context.SaveChangesAsync();

        // Email küldése verifikációs linkkel
        try
        {
            await _emailService.SendVerificationEmailAsync(
                newUser.email,
                newUser.nev,
                verificationToken
            );
        }
        catch (Exception ex)
        {
            // Ha az email küldés sikertelen, logoljuk, de a regisztráció sikeres
            Console.WriteLine($"Failed to send verification email: {ex.Message}");
        }        return Ok(new RegisterResponse
        {
            Success = true,
            Message = "Sikeres regisztráció! Kérlek, ellenőrizd az emailedet a megerősítéshez.",            User = new UserDto
            {
                Id = newUser.id,
                Nev = newUser.nev,
                LastName = newUser.last_name,
                FirstName = newUser.first_name,
                DefaultAddress = newUser.default_address,
                Email = newUser.email,
                Letrehozva = newUser.letrehozva
            }
        });
    }

    /// <summary>
    /// Email cím verifikálása token alapján
    /// </summary>
    [HttpPost("verify-email")]
    public async Task<ActionResult<VerifyEmailResponse>> VerifyEmail([FromBody] VerifyEmailRequest request)
    {
        if (string.IsNullOrEmpty(request.Token))
        {
            return BadRequest(new VerifyEmailResponse
            {
                Success = false,
                Message = "Token megadása kötelező"
            });
        }

        // Token keresése
        var user = await _context.users
            .FirstOrDefaultAsync(u => u.verification_token == request.Token);

        if (user == null)
        {
            return BadRequest(new VerifyEmailResponse
            {
                Success = false,
                Message = "Érvénytelen token"
            });
        }

        // Token lejárat ellenőrzése
        if (user.token_expires < DateTime.Now)
        {
            return BadRequest(new VerifyEmailResponse
            {
                Success = false,
                Message = "A token lejárt"
            });
        }

        // User már verifikált?
        if (user.is_verified)
        {
            return Ok(new VerifyEmailResponse
            {
                Success = true,
                Message = "Az email cím már korábban verifikálva lett"
            });
        }

        // Verifikálás
        user.is_verified = true;
        user.verification_token = null;
        user.token_expires = null;

        await _context.SaveChangesAsync();

        return Ok(new VerifyEmailResponse
        {
            Success = true,
            Message = "Email cím sikeresen verifikálva"
        });
    }

    /// <summary>
    /// Verifikációs email újraküldése lejárt vagy nem kapott token esetén
    /// </summary>
    [HttpPost("resend-verification")]
    public async Task<IActionResult> ResendVerification([FromBody] ResendVerificationRequest request)
    {
        if (string.IsNullOrEmpty(request.Email))
            return BadRequest(new { success = false, message = "Email cím megadása kötelező" });

        var user = await _context.users.FirstOrDefaultAsync(u => u.email == request.Email);

        if (user == null)
            return BadRequest(new { success = false, message = "Nem találunk ilyen email címmel felhasználót" });

        if (user.is_verified)
            return BadRequest(new { success = false, message = "Ez az email cím már verifikálva van, jelentkezz be!" });

        user.verification_token = Guid.NewGuid().ToString();
        user.token_expires = DateTime.Now.AddHours(24);
        await _context.SaveChangesAsync();

        try
        {
            await _emailService.SendVerificationEmailAsync(user.email, user.nev, user.verification_token);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to resend verification email: {ex.Message}");
            return StatusCode(500, new { success = false, message = "Email küldés sikertelen, próbáld újra később!" });
        }

        return Ok(new { success = true, message = "Verifikációs email újra elküldve! Ellenőrizd a postafládádat (spam mappát is)." });
    }
}
