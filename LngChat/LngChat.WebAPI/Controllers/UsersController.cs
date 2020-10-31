using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using LngChat.Business.Models;
using LngChat.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("current")]
        public async Task<UserModel> Get()
        {
            return await _userService.GetUserAsync(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
        }

        [HttpPatch]
        [Route("current")]
        public async Task Patch(UserModel user)
        {
            user.Id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var updatedUser = await _userService.UpdateUserAsync(user);

            if (updatedUser == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
            }
        }
    }
}
