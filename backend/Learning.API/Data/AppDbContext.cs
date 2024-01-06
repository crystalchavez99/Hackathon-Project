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

        public DbSet<AppUser> AppUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Course>()
               .HasOne(c => c.Teacher)
               .WithMany(t => t.Courses)
               .HasForeignKey(course => course.TeacherId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Enrollment>()
                            .HasOne(enrollment => enrollment.Student)
                            .WithMany(enrollment => enrollment.Enrollments)
                            .HasForeignKey(enrollment => enrollment.StudentId);

            modelBuilder.Entity<Enrollment>()
                .HasOne(enrollment => enrollment.Course)
                .WithMany(enrollment => enrollment.Enrollments)
                .HasForeignKey(enrollment => enrollment.CourseId);



            /*modelBuilder.Entity<Course>()
                            .HasKey(course => course.Id);
                        modelBuilder.Entity<Course>()
                            .HasOne(c => c.Teacher)
                            .WithMany(t => t.Courses)
                            .HasForeignKey(course => course.TeacherId).OnDelete(DeleteBehavior.Restrict);
                        modelBuilder.Entity<Teacher>()
                            .HasMany(teacher => teacher.Courses)
                            .WithOne(course => course.Teacher)
                            .HasForeignKey(course => course.TeacherId).
                            OnDelete(DeleteBehavior.Restrict);


                        modelBuilder.Entity<Enrollment>()
                            .HasKey(enroll => enroll.Id);

                        modelBuilder.Entity<Enrollment>()
                            .HasOne(enrollment => enrollment.Student)
                            .WithMany(enrollment => enrollment.Enrollments)
                            .HasForeignKey(enrollment => enrollment.StudentId);



                        modelBuilder.Entity<Enrollment>()
                            .HasOne(enrollment => enrollment.Course)
                            .WithMany(enrollment => enrollment.Enrollments)
                            .HasForeignKey(enrollment => enrollment.CourseId);*/

        }
    }
}
