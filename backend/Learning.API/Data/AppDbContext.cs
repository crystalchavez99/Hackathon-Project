using Learning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Material> Materials { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
