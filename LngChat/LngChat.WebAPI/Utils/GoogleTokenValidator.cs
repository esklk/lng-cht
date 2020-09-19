using Google.Apis.Auth;
using LngChat.WebAPI.Settings;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Utils
{
    public class GoogleTokenValidator : ITokenValidator
    {
        private readonly OAuthCredentials _credentials;

        public GoogleTokenValidator(OAuthCredentials credentials)
        {
            _credentials = credentials;
        }

        public async Task<TokenValidationResult> ValidateAsync(string token)
        {
            try
            {
                var result = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _credentials.Id }
                });

                return new TokenValidationResult(result.Email, result.GivenName, result.FamilyName);
            }
            catch (InvalidJwtException ex)
            {
                return new TokenValidationResult(ex.Message);
            }
        }
    }
}
