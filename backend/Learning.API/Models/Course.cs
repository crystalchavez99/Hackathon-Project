using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public class Course
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string SchoolYear { get; set; }
    }
}
