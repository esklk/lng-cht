using System.ComponentModel.DataAnnotations.Schema;

namespace LngChat.Data.Models
{
    public class UserChat
    {
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public int ChatId { get; set; }

        [ForeignKey(nameof(ChatId))]
        public Chat Chat { get; set; }
    }
}
