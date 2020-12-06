using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Hubs.Chat
{
    public interface IChatClient
    {
        Task Message(MessageModel message);
    }
}
