using Learning.API.Data;
using Learning.API.Interface;
using Learning.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Learning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;
        public StudentsController(AppDbContext context, TokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenUser>> Register(AppUser user)
        {
            if (await StudentExists(user.Email)) return BadRequest("Email is taken.");
            var hash = new HMACSHA512();
            var student = new Student
            {
                Name = user.Name,
                Email = user.Email,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                PasswordSalt = hash.Key
            };
            /*var newTeacher = new Teacher
            {
                Name =teacher.Name,
                Email = teacher.Email,
                Password = hash.ComputeHash(Encoding.UTF8.GetBytes(teacher.Password))
            };*/
           // _context.Students.Add(student);
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return new TokenUser
            {
                Email = student.Email,
                Token = _tokenService.CreateToken(student)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenUser>> Login([FromBody] AppUser user)
        {
            var student = await _context.Students.FirstOrDefaultAsync(t =>
            t.Email == user.Email);
            if (student == null) return Unauthorized("Invalid Email");
            var saltDecode = new HMACSHA512(student.PasswordSalt);
            var hashDecode = saltDecode.ComputeHash(Encoding.UTF8.GetBytes(user.Password));

            for (int i = 0; i < hashDecode.Length; i++)
            {
                if (hashDecode[i] != student.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return new TokenUser
            {
                Email = student.Email,
                Token = _tokenService.CreateToken(student)
            };
        }


        private async Task<bool> StudentExists(string email)
        {
            return await _context.Students.AnyAsync(student => student.Email == email);
        }
    }
}
