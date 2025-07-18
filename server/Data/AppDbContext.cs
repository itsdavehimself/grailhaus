using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : IdentityDbContext<User>
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Watch> Watches { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Watch>().OwnsOne(w => w.Specs);
    modelBuilder.Entity<Watch>().OwnsOne(w => w.Movement);
  }
}