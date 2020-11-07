using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IUserService
    {
        Task<UserModel> UpdateUserAsync(UserModel user);

        /// <summary>
        /// Gets user by email. Creates new one if not exist.
        /// </summary>
        Task<(UserModel user, bool isNew)> GetUserAsync(string email, string firstName, string lastName);

        Task<UserModel> GetUserAsync(int id);

        Task<UserModel[]> GetUsersAsync(UserFilterModel userFilterModel, params int[] userIdsToExclude);
    }
}