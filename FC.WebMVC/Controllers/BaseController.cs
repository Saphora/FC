using FC.BL.Repositories;
using FC.Shared.Config;
using FC.Shared.Entities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public abstract class BaseController : Controller
    {
        protected RepositoryContext repositories { get; set; }
        public SmtpClient Client { get; set; }

        public ApplicationUser AppUser { get; set; }
        public AppUserSession AppSession { get; set; }
        public Guid? Token { get; set; }
        public BaseController()
            : base()
        {
            this.repositories = RepositoryContext.GetInstance();
        }

        protected ActionResult NotAuthorized()
        {
            this.Flash(new RepositoryState(false, "You do not have the permission to access this content."));
            return Redirect("/Login");
        }

        /// <summary>
        /// New flash message if state.SUCCESS is true then show success. Else show error/warning/info
        /// </summary>
        /// <param name="state"></param>
        public void Flash(RepositoryState state)
        {
            Session.Add("state", state);
        }

        public void GetFlash()
        {
            ViewBag.Flash = Session["state"] as RepositoryState;
            Session.Remove("state");
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var token = this.repositories.Auth.GetHTTPToken();
            this.AppUser = this.repositories.Auth.CurrentUser;
            this.AppSession = this.repositories.Auth.Session;

            if (this.AppUser != null)
            {
                ViewBag.UserID = this.AppUser.UserID;
                ViewBag.User = this.AppUser;
            }
            else
            {
                ViewBag.User = null;
                ViewBag.UserID = null;
            }
            this.GetFlash();

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

        protected bool validateCaptcha()
        {
            var response = Request.Form["g-recaptcha-response"];
            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", FCConfig.RECAPTCHA_PRIVATE, response));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");
            if (status)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}