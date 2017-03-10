using FC.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ContentDetail
    {
        public ContentDetail(IContentDetail data, string title) 
        {
            this.ContentType = data.ContentType;
            this.MetaKeys = data.MetaKeys;
            this.MetaDescription = data.MetaDescription;
            this.GenreIds = data.GenreIds;
            this.Author = data.Author;
            if (title == null) {
                this.Title = data.Title;
            } else if(data.Title == null)
            {
                throw new Exception("Cannot set property title of content detail object");
            } else
            {
                this.Title = title;
            }
            this.OrderDate = data.OrderDate;
            this.DisplayDate = data.DisplayDate;
            this.ShortText = data.ShortText;
            this.DetailText = data.DetailText;
            this.Link = data.Link;
            this.ShowReadMore = data.ShowReadMore;
            this.SortOrder = data.SortOrder;
            this.Rating = data.Rating;
            this.Thumbnail = data.Thumbnail;
        }
        public int UmbracoID { get; set; }
        public string Thumbnail { get; set; }
        public string ContentType { get; set; }
        public string MetaKeys { get; set; }
        public string MetaDescription { get; set; }
        public List<string> GenreIds { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public long OrderDate { get; set; }
        public string DisplayDate { get; set; }
        public string ShortText { get; set; }
        public string DetailText { get; set; }
        public string Link { get; set; }
        public bool ShowReadMore { get; set; }
        public int SortOrder { get; set; }
        public string Rating { get; set; }
    }
}
