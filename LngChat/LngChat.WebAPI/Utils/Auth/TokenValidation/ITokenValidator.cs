using System.Threading.Tasks;

namespace LngChat.WebAPI.Utils.Auth.TokenValidation
{
    public interface ITokenValidator
    {
        Task<TokenValidationResult> ValidateAsync(string token);
    }
}