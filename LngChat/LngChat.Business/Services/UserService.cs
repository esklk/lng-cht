using LangChat.Business.Models;
using LangChat.Data;
using System;
using System.Threading.Tasks;

namespace LangChat.Business.Services
{
    public class UserService
    {
        private readonly LngChatDbContext _context;

        public UserService(LngChatDbContext context)
        {

        }

        public async Task<Guid> CreateUser(UserModel user)
        {
            //TODO: check if user is not exist, add entry to _context.Users, save changes and return user's Id
            throw new NotImplementedException();
        }

        public async Task<UserModel> GetUser(string email)
        {
            //TODO: get user from _context by email and map it to UserModel via automapper
            throw new NotImplementedException();
        }

        public async Task DeleteUser(Guid userId) 
        {
            //TODO: find user by id and delete it
            throw new NotImplementedException();
        }
    }
}