using Microsoft.AspNetCore.Mvc;
using MarketOrderAPI.Data;
using MarketOrderAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MarketOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MarketDbContext _context;

        public CategoriesController(MarketDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();
                return Ok(categories); // Doğrudan JSON olarak kategorileri döndür
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching categories: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

            
        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
        }
    }
}
