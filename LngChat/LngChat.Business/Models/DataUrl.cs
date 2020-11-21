using System.Text.RegularExpressions;

namespace LngChat.Business.Models
{
    public enum ContentType
    {
        Image,
        Audio
    }

    public class DataUrl
    {
        public string Base64 { get; set; }

        public string Format { get; set; }

        public ContentType Type { get; set; }

        public static bool TryParse(string value, out DataUrl result)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                result = null;
                return false;
            }

            var match = Regex.Match(value, @"data:(?<type>.+?)/(?<format>.+?);base64,(?<data>.+)");
            if (!match.Success 
                || string.IsNullOrWhiteSpace(match.Groups["format"]?.Value) 
                || string.IsNullOrWhiteSpace(match.Groups["data"]?.Value))
            {
                result = null;
                return false;
            }
            

            ContentType type;
            switch (match.Groups["type"].Value)
            {
                case "image":
                    type = ContentType.Image;
                    break;
                case "audio":
                    type = ContentType.Audio;
                    break;
                default:
                    result = null;
                    return false;
            }

            result = new DataUrl()
            {
                Base64 = match.Groups["data"].Value,
                Format = match.Groups["format"].Value,
                Type = type
            };
            return true;
        }
    }
}
