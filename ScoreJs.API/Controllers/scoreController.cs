using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScoreJs.API.Data;
using ScoreJs.API.DTOs;
using ScoreJs.API.Models;

namespace ScoreJs.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class scoreController : ControllerBase
    {
        private readonly DataContext _context;
        public scoreController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getValues()
        {
            var score = await _context.score.OrderByDescending(x => x.value).ToListAsync();
            
            return Ok(score);
        }

        [HttpPost]
        public async Task<IActionResult> post(scoreDTO scoreDTO)
        {
            var score = new score 
            {
                name = scoreDTO.name,
                value = scoreDTO.value
            };

            await _context.score.AddAsync(score);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }
    }
}