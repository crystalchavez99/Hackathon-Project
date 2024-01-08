using Azure;
using Learning.API.Data;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Learning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CoursesController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Course>>> GetCourses()
        {
            return Ok(await _context.Courses.Include(c => c.Teacher).ToListAsync());
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Course>>> GetCourse(int id)
        {
            var found = await _context.Courses.FindAsync(id);
            _context.Entry(found).Reference(c => c.Teacher).Load();
            if (found == null)
            {
                return BadRequest();
            }
            return Ok(found);
        }

        [HttpPost]
        public async Task<ActionResult<List<Course>>> CreateCourse([FromBody] Course course)
        {
            /*var newCourse = new Course { 
                Name = name, 
                Level = level,
                SchoolYear = schoolYear
        };*/
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(await _context.Courses.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Course>>> UpdateCourse(int id, Course course)
        {
            var putCourse = await _context.Courses.FindAsync(id);
            if (putCourse == null)
            {
                return BadRequest();
            }
            
            //putCourse.Id = course.Id;
            putCourse.Name = course.Name;
            putCourse.Level = course.Level;
            putCourse.SchoolYear = course.SchoolYear;
            await _context.SaveChangesAsync();
            return Ok(await _context.Courses.ToListAsync());

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Course>>> DeleteCourse(int id)
        {
            var deleteCourse = await _context.Courses.FindAsync(id);
            if (deleteCourse == null)
            {
                return BadRequest();
            }
            _context.Courses.Remove(deleteCourse);
            await _context.SaveChangesAsync();
            return Ok(await _context.Courses.ToListAsync());

        }
    }

   
}
