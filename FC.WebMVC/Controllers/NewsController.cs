using FC.BL.Repositories;
using FC.Shared.Config;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class NewsController : BaseController
    {
        // GET: News
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Details(Guid? id)
        {
            UNews model = repositories.News.GetByID(id);

            DateTime filterDateSt = DateTime.Now.AddDays(-31);
            List<UNews> newsList = repositories.News.GetPagedQueryable<UNews>(10, 1, "News").Where(w => w.CreateDate >= filterDateSt).ToList();

            ViewBag.NewsList = newsList;
            repositories.News.Dispose();
            return View(model);
        }
    }
}