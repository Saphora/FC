using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace FC.Shared.Entities
{
    public class FestivalListItem
    {
        [Key]
        public Guid? FestivalID{ get; set; }
        public string FestivalName{ get; set; }
        public string LocationName{ get; set; }
        public Guid? LocationID { get; set; }
        public Guid? LogoID { get; set; }
        public DateTime StartDate{ get; set; }
        public DateTime EndDate{ get; set; }
        public Guid? AuthorID { get; set; }
        public string AuthorName { get; set; }
        public string Visitors{ get; set; }
        public string City{ get; set; }
        public string CountryName{ get; set; }
        public Guid? CountryID { get; set; }
        public string FestivalGenreNames{ get; set; }
        public string FestivalGenreIDs{ get; set; }

        public List<Guid> GenreIDs
        {
            get
            {
                return this.FestivalGenreIDs.Split(' ').Select(s => Guid.Parse(s)).ToList();
            }
        }

        public List<string> GenreNames
        {
            get
            {
                return this.FestivalGenreNames.Split(',').Select(s => HttpUtility.HtmlDecode(s.Replace(",",""))).ToList();
            }
        }

        public string Start_Y1{ get; set; }
        public string Start_Y2{ get; set; }
        public string Start_Y3{ get; set; }
        public string Start_Y4{ get; set; }
        public string Start_M{ get; set; }
        public string Start_Day{ get; set; }
        public string End_Y1{ get; set; }
        public string End_Y2{ get; set; }
        public string End_Y3{ get; set; }
        public string End_Y4{ get; set; }
        public string End_M{ get; set; }
        public string End_Day{ get; set; }
        public string DayCount{ get; set; }
    }
}
