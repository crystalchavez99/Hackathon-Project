namespace Learning.API.Models
{
    public class Material
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string? Link { get; set; }

        public bool? IsDue { get; set; }
        //public DateOnly? DueDate { get; set; }
    }
}
