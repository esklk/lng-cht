using System;

namespace LngChat.Business.Models
{
    public class MessageModel
    {
        public int Id { get; set; }

        public int ChatId { get; set; }

        public int SenderId { get; set; }

        public string Type { get; set; }

        public string Content { get; set; }

        public DateTime SentAt { get; set; }
    }
}
