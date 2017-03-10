using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.ViewModels
{
    public class FestivalListView
    {

        public FestivalListView(UFestival f)
        {
            this.Starts = string.Format("{0}", f.StartDate.ToLocalTime());
            this.Ends = string.Format("{0}", f.EndDate.ToLocalTime());
            this.Name = f.Name;
            this.LocationID = f.FestivalLocationID;
            this.CountryID = f.CountryID;
            this.AlbumID = f.MediaDirectoryID;
            this.FestivalID = f.FestivalID;

            if (f.FestivalLocation != null)
            {
                if (f.FestivalLocation.Country != null) {
                    this.CountryName = f.FestivalLocation.Country.Name;
                }
            } else if(f.Country != null)
            {
                this.CountryName = f.Country.Name;
            }
        }
        public string Starts { get; set; }
        public string Ends { get; set; }
        public string CountryName { get; set; }
        public string Name { get; set; }
        public Guid? FestivalID { get; set; }
        public Guid? CountryID { get; set; }
        public Guid? LocationID { get; set; }
        public Guid? AlbumID { get; set; }
    }
}
