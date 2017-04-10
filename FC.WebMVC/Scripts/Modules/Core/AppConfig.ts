///<reference path="../../Shared/Models/SystemHeaders.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>

module FC.Core {
    export enum EnvironmentType {
        Local,
        Remote
    }
    export class Environment {

        private static VERSION = "";
        public static GeoIPURL = "https://freegeoip.net/json/";
        public static LocalBaseURL = "http://localhost:8888";
        public static RemoteBaseURL = "https://festival-calendar.nl:8888";
        public static GeoServicesURL = "http://wmdevelopment.nl:8080";
        public static MediaURLRoot = "https://festival-calendar.nl:8888/";
        public static MediaURLRootLocal = "http://localhost:8888/";
        public static UploadStateKey = "4C3A3ADE-CCD0-4CAC-A46A-1E8410DDA79C";
        public static MEDIA_ROOT_ID= "710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF";
        public static FESTIVAL_DIR_ROOT_ID= "1c9f99e9-1ff2-4eef-9f94-25b400340fba";
        public static ARTIST_DIR_ROOT_ID= "3aa4eee3-5821-40ce-a82c-5018b890b824";
        public static NEWS_DIR_ROOT_ID = "e55379cd-13e3-4180-8b68-07b82e0d6172";
        public static APPUSER_DIR_ROOT_ID= "CDEA7718-1081-4204-A839-6463E357151D";
        public static REPORT_DIR_ROOT_ID = "359859A6-307D-4907-ACF6-1AD799F25317";
        public static GetBaseURL(et: EnvironmentType) {
            if (et.toString() == EnvironmentType.Local.toString()) {
                return Environment.LocalBaseURL;
            }
            if (et.toString() == EnvironmentType.Remote.toString()) {
                return Environment.RemoteBaseURL;
            }
        }
        public static GetMediaURL(et: EnvironmentType) {
            if (et.toString() == EnvironmentType.Local.toString()) {
                return Environment.MediaURLRootLocal;
            }
            if (et.toString() == EnvironmentType.Remote.toString()) {
                return Environment.MediaURLRoot;
            }
        }
    }
    export interface IAppClient {
        Location: string;     
        ScreenWidth: Number;     
        ScreenHeight: Number;     
        ViewportWidth: Number;     
        ViewportHeight: Number;     
        Browser: string;     
        SafeConnection: boolean;  
        UserCulture: string;
        CurrentTicks: Number;
    }

    export class AppClient {
        constructor(client: IAppClient) {
            this.UserCulture = client.UserCulture,
            this.Location = client.Location; 
            this.ScreenWidth = client.ScreenWidth;
            this.ScreenHeight = client.ScreenHeight;
            this.ViewportWidth = client.ViewportWidth;
            this.ViewportHeight = client.ViewportHeight;
            this.Browser = client.Browser;
            this.SafeConnection = client.SafeConnection;
        }
        public CurrentTicks = new Date().getTime();
        public UserCulture: string;
        public Location: string;     
        public ScreenWidth:    Number;     
        public ScreenHeight: Number;     
        public ViewportWidth: Number;     
        public ViewportHeight: Number;     
        public Browser:        string;     
        public SafeConnection: boolean;                   
    }
    export class Localization {
        public ISOCurrencySymbol: string;
        public NegativeSign: string;
        public PositiveSign: string;
        public TimeSeparator: string;
        public CurrencyNativeName: string;
        public RegionEnglishName: string;
        public RegionName: string;
        public CultureIsoName: string;
        public CultureCountryName: string;
        public CultureMoneySign: string;
        public CultureDateSeparator: string;
        public CultureCurrencySeparator: string;
        public CurrencyCultureDecimalDigits: number;
        public NumberDecimalDigits: number;
        public NumberDecimalSeparator: string;
    }
    export class AppConfig {
        constructor() {
            this.URLRoot = Environment.GetBaseURL(EnvironmentType.Remote);
            this.ServiceHeaders = new FC.Shared.Models.SystemHeaders();
            this.ServiceHeaders.Culture = this.Client.UserCulture;
            this.ServiceHeaders.UserDateTime = this.Client.CurrentTicks;
            this.ServiceHeaders.ContentType = 'application/json';
            this.ServiceHeaders.Accept = 'application/json';
            this.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
        }
        public CurrentCountry = "";
        public DefaultGenreID = 4492;
        public CurrentEnvironment = EnvironmentType.Local;
        public URLRoot = Environment.GetBaseURL(this.CurrentEnvironment);
        public UserDateTime = new Date();
        public UserName = "";
        public UserID = 0;
        public AnonUser = true;
        public IsSignedInWithSpotify = false;
        public IsSignedInWithFacebook = false;
        public IsSignedInWithTwitter = false;
        public IsSignedInLocal = false;
        public Localization = new Localization();
        public GeoLocation: Geolocation;
        public Client = new AppClient({
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
        public ServiceHeaders: FC.Shared.Models.SystemHeaders;
        //public static CurrentTheme: INT.IUTheme;
    };
}

var $AppConfig = new FC.Core.AppConfig();