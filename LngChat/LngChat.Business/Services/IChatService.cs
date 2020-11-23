using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IChatService
    {
        Task<ChatPreviewModel[]> GetChatListAsync(int userId);
        Task SendMessageAsync(int senderUserId, int recieverUserId, string messageText);
    }
}