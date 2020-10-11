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
    public class AccountsController : ControllerBase
    {
        private readonly IAccessTokenGenerator _accessTokenGenerator;
        private readonly ITokenValidator _tokenValidator;
        private readonly IUserAccountService _userAccountService;

        public AccountsController(IAccessTokenGenerator accessTokenGenerator, ITokenValidator tokenValidator, IUserAccountService userAccountService)
        {
            _accessTokenGenerator = accessTokenGenerator;
            _tokenValidator = tokenValidator;
            _userAccountService = userAccountService;
        }

        [HttpGet]
        public async Task<object> Get(string token)
        {
            var result = await _tokenValidator.ValidateAsync(token);
            if (!result.Success)
            {
                return Unauthorized(result.ErrorMessage);
            }

            var (user, isNew) = await _userAccountService.GetUserAccountAsync(result.Email, result.FirstName, result.LastName);

            var accessToken = _accessTokenGenerator.Generate(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) });

            if (isNew)
            {
                Response.StatusCode = (int)HttpStatusCode.Created;
            }

            return new { accessToken, user };
        }
    }
}
