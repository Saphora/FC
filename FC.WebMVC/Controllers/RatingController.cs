using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FC.WebMVC.Controllers
{
    public class RatingController : BaseController
    {
        // GET: Rating
        //http://localhost:5000/rating/rate/c26fa511-7070-4b9f-abb2-f9ad2af06513/festival/5
        public ActionResult Rate(Guid? id, string type, int ammount, string refer)
        {
            if (refer != "/")
            {
                refer = Encoding.UTF8.GetString(Convert.FromBase64String(refer));
            } 
            this.repositories.Rating.Rate(
                new Shared.ServerMessages.RatingMsg
                {
                    ContentItemID = id,
                    ContentType = type,
                    CreditAmmount = ammount
                }, HttpContext.Request.UserHostName, HttpContext.Request.UserHostAddress);
            return Redirect(refer);
        }
    }
}