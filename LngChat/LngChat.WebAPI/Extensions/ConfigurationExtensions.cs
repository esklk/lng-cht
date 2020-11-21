using LngChat.WebAPI.Settings;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Extensions
{
    public static class ConfigurationExtensions
    {
        public static JwtOptions GetJwtOptions(this IConfiguration configuration) => configuration
            .GetSection(nameof(JwtOptions))
            .Get<JwtOptions>();

        public static string[] GetAllowedCorsOrigins(this IConfiguration configuration) => configuration
            .GetSection("AllowedCorsOrigins")
            .Get<string[]>();

        public static OAuthCredentials GetOAuthCredentials(this IConfiguration configuration, string provider) => configuration
            .GetSection("OAuth")
            .GetChildren()
            .ToDictionary(k => k.Key, e => e.Get<OAuthCredentials>())
            .GetValueOrDefault(provider) ?? throw new KeyNotFoundException($"Can not find OAuth credentials with {provider} provider.");

        public static DatabaseConfiguration GetDatabaseConfiguration(this IConfiguration configuration, string name) => configuration
            .GetSection("DatabaseConfiguration")
            .GetChildren()
            .ToDictionary(k => k.Key, e => e.Get<DatabaseConfiguration>())
            .GetValueOrDefault(name) ?? throw new KeyNotFoundException($"Can not find \"{name}\" database configuration.");
    }
}
