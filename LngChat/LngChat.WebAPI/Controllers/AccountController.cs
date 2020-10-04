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
    public class AccountController : ControllerBase
    {
        private readonly IAccessTokenGenerator _accessTokenGenerator;
        private readonly ITokenValidator _tokenValidator;
        private readonly IUserAccountService _userAccountService;

        public AccountController(IAccessTokenGenerator accessTokenGenerator, ITokenValidator tokenValidator, IUserAccountService userAccountService)
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

            var (account, isNew) = await _userAccountService.GetUserAccountAsync(result.Email, result.FirstName, result.LastName);

            var accessToken = _accessTokenGenerator.Generate(new[] { new Claim(ClaimTypes.NameIdentifier, account.UserId.ToString()) });

            Response.StatusCode = (int)(isNew ? HttpStatusCode.Created : HttpStatusCode.OK);

            return new { accessToken, account };
        }
    }
}
