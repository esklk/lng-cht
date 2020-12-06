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

        public int ChatId { get; set; }

        [ForeignKey(nameof(ChatId))]
        public Chat Chat { get; set; }

        [Required]
        public MessageType Type { get; set; } = MessageType.Text;

        [Required]
        public string Content { get; set; }

        public DateTime SentAt { get; set; }
    }
}
