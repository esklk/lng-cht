using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IUserService
    {
        Task<UserModel> UpdateUserAsync(UserModel user);

        Task<UserModel> GetUserAsync(string email);

        Task<UserModel> GetUserAsync(int id);

        Task<UserModel> CreateUserAsync(UserModel userModel);

        Task<UserModel[]> GetUsersAsync(UserFilterModel userFilterModel, int currentUserId);
    }
}