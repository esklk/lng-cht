using AutoMapper;
using AutoMapper.QueryableExtensions;
using LngChat.Business.Models;
using LngChat.Data;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var dbUser = await _context.Users.Include(x => x.Languages).SingleOrDefaultAsync(x => x.Id == user.Id);
            if (dbUser != null)
            {
                _mapper.Map(user, dbUser);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<UserModel>(dbUser);
        }

        public async Task<UserModel[]> GetUsersAsync(UserFilterModel userFilterModel, params int[] userIdsToExclude)
        {
            var languageIds = await GetLanguageIds(userFilterModel.LanguagesToLearn, userFilterModel.LanguagesToTeach);

            return languageIds.Any() 
                ? await _mapper.ProjectTo<UserModel>(_context.Users
                    .Where(x => !userIdsToExclude.Contains(x.Id) && x.Languages.Any(y => languageIds.Contains(y.Id)))
                    .Skip(userFilterModel.Offset)
                    .Take(userFilterModel.Limit)).ToArrayAsync() 
                : Array.Empty<UserModel>();
        }

        private async Task<int[]> GetLanguageIds(LanguageFilterModel[] languagesToLearn, LanguageFilterModel[] languagesToTeach) 
        {
            var codes = languagesToLearn
                .Select(x => x.Code)
                .Concat(languagesToTeach.Select(x => x.Code))
                .Distinct();

            if (!codes.Any())
            {
                return Array.Empty<int>();
            }

            var query = _context.LanguageInfos.Where(x => codes.Contains(x.Code));

            if (languagesToLearn.Any())
            {
                var minLevelToLearn = (LanguageLevel)languagesToLearn.Min(x => x.LevelMin);
                var maxLevelToLearn = (LanguageLevel)languagesToLearn.Max(x => x.LevelMax);
                query.Where(x => x.ToLearn && x.Level >= minLevelToLearn && x.Level <= maxLevelToLearn);
            }

            if (languagesToTeach.Any())
            {
                var minLevelToTeach = (LanguageLevel)languagesToTeach.Min(x => x.LevelMin);
                var maxLevelToTeach = (LanguageLevel)languagesToTeach.Max(x => x.LevelMax);
                query.Where(x => x.ToTeach && x.Level >= minLevelToTeach && x.Level <= maxLevelToTeach);
            }
                    
            var langs = await query.ToListAsync();

            return langs
                .Where(x =>
                    (x.ToLearn && languagesToLearn.Any(y => y.Code == x.Code && y.LevelMax >= (int)x.Level && y.LevelMin <= (int)x.Level))
                    || (x.ToTeach && languagesToTeach.Any(y => y.Code == x.Code && y.LevelMax >= (int)x.Level && y.LevelMin <= (int)x.Level)))
                .Select(x => x.Id)
                .ToArray();
        }
    }
}