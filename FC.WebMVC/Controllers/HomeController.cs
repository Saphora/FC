using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FC.Shared.Entities;
using FC.BL.Repositories;
namespace FC.WebMVC.Controllers
{
    public class HomeController : BaseController
    {
        FestivalRepository repo = new FestivalRepository();

        [HttpGet]
        public ActionResult Index(int year = 0, int month = 0)
        {
            return View(repo.GetList(month, year));
        }
        

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}