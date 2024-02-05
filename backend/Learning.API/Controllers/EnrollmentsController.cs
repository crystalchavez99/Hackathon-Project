using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace Learning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EnrollmentsController(AppDbContext context) {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Enrollment>>> GetStudentCourses(int studentId)
        {
            var found = await _context.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Course)
            .FirstOrDefaultAsync(e => e.Id == studentId);

            if (found == null)
            {
                return BadRequest();
            }
            return Ok(found);
        }
    }
}
