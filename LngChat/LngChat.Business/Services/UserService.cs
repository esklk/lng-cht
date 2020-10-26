using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data;
using Microsoft.EntityFrameworkCore;
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

        public async Task<UserModel> UpdateUser(UserModel user)
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