using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Wonderland
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "Comments",
               url: "comments",
               defaults: new { controller = "default", action = "Comments" }
            );

            routes.MapRoute(
            name: "NewComment",
            url: "comments/new",
            defaults: new { controller = "default", action = "AddComment" }
            );

            routes.MapRoute(
            name: "Friends",
            url: "friends/{_id}",
            defaults: new { controller = "default", action = "GetFriends", _id=1 }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller="default", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Default1",
               url: "/user/home",
               defaults: new { controller = "default", action = "Index" }
           );

            routes.MapRoute(
               name: "home",
               url: "home",
               defaults: new { controller = "default", action = "Home", id = UrlParameter.Optional }
           );
        }
    }
}

