using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Learning.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        [Required]
        public required string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [JsonIgnore]
        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
