using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace LngChat.Data
{
    class LocalMySqlLangChatDbContextFactory : IDesignTimeDbContextFactory<LngChatDbContext>
    {
        private const string ConnectionString = "server=127.0.0.1;port=3306;database=lngchtdb;UserId=LangChatApp;Password=qweQWE123;";
        private const string ServerVersion = "8.0.21";

        public LngChatDbContext CreateDbContext(string[] args) => new LngChatDbContext(new DbContextOptionsBuilder<LngChatDbContext>()
                .UseMySql(ConnectionString, 
                    new MySqlServerVersion(new Version(ServerVersion)),
                    opts => opts.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds)).Options);
    }
}
