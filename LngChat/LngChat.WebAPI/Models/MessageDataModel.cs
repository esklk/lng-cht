using System.ComponentModel.DataAnnotations;

namespace LngChat.WebAPI.Models
{
    public class MessageDataModel
    {
        [Required]
        [RegularExpression("text|voice|image")]
        public string ContentType { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
