using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Auth;
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
        private readonly IUserAccountService _userAccountService;

        public AccountController(IAccessTokenGenerator accessTokenGenerator, IUserAccountService userAccountService)
        {
            _accessTokenGenerator = accessTokenGenerator;
            _userAccountService = userAccountService;
        }

        [HttpGet]
        public async Task<object> Get(string googleToken)
        {

            try
            {
                var result = await GoogleJsonWebSignature.ValidateAsync(googleToken);

                var (account, isNew) = await _userAccountService.GetUserAccountAsync(result.Email, result.GivenName, result.FamilyName);

                var accessToken = _accessTokenGenerator.Generate(new[] { new Claim(ClaimTypes.NameIdentifier, account.UserId.ToString()) });

                return new { accessToken, account, isNew };
            }
            catch (InvalidJwtException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
