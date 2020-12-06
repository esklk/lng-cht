using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IChatService
    {
        Task<int[]> GetChatIdsAsync(int userId);
        Task<ChatPreviewModel[]> GetChatListAsync(int userId, int limit, int offset);
        Task<MessageModel[]> GetMessagesAsync(int userId, int chatId, int limit, int offset);
        Task<MessageModel> SendMessageToChatAsync(int senderUserId, int chatId, string contentType, string content);
        Task<MessageModel> SendMessageToUserAsync(int senderUserId, int recieverUserId, string contentType, string content);
    }
}