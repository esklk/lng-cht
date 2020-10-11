using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IUserAccountService
    {
        Task<(UserModel user, bool isNew)> GetUserAccountAsync(string email, string firstName, string lastName);
    }
}