using System;

namespace LngChat.Business.Models
{
    public class UserFilterModel : PagingFilterModel
    {
        public LanguageFilterModel[] LanguagesToLearn { get; set; } = Array.Empty<LanguageFilterModel>();

        public LanguageFilterModel[] LanguagesToTeach { get; set; } = Array.Empty<LanguageFilterModel>();
    }
}
