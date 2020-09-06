using Microsoft.IdentityModel.Tokens;

namespace LngChat.WebAPI.Settings
{
    public interface IJwtOptions
    {
        string Issuer { get; }

        int LifetimeMinutes { get; }

        string SecurityKeyWord { get; }
        
        string SecurityAlgorithm { get; }

        SecurityKey SecurityKey { get; }
    }
}