using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using LngChat.Business.Services;
using LngChat.WebAPI.Utils;
using Microsoft.AspNetCore.Mvc;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAccessTokenGenerator _accessTokenGenerator;
        private readonly ITokenValidator _tokenValidator;
        private readonly IUserService _userService;

        public AuthController(IAccessTokenGenerator accessTokenGenerator, ITokenValidator tokenValidator, IUserService userService)
        {
            _accessTokenGenerator = accessTokenGenerator;
            _tokenValidator = tokenValidator;
            _userService = userService;
        }

        [HttpGet]
        public async Task<object> Get(string token)
        {
            var result = await _tokenValidator.ValidateAsync(token);
            if (!result.Success)
            {
                return Unauthorized(result.ErrorMessage);
            }

            var (user, isNew) = await _userService.GetUserAsync(result.Email, result.FirstName, result.LastName);

            var accessToken = _accessTokenGenerator.Generate(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) });

            if (isNew)
            {
                Response.StatusCode = (int)HttpStatusCode.Created;
            }

            return new { accessToken };
        }
    }
}
