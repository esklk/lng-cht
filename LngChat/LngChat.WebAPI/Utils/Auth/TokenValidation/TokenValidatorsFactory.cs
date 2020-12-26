using LngChat.Business.Exceptions;
using LngChat.WebAPI.Settings;
using System;
using System.Collections.Generic;

namespace LngChat.WebAPI.Utils.Auth.TokenValidation
{
    public class TokenValidatorsFactory : ITokenValidatorsFactory
    {
        private static readonly Dictionary<string, Type> TokenValidatorTypeNames = new Dictionary<string, Type>
        {
            { "Google", typeof(GoogleTokenValidator) }
        };

        private readonly string _tokenProvider;

        public TokenValidatorsFactory(string tokenProvider)
        {
            if (string.IsNullOrWhiteSpace(tokenProvider))
            {
                throw new ArgumentNullEmptyOrWhitespaceStringException(nameof(tokenProvider));
            }
            if (!TokenValidatorTypeNames.ContainsKey(tokenProvider))
            {
                throw new ArgumentException($"The {tokenProvider} token provider is not supported. Please use one of the following values: {string.Join(',', TokenValidatorTypeNames.Keys)}.");
            }

            _tokenProvider = tokenProvider;
        }

        public ITokenValidator Create(OAuthCredentials credentials) => credentials == null
            ? throw new ArgumentNullException(nameof(credentials))
            : (ITokenValidator)Activator.CreateInstance(TokenValidatorTypeNames[_tokenProvider], credentials);
    }
}
