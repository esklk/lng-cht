using LngChat.Business.Models;
using System;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IUserService
    {
        Task<Guid> CreateUser(UserModel user);

        Task DeleteUser(Guid userId);

        Task<UserModel> GetUser(string email);
    }
}