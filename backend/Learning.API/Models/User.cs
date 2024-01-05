using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Learning.API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Email { get; set; }
        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }
       // [Required]
       // public UserType Type { get; set; }


    }
}
