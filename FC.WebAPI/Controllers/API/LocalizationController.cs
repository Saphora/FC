
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Configuration;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Globalization;
using System.IO;
using System.Configuration;

namespace FC.WebAPI.Controllers.API
{
    public class LocalizationController : BaseAPIController
    {
        public string CacheFilePath { get; set; }
        public LocalizationController() :
            base()
        {
        }

        public ServiceResponse<List<UCountry>> GetAllCountryIds()
        {

            return null;
        }

        [HttpGet]
        public ServiceResponse<UserLocalization> GetLocaleInfo()
        {
            UserLocalization locale = new UserLocalization(CultureInfo.CurrentCulture, RegionInfo.CurrentRegion);
            return new ServiceResponse<UserLocalization>(locale, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }
    }
}
