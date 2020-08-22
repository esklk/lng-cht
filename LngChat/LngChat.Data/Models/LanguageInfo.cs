using System.ComponentModel.DataAnnotations;

namespace LangChat.Data.Models
{
    public class LanguageInfo
    {
        [Required]
        public string Code { get; set; }

        public LanguageLevel Level { get; set; }

        public bool ToLearn { get; set; }

        public bool ToTeach { get; set; }
    }
}
