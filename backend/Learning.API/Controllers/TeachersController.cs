using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Learning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TeachersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Teacher>> Register([FromBody] Teacher teacher)
        {
            if (await TeacherExists(teacher.Email)) return BadRequest("Email is taken.");
            var hash = new HMACSHA512();
            var user = new AppUser
            {
                Email = teacher.Email,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(teacher.Password)),
                PasswordSalt = hash.Key
            };
            /*var newTeacher = new Teacher
            {
                Name =teacher.Name,
                Email = teacher.Email,
                Password = hash.ComputeHash(Encoding.UTF8.GetBytes(teacher.Password))
            };*/
            //_context.Teachers.Add(teacher);
            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(teacher);
        }

        /*[HttpPost("login")]
        public async Task<ActionResult<Teacher>> Login([FromBody] Teacher teacher)
        {
            var t = await _context.Teachers.FirstOrDefaultAsync(t =>
            t.Email == teacher.Email);
            if (teacher == null) return Unauthorized("Invalid");
            var saltDecode = new HMACSHA512(teacher.Password);
            var hashDecode = saltDecode.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < hashDecode.Length; i++)
            {
                if (hashDecode[i] != teacher.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return Ok(teacher);
        }*/


        private async Task<bool> TeacherExists(string email)
        {
            return await _context.Teachers.AnyAsync(teacher => teacher.Email == email);
        }
    }
}
