using LngChat.Business.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public class FileService : IFileService
    {
        private readonly string _rootPath;
        private readonly string _webHost;

        public FileService(string rootPath, string webHost)
        {
            _rootPath = !string.IsNullOrWhiteSpace(rootPath) 
                ? rootPath 
                : throw new ArgumentNullException(nameof(rootPath));
            
            _webHost = !string.IsNullOrWhiteSpace(webHost)
                ? webHost 
                : throw new ArgumentNullException(nameof(webHost));
        }

        public Task<string> CreateIfDifferentAsync(string newUrl, string oldUrl, Func<DataUrl, bool> dataUrlValidator = null)
        {
            //has not been chanched
            if (newUrl == oldUrl 
                || (!string.IsNullOrWhiteSpace(newUrl)
                && !string.IsNullOrWhiteSpace(oldUrl)
                && Path.GetFileName(newUrl) == Path.GetFileName(oldUrl)))
            {
                return Task.FromResult(oldUrl);
            }

            //has been deleted
            if (string.IsNullOrWhiteSpace(newUrl))
            {
                return Task.FromResult(null as string);
            }

            if (!DataUrl.TryParse(newUrl, out var newProfilePicture)
                || (dataUrlValidator == null && !dataUrlValidator.Invoke(newProfilePicture)))
            {
                throw new ArgumentException($"The value of ${nameof(newUrl)} is invalid or unsupported data url.");
            }

            return SaveDataUrlToFileAsync(newProfilePicture);
        }

        public async Task<string> SaveDataUrlToFileAsync(DataUrl dataUrl)
        {
            if (dataUrl == null)
            {
                throw new ArgumentNullException(nameof(dataUrl));
            }

            var binData = Convert.FromBase64String(dataUrl.Base64);

            var fileName = GenerateUniqueFileName(dataUrl.Format);

            await File.WriteAllBytesAsync(Path.Combine(_rootPath, fileName), binData);

            return _webHost + fileName;
        }

        public void DeleteFile(string path)
        {
            var fileName = Path.GetFileName(path);
            File.Delete(Path.Combine(_rootPath, fileName));
        }

        private static string GenerateUniqueFileName(string extension) => !string.IsNullOrWhiteSpace(extension)
            ? Guid.NewGuid() + (extension.StartsWith('.') ? extension : "." + extension)
            : throw new ArgumentNullException(nameof(extension));
    }
}
