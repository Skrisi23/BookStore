using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {

        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;


        public UsersController(BookStoreContext context, IMapper imapper)
        {
            _context = context;
            _mapper = imapper;

        }

        [Authorize(Roles = "admin")]
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

        [Authorize(Roles = "admin")]
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

        }        [Authorize(Roles = "admin")]
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

        /// <summary>
        /// Felhasználó szerepkörének módosítása (admin only)
        /// </summary>
        [Authorize(Roles = "admin")]
        [HttpPatch("{id}/role")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] UpdateRoleDto dto)
        {
            try
            {
                var user = await _context.users.FindAsync(id);
                if (user == null)
                    return NotFound(new { message = "Felhasználó nem található" });

                if (dto.Role != "user" && dto.Role != "admin")
                    return BadRequest(new { message = "Érvénytelen szerepkör. Csak 'user' vagy 'admin' lehetséges." });

                user.role = dto.Role;
                _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Szerepkör sikeresen módosítva: {dto.Role}" });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        /// <summary>
        /// Felhasználói profil adatok frissítése (név, cím)
        /// </summary>
        [HttpPatch("{id}/profile")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileDto dto)
        {
            try
            {
                var user = await _context.users.FindAsync(id);
                if (user == null)
                {
                    return NotFound(new { message = "Felhasználó nem található" });
                }                if (dto.LastName != null)
                    user.last_name = dto.LastName;

                if (dto.FirstName != null)
                    user.first_name = dto.FirstName;

                if (dto.DefaultAddress != null)
                    user.default_address = dto.DefaultAddress;

                if (dto.LastName != null || dto.FirstName != null)
                {
                    var ln = user.last_name ?? "";
                    var fn = user.first_name ?? "";
                    user.nev = $"{ln} {fn}".Trim();
                }

                _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Profil sikeresen frissítve",
                    user = new
                    {
                        id = user.id,
                        nev = user.nev,
                        last_name = user.last_name,
                        first_name = user.first_name,
                        default_address = user.default_address,
                        email = user.email,
                        letrehozva = user.letrehozva
                    }
                });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
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
