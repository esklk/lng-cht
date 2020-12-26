using LngChat.Business.Services;
using LngChat.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LngChat.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        public async Task<string> UploadFile(UploadFileModel file)
        {
            return await _fileService.SaveDataUrlToFileAsync(file.DataUrl);
        }
    }
}
