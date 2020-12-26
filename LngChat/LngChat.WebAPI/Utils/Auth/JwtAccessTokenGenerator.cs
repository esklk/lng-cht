using LngChat.WebAPI.Settings;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LngChat.WebAPI.Utils.Auth
{
    public class JwtAccessTokenGenerator : IAccessTokenGenerator
    {
        private readonly IJwtOptions _jwtOptions;

        public JwtAccessTokenGenerator(IJwtOptions jwtOptions)
        {
            _jwtOptions = jwtOptions;
        }

        public string Generate(IEnumerable<Claim> claims)
        {
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: _jwtOptions.Issuer,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(_jwtOptions.LifetimeMinutes)),
                    signingCredentials: new SigningCredentials(_jwtOptions.SecurityKey, _jwtOptions.SecurityAlgorithm));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
    }
}
