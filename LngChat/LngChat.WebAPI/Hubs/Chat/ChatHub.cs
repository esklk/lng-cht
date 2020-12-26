using LngChat.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Hubs.Chat
{
    [Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public override async Task OnConnectedAsync()
        {
            var chatIds = await _chatService.GetChatIdsAsync(int.Parse(Context.UserIdentifier));

            await Task.WhenAll(chatIds.Select(chatId => Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString())));

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var chatIds = await _chatService.GetChatIdsAsync(int.Parse(Context.UserIdentifier));

            await Task.WhenAll(chatIds.Select(chatId => Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId.ToString())));

            await  base.OnDisconnectedAsync(exception);
        }
    }
}
