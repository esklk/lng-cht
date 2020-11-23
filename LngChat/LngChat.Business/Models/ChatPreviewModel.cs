namespace LngChat.Business.Models
{
    public class ChatPreviewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string PictureUrl { get; set; }

        public MessageModel LatestMessage { get; set; }
    }
}
