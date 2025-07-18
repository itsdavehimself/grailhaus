using server.Models;
using System.Text.Json;
using server.Data;

public static class DataSeeder
{
  
  public static async Task SeedWatchesAsync(AppDbContext context)
  {
    if (context.Watches.Any()) return;

    var json = await File.ReadAllTextAsync(Path.Combine(AppContext.BaseDirectory, "Data", "Seed", "watches.json"));

    var watches = JsonSerializer.Deserialize<List<Watch>>(json, new JsonSerializerOptions
    {
      PropertyNameCaseInsensitive = true
    });

    if (watches is not null)
    {
      context.Watches.AddRange(watches);
      await context.SaveChangesAsync();
    }
  }
}