using Learning.API.Data;
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
        private readonly AppDbContext _context;
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Student>> Register(string name, string email, string password)
        {
            if (await StudentExists(email)) return BadRequest("Email is taken.");
            var hash = new HMACSHA512();
            var newStudent= new Student
            {
                Name = name,
                Email = email,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hash.Key
            };
            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync();
            return Ok(newStudent);
        }

        [HttpPost("login")]
        public async Task<ActionResult<Student>> Login(string email, string password)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s =>
            s.Email == email);
            _context.Entry(student).Collection(s => s.Enrollments).Load();
            if (student == null) return Unauthorized("Invalid");
            var saltDecode = new HMACSHA512(student.PasswordSalt);
            var hashDecode = saltDecode.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < hashDecode.Length; i++)
            {
                if (hashDecode[i] != student.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return Ok(student);
        }


        private async Task<bool> StudentExists(string email)
        {
            return await _context.Students.AnyAsync(student => student.Email == email);
        }
    }
}
