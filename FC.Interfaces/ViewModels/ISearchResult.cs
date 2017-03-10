using FC.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.ViewModels
{
    public interface ISearchResult : IBaseModel
    {
        string Country { get; set; }
        string Location { get; set; }
        string Name { get; set; }
        int[] Genres { get; set; }
        string Image { get; set; }
        string Type { get; set; }
        DateTime Date { get; set; }
    }
}