using LngChat.Business.Models;
using System;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public interface IFileService
    {
        Task<string> CreateIfDifferentAsync(string newUrl, string oldUrl, Func<DataUrl, bool> dataUrlValidator = null);
        void DeleteFile(string path);
        Task<string> SaveDataUrlToFileAsync(string dataUrl, Func<DataUrl, bool> dataUrlValidator = null);
        Task<string> SaveDataUrlToFileAsync(DataUrl dataUrl);
    }
}