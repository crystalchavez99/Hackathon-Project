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
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(string name, string email, UserType type, string password)
        {
            if (await UserExists(email)) return BadRequest("Email is taken.");
            var hash = new HMACSHA512();
            var newUser = new User
            {
                Name = name,
                Email = email,
                Type = type,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hash.Key
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
            u.Email == email);
            if (user == null) return Unauthorized("Invalid");
            var saltDecode = new HMACSHA512(user.PasswordSalt);
            var hashDecode = saltDecode.ComputeHash(Encoding.UTF8.GetBytes(password));

            for(int i = 0; i < hashDecode.Length; i++)
            {
                if (hashDecode[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return Ok(user);
        }


        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(user => user.Email == email);
        }
    }
}
