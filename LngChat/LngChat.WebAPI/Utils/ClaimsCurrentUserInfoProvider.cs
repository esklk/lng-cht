using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LngChat.WebAPI.Utils
{
    public class ClaimsCurrentUserInfoProvider : ICurrentUserInfoProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClaimsCurrentUserInfoProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int Id => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public string Email => _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

        public string FirstName => _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.GivenName);

        public string LastName => _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Surname);
    }
}
