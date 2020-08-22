using System.ComponentModel.DataAnnotations;

namespace LngChat.Data.Models
{
    public class LanguageInfo
    {
        public int Id { get; set; }

        /// <summary>
        /// An ISO 639-1 language code.
        /// </summary>
        [StringLength(2)]
        public string Code { get; set; }

        public LanguageLevel Level { get; set; }

        public bool ToLearn { get; set; }

        public bool ToTeach { get; set; }
    }
}
