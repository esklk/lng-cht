using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LngChat.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Bio { get; set; }

        public string ProfilePictureUrl { get; set; }

        public ICollection<LanguageInfo> Languages { get; set; }

        public ICollection<UserChat> UserChats { get; set; }
    }
}
