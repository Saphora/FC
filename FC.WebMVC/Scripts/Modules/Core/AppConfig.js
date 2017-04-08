///<reference path="../../Shared/Models/SystemHeaders.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        (function (EnvironmentType) {
            EnvironmentType[EnvironmentType["Local"] = 0] = "Local";
            EnvironmentType[EnvironmentType["Remote"] = 1] = "Remote";
        })(Core.EnvironmentType || (Core.EnvironmentType = {}));
        var EnvironmentType = Core.EnvironmentType;
        var Environment = (function () {
            function Environment() {
            }
            Environment.UpdateBuild = function () {
                var version = this.GetVersion().split(".");
                var cacheversion = parseInt(version[2]);
                var releaseversion = parseInt(version[0]);
                var build = parseInt(version[1]) + 1;
                this.VERSION = releaseversion + "." + build + "." + cacheversion;
                CacheManager.WriteStorage("version", this.VERSION);
                return this.VERSION;
            };
            Environment.UpdateCache = function () {
                var version = this.GetVersion().split(".");
                var cacheversion = parseInt(version[2]) + 1;
                var releaseversion = parseInt(version[0]);
                var build = parseInt(version[1]);
                this.VERSION = releaseversion + "." + build + "." + cacheversion;
                CacheManager.WriteStorage("version", this.VERSION);
                return this.VERSION;
            };
            Environment.UpdateRelease = function () {
                var version = this.GetVersion().split(".");
                var cacheversion = 0;
                var build = parseInt(version[1]);
                var releaseversion = parseInt(version[0]) + 1;
                this.VERSION = releaseversion + "." + build + "." + cacheversion;
                CacheManager.WriteStorage("version", this.VERSION);
                return this.VERSION;
            };
            Environment.GetVersion = function () {
                if (CacheManager.Contains("version")) {
                    this.VERSION = CacheManager.Get("version").data;
                    return this.VERSION;
                }
                else {
                    this.VERSION = "1.0.0";
                    return this.VERSION;
                }
            };
            Environment.GetBaseURL = function (et) {
                if (et.toString() == EnvironmentType.Local.toString()) {
                    return Environment.LocalBaseURL;
                }
                if (et.toString() == EnvironmentType.Remote.toString()) {
                    return Environment.RemoteBaseURL;
                }
            };
            Environment.GetMediaURL = function (et) {
                if (et.toString() == EnvironmentType.Local.toString()) {
                    return Environment.MediaURLRootLocal;
                }
                if (et.toString() == EnvironmentType.Remote.toString()) {
                    return Environment.MediaURLRoot;
                }
            };
            Environment.VERSION = "";
            Environment.GeoIPURL = "https://freegeoip.net/json/";
            Environment.LocalBaseURL = "https://localhost:8888";
            Environment.RemoteBaseURL = "https://festival-calendar.nl:8888";
            Environment.GeoServicesURL = "http://wmdevelopment.nl:8080";
            Environment.MediaURLRoot = "https://festival-calendar.nl:8888/";
            Environment.MediaURLRootLocal = "http://localhost:8888/";
            Environment.UploadStateKey = "4C3A3ADE-CCD0-4CAC-A46A-1E8410DDA79C";
            Environment.MEDIA_ROOT_ID = "710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF";
            Environment.FESTIVAL_DIR_ROOT_ID = "1c9f99e9-1ff2-4eef-9f94-25b400340fba";
            Environment.ARTIST_DIR_ROOT_ID = "3aa4eee3-5821-40ce-a82c-5018b890b824";
            Environment.NEWS_DIR_ROOT_ID = "e55379cd-13e3-4180-8b68-07b82e0d6172";
            Environment.APPUSER_DIR_ROOT_ID = "CDEA7718-1081-4204-A839-6463E357151D";
            Environment.REPORT_DIR_ROOT_ID = "359859A6-307D-4907-ACF6-1AD799F25317";
            return Environment;
        }());
        Core.Environment = Environment;
        var AppClient = (function () {
            function AppClient(client) {
                this.CurrentTicks = new Date().getTime();
                this.UserCulture = client.UserCulture,
                    this.Location = client.Location;
                this.ScreenWidth = client.ScreenWidth;
                this.ScreenHeight = client.ScreenHeight;
                this.ViewportWidth = client.ViewportWidth;
                this.ViewportHeight = client.ViewportHeight;
                this.Browser = client.Browser;
                this.SafeConnection = client.SafeConnection;
            }
            return AppClient;
        }());
        Core.AppClient = AppClient;
        var Localization = (function () {
            function Localization() {
            }
            return Localization;
        }());
        Core.Localization = Localization;
        var AppConfig = (function () {
            function AppConfig() {
                this.CurrentCountry = "";
                this.DefaultGenreID = 4492;
                this.CurrentEnvironment = EnvironmentType.Local;
                this.URLRoot = Environment.GetBaseURL(this.CurrentEnvironment);
                this.UserDateTime = new Date();
                this.UserName = "";
                this.UserID = 0;
                this.AnonUser = true;
                this.IsSignedInWithSpotify = false;
                this.IsSignedInWithFacebook = false;
                this.IsSignedInWithTwitter = false;
                this.IsSignedInLocal = false;
                this.Localization = new Localization();
                this.Client = new AppClient({
                    Browser: window.navigator.appName,
                    SafeConnection: (window.location.protocol == "https" ? true : false),
                    ScreenHeight: window.screen.height,
                    ScreenWidth: window.screen.width,
                    Location: "",
                    ViewportHeight: window.innerHeight,
                    ViewportWidth: window.innerWidth,
                    UserCulture: window.navigator.language,
                    CurrentTicks: new Date().getTime()
                });
                this.URLRoot = Environment.GetBaseURL(EnvironmentType.Remote);
                this.ServiceHeaders = new FC.Shared.Models.SystemHeaders();
                this.ServiceHeaders.Culture = this.Client.UserCulture;
                this.ServiceHeaders.UserDateTime = this.Client.CurrentTicks;
                this.ServiceHeaders.ContentType = 'application/json';
                this.ServiceHeaders.Accept = 'application/json';
                if (FC.Shared.Util.CacheManager.GetInstance().Contains("Token")) {
                    this.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().Get("Token").data;
                }
            }
            return AppConfig;
        }());
        Core.AppConfig = AppConfig;
        ;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var $AppConfig = new FC.Core.AppConfig();
//# sourceMappingURL=AppConfig.js.map