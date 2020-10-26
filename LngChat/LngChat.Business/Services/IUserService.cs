using LngChat.Business.Models;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IUserService
    {
        Task<UserModel> UpdateUser(UserModel user);
    }
}