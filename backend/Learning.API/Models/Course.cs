using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public class Course
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Level { get; set; }
        [Required]
        public required string SchoolYear { get; set; }

        public int? TeacherId { get; set; }
        public required Teacher Teacher { get; set; }
        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
