using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace LngChat.Data
{
    class LocalMySqlLangChatDbContextFactory : IDesignTimeDbContextFactory<LngChatDbContext>
    {
        private const string ConnectionString = "server=127.0.0.1;port=3306;database=lngchtdb;UserId=LangChatApp;Password=qweQWE123;";

        public LngChatDbContext CreateDbContext(string[] args) => new LngChatDbContext(new DbContextOptionsBuilder<LngChatDbContext>()
                .UseMySql(ConnectionString, opts => opts.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds)).Options);
    }
}
