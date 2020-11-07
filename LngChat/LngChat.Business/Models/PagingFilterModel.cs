using System.ComponentModel.DataAnnotations;

namespace LngChat.Business.Models
{
    public class PagingFilterModel
    {
        [Range(1,100)]
        public int Limit { get; set; }

        [Range(0, 1000000)]
        public int Offset { get; set; }
    }
}
