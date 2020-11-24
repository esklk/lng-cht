using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IChatService
    {
        Task<ChatPreviewModel[]> GetChatListAsync(int userId, int limit, int offset);
        Task<MessageModel[]> GetMessagesAsync(int userId, int chatId, int limit, int offset);
        Task SendMessageAsync(int senderUserId, int recieverUserId, string messageText);
    }
}