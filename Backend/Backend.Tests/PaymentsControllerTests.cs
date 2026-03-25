using AutoMapper;
using Backend.Api.Controllers;
using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Backend.Tests;

public class PaymentsControllerTests
{
    private BookStoreContext CreateContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<BookStoreContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;
        return new BookStoreContext(options);
    }

    private IMapper CreateMapper()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<AutoMapperProfile>();
        });
        return config.CreateMapper();
    }

    /// <summary>
    /// Nem létező felhasználóhoz fizetés létrehozása BadRequest választ ad.
    /// </summary>
    [Fact]
    public async Task CreatePayment_NemLetezoUser_BadRequest()
    {
        // Arrange
        var context = CreateContext("PaymentTest_InvalidUser");
        var mapper = CreateMapper();
        var controller = new PaymentsController(context, mapper);

        var dto = new CreatePaymentDto
        {
            user_id = 9999,
            order_type = "purchase",
            amount = 1000,
            payment_method = "card",
            status = "pending"
        };

        // Act
        var result = await controller.CreatePayment(dto);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    /// <summary>
    /// Üres adatbázis esetén az összes fizetés lekérdezése üres listát ad vissza.
    /// </summary>
    [Fact]
    public async Task GetAllPayments_UresAdatbazis_UresListatAdVissza()
    {
        // Arrange
        var context = CreateContext("PaymentTest_Empty");
        var mapper = CreateMapper();
        var controller = new PaymentsController(context, mapper);

        // Act
        var result = await controller.GetAllPayments();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var payments = Assert.IsType<List<PaymentDto>>(okResult.Value);
        Assert.Empty(payments);
    }
}
