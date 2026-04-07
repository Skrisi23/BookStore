using Backend.Api.Controllers;
using Backend.Application.DTOs;
using Backend.Domain.Model;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace Backend.Tests;

public class AuthControllerTests
{
    private BookStoreContext CreateContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<BookStoreContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;
        return new BookStoreContext(options);
    }

    /// <summary>
    /// Helyes adatok megadása esetén a bejelentkezés sikeres és visszaadja a felhasználó adatait.
    /// </summary>
    [Fact]
    public async Task Login_HelyesAdatok_SikeresBejentkezes()
    {
        // Arrange
        var context = CreateContext("LoginTest_Valid");
        var emailServiceMock = new Mock<IEmailService>();
        var jwtServiceMock = new Mock<IJwtService>();
        var configurationMock = new Mock<IConfiguration>();

        jwtServiceMock.Setup(j => j.GenerateAccessToken(It.IsAny<users>())).Returns("fake-access-token");
        jwtServiceMock.Setup(j => j.GenerateRefreshToken()).Returns("fake-refresh-token");
        configurationMock.Setup(c => c["Jwt:RefreshTokenExpirationDays"]).Returns("7");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword("TestPassword123");
        var user = new users
        {
            nev = "Teszt Felhasználó",
            email = "teszt@teszt.hu",
            jelszo_hash = hashedPassword,
            is_verified = true,
            letrehozva = DateTime.Now
        };
        context.users.Add(user);
        await context.SaveChangesAsync();

        var controller = new AuthController(context, emailServiceMock.Object, jwtServiceMock.Object, configurationMock.Object);

        // Act
        var result = await controller.Login(new LoginRequest
        {
            Email = "teszt@teszt.hu",
            Jelszo = "TestPassword123"
        });

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<LoginResponse>(okResult.Value);
        Assert.True(response.Success);
        Assert.Equal("Teszt Felhasználó", response.User?.Nev);
    }

    /// <summary>
    /// Hibás jelszó megadása esetén a bejelentkezés Unauthorized választ ad.
    /// </summary>
    [Fact]
    public async Task Login_HibasJelszo_Unauthorized()
    {
        // Arrange
        var context = CreateContext("LoginTest_Invalid");
        var emailServiceMock = new Mock<IEmailService>();
        var jwtServiceMock = new Mock<IJwtService>();
        var configurationMock = new Mock<IConfiguration>();

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword("TestPassword123");
        var user = new users
        {
            nev = "Teszt Felhasználó",
            email = "teszt@teszt.hu",
            jelszo_hash = hashedPassword,
            is_verified = true,
            letrehozva = DateTime.Now
        };
        context.users.Add(user);
        await context.SaveChangesAsync();

        var controller = new AuthController(context, emailServiceMock.Object, jwtServiceMock.Object, configurationMock.Object);

        // Act
        var result = await controller.Login(new LoginRequest
        {
            Email = "teszt@teszt.hu",
            Jelszo = "RosszJelszo"
        });

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result.Result);
        var response = Assert.IsType<LoginResponse>(unauthorizedResult.Value);
        Assert.False(response.Success);
    }
}
