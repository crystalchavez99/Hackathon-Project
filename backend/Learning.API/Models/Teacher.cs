using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public ICollection<Course>? Courses { get; set; }
    }
}
