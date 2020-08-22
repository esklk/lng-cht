using System;
using System.Collections.Generic;
using System.Text;

namespace LangChat.Business.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public IEnumerable<LanguageInfoModel> LanguagesToLearn { get; set; }

        public IEnumerable<LanguageInfoModel> LanguagesToTeach{ get; set; }
    }
}
