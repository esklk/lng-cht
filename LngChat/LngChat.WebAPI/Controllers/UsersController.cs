using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using LngChat.Business.Models;
using LngChat.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        //TODO: specify route /current
        public async Task<UserModel> Get()
        {
            return await _userService.GetUserAsync(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
        }

        //TODO: specify route /current
        //public async Task Post(UserModel user)
        //{
        //    var updatedUser = await _userService.UpdateUserAsync(user);
            
        //    if(updatedUser == null)
        //    {
        //        Response.StatusCode = (int)HttpStatusCode.NotFound;
        //    }
        //}
    }
}
