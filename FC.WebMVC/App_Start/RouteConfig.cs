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
                name: "NewsOverview",
                url: "news",
                defaults: new { controller = "News", action = "Index"}
            );
            routes.MapRoute(
                name: "NewsDetail",
                url: "news/{id}",
                defaults: new { controller = "News", action = "Details", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "DateFilter1",
                url: "{controller}/{action}/",
                defaults: new { controller = "Home", action = "Index", month = DateTime.Now.Month, year = DateTime.Now.Year }
            );
            routes.MapRoute(
                name: "DateFilter2",
                url: "calendar/{month}/",
                defaults: new { controller = "Home", action = "Index", month = UrlParameter.Optional, year = DateTime.Now.Year }
            );
            routes.MapRoute(
                name: "DateFilter3",
                url: "calendar/{month}/{year}",
                defaults: new { controller = "Home", action = "Index", month = UrlParameter.Optional, year = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
