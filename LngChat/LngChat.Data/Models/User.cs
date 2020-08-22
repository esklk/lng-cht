using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LangChat.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<LanguageInfo> Languages { get; set; }

        public ICollection<Chat> Chats { get; set; }
    }
}
