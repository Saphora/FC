using FC.Interfaces.ViewModels;
using FC.Shared.Helpers;
using FC.Shared.ViewModels.Date;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MaterializedFestivalListVM
    {
        public string GenreNames { get; set; }
        public string ZIPCode { get; set; }
        public string FestivalName { get; set; }
        public string CountryName { get; set; }
        public string City { get; set; }
        public bool IsPublished { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid? ProfileImageID { get; set; }
        public Guid? LogoID { get; set; }
        [Key]
        public Guid? FestivalID { get; set; }

        public DateVM StartDateExplosion { get; set; }
        public DateVM EndDateExplosion { get; set; }



        public static MaterializedFestivalListVM Create(IDataRecord record)
        {
            return new MaterializedFestivalListVM
            {
                GenreNames = PGHelper.Fetch<string>("GenreNames", record),
                ZIPCode = PGHelper.Fetch<string>("ZIPCode", record),
                FestivalName = PGHelper.Fetch<string>("FestivalName", record),
                CountryName = PGHelper.Fetch<string>("CountryName", record),
                IsPublished = PGHelper.Fetch<bool>("IsPublished", record),
                City = PGHelper.Fetch<string>("City", record),
                StartDate = PGHelper.Fetch<DateTime>("StartDate", record),
                EndDate = PGHelper.Fetch<DateTime>("EndDate", record),
                ProfileImageID = PGHelper.Fetch<Guid?>("ProfileImageID", record),
                LogoID = PGHelper.Fetch<Guid?>("LogoID", record),
                FestivalID = PGHelper.Fetch<Guid?>("FestivalID", record),
                StartDateExplosion = new DateVM(PGHelper.Fetch<DateTime>("StartDate", record)),
                EndDateExplosion = new DateVM(PGHelper.Fetch<DateTime>("EndDate", record))
            };
        }

        public MaterializedFestivalListVM()
        {
            if (this.StartDate != null && this.EndDate != null)
            {
                this.Explode(this.StartDate.Value, this.EndDate.Value);
            }
        }
        public MaterializedFestivalListVM(DateTime start, DateTime end)
        {
            if (this.StartDate != null && this.EndDate != null)
            {
                this.Explode(start, end);
            }
        }

        public void Explode(DateTime startDate, DateTime endDate)
        {

            this.StartDateExplosion = new DateVM(startDate);
            this.EndDateExplosion = new DateVM(endDate);
        }
    }
}
