using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FC.WebMVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Error",
                url: "error/{number}",
                defaults: new { controller = "Error", Action = "Index", number = UrlParameter.Optional });
            routes.MapRoute(
                name: "FestivalDetail",
                url: "festival/{id}",
                defaults: new { controller = "Festival", Action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(
                name: "Activate",
                url: "register/activate/{id}",
                defaults: new { controller = "Register", action = "Activate", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Signup",
                url: "register/signup/{type}/{userid}",
                defaults: new { controller = "Register", action = "Signup", type = UrlParameter.Optional, userid = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Login",
                url: "Login",
                defaults: new { controller = "Register", action = "Login" }
            );
            routes.MapRoute(
                name: "NewsOverview",
                url: "news",
                defaults: new { controller = "News", action = "Index" }
            );
            routes.MapRoute(
                name: "NewsDetail",
                url: "news/{id}",
                defaults: new { controller = "News", action = "Details", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "DateFilter1",
                url: "{controller}/{action}/",
                defaults: new { controller = "Calendar", action = "Index", month = DateTime.Now.Month, year = DateTime.Now.Year }
            );
            routes.MapRoute(
                name: "DateFilter2",
                url: "calendar/{month}/",
                defaults: new { controller = "Calendar", action = "Index", month = UrlParameter.Optional, year = DateTime.Now.Year }
            );
            routes.MapRoute(
                name: "DateFilter3",
                url: "calendar/{month}/{year}",
                defaults: new { controller = "Calendar", action = "Index", month = UrlParameter.Optional, year = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Calendar", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
