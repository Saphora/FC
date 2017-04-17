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
            return View();
        }
    }
}