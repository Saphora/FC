using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class IssuesController : Controller
    {
        // GET: Issues
        public ActionResult Index()
        {
            return View();
        }
    }
}