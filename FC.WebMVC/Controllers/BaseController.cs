using FC.BL.Repositories;
using FC.Shared.Config;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public abstract class BaseController : Controller
    {
        protected RepositoryContext repositories { get; set; }
        public SmtpClient Client { get; set; }
        public BaseController()
            :base()
        {
            this.repositories = RepositoryContext.GetInstance();
        }

        public string ToHtml(string viewToRender, ViewDataDictionary viewData, ControllerContext controllerContext)
        {
            var result = ViewEngines.Engines.FindView(controllerContext, viewToRender, null);

            StringWriter output;
            using (output = new StringWriter())
            {
                var viewContext = new ViewContext(controllerContext, result.View, viewData, controllerContext.Controller.TempData, output);
                result.View.Render(viewContext, output);
                result.ViewEngine.ReleaseView(controllerContext, result.View);
            }

            return output.ToString();
        }
    }
}