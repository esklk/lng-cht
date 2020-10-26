using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public async Task<object> Post(UserModel user)
        {
            var updatedUser = await _userService.UpdateUser(user);
            
            if(user == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
            }

            return updatedUser;

        }
    }
}
