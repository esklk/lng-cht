using System.Collections.Generic;
using System.Security.Claims;

namespace LngChat.WebAPI.Utils
{
    public interface IAccessTokenGenerator
    {
        string Generate(IEnumerable<Claim> claims);
    }
}