using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Material> Materials { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<Enrollment> Enrollments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");

            modelBuilder.Entity<Student>()
                .HasBaseType<User>();


            modelBuilder.Entity<Teacher>()
                .HasBaseType<User>()
                .HasMany(teacher => teacher.Courses)
                .WithOne(course => course.Teacher)
                .HasForeignKey(course => course.TeacherId);
        }
    }
}
