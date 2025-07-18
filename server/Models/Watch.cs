namespace server.Models;

public class Watch
{
  public int Id { get; set; }
  public string Brand { get; set; } = string.Empty;
  public string Model { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string Reference { get; set; } = string.Empty;

  public Specs Specs { get; set; } = new Specs();
  public Movement Movement { get; set; } = new Movement();

  public string Bracelet { get; set; } = string.Empty;
  public string DialColor { get; set; } = string.Empty;
  public int PriceUsd { get; set; }
  public string ImageUrl { get; set; } = string.Empty;
}