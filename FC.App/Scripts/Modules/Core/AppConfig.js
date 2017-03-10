///<reference path="../../Shared/Models/SystemHeaders.ts"/>
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
            Environment.GetBaseURL = function (et) {
                if (et.toString() == EnvironmentType.Local.toString()) {
                    return Environment.LocalBaseURL;
                }
                if (et.toString() == EnvironmentType.Remote.toString()) {
                    return Environment.RemoteBaseURL;
                }
            };
            Environment.LocalBaseURL = "https://localhost:8888";
            Environment.RemoteBaseURL = "https://festival-calendar.nl:8888";
            Environment.GeoServicesURL = "https://wmdevelopment.nl:8080";
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
                this.CurrentEnvironment = EnvironmentType.Remote;
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
                    UserCulture: window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage || window.navigator.systemLanguage,
                    CurrentTicks: new Date().getTime()
                });
                this.ServiceHeaders = new FC.Shared.Models.SystemHeaders({ Culture: this.Client.UserCulture, UserDateTime: this.Client.CurrentTicks, ContentType: 'applications/json', Accept: 'application/json', Token: "notimplemented" });
                this.URLRoot = Environment.GetBaseURL(EnvironmentType.Remote);
            }
            return AppConfig;
        }());
        Core.AppConfig = AppConfig;
        ;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var $AppConfig = new FC.Core.AppConfig();
