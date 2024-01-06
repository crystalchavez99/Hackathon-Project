using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public enum UserType
    {
        [Description("Student")]
        Student,
        [Description("Teacher")]
        Teacher
    }
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        [Required]
        public UserType Type { get; set; }
    }
}
