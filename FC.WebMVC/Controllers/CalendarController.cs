using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FC.Shared.Entities;
using FC.Shared;
using FC.Shared.ViewModels.Festival;

namespace FC.WebMVC.Controllers
{
    public class CalendarController : BaseController
    {
        // GET: Calendar
        public ActionResult Index()
        {
            List<Favorite> favorites = this.repositories.Favorites.GetUserFavorites(this.repositories.Auth.UserID).ToList();

            List<Guid?> countryIDs = favorites.Where(w=>w.ContentType == Shared.Enum.InternalContentType.Country).Select(s => s.ContentID).ToList();
            List<Guid?> locationIDs = favorites.Where(w=>w.ContentType == Shared.Enum.InternalContentType.Location).Select(s => s.ContentID).ToList();
            List<Guid?> artistIDs = favorites.Where(w=>w.ContentType == Shared.Enum.InternalContentType.Artist).Select(s=>s.ContentID).ToList();
            List<Guid?> genreIDs = favorites.Where(w=>w.ContentType == Shared.Enum.InternalContentType.Genre).Select(s=>s.ContentID).ToList();

            List<FestivalVM> model = this.repositories.Festivals.GetFilteredFestival(new Shared.ServerMessages.FestivalFilter()
            {
                YearNum = DateTime.Now.Year,
                MonthNum = DateTime.Now.Month,
                CountryIDs = countryIDs,
                ArtistIDs = artistIDs,
                GenreIDs = genreIDs,
                LocationIDs = locationIDs
            });
            return View(model);
        }
    }
}