using Microsoft.EntityFrameworkCore;
using MarketOrderAPI.Models;

namespace MarketOrderAPI.Data
{
    public class MarketDbContext : DbContext
    {
        public MarketDbContext(DbContextOptions<MarketDbContext> options) : base(options) { }

        // Kullanıcılar
        public DbSet<User> Users { get; set; }

        // Kategoriler
        public DbSet<Category> Categories { get; set; }
    }
}
