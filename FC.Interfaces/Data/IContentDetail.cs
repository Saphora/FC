using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Data
{
    public interface IContentDetail : IBaseModel
    {
        IContentDetail constructor(IContentDetail data, string title);
        string Thumbnail { get;}
        string ContentType { get; }
        string MetaKeys { get; }
        string MetaDescription { get; }
        List<string> GenreIds { get; }
        string Author { get; }
        string Title { get; }
        long OrderDate { get; }
        string DisplayDate { get; }
        string ShortText { get; }
        string DetailText { get; }
        string Link { get; }
        bool ShowReadMore { get; }
        int SortOrder { get; }
        string Rating { get; }
    }
}
