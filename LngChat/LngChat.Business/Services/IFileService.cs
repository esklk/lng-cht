using LngChat.Business.Models;
using System;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IFileService
    {
        void DeleteFile(string path);
        Task<string> SaveDataUrlToFileAsync(DataUrl dataUrl);

        Task<string> CreateIfDifferentAsync(string newUrl, string oldUrl, Func<DataUrl, bool> dataUrlValidator = null);
    }
}