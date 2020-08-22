using System.ComponentModel.DataAnnotations;

namespace LngChat.Data.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public User Sender { get; set; }

        [Required]
        public Chat Chat { get; set; }

        [Required]
        public string Text { get; set; }
    }
}
