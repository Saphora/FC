using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class ProfileController : BaseController
    {
        // GET: Profile
        public ActionResult Index()
        {
            RepositoryState state = new RepositoryState();

            if(this.repositories.Auth.ActionAuthorized(Roles.GetAllPublic()))
            {
                List<UFestival> userfestivals = this.repositories.Festivals.GetByUser(this.repositories.Auth.CurrentUser.UserID);
                List<Location> userlocations = this.repositories.Locations.GetByUser(this.repositories.Auth.CurrentUser.UserID);
                List<Advertisement> useradds = this.repositories.Advertisement.GetByUser(this.repositories.Auth.CurrentUser.UserID);

                ViewBag.Festivals = userfestivals;
                ViewBag.Locations = userlocations;
                ViewBag.Advertisement = useradds;
                return View();
            } else
            {
                return this.NotAuthorized();
            }
        }
    }
}