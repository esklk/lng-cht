using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data;
using System;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public class UserService : IUserService
    {
        private readonly LngChatDbContext _context;
        private readonly IMapper _mapper;

        public UserService(LngChatDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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