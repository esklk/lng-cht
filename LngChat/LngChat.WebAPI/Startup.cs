using AutoMapper;
using LngChat.Business.MappingProfiles;
using LngChat.Business.Services;
using LngChat.Data;
using LngChat.WebAPI.Settings;
using LngChat.WebAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace LngChat.WebAPI
{
    public class Startup
    {
        private const string AllowSpecificOrigins = "AllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var jwtOptions = Configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();
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
                });

            var allowedCorsOrigins = Configuration.GetSection("AllowedCorsOrigins").Get<string[]>();
            var oAuthCredentials = Configuration.GetSection("OAuth").GetChildren().ToDictionary(k => k.Key, e => e.Get<OAuthCredentials>());

            var langChatDbConnectionString = Configuration.GetConnectionString("LangChatDb");
            services
                .AddCors(options => options.AddPolicy(AllowSpecificOrigins, builder => builder
                    .WithOrigins(allowedCorsOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()))
                .AddDbContext<LngChatDbContext>(x => x.UseMySql(langChatDbConnectionString))
                .AddAutoMapper(typeof(BusinessMappingProfile))
                .AddSingleton<IJwtOptions>(jwtOptions)
                .AddSingleton<IAccessTokenGenerator, JwtAccessTokenGenerator>()
                .AddSingleton(oAuthCredentials["Google"])
                .AddScoped<ITokenValidator, GoogleTokenValidator>()
                .AddScoped<IUserService, UserService>();

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
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
        }
    }
}
