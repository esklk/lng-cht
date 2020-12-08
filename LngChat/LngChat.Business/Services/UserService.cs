using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public class UserService : IUserService
    {
        private readonly LngChatDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public UserService(LngChatDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<UserModel> GetUserAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("The value must not be null, empty or whitespace string.", nameof(email));
            }

            return await _mapper.ProjectTo<UserModel>(_context.Users).SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<UserModel> CreateUserAsync(UserModel userModel)
        {
            var userToSave = _mapper.Map<User>(userModel ?? throw new ArgumentNullException(nameof(userModel)));

            _context.Users.Add(userToSave);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserModel>(userToSave);
        }

        public async Task<UserModel> GetUserAsync(int id)
        {
            return await _mapper.ProjectTo<UserModel>(_context.Users).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserModel> UpdateUserAsync(UserModel userModel)
        {
            if(userModel == null)
            {
                throw new ArgumentNullException(nameof(userModel));
            }

            var dbUser = await _context.Users.Include(x => x.Languages).SingleOrDefaultAsync(x => x.Id == userModel.Id);

            if (dbUser != null)
            {
                userModel.ProfilePictureUrl = await _fileService
                    .CreateIfDifferentAsync(userModel.ProfilePictureUrl, dbUser.ProfilePictureUrl, x => x.Type == ContentType.Image);

                var filePathToDelete = userModel.ProfilePictureUrl != dbUser.ProfilePictureUrl ? dbUser.ProfilePictureUrl : null;

                _mapper.Map(userModel, dbUser);
                await _context.SaveChangesAsync();

                if (!string.IsNullOrWhiteSpace(filePathToDelete))
                {
                    _fileService.DeleteFile(filePathToDelete);
                }
            }

            return _mapper.Map<UserModel>(dbUser);
        }

        public async Task<UserModel[]> GetUsersAsync(UserFilterModel userFilterModel, int currentUserId)
        {
            var languageIds = await GetLanguageIdsAsync(userFilterModel.LanguagesToLearn, userFilterModel.LanguagesToTeach);

            return languageIds.Any()
                ? await _mapper.ProjectTo<UserModel>(_context.Users
                    .Where(x => x.Id != currentUserId
                        && x.UserChats.Any(y => y.UserId == currentUserId)
                        && x.Languages.Any(y => languageIds.Contains(y.Id)))
                    .Skip(userFilterModel.Offset)
                    .Take(userFilterModel.Limit)).ToArrayAsync()
                : Array.Empty<UserModel>();
        }

        private async Task<int[]> GetLanguageIdsAsync(LanguageFilterModel[] languagesToLearn, LanguageFilterModel[] languagesToTeach)
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