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

            var user = await _userService.GetUserAsync(result.Email);

            if(user == null)
            {
                user = await _userService.CreateUserAsync(new Business.Models.UserModel
                {
                    Email = result.Email,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    ProfilePictureUrl = result.ProfilePictureUrl
                });

                Response.StatusCode = (int)HttpStatusCode.Created;
            }

            var accessToken = _accessTokenGenerator.Generate(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName,user.FirstName),
                new Claim(ClaimTypes.Surname,user.LastName)
            });

            return new { accessToken };
        }
    }
}
