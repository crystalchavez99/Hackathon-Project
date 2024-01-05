namespace Learning.API.Models
{
    public class Teacher : User
    {
        public ICollection<Course>? Courses { get; set; }
    }
}
