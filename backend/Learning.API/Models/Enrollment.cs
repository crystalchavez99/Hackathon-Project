using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Learning.API.Models
{
    public class Enrollment
    {
        public int Id { get; set; }

        [ForeignKey("CourseId")]
        public int CourseId { get; set; }
        [ForeignKey("StudentId")]
        public int StudentId { get; set; }
        [JsonIgnore]
        public Course Course { get; set; }
        [JsonIgnore]
        public Student Student { get; set; }
    }
}
