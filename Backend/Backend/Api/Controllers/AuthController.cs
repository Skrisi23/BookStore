using Backend.Application.DTOs;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly BookStoreContext _context;

    public AuthController(BookStoreContext context)
    {
        _context = context;
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

        return Ok(new LoginResponse
        {
            Success = true,
            Message = "Sikeres bejelentkezés",
            User = new UserDto
            {
                Id = user.id,
                Nev = user.nev,
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
        string verificationToken = Guid.NewGuid().ToString();
        DateTime tokenExpires = DateTime.Now.AddHours(24); // 24 óra érvényesség

        // Új user létrehozása
        var newUser = new users
        {
            nev = request.Nev,
            email = request.Email,
            jelszo_hash = hashedPassword,
            letrehozva = DateTime.Now,
            is_verified = 0,
            verification_token = verificationToken,
            token_expires = tokenExpires
        };

        _context.users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new RegisterResponse
        {
            Success = true,
            Message = "Sikeres regisztráció",
            User = new UserDto
            {
                Id = newUser.id,
                Nev = newUser.nev,
                Email = newUser.email,
                Letrehozva = newUser.letrehozva
            }
        });
    }
}
