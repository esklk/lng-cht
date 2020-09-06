using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public async Task<ContentResult> Get() 
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Content", "HelloWorld.html");

            var fileText = await System.IO.File.ReadAllTextAsync(filePath);

            return new ContentResult
            {
                ContentType = "text/html",
                Content = fileText
            };
        }

        [HttpPost]
        [Authorize]
        public string Post(string message) 
        {
            return $"User #{User.FindFirst(ClaimTypes.NameIdentifier).Value}: {message} | It works! ᕦ( ͡° ͜ʖ ͡°)ᕤ";
        }
    }
}
