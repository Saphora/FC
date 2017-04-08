using FC.BL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace FC.WebAPI.Attribs
{
    public class SetToken : ActionFilterAttribute
    {
        private RepositoryContext ctx { get; set; }
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            ctx = RepositoryContext.GetInstance();
            ctx.Auth.GetRequestToken();
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
        }
    }
}