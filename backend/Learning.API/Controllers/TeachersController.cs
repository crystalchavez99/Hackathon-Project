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
        public async Task<ActionResult<Teacher>> Register(string name, string email, string password)
        {
            if (await TeacherExists(email)) return BadRequest("Email is taken.");
            var hash = new HMACSHA512();
            var newTeacher = new Teacher
            {
                Name = name,
                Email = email,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hash.Key
            };
            _context.Teachers.Add(newTeacher);
            await _context.SaveChangesAsync();
            return Ok(newTeacher);
        }

        [HttpPost("login")]
        public async Task<ActionResult<Teacher>> Login(string email, string password)
        {
            var teacher = await _context.Teachers.FirstOrDefaultAsync(t =>
            t.Email == email);
            if (teacher == null) return Unauthorized("Invalid");
            var saltDecode = new HMACSHA512(teacher.PasswordSalt);
            var hashDecode = saltDecode.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < hashDecode.Length; i++)
            {
                if (hashDecode[i] != teacher.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return Ok(teacher);
        }


        private async Task<bool> TeacherExists(string email)
        {
            return await _context.Teachers.AnyAsync(teacher => teacher.Email == email);
        }
    }
}
