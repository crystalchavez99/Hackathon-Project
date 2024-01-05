namespace Learning.API.Models
{
    public class Student
    {
        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
