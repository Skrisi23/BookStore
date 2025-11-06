using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;


        public UsersController(BookStoreContext context, IMapper imapper)
        {
            _context = context;
            _mapper = imapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var user = _context.users.ToList();
            var useDto = _mapper.Map<List<UserGetDto>>(user);

            return Ok(useDto);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(ulong id)
        {
            var user = _context.users.Find(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Create(users user)
        {
            _context.users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = user.id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(ulong id, users user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(ulong id)
        {
            var user = _context.users.Find(id);
            _context.users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
