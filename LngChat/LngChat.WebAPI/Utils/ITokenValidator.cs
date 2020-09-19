using System.Threading.Tasks;

namespace LngChat.WebAPI.Utils
{
    public interface ITokenValidator
    {
        Task<TokenValidationResult> ValidateAsync(string token);
    }
}