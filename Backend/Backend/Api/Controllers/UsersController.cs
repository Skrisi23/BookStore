using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.X86;

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
            

            try
            {
                var user = _context.users.ToList();
                var useDto = _mapper.Map<List<UserGetDto>>(user);
                return Ok(useDto);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

            
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            

            try
            {
                var user = _context.users.Find(id);
                var useDto = _mapper.Map<UserGetDto>(user);
                return Ok(useDto);
            }
            catch (Exception ex)
            {

                return Problem(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(users user)
        {
            
            try
            {
                _context.users.Add(user);
                _context.SaveChanges();
                var useDto = _mapper.Map<UserSendDto>(user);
                return CreatedAtAction(nameof(GetById), useDto);
            }
            catch (Exception ex)
            {

                return Problem(ex.Message);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, users user)
        {

            try
            {
                _context.users.Add(user);
                _context.SaveChanges();
                var userDto = _mapper.Map<UserSendDto>(user);
                return NoContent();
            }
            catch (Exception ex)
            {

                return Problem(ex.Message);
            }


        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            try
            {
                var user = _context.users.Find(id);

                var rentals = _context.rentals.Where(s => s.id == id);
                _context.rentals.RemoveRange(rentals);

                _context.users.Remove(user);

                _context.SaveChanges();
                var useDto = _mapper.Map<UserSendDto>(user);
                return NoContent();
            }
            catch (Exception ex)
            {

                return Problem(ex.Message);
            }


            
        }
    }
}
