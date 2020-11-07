using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using LngChat.Business.Models;
using LngChat.Business.Services;
using LngChat.WebAPI.ModelBinders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

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
        public async Task<UserModel> GetCurrent()
        {
            return await _userService.GetUserAsync(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
        }

        [HttpGet]
        public async Task<UserModel[]> GetListAsync([ModelBinder(typeof(JsonArrayModelBinder))] UserFilterModel userFilterModel)
        {
            var result = await _userService.GetUsersAsync(userFilterModel, int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));

            return result;
        }

        [HttpPatch]
        [Route("current")]
        public async Task<UserModel> PatchCurrentAsync(UserModel user)
        {
            user.Id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var updatedUser = await _userService.UpdateUserAsync(user);

            if (updatedUser == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
            }

            return updatedUser;
        }
    }
}
