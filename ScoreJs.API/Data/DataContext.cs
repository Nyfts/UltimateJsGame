using Microsoft.EntityFrameworkCore;
using ScoreJs.API.Models;

namespace ScoreJs.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<score> score { get; set; }
    }
}