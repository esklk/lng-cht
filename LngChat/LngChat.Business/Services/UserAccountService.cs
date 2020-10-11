using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public class UserAccountService : IUserAccountService
    {
        private readonly LngChatDbContext _context;
        private readonly IMapper _mapper;

        public UserAccountService(LngChatDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Finds an user by email or creates one if not found.
        /// </summary>
        /// <param name="email">User's email.</param>
        /// <param name="firstName">User's first name.</param>
        /// <param name="lastName">User's last name.</param>
        /// <returns>The related user account.</returns>
        public async Task<(UserModel user, bool isNew)> GetUserAccountAsync(string email, string firstName, string lastName)
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
    }
}
