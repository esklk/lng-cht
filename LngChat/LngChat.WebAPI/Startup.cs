using AutoMapper;
using LngChat.Business.MappingProfiles;
using LngChat.Business.Services;
using LngChat.Data;
using LngChat.WebAPI.Extensions;
using LngChat.WebAPI.Hubs.Chat;
using LngChat.WebAPI.Settings;
using LngChat.WebAPI.Utils;
using LngChat.WebAPI.Utils.Auth;
using LngChat.WebAPI.Utils.Auth.TokenValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace LngChat.WebAPI
{
    public class Startup
    {
        private const string AllowSpecificOrigins = "AllowSpecificOrigins";
        private const string ChatHubAddress = "/chat";
        private const string TokenProviderHeaderName = "Token-Provider";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var jwtOptions = Configuration.GetJwtOptions();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateLifetime = true,
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidIssuer = jwtOptions.Issuer,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = jwtOptions.SecurityKey
                    };
                    x.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (context.HttpContext.Request.Path.StartsWithSegments(ChatHubAddress))
                            {
                                var accesToken = context.Request.Query["access_token"];
                                if (!string.IsNullOrWhiteSpace(accesToken))
                                {
                                    context.Token = accesToken;
                                }
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            var allowedCorsOrigins = Configuration.GetAllowedCorsOrigins();
            var googleOAuthCredentials = Configuration.GetOAuthCredentials("Google");
            var langChatDbConfiguration = Configuration.GetDatabaseConfiguration("LangChat");

            services.AddSignalR();

            services
                .AddHttpContextAccessor()
                .AddCors(options => options.AddPolicy(AllowSpecificOrigins, builder => builder
                    .WithOrigins(allowedCorsOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()))
                .AddDbContext<LngChatDbContext>(x => x.UseMySql(langChatDbConfiguration.ConnectionString, new MySqlServerVersion(langChatDbConfiguration.ServerVersion)))
                .AddAutoMapper(typeof(BusinessMappingProfile))
                .AddSingleton<IJwtOptions>(jwtOptions)
                .AddSingleton<IAccessTokenGenerator, JwtAccessTokenGenerator>()
                .AddSingleton(googleOAuthCredentials)
                .AddScoped<ICurrentUserInfoProvider, ClaimsCurrentUserInfoProvider>()
                .AddScoped<ITokenValidatorsFactory>(x => new TokenValidatorsFactory(x.GetRequiredHttpHeader(TokenProviderHeaderName)))
                .AddScoped(x => x.GetRequiredService<ITokenValidatorsFactory>().Create(x.GetRequiredService<OAuthCredentials>()))
                .AddScoped<IUserService, UserService>()
                .AddScoped<IChatService, ChatService>()
                .AddScoped<IFileService>(x =>
                    {
                        var env = x.GetRequiredService<IWebHostEnvironment>();
                        var request = x.GetHttpRequest();

                        return new FileService(env.WebRootPath, $"{request.Scheme}://{request.Host.Value}/");
                    });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection()
                .UseRouting()
                .UseCors(AllowSpecificOrigins)
                .UseAuthentication()
                .UseAuthorization()
                .UseStaticFiles(new StaticFileOptions
                {
                    ServeUnknownFileTypes = true
                })
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                    endpoints.MapHub<ChatHub>(ChatHubAddress);
                });
        }
    }
}
