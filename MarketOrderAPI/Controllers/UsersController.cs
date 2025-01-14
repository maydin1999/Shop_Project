using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MarketOrderAPI.Data;
using MarketOrderAPI.Models;

namespace MarketOrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MarketDbContext _context;

        public UsersController(MarketDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            return Ok(user);
        }


        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Kullanıcıyı kaydet
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

                // POST: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            try
            {
                Console.WriteLine($"Login Request: Email={loginRequest.Email}, Password={loginRequest.Password}");

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

                if (user == null)
                {
                    return BadRequest(new { Message = "Invalid email or password." });
                }

                // NULL kontrolü yaparak varsayılan değerler atayın
                user.FirstName ??= "Unknown";
                user.LastName ??= "Unknown";
                user.ProfilePictureUrl ??= "/images/default-profile.png";

                return Ok(new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.ProfilePictureUrl
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login Error: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred during login." });
            }
        }


    }
}
