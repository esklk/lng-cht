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

namespace LngChat.WebAPI
{
    public class Startup
    {
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

            var langChatDbConnectionString = Configuration.GetConnectionString("LangChatDb");
            services
                .AddDbContext<LngChatDbContext>(x => x.UseMySql(langChatDbConnectionString))
                .AddAutoMapper(typeof(DefaultMappingProfile))
                .AddSingleton<IJwtOptions>(jwtOptions)
                .AddSingleton<IAccessTokenGenerator, JwtAccessTokenGenerator>()
                .AddScoped<IUserAccountService, UserAccountService>();



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
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
        }
    }
}
