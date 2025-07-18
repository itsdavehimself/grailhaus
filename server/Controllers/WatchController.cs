using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WatchController : ControllerBase
{
  private readonly AppDbContext _context;

  public WatchController(AppDbContext context)
  {
    _context = context;
  }

  [Authorize]
  [HttpGet("search")]
  public IActionResult FuzzySearch([FromQuery] string query)
  {
    if (string.IsNullOrWhiteSpace(query) || query.Trim().Length < 1)
      return BadRequest(new { message = "Search must be at least 2 characters" });

  const string sql = @"
    SELECT *
    FROM watches
WHERE
  brand ILIKE '%' || @p0 || '%'
  OR model ILIKE '%' || @p0 || '%'
  OR reference ILIKE '%' || @p0 || '%'
  OR name ILIKE '%' || @p0 || '%'
  OR similarity(@p0, brand || ' ' || model || ' ' || name || ' ' || reference) > 0.1
ORDER BY
  CASE
    WHEN model ILIKE @p0 THEN 1
    WHEN name ILIKE @p0 THEN 2
    WHEN brand ILIKE @p0 THEN 3
    WHEN reference ILIKE @p0 THEN 4
    ELSE 5
  END,
  similarity(@p0, brand || ' ' || model || ' ' || name || ' ' || reference) DESC
  ";

    var results = _context.Watches
      .FromSqlRaw(sql, query)
      .ToList();

    return Ok(results);
  }
}