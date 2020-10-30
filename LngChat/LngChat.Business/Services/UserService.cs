using AutoMapper;
using AutoMapper.QueryableExtensions;
using LngChat.Business.Models;
using LngChat.Data;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<(UserModel user, bool isNew)> GetUserAsync(string email, string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("The value must not be null, empty or whitespace string.", nameof(email));
            }

            var storedAccount = await _mapper.ProjectTo<UserModel>(_context.Users).SingleOrDefaultAsync(x => x.Email == email);

            if (storedAccount != null)
            {
                return (storedAccount, false);
            }

            var newUser = new User
            {
                Email = email,
                FirstName = firstName,
                LastName = lastName
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return (_mapper.Map<UserModel>(newUser), true);
        }

        public async Task<UserModel> GetUserAsync(int id)
        {
            return await _mapper.ProjectTo<UserModel>(_context.Users).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserModel> UpdateUserAsync(UserModel user)
        {
            var dbUser = await _context.Users.SingleOrDefaultAsync(x => x.Id == user.Id);

            if (dbUser != null)
            {
                _mapper.Map(user, dbUser);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<UserModel>(dbUser);
        }
    }
}