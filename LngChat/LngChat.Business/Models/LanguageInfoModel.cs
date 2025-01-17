﻿using LngChat.Business.Validation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace LngChat.Business.Models
{
    public class LanguageInfoModel
    {
        [StringLength(2)]
        [RegularExpression(Constants.Iso639_1CodesRegularExpression)]
        public string Code { get; set; }

        [Range(0, 5)]
        public int Level { get; set; }
    }
}
