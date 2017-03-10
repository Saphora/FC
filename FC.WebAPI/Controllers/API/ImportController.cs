using FC.PGDAL.Migrations.Seeds;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FC.WebAPI.Controllers.API
{
    public class ImportController : BaseAPIController
    {
        public ImportController() : base()
        {

        }
        [HttpGet]
        public bool Import()
        {
            //new SeedCountries("494F7ACB-DC5E-4441-BD2F-8F1A08008FAA");
            //new SeedThemes("4E9E95DB-3F39-45DF-82D4-DDF71F5AA4F1");
            //new SeedGenres("FB6FC308-FB5A-45A5-BC86-22DE54516D76");
            //new SeedArtists("154B6532-AAB4-4DAA-9AA5-A4A5723D309E");
            //new SeedCustomers("CF5C3ED2-F322-4E92-A25B-B8E9506CD25B");
            //new SeedBanners("7FF4D968-597C-477C-9C26-3D83FF9A3244");
            //new SeedVisibility("F66CD5DB-800E-4768-9910-9767525C395A");
            //new SeedFestivals("79E715D5-140B-482D-AF40-9B75ECEBA160");
            //new SeedNews("6B27AA04-0C81-4837-8F46-6B28B767121E");
            //new SeedAnnouncements("529DF3E0-8EA1-44E3-B6E3-F925F869DC01");
            return true;
        }
    }
}
