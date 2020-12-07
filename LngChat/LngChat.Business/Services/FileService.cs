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

            return SaveDataUrlToFileAsync(newUrl, dataUrlValidator);
        }

        public Task<string> SaveDataUrlToFileAsync(string dataUrl, Func<DataUrl, bool> dataUrlValidator = null)
        {
            if (!DataUrl.TryParse(dataUrl, out var parsedDataUrl)
                || (dataUrlValidator == null && !dataUrlValidator.Invoke(parsedDataUrl)))
            {
                throw new ArgumentException($"The value is invalid or unsupported data url.", nameof(dataUrl));
            }

            return SaveDataUrlToFileAsync(parsedDataUrl);
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
