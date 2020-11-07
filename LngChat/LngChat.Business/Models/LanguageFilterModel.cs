using LngChat.Business.Validation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace LngChat.Business.Models
{
    public class LanguageFilterModel
    {
        [StringLength(2)]
        [RegularExpression(Constants.Iso639_1CodesRegularExpression)]
        public string Code { get; set; }

        [Range(0, 5)]
        [LessThan(nameof(LevelMax))]
        public int LevelMin { get; set; } = 0;

        [Range(0, 5)]
        [GreaterThan(nameof(LevelMin))]
        public int LevelMax { get; set; } = 5;
    }
}
