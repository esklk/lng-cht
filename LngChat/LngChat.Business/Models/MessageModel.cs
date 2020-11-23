using System;

namespace LngChat.Business.Models
{
    public class MessageModel
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public string Text { get; set; }

        public DateTime SentAt { get; set; }
    }
}
