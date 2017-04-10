using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Index(int number=500)
        {
            ViewBag.Number = number;
            return View();
        }

        public ActionResult Test()
        {
            throw new Exception("Testing error handler exception. SUCCESS");
        }
    }
}