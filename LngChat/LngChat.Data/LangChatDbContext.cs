using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LngChat.Data
{
    public class LngChatDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public DbSet<Chat> Chats { get; set; }
        
        public DbSet<Message> Messages { get; set; }
        
        public DbSet<LanguageInfo> LanguageInfos { get; set; }

        public LngChatDbContext(DbContextOptions<LngChatDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserChat>()
                .HasKey(x => new { x.ChatId, x.UserId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
