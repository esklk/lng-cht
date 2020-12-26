using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace LngChat.WebAPI.Extensions
{
    public static class ServiceProviderExtensions
    {
        public static HttpRequest GetHttpRequest(this IServiceProvider serviceProvider) => serviceProvider
            .GetRequiredService<IHttpContextAccessor>()
            .HttpContext.Request;

        public static string GetRequiredHttpHeader(this IServiceProvider serviceProvider, string headerName) => serviceProvider
            .GetHttpRequest()
            .Headers
            .TryGetValue(headerName, out var headerValue)
                ? headerValue
                : throw new ArgumentException($"The {headerName} header is required.");
    }
}
