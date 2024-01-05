namespace Learning.API.Models
{
    public class Student: User
    {
        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
