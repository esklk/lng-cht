using System;
using System.Collections.Generic;

namespace LngChat.Business.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public IEnumerable<LanguageInfoModel> LanguagesToLearn { get; set; }

        public IEnumerable<LanguageInfoModel> LanguagesToTeach{ get; set; }
    }
}
