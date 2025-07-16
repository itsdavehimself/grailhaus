using server.Models;

namespace server.DTOs;

public class HomeCourseDto
{
  public string Name { get; set; } = string.Empty;
  public string City { get; set; } = string.Empty;
  public string State { get; set; } = string.Empty;
  public double Latitude { get; set; }
  public double Longitude { get; set; }
}