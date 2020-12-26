using LngChat.WebAPI.Settings;

namespace LngChat.WebAPI.Utils.Auth.TokenValidation
{
    public interface ITokenValidatorsFactory
    {
        ITokenValidator Create(OAuthCredentials credentials);
    }
}