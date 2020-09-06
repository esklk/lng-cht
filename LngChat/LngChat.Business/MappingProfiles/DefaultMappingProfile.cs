using AutoMapper;
using LngChat.Business.Models;
using LngChat.Data.Models;
using System.Linq;

namespace LngChat.Business.MappingProfiles
{
    public class DefaultMappingProfile : Profile
    {
        public DefaultMappingProfile()
        {
            CreateMap<User, UserAccountModel>()
                .ForMember(d => d.UserId, m => m.MapFrom(s => s.Id));
        }
    }
}
