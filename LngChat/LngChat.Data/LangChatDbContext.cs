using LangChat.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LangChat.Data
{
    public class LngChatDbContext : DbContext
    {
        public LngChatDbContext(DbContextOptions<LngChatDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        
        public DbSet<Chat> Chats { get; set; }
        
        public DbSet<Message> Messages { get; set; }
        
        public DbSet<LanguageInfo> LanguageInfos { get; set; }
    }
}
