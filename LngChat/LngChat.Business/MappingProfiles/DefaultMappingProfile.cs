using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.Linq;

namespace LngChat.Business.MappingProfiles
{
    public class DefaultMappingProfile : Profile
    {
        public DefaultMappingProfile()
        {
            CreateMap<User, UserModel>()
                .ForMember(d => d.LanguagesToLearn, m => m.MapFrom(s => s.Languages.Where(x => x.ToLearn)))
                .ForMember(d => d.LanguagesToTeach, m => m.MapFrom(s => s.Languages.Where(x => x.ToTeach)));
            CreateMap<UserModel, User>()
                .ForMember(d => d.Languages, m => m.MapFrom(s => new List<LanguageInfo>()
                    .Concat(s.LanguagesToLearn
                        .Select(x =>new LanguageInfo
                        {
                            Code = x.Code,
                            Level = (LanguageLevel)x.Level,
                            ToLearn = true,
                            ToTeach = s.LanguagesToTeach.Any(y => y.Code == x.Code)
                        }))
                    .Concat(s.LanguagesToTeach
                        .Where(x => !s.LanguagesToLearn.Any(y => y.Code == x.Code))
                        .Select(x => new LanguageInfo
                        {
                            Code = x.Code,
                            Level = (LanguageLevel)x.Level,
                            ToTeach = true
                        }))));
            CreateMap<LanguageInfo, LanguageInfoModel>()
                .ForMember(d => d.Level, m => m.MapFrom(s => (int)s.Level));
        }
    }
}
