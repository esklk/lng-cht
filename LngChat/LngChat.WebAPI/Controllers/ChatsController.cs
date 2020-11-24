using LngChat.Business.Models;
using LngChat.Business.Services;
using LngChat.WebAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly ICurrentUserInfoProvider _currentUserInfoProvider;

        public ChatsController(IChatService chatService, ICurrentUserInfoProvider currentUserInfoProvider)
        {
            _chatService = chatService;
            _currentUserInfoProvider = currentUserInfoProvider;
        }

        [HttpGet]
        public async Task<ChatPreviewModel[]> GetChatListAsync([FromQuery]PagingFilterModel filter)
        {
            return await _chatService.GetChatListAsync(_currentUserInfoProvider.Id, filter.Limit, filter.Offset);
        }

        [HttpPost]
        [Route("messages")]
        public async Task SendMessageAsync([Required]int toUserId, [Required]string messageText)
        {
            await _chatService.SendMessageAsync(_currentUserInfoProvider.Id, toUserId, messageText);
        }
    }
}
