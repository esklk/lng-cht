using LngChat.WebAPI.Settings;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

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

        public static Dictionary<string, OAuthCredentials> GetOAuthCredentials(this IConfiguration configuration, params string[] providers) => providers
            .ToDictionary(provider => provider, provider => configuration.GetOAuthCredentials(provider));

        public static DatabaseConfiguration GetDatabaseConfiguration(this IConfiguration configuration, string name) => configuration
            .GetSection("DatabaseConfiguration")
            .GetChildren()
            .ToDictionary(k => k.Key, e => e.Get<DatabaseConfiguration>())
            .GetValueOrDefault(name) ?? throw new KeyNotFoundException($"Can not find \"{name}\" database configuration.");
    }
}
