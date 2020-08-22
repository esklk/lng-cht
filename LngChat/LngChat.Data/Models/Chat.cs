using System.Collections.Generic;

namespace LangChat.Data.Models
{
    public class Chat
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}
