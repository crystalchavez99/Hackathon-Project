using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }
        public ICollection<Course>? Courses { get; set; }
    }
}
