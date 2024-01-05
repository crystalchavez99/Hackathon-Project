using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Email { get; set; }
        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
