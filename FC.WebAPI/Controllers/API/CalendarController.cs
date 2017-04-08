using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Globalization;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using FC.Shared.Umbraco;
using FC.Interfaces.Utils;
using FC.Shared.EntityMapper;


using FC.Shared.Helpers;

namespace FC.WebAPI.Controllers.API
{
    public class CalendarController : BaseAPIController
    {

        [HttpGet]
        public ServiceResponse<List<string>> GetDaysInMonth(int year=0, int month=0)
        {
            if (year == 0 && month == 0)
            {
                year = DateTime.Now.Year;
                month = DateTime.Now.Month;
            } else if(year == 0)
            {
                year = DateTime.Now.Year;
            } else if(month == 0)
            {
                month = DateTime.Now.Month;
            }

            int index = 1;
            List<string> result = new List<string>();
            while(index <= DateTime.DaysInMonth(year, month))
            {
                result.Add(index.ToString());
                index++;
            }
            return new ServiceResponse<List<string>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }
    }
}
