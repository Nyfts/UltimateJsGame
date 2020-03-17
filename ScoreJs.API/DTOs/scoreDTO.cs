using System.ComponentModel.DataAnnotations;

namespace ScoreJs.API.DTOs
{
    public class scoreDTO
    {
        [Required]
        public string name { get; set; }
        [Required]
        public int value { get; set; }
    }
}