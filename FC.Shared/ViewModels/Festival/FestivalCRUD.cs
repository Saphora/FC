using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Festival
{
    public class FestivalCRUD
    {
        internal Guid? AuthorID;

        public Guid? FestivalID { get; set; }
        public string Name { get; set; }
        public Guid? LocationID { get; set; }
        public Guid? LogoID { get; set; }
        public Guid? MediaDirectoryID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<UGenre> Genres { get; set; }
        public Guid? CountryID { get; set; }
        public string Visitors { get; set; }
    }
}
