namespace server.Models;
using Microsoft.AspNetCore.Identity;

public class Watch
{
  public int Id { get; set; }
  public string Brand { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string Reference { get; set; } = string.Empty;
  public double CaseSizeMm { get; set; }
  public double ThicknessMm { get; set; }
  public string CaseMaterial { get; set; } = string.Empty;
  public string MovementType { get; set; } = string.Empty;
  public string Movement { get; set; } = string.Empty;
  public int? PowerReserveHours { get; set; }
  public string Crystal { get; set; } = string.Empty;
  public int WaterResistanceM { get; set; }
  public string Bracelet { get; set; } = string.Empty;
  public string DialColor { get; set; } = string.Empty;
  public int PriceUsd { get; set; }
  public string ImageUrl { get; set; } = string.Empty;
}

