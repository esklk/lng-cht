using System.Collections.Generic;

namespace LngChat.Data.Models
{
    public class Chat
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<UserChat> UserChats { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}
