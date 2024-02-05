using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Learning.API.Models
{
    public class Course
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Level { get; set; }
        [Required]
        public string? SchoolYear { get; set; }

        public int? TeacherId { get; set; }


        [ForeignKey("TeacherId")]
        public Teacher? Teacher { get; set; }

        [JsonIgnore]
        public ICollection<Enrollment>? Enrollments { get; set; }

    }
}
