﻿using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data.Models;
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
            CreateMap<LanguageInfo, LanguageInfoModel>()
                .ForMember(d => d.Level, m => m.MapFrom(s => (int)s.Level));
        }
    }
}
