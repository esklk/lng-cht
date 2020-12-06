using LngChat.Business.Models;
using LngChat.Business.Services;
using LngChat.WebAPI.Hubs.Chat;
using LngChat.WebAPI.Models;
using LngChat.WebAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly ICurrentUserInfoProvider _currentUserInfoProvider;
        private readonly IHubContext<ChatHub, IChatClient> _chatHubContext;

        public ChatsController(IChatService chatService, ICurrentUserInfoProvider currentUserInfoProvider, IHubContext<ChatHub, IChatClient> chatHubContext)
        {
            _chatService = chatService;
            _currentUserInfoProvider = currentUserInfoProvider;
            _chatHubContext = chatHubContext;
        }

        [HttpGet]
        public async Task<ChatPreviewModel[]> GetChatListAsync([FromQuery]PagingFilterModel filter)
        {
            return await _chatService.GetChatListAsync(_currentUserInfoProvider.Id, filter.Limit, filter.Offset);
        }

        [HttpGet]
        [Route("{chatId}/messages")]
        public async Task<MessageModel[]> GetMessagesAsync(int chatId, [FromQuery]PagingFilterModel filter)
        {
            return await _chatService.GetMessagesAsync(_currentUserInfoProvider.Id, chatId, filter.Limit, filter.Offset);
        }

        [HttpPost]
        [Route("{chatId}/messages")]
        public async Task<MessageModel> SendMessageToChatAsync(int chatId, MessageDataModel messageData)
        {
            var message = await _chatService.SendMessageToChatAsync(_currentUserInfoProvider.Id, chatId, messageData.ContentType, messageData.Content);

            await _chatHubContext.Clients.Group(message.ChatId.ToString()).Message(message);

            return message;
        }

        [HttpPost]
        [Route("messages")]
        public async Task<MessageModel> SendMessageToUserAsync([FromQuery][Required]int toUserId, MessageDataModel messageData)
        {
            var message = await _chatService.SendMessageToUserAsync(_currentUserInfoProvider.Id, toUserId, messageData.ContentType, messageData.Content);

            await _chatHubContext.Clients.Group(message.ChatId.ToString()).Message(message);

            return message;
        }
    }
}
