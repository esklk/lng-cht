using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LngChat.Data.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        [ForeignKey(nameof(SenderId))]
        public User Sender { get; set; }

        [Required]
        public Chat Chat { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime SentAt { get; set; }
    }
}
