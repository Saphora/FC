var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var SystemHeaders = (function () {
                function SystemHeaders(headers) {
                    if (headers) {
                        if (headers.UserDateTime) {
                            this.UserDateTime = headers.UserDateTime;
                        }
                        if (headers.Culture) {
                            this.Culture = headers.Culture;
                        }
                        if (headers.Accept) {
                            this.Accept = headers.Accept;
                        }
                        if (headers.ContentType) {
                            this.ContentType = headers.ContentType;
                        }
                        if (headers.Token) {
                            this.Token = headers.Token;
                        }
                    }
                }
                return SystemHeaders;
            }());
            Models.SystemHeaders = SystemHeaders;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
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
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var ServiceBase = (function () {
            function ServiceBase($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            }
            ServiceBase.prototype.Get = function (url, params) {
                var _this = this;
                var result;
                url = $AppConfig.URLRoot + url;
                if (params && params.length > 0) {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                return result;
            };
            ServiceBase.prototype.GetRaw = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var result;
                result = this.$http.get(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                return result;
            };
            ServiceBase.prototype.JSONP = function (url, params) {
                var _this = this;
                var result;
                url = $AppConfig.URLRoot + url;
                if (params && params.length > 0) {
                    result = this.$http.jsonp(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                return result;
            };
            ServiceBase.prototype.RawJSONP = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var result;
                result = this.$http.jsonp(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                return result;
            };
            ServiceBase.prototype.PostRaw = function (url, params, headers) {
                var _this = this;
                var result;
                var hdrs = {};
                var prms = {};
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                result = this.$http.post(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                return result;
            };
            ServiceBase.prototype.Post = function (url, svcMsg) {
                var _this = this;
                url = $AppConfig.URLRoot + url;
                var result;
                result = this.$http.post(url, svcMsg).then(function (response) { return _this.handlerResponded(response, {}); });
                return result;
            };
            ServiceBase.prototype.handlerResponded = function (response, params) {
                if (params && params.length > 0) {
                    response.Params = params;
                }
                return new FC.Shared.Models.ServiceResponse(response.data);
            };
            ServiceBase.prototype.handlerRespondedRaw = function (response, params) {
                return response;
            };
            return ServiceBase;
        }());
        Core.ServiceBase = ServiceBase;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            (function (CacheMode) {
                CacheMode[CacheMode["Cookie"] = 1] = "Cookie";
                CacheMode[CacheMode["LocalStorage"] = 2] = "LocalStorage";
                CacheMode[CacheMode["Server"] = 3] = "Server";
            })(Util.CacheMode || (Util.CacheMode = {}));
            var CacheMode = Util.CacheMode;
            var CacheManager = (function () {
                function CacheManager(instKey) {
                    if (instKey == CacheManager.GetInstKey()) {
                        var vm = this;
                        vm.HasErrors = false;
                        vm.Errors = new Array();
                        vm.Expires = 60000;
                    }
                    else {
                        throw new Error("Use CacheManager.GetInstance() for instantiating this class, or get the instance key by CacheManager.GetInstKey() first..");
                    }
                }
                CacheManager.GetInstKey = function () {
                    return "132B862D62FE41F0B1865F43BF574BAC";
                };
                CacheManager.GetInstance = function () {
                    if (CacheManager.__inst == null) {
                        CacheManager.__inst = new CacheManager("132B862D62FE41F0B1865F43BF574BAC");
                    }
                    return CacheManager.__inst;
                };
                CacheManager.prototype.StripNullElements = function (arr) {
                    var result = new Array();
                    arr.forEach(function (value, index) {
                        if (value) {
                            result.push(value);
                        }
                    });
                    return result;
                };
                CacheManager.prototype.WriteStorage = function (key, obj, ms) {
                    var currentDate = new Date();
                    if (ms) {
                        this.Expires = ms;
                    }
                    var expires = new Date().getTime() + this.Expires;
                    var data = {
                        expires: expires,
                        data: obj
                    };
                    try {
                        var str = JSON.stringify(data);
                        if (data.data) {
                            localStorage.setItem(key, str);
                            console.log(localStorage);
                            var event = new Event(key + "_Writed");
                            window.dispatchEvent(event);
                        }
                        else {
                            throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                        }
                    }
                    catch (ex) {
                        alert(ex);
                    }
                };
                CacheManager.prototype.GetStorage = function (key, successCallback, expiredCallback) {
                    try {
                        var vm = this;
                        console.log(localStorage);
                        var value = localStorage.getItem(key);
                        var data = null;
                        if (value) {
                            data = JSON.parse(value);
                        }
                        else {
                            return null;
                        }
                        if (data && data.expires) {
                            if (data.expires > new Date().getTime()) {
                                if (successCallback) {
                                    successCallback(data);
                                }
                                return data;
                            }
                            else {
                                console.info('Data expired ' + key + ' from localstorage');
                                this.DeleteStorage(key);
                                if (expiredCallback) {
                                    expiredCallback();
                                }
                                return null;
                            }
                        }
                        else {
                            return null;
                        }
                    }
                    catch (ex) {
                        alert("Get storage exception thrown: " + ex);
                        return null;
                    }
                };
                CacheManager.prototype.DeleteStorage = function (key) {
                    localStorage.removeItem(key);
                };
                CacheManager.prototype.Contains = function (key) {
                    //if (cacheMode == CacheMode.LocalStorage) {
                    if (localStorage[key]) {
                        var value = localStorage[key];
                        var data = null;
                        if (value) {
                            var data = JSON.parse(value);
                        }
                        if (data && data.expires && data.expires > new Date().getTime()) {
                            return true;
                        }
                        else {
                            this.DeleteStorage(key);
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                    //}
                };
                return CacheManager;
            }());
            Util.CacheManager = CacheManager;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="AppConfig.ts"/>
///<reference path="ServiceBase.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        function IsNullOrEmpty(obj) {
            if (obj == null) {
                return true;
            }
            else if (obj.length == 0) {
                return true;
            }
            else if (obj == undefined) {
                return true;
            }
            else if (obj.lenght == 0) {
                return true;
            }
            else if (typeof (obj) == "string" && obj == "") {
                return true;
            }
            return false;
        }
        Core.IsNullOrEmpty = IsNullOrEmpty;
        function StrFormat(template, args) {
            if (!IsNullOrEmpty(template)) {
                var tpl = template;
                var returnStr = "";
                if (args.length > 1) {
                    $.each(args, function (k, v) {
                        if (k > 0) {
                            var readKey = k - 1;
                            tpl = tpl.replace("{" + readKey + "}", v);
                        }
                    });
                    return tpl;
                }
                else {
                    console.error("StrFormat function called whitout any formatting arguments.");
                }
            }
            else {
                console.error("No string template was specified for the StrFormat function");
            }
        }
        Core.StrFormat = StrFormat;
        var ModuleRegister = new Array();
        var FCModule = (function () {
            function FCModule(name, modules) {
                this.name = name;
                this.modules = modules;
                if (modules.length > 0) {
                    this.app = angular.module(name, modules);
                    this.app.config(function ($routeProvider, $locationProvider) {
                        $locationProvider.html5Mode(false);
                    });
                }
                else {
                    this.app = angular.module(name);
                }
            }
            FCModule.prototype.RegisterController = function (controllerName, controller) {
                this.app.controller(controllerName, controller);
            };
            FCModule.prototype.RegisterService = function (serviceName, service) {
                this.app.service(serviceName, service);
            };
            FCModule.prototype.RegisterModule = function (moduleName, module) {
                ModuleRegister[moduleName] = module;
            };
            FCModule.prototype.GetModule = function (name) {
                return ModuleRegister[name];
            };
            FCModule.prototype.AddRoute = function (urlFormat, tplName, controllerName, controllerAlias) {
                this.app.config(function ($routeProvider, $locationProvider) {
                    $routeProvider.when(urlFormat, {
                        templateUrl: tplName,
                        controller: controllerName,
                        controllerAs: controllerAlias
                    });
                });
            };
            return FCModule;
        }());
        Core.FCModule = FCModule;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var ApplicationDependencies = [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'FC.Modules.Theming'
];
var Application = new FC.Core.FCModule("FC", ApplicationDependencies);
var CacheManager = FC.Shared.Util.CacheManager.GetInstance();
//TODO: Implement these vars in CacheManager --> Every API controller has an method Regenerate which will Regenerate the Cache files.
//let GenreData: any;  //genres.js
//let SortedGenreData: any; //genres.js
var fx;
var accounting;
var ThemeData;
console.info("this ....");
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Banners;
        (function (Banners_1) {
            var Banners = (function () {
                function Banners(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Banners.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Banners;
            }());
            Banners_1.Banners = Banners;
        })(Banners = Modules.Banners || (Modules.Banners = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var BannerModule = new FC.Modules.Banners.Banners(angular.module('FC.Modules.Banners', ApplicationDependencies), Application);
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Banners;
        (function (Banners) {
            var Services;
            (function (Services) {
                var BannerService = (function (_super) {
                    __extends(BannerService, _super);
                    function BannerService(http, q) {
                        _super.call(this, http, q);
                    }
                    BannerService.prototype.GetBanners = function (filter) {
                        return this.Post('/Umbraco/API/Banner/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    BannerService.$inject = ['$http', '$q'];
                    return BannerService;
                }(FC.Core.ServiceBase));
                Services.BannerService = BannerService;
            })(Services = Banners.Services || (Banners.Services = {}));
        })(Banners = Modules.Banners || (Modules.Banners = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
BannerModule.GetApplication().app.service('FC.Modules.Banners.Services.BannerService', FC.Modules.Banners.Services.BannerService);
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar_1) {
            var Calendar = (function () {
                function Calendar(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:country", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month/:country", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month/:country/:genre", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                }
                Calendar.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Calendar;
            }());
            Calendar_1.Calendar = Calendar;
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var CalendarModule = new FC.Modules.Calendar.Calendar(angular.module('FC.Modules.Calendar', ApplicationDependencies), Application);
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var CoreModel;
        (function (CoreModel) {
            var KeyValuePair = (function () {
                function KeyValuePair(key, value) {
                    if (key) {
                        this.Key = key;
                    }
                    if (value) {
                        this.Value = value;
                    }
                    return this;
                }
                return KeyValuePair;
            }());
            CoreModel.KeyValuePair = KeyValuePair;
            var Dictionary = (function () {
                function Dictionary(dict) {
                    var vm = this;
                    vm.data = new Array();
                    $.each(dict, function (key, value) {
                        vm.Add(key, value, vm);
                    });
                    return vm;
                }
                Dictionary.prototype.GetAllKeys = function () {
                    var result = [];
                    $.each(this.data, function (k, v) {
                        result.push(k);
                    });
                    return result;
                };
                Dictionary.prototype.Add = function (key, value, scope) {
                    scope.data.push(new KeyValuePair(key, value));
                };
                Dictionary.prototype.GetAll = function () {
                    return this.data;
                };
                Dictionary.prototype.Get = function (k) {
                    $.each(this.data, function (index, value) {
                        if (value.Key == k) {
                            debugger;
                            return value.Value;
                        }
                    });
                    return null;
                };
                Dictionary.prototype.GetAllArray = function () {
                    var r = {};
                    $.each(this.data, function (k, v) {
                        r[v.Key.toString()] = v.Value;
                    });
                    return r;
                };
                Dictionary.prototype.GetByValue = function (v) {
                    var index = 0;
                    var self = this;
                    $.each(this.data, function (index, value) {
                        if (value.Value == v) {
                            return self.data[index];
                        }
                        index++;
                    });
                    return null;
                };
                return Dictionary;
            }());
            CoreModel.Dictionary = Dictionary;
        })(CoreModel = Core.CoreModel || (Core.CoreModel = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var NominatimService = (function (_super) {
                __extends(NominatimService, _super);
                function NominatimService(http, q) {
                    _super.call(this, http, q);
                    this.Euro = 0;
                }
                NominatimService.prototype.GetUserlocation = function (lat, long) {
                    var location;
                    return this.GetRaw(Core.Environment.GeoServicesURL + '/reverse.php?format=html&lat=' + lat + '&lon=' + long + '&format=json');
                };
                NominatimService.$inject = ['$http', '$q'];
                return NominatimService;
            }(FC.Core.ServiceBase));
            Services.NominatimService = NominatimService;
            Application.app.service('FC.Core.Services.NominatimService', FC.Core.Services.NominatimService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../Calendar.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Services;
            (function (Services) {
                var CalendarService = (function (_super) {
                    __extends(CalendarService, _super);
                    function CalendarService(http, q) {
                        _super.call(this, http, q);
                    }
                    CalendarService.prototype.GetMonths = function () {
                        return this.Get('/Umbraco/API/Calendar/GetMonths');
                    };
                    CalendarService.prototype.GetFestivals = function (genre, month, year) {
                        return this.Get('/Umbraco/API/Festival/GetByMonth?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year);
                    };
                    CalendarService.prototype.GetFestivalsByCountry = function (genre, month, year, country) {
                        return this.Get('/Umbraco/API/Festival/GetByCountry?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year + '&country=' + country);
                    };
                    CalendarService.prototype.GetFilteredFestivals = function (month, year, genres, countryId) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = countryId;
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/Umbraco/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    CalendarService.$inject = ['$http', '$q'];
                    return CalendarService;
                }(FC.Core.ServiceBase));
                Services.CalendarService = CalendarService;
                CalendarModule.$Application.RegisterService('FC.Modules.Calendar.Services.CalendarService', FC.Modules.Calendar.Services.CalendarService);
            })(Services = Calendar.Services || (Calendar.Services = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Modules/Core/AppConfig.ts" />
///<reference path="../Util/CacheManager.ts"/>
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Controllers;
        (function (Controllers) {
            var BaseController = (function () {
                function BaseController($http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc) {
                    this.BaseIsLoading = true;
                    this._detectCount = 0;
                    this._timeout = null;
                    var vm = this;
                    this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                    this.$scope = $scope;
                    this.$http = $http;
                    this.$q = $q;
                    this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                    this.CountriesSvc = new FC.Modules.Countries.Services.CountriesService($http, $q);
                    this.LocalizationService = LocalizationSvc;
                    this.ThemingSvc = ThemingService;
                    this.$location = $location;
                    this.$routeParams = $routeParams;
                    this.$inst = this;
                    this.initLoadingScope();
                    this.SetThemeData();
                    this.SetCountryCache();
                    this.SetGenreData();
                }
                BaseController.prototype.initLoadingScope = function () {
                    var vm = this;
                    vm.$scope.IsThemesLoading = true;
                    vm.$scope.IsCountriesLoading = true;
                    vm.$scope.IsGenresLoading = true;
                    vm.$scope.IsFestivalsLoading = true;
                };
                BaseController.prototype.detectByLang = function ($scope) {
                    var vm = this;
                    $AppConfig.CurrentCountry = navigator.browserLanguage || navigator.language || navigator.systemLanguage;
                    vm.CountriesSvc.GetByCode($AppConfig.CurrentCountry).then(function (r) {
                        var country = r.Data;
                        $scope.CurrentCountryName = country.Name;
                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                        $scope.vm.CacheManager.WriteStorage('user-location', $AppConfig.CurrentCountry);
                        if (!$scope.vm.CacheManager.Contains("user-countries")) {
                            $scope.vm.CacheManager.WriteStorage('user-countries', [r.Data.CountryID]);
                        }
                        vm.SetUserCountries();
                    });
                };
                BaseController.prototype.SetGenreData = function () {
                    var vm = this;
                    if (!this.CacheManager.Contains("sys-genres")) {
                        vm.GenreService.GetAllRoot().then(function (r) {
                            vm.CacheManager.WriteStorage("sys-genres", r.Data);
                            var genreIDs = [];
                            if (!vm.CacheManager.Contains("user-genres")) {
                                r.Data.forEach(function (value, index) {
                                    if (value.Name.toLowerCase() == "default") {
                                        value.Children.forEach(function (value, key) {
                                            genreIDs.push(value.GenreID);
                                        });
                                        vm.CacheManager.WriteStorage("user-genres", genreIDs, 1000 * 60 * 60 * 24 * 7);
                                    }
                                });
                            }
                        });
                    }
                };
                BaseController.prototype.SetThemeData = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("active-theme")) {
                        ThemeData.forEach(function (theme, key) {
                            if (theme.Name.toLowerCase() == "default") {
                                vm.CacheManager.WriteStorage("active-theme", theme, 1000 * 60 * 60 * 24 * 2);
                                vm.$scope.IsThemesLoading = false;
                            }
                        });
                    }
                };
                BaseController.prototype.SetCountryCache = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-countries")) {
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                            vm.$scope.IsCountriesLoading = false;
                        });
                    }
                };
                BaseController.prototype.DetectLocation = function ($scope) {
                    var vm = this;
                    vm.$scope.vm = this;
                    vm.NominatimSvc = new FC.Core.Services.NominatimService(vm.$http, vm.$q);
                    if (!vm.CacheManager.Contains("user-location")) {
                        if (navigator.geolocation) {
                            vm._detectCount++;
                            //todo implement coord cache so that we minimalize request to nominatim.
                            navigator.geolocation.getCurrentPosition(function (position) {
                                vm.NominatimSvc.GetUserlocation(position.coords.latitude, position.coords.longitude).then(function (r) {
                                    console.log("Location detected via Nominatim");
                                    var data = new FC.Shared.Models.NLocation(r.data);
                                    $AppConfig.CurrentCountry = data.address.country_code;
                                    vm.CountriesSvc.GetByCode($AppConfig.CurrentCountry).then(function (r) {
                                        var country = r.Data;
                                        $scope.CurrentCountryName = country.Name;
                                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                                        $scope.vm.CacheManager.WriteStorage('user-location', $AppConfig.CurrentCountry);
                                        vm.SetUserCountries();
                                        if (!$scope.vm.CacheManager.Contains("user-countries")) {
                                            $scope.vm.CacheManager.WriteStorage('user-countries', [r.Data.CountryID]);
                                        }
                                    });
                                });
                            }, function () { vm.detectByLang(vm.$scope); }, { timeout: 10000 });
                        }
                        else {
                            vm.detectByLang($scope);
                        }
                    }
                    else {
                        vm.CacheManager.GetStorage("user-location", function (data) { vm.LocationCacheReceived(data, vm.$scope); }, this.DetectLocation);
                    }
                };
                BaseController.prototype.SetUserCountries = function () {
                    var vm = this;
                    var CountryData = new Array();
                    if (vm.CacheManager.Contains("sys-countries")) {
                        CountryData = vm.CacheManager.GetStorage("sys-countries");
                    }
                    else {
                        vm.CountriesSvc.GetAll().then(function (r) {
                            CountryData = r.Data;
                            vm.CacheManager.WriteStorage("sys-countries", CountryData, 1000 * 60 * 60 * 2);
                        });
                    }
                    if (vm.CacheManager.Contains("user-countries")) {
                        var countries = vm.CacheManager.GetStorage("user-countries");
                        vm.ActiveCountryIDs = countries.data;
                    }
                };
                BaseController.prototype.LocationCacheReceived = function (result, $scope) {
                    var vm = $scope.vm;
                    var data = result.data;
                    vm.CountriesSvc.GetByCode(data).then(function (r) {
                        var country = r.Data;
                        $AppConfig.CurrentCountry = data;
                        $scope.ActiveCountryName = country.Name;
                        $scope.CurrentCountryName = country.Name;
                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                        $scope.vm.CacheManager.WriteStorage('user-location', data);
                        vm.SetUserCountries();
                    });
                };
                BaseController.prototype.ClearNullIndexes = function (arr) {
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.$inject = ['$q', '$http', '$scope', 'FC.Core.Services.LocalizationService'];
                return BaseController;
            }());
            Controllers.BaseController = BaseController;
        })(Controllers = Shared.Controllers || (Shared.Controllers = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/NominatimService.ts" />
///<reference path="../Calendar.ts"/>
///<reference path="../Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
//Loading properties;
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Controllers;
            (function (Controllers) {
                var CalendarController = (function (_super) {
                    __extends(CalendarController, _super);
                    function CalendarController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc, UrlManagerService, CalendarService, NominatimService, NewsService, BannerService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        var genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
                        var vm = this;
                        this.$scope = $scope;
                        this.DetectLocation($scope);
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this._HandleRoute($routeParams);
                        this.initLoadingScope();
                        this._InitColDbo();
                        this._InitServices(NominatimService, UrlManagerService, CalendarService, NewsService, BannerService);
                        this._InitializeDateData($scope);
                        this._InitializeBanners($scope);
                        this._InitViewData($scope);
                        this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/{1}/{2}/{3}");
                    }
                    CalendarController.prototype._InitColDbo = function () {
                        this.Festivals = new Array();
                        this.Banners_COL1 = new Array();
                        this.Banners_COL2 = new Array();
                        this.Banners_COL3 = new Array();
                        this.Festivals_COL1 = new Array();
                        this.Festivals_COL2 = new Array();
                        this.News_COL3 = new Array();
                    };
                    CalendarController.prototype.GetRandomBannerKey = function (colName) {
                        var vm = this;
                        var col1Length = this.Festivals_COL1.length;
                        var col2Length = this.Festivals_COL2.length;
                        var src;
                        var colLength = 0;
                        if (colName == "col1" || colName == "col_1") {
                            src = vm.Festivals_COL1;
                            colLength = col1Length;
                        }
                        else if (colName == "col2" || colName == "col_2") {
                            src = vm.Festivals_COL2;
                            colLength = col2Length;
                        }
                        if (colLength >= 2) {
                            var randomized = Math.floor(Math.random() * 10);
                            if (randomized > colLength) {
                                return this.GetRandomBannerKey(colName);
                            }
                            else if (randomized <= colLength) {
                                return randomized;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            return 0;
                        }
                    };
                    CalendarController.prototype._InitServices = function (NominatimService, UrlManagerService, CalendarService, NewsService, BannersService) {
                        this.NominatimSvc = NominatimService;
                        this.URLManager = UrlManagerService;
                        this.CalendarSvc = CalendarService;
                        this.NewsSvc = NewsService;
                        this.BannerService = BannersService;
                    };
                    CalendarController.prototype._InitializeDateData = function ($scope) {
                        var vm = this;
                        this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
                        $scope.ActiveYear = new Date().getFullYear();
                        this.CalendarSvc.GetMonths().then(function (r) {
                            vm.CalendarMonths = r.Data;
                        });
                    };
                    CalendarController.prototype._InitializeBanners = function ($scope) {
                        var vm = this;
                        var filter = new FC.Shared.ServiceMessages.BannerFilter();
                        filter.Genres = vm.UserGenres;
                        filter.Layout = "COL_LG_4";
                        vm.BannerService.GetBanners(filter).then(function (r) {
                            vm.$scope.Col1Banner = r.Data[0];
                            vm.$scope.Col2Banner = r.Data[0];
                            vm.$scope.Col1BannerKey = vm.GetRandomBannerKey('col1');
                            vm.$scope.Col2BannerKey = vm.GetRandomBannerKey('col2');
                        });
                    };
                    CalendarController.prototype.compare = function (a, b) {
                        if (a.OrderDate < b.OrderDate) {
                            return -1;
                        }
                        else if (a.OrderDate > b.OrderDate) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    };
                    CalendarController.prototype.GetFilteredFestivals = function (userCountries) {
                        var vm = this;
                        vm.CalendarSvc.GetFilteredFestivals(vm.ActiveMonthNum, vm.ActiveYear, vm.UserGenres, userCountries).then(function (Festivals) {
                            vm.Festivals_COL1 = new Array();
                            vm.Festivals_COL2 = new Array();
                            vm.$scope.BaseIsLoading = false;
                            vm.Festivals = Festivals.Data;
                            var count = 1;
                            vm.Festivals = vm.Festivals.sort(vm.compare);
                            $.each(vm.Festivals, function (i, f) {
                                if (count == 0) {
                                    if (vm.Festivals_COL1.indexOf(f) == -1 && vm.Festivals_COL2.indexOf(f) == -1) {
                                        vm.Festivals_COL2.push(f);
                                        count++;
                                    }
                                }
                                else {
                                    if (vm.Festivals_COL1.indexOf(f) == -1 && vm.Festivals_COL2.indexOf(f) == -1) {
                                        vm.Festivals_COL1.push(f);
                                        count = 0;
                                    }
                                }
                            });
                            vm.$scope.IsFestivalsLoading = false;
                        });
                    };
                    CalendarController.prototype.GetGenreStorage = function () {
                        var vm = this;
                        window.addEventListener('user-countries_Writed', function () {
                            alert("Countries writed!");
                            //vm.CacheManager.GetStorage("user-countries", function (response) {
                            //    userCountries = response.data
                            //    vm.GetFilteredFestivals(userCountries);
                            //});
                        });
                        if (vm.CacheManager.Contains("user-genres")) {
                            vm.CacheManager.GetStorage("user-genres", function (response) {
                                vm.UserGenres = response.data;
                                var userCountries = null;
                                window.addEventListener('user-countries_Writed', function () {
                                    vm.CacheManager.GetStorage("user-countries", function (response) {
                                        userCountries = response.data;
                                        vm.GetFilteredFestivals(userCountries);
                                    });
                                });
                                vm.CacheManager.GetStorage("user-countries", function (response) {
                                    userCountries = response.data;
                                    vm.GetFilteredFestivals(userCountries);
                                });
                            });
                        }
                    };
                    CalendarController.prototype._InitViewData = function ($scope) {
                        var vm = this;
                        vm.GetGenreStorage();
                        window.addEventListener("user-genres_Writed", function () {
                            vm.GetGenreStorage();
                        });
                    };
                    CalendarController.prototype.GetFestivalURL = function (festival) {
                        var vm = this;
                        var retUrl = this.URLManager.GetURL("festival", "FestivalURL", [festival.UmbracoID.toString(), $AppConfig.CurrentCountry, vm.ActiveYear.toString(), vm.ActiveMonthNum.toString()]);
                        return retUrl;
                    };
                    CalendarController.prototype._HandleRoute = function ($routeParams) {
                        var vm = this;
                        console.info($routeParams);
                        if ($routeParams["year"]) {
                            this.ActiveYear = $routeParams["year"];
                        }
                        else {
                            this.ActiveYear = new Date().getFullYear();
                        }
                        if ($routeParams["month"]) {
                            this.ActiveMonthNum = $routeParams["month"];
                        }
                        else {
                            this.ActiveMonthNum = new Date().getMonth() + 1;
                        }
                    };
                    CalendarController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Core.Services.NominatimService",
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Banners.Services.BannerService"
                    ];
                    return CalendarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CalendarController = CalendarController;
                CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.CalendarController", FC.Modules.Calendar.Controllers.CalendarController);
            })(Controllers = Calendar.Controllers || (Calendar.Controllers = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var BaseModel = (function () {
                function BaseModel(Child) {
                    if (Child && Child.IsoName) {
                        this.IsoName = Child.IsoName;
                    }
                    if (Child && Child.Localization) {
                        this.Localization = Child.Localization;
                    }
                    if (Child && Child.UmbracoID) {
                        this.UmbracoID = Child.UmbracoID;
                    }
                }
                return BaseModel;
            }());
            Models.BaseModel = BaseModel;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../../../Shared/Models/BaseModel.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Models;
            (function (Models) {
                var FestivalMonthItem = (function (_super) {
                    __extends(FestivalMonthItem, _super);
                    function FestivalMonthItem(f) {
                        _super.call(this, f);
                        var vm = this;
                        this.Name = f.Name;
                        this.Logo = f.Logo;
                        this.IndoorOutdoor = f.IndoorOutdoor;
                        this.Country = f.Country;
                        this.City = f.City;
                        this.Location = f.Location;
                        this.TicketPrice = f.TicketPrice;
                        this.DailyTicketPrice = f.DailyTicketPrice;
                        this.Visitors = f.Visitors;
                        this.StartDate = f.StartDate;
                        this.EndDate = f.EndDate;
                        this.Genres = f.Genres;
                        this.GenreList = new Array();
                        this.IsTopFestival = f.IsTopFestival;
                        this.Stages = f.Stages;
                        this.FacebookURL = f.FacebookURL;
                        this.TwitterURL = f.TwitterURL;
                        this.YoutubeURL = f.YoutubeURL;
                        this.FlickrURL = f.FlickrURL;
                        this.InstagramURL = f.InstagramURL;
                        this.SpotifyURL = f.SpotifyURL;
                        this.DeezerURL = f.DeezerURL;
                        this.CultureEndDate = f.CultureEndDate;
                        this.CultureStartDate = f.CultureStartDate;
                        this.DayCount = f.DayCount;
                    }
                    return FestivalMonthItem;
                }(FC.Shared.Models.BaseModel));
                Models.FestivalMonthItem = FestivalMonthItem;
            })(Models = Calendar.Models || (Calendar.Models = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../ServiceBase.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var LocalizationService = (function (_super) {
                __extends(LocalizationService, _super);
                function LocalizationService(http, q) {
                    _super.call(this, http, q);
                }
                LocalizationService.prototype.GetLocaleInfo = function () {
                    return this.Get('/Umbraco/API/Localization/GetLocaleInfo');
                };
                LocalizationService.prototype.Regenerate = function () {
                    this.Get('/Umbraco/API/Festival/Regenerate/');
                };
                LocalizationService.$inject = ['$http', '$q'];
                return LocalizationService;
            }(FC.Core.ServiceBase));
            Services.LocalizationService = LocalizationService;
            Application.app.service('FC.Core.Services.LocalizationService', FC.Core.Services.LocalizationService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../ServiceBase.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var URLManagerService = (function (_super) {
                __extends(URLManagerService, _super);
                function URLManagerService(http, q, $sce) {
                    _super.call(this, http, q);
                    this.Html5Mode = false;
                    this.UrlHash = "#";
                    this.$http = http;
                    this.$sce = $sce;
                    this.$q = q;
                    this.URLCollection = {};
                }
                URLManagerService.prototype.AddURL = function (scope, key, url) {
                    if (!Core.IsNullOrEmpty(this.URLCollection) && !Core.IsNullOrEmpty(this.URLCollection[scope]) && Core.IsNullOrEmpty(this.URLCollection[scope][key])) {
                        var index = this.URLCollection.length;
                        this.URLCollection[scope][key] = url;
                    }
                    else {
                        if (this.URLCollection) {
                            if (Core.IsNullOrEmpty(this.URLCollection[scope])) {
                                this.URLCollection[scope] = {};
                                this.URLCollection[scope][key] = url;
                            }
                            else if (Core.IsNullOrEmpty(this.URLCollection[scope][key])) {
                                this.URLCollection[scope][key] = url;
                            }
                        }
                    }
                };
                URLManagerService.prototype.GetURL = function (scope, key, urlArgs) {
                    if (this.URLCollection[scope] && this.URLCollection[scope][key]) {
                        var url = this.URLCollection[scope][key];
                        $.each(urlArgs, function (k, v) {
                            url = url.replace('{' + k + '}', v);
                        });
                        if (this.Html5Mode == false) {
                            url = '/' + this.UrlHash + '/' + url;
                        }
                        return this.$sce.getTrustedResourceUrl(url);
                    }
                    return "";
                };
                URLManagerService.$inject = ['$http', '$q', '$sce'];
                return URLManagerService;
            }(FC.Core.ServiceBase));
            Services.URLManagerService = URLManagerService;
            Application.RegisterService('FC.Core.Services.URLManagerService', FC.Core.Services.URLManagerService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries_1) {
            var Countries = (function () {
                function Countries(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Countries.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Countries;
            }());
            Countries_1.Countries = Countries;
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var CountriesModule = new FC.Modules.Countries.Countries(angular.module('FC.Modules.Countries', ApplicationDependencies), Application);
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Services;
            (function (Services) {
                var CountriesService = (function (_super) {
                    __extends(CountriesService, _super);
                    function CountriesService(http, q) {
                        _super.call(this, http, q);
                    }
                    CountriesService.prototype.GetCountry = function (id) {
                        return this.Get('/Umracou/API/Country/GetByID?id=' + id);
                    };
                    CountriesService.prototype.GetAll = function () {
                        return this.Get('/Umbraco/API/Country/GetAll');
                    };
                    CountriesService.prototype.GetByCode = function (code) {
                        return this.Get('/Umbraco/API/Country/GetByCode?code=' + code);
                    };
                    CountriesService.$inject = ['$http', '$q'];
                    return CountriesService;
                }(FC.Core.ServiceBase));
                Services.CountriesService = CountriesService;
                CountriesModule.GetApplication().app.service('FC.Modules.Countries.Services.CountriesService', FC.Modules.Countries.Services.CountriesService);
            })(Services = Countries.Services || (Countries.Services = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival_1) {
            var Festival = (function () {
                function Festival(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/festival/:festival/:country/:year/:month", "/Scripts/Modules/Festival/Views/festival-detail-columns.html", "FC.Modules.Festival.Controllers.FestivalDetailController", "vm");
                }
                Festival.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Festival;
            }());
            Festival_1.Festival = Festival;
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FestivalModule = new FC.Modules.Festival.Festival(angular.module('FC.Modules.Festival', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../Festival.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Controllers;
            (function (Controllers) {
                var FestivalDetailController = (function (_super) {
                    __extends(FestivalDetailController, _super);
                    function FestivalDetailController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationService, FestivalService, NewsService, RatesService, BannerService, UrlManagerService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationService);
                        this.ShowTravelInfo = false;
                        this.vm = this;
                        this.$sce = $sce;
                        this._inst = this;
                        this.GenreService = GenreService;
                        this.BannerService = BannerService;
                        this.URLManSvc = UrlManagerService;
                        this.$scope.URLManSvc = this.URLManSvc;
                        this.$scope._inst = this._inst;
                        //this.$scope.CountryData = CountryData;
                        this.Euro = 0;
                        var vm = this;
                        this.ActiveFestivalID = parseInt($routeParams["festival"]);
                        this._InitGenres();
                        vm._InitializeCOLLG2Banner();
                        NewsService.GetFilteredNews(vm.UserGenres).then(function (cd) {
                            vm.$scope.News = cd.Data;
                        });
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        FestivalService.GetFestival(this.ActiveFestivalID).then(function (scope) {
                            vm.$scope.FestivalDetails = scope.Data.FestivalDetails;
                            vm.ActiveFestival = vm.$scope.FestivalDetails;
                            if (vm.ActiveFestival.AftermovieYoutubeURL) {
                                vm.$scope.TrustMovieURL = vm.$sce.trustAsResourceUrl(vm.ActiveFestival.AftermovieYoutubeURL);
                                vm.$scope.ShowMovie = true;
                            }
                            else {
                                vm.$scope.ShowMovie = false;
                            }
                            vm.$scope.Artists = scope.Data.Artists;
                            vm.$scope.Genres = scope.Data.Genres;
                            vm.ActiveFestival = scope.Data.FestivalDetails;
                            if (vm.ActiveFestival.DailyTicketPrice > 0) {
                                vm.Euro = vm.ActiveFestival.DailyTicketPrice;
                                RatesService.EurToUc(parseInt(vm.ActiveFestival.DailyTicketPrice.toString()), vm.ActiveFestival.Localization, vm.DailyTicketPriceCalculated, $scope._inst);
                            }
                            if (vm.ActiveFestival.TicketPrice > 0) {
                                vm.Euro = vm.ActiveFestival.TicketPrice;
                                RatesService.EurToUc(parseInt(vm.ActiveFestival.TicketPrice.toString()), vm.ActiveFestival.Localization, vm.TicketPriceCalculated, $scope._inst);
                            }
                        });
                        this._InitializeURLs();
                    }
                    FestivalDetailController.prototype._InitializeURLs = function () {
                        var vm = this;
                        //0=year,1=month,2=country
                        this.URLManSvc.AddURL("FestivalDetail", "Festival", "calendar/{0}/{1}/{2}");
                        vm.$scope.GetCalendarURL = this.GetCalendarURL;
                    };
                    FestivalDetailController.prototype.GetCalendarURL = function () {
                        var vm = this.vm;
                        return this.vm.URLManSvc.GetURL("FestivalDetail", "Festival", [vm.$routeParams["year"], vm.$routeParams["month"], vm.$routeParams["country"]]);
                    };
                    FestivalDetailController.prototype._InitializeCOLLG2Banner = function () {
                        var vm = this;
                        var BannerFilter = new FC.Shared.ServiceMessages.BannerFilter();
                        BannerFilter.Genres = [];
                        vm.UserGenres.forEach(function (value, index) {
                            BannerFilter.Genres.push(value);
                        });
                        BannerFilter.Layout = "COL_LG_2";
                        vm.BannerService.GetBanners(BannerFilter).then(function (b) {
                            vm.$scope.Banner = b.Data[0];
                        });
                    };
                    FestivalDetailController.prototype._InitGenres = function () {
                        var vm = this;
                        this.UserGenres = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.UserGenres = vm.ClearNullIndexes(this.CacheManager.GetStorage("user-genres").data);
                        }
                    };
                    FestivalDetailController.prototype.TicketPriceCalculated = function (rates, scope) {
                        var vm = scope;
                        scope.ActiveFestival.CalcPrice = "";
                        rates.Rates.Add("EUR", 1, rates.Rates);
                        fx.rates = rates.Rates.GetAllArray();
                        accounting.settings = {
                            currency: {
                                symbol: $AppConfig.Localization.CultureMoneySign,
                                format: {
                                    pos: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">%v</span></span>',
                                    neg: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">(%v)</span></span>',
                                    zero: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">--</span></span>' // for zero values, eg. "$  --" [optional]
                                },
                                decimal: $AppConfig.Localization.CultureCurrencySeparator,
                                thousand: ",",
                                precision: $AppConfig.Localization.CurrencyCultureDecimalDigits // decimal places
                            },
                            number: {
                                precision: $AppConfig.Localization.NumberDecimalDigits,
                                thousand: '.',
                                decimal: $AppConfig.Localization.NumberDecimalSeparator
                            }
                        };
                        scope.ActiveFestival.CalcPrice = accounting.formatMoney(fx.convert(vm.Euro, { from: "EUR", to: $AppConfig.Localization.ISOCurrencySymbol }));
                        scope.$scope.FestivalDetails = scope.ActiveFestival;
                    };
                    FestivalDetailController.prototype.DailyTicketPriceCalculated = function (rates, scope) {
                        var vm = scope;
                        scope.ActiveFestival.CalcDailyPrice = "";
                        rates.Rates.Add("EUR", 1, rates.Rates);
                        fx.rates = rates.Rates.GetAllArray();
                        accounting.settings = {
                            currency: {
                                symbol: $AppConfig.Localization.CultureMoneySign,
                                format: {
                                    pos: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">%v</span></span>',
                                    neg: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">(%v)</span></span>',
                                    zero: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">--</span></span>' // for zero values, eg. "$  --" [optional]
                                },
                                decimal: $AppConfig.Localization.CultureCurrencySeparator,
                                thousand: ",",
                                precision: $AppConfig.Localization.CurrencyCultureDecimalDigits // decimal places
                            },
                            number: {
                                precision: $AppConfig.Localization.NumberDecimalDigits,
                                thousand: '.',
                                decimal: $AppConfig.Localization.NumberDecimalSeparator
                            }
                        };
                        scope.ActiveFestival.CalcDailyPrice = accounting.formatMoney(fx.convert(vm.Euro, { from: "EUR", to: $AppConfig.Localization.ISOCurrencySymbol }));
                        scope.$scope.Festival = scope.ActiveFestival;
                        scope.$scope.FestivalDetails = scope.ActiveFestival;
                    };
                    FestivalDetailController.prototype._HasTravelInfo = function (festival) {
                        if (festival.TrainInfo != null && festival.TrainInfo != undefined && festival.TrainInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.BikeInfo != null && festival.BikeInfo != undefined && festival.BikeInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.BusInfo != null && festival.BusInfo != undefined && festival.BusInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.TaxiInfo != null && festival.TaxiInfo != undefined && festival.TaxiInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.AirPlaneInfo != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.Car != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else {
                            this.ShowTravelInfo = false;
                        }
                    };
                    //public ActiveGenreID: number;
                    FestivalDetailController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "FC.Modules.Banners.Services.BannerService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService"
                    ];
                    return FestivalDetailController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalDetailController = FestivalDetailController;
                FestivalModule.GetApplication().RegisterController("FC.Modules.Festival.Controllers.FestivalDetailController", FC.Modules.Festival.Controllers.FestivalDetailController);
            })(Controllers = Festival.Controllers || (Festival.Controllers = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Services;
            (function (Services) {
                var FestivalService = (function (_super) {
                    __extends(FestivalService, _super);
                    function FestivalService(http, q) {
                        _super.call(this, http, q);
                    }
                    FestivalService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/Umbraco/API/Festival/GetById?&id=' + festivalId);
                    };
                    FestivalService.$inject = ['$http', '$q'];
                    return FestivalService;
                }(FC.Core.ServiceBase));
                Services.FestivalService = FestivalService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
FestivalModule.GetApplication().app.service('FC.Modules.Festival.Services.FestivalService', FC.Modules.Festival.Services.FestivalService);
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering_1) {
            var Filtering = (function () {
                function Filtering(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Filtering.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Filtering;
            }());
            Filtering_1.Filtering = Filtering;
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FilteringModule = new FC.Modules.Filtering.Filtering(angular.module('FC.Modules.Filtering', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var CountryModalController = (function (_super) {
                    __extends(CountryModalController, _super);
                    function CountryModalController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingSvc, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingSvc, LocalizationSvc);
                        var vm = this;
                        this.$scope = $scope;
                        this.Modal = $uibModal;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        if (!vm.CacheManager.Contains("sys-countries")) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                                vm.CountryData = r.Data;
                            });
                        }
                        else {
                            vm.CountryData = vm.CacheManager.GetStorage("sys-countries").data;
                        }
                        this.ActiveCountryIDs = new Array();
                        if (this.CacheManager.Contains("user-countries")) {
                            this.ActiveCountryIDs = this.CacheManager.GetStorage("user-countries").data;
                        }
                        this.$scope.IsOpen = this.IsOpen;
                        this.$scope.hasSelectedChildren = function (id, name) {
                            var status = false;
                            if (this.children) {
                                if (this.children[id]) {
                                    $.each(this.children[id], function (k, child) {
                                        if (child.open == true) {
                                            status = true;
                                        }
                                    });
                                }
                            }
                            return status;
                        };
                        this.$scope.ToggleItem = this.ToggleItem;
                    }
                    CountryModalController.prototype.IsOpen = function (id) {
                        if (id) {
                            if (this) {
                                if (this.ActiveCountryIDs.indexOf(id) == -1) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    };
                    CountryModalController.prototype.ToggleItem = function (id) {
                        var vm = this;
                        if (id) {
                            var cm = this.CacheManager;
                            if (this.ActiveCountryIDs.indexOf(id) == -1) {
                                this.ActiveCountryIDs.push(id);
                                if (cm.GetStorage("user-countries").data && cm.GetStorage("user-countries").data.indexOf(id) == -1) {
                                    this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                    cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                                    $("#modal-select-item-" + id + " .fa-globe").attr('style', 'color:#' + vm.ActiveTheme.LinkActiveColor);
                                }
                            }
                            else {
                                delete this.ActiveCountryIDs[this.ActiveCountryIDs.indexOf(id)];
                                this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                                $("#modal-select-item-" + id + " .fa-globe").attr('style', 'color:#' + vm.ActiveTheme.DefaultTextColor);
                            }
                        }
                    };
                    CountryModalController.prototype.Reset = function () {
                        var vm = this;
                        this.ActiveCountryIDs = new Array();
                        //this.CacheManager.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                    };
                    CountryModalController.prototype.Remember = function () {
                        var vm = this;
                        vm.$scope.$dismiss(vm.Modal);
                    };
                    CountryModalController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService"
                    ];
                    return CountryModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryModalController = CountryModalController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryModalController", FC.Modules.Filtering.Controllers.CountryModalController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var FilterController = (function (_super) {
                    __extends(FilterController, _super);
                    function FilterController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingSvc, LocalizationSvc, CalendarService, UrlManagerSvc, GenreService, CountriesService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingSvc, LocalizationSvc);
                        var vm = this;
                        this.$scope = $scope;
                        this.Modal = $uibModal;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.CalendarSvc = CalendarService;
                        this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
                        this.UrlManager = UrlManagerSvc;
                        this._HandleRoute($routeParams);
                        if (!vm.CacheManager.Contains("sys-countries")) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                                vm.CountryData = r.Data;
                                vm.$scope.IsCountriesLoading = false;
                            });
                        }
                        else {
                            vm.$scope.IsCountriesLoading = false;
                            vm.CountryData = vm.CacheManager.GetStorage("sys-countries").data;
                        }
                        if (!this.CacheManager.Contains("sys-months")) {
                            this.CalendarSvc.GetMonths().then(function (r) {
                                vm.CalendarMonths = r.Data;
                                vm.ActiveMonthName = vm.CalendarMonths[vm.ActiveMonthNum - 1];
                                vm.CacheManager.WriteStorage("sys-months", r.Data, 1000 * 60 * 60 * 24 * 7 * 52);
                            });
                        }
                        else {
                            vm.CalendarMonths = vm.CacheManager.GetStorage("sys-months").data;
                            vm.ActiveMonthName = vm.CalendarMonths[vm.ActiveMonthNum - 1];
                        }
                        this.ShowMore = 10;
                        vm.setDomGenresActive();
                        if (vm.$scope.IsGenresLoading) {
                            window.addEventListener("sys-genres_Writed", function () {
                                if (vm.CacheManager.Contains("sys-genres")) {
                                    vm.CacheManager.GetStorage("sys-genres", function (response) {
                                        vm.GenreData = response.data;
                                    });
                                }
                                vm.setDomGenresActive();
                                vm.$scope.IsGenresLoading = false;
                            });
                        }
                        if (vm.CacheManager.Contains("user-countries")) {
                            vm.$scope.ActiveCountryIDs = vm.CacheManager.GetStorage("user-countries").data;
                        }
                        //{0] - year
                        //{1} - month
                        //{2} - country
                        //DateEntry
                        this.UrlManager.AddURL("calendar", "CountryURL", "calendar/{0}/{1}/{2}");
                        //DefaultEntry - Date is default client date.
                        this.UrlManager.AddURL("calendar", "IndexURL", "calendar/");
                        //0 - festivalId
                        //1 - genreIds
                    }
                    FilterController.prototype.setDomGenresActive = function () {
                        var vm = this;
                        if (vm.CacheManager.Contains("user-genres") && vm.CacheManager.Contains("sys-genres")) {
                            var storageGenres = vm.CacheManager.GetStorage("user-genres").data;
                            vm.$scope.ActiveGenres = [];
                            vm.GenreData = vm.CacheManager.GetStorage("sys-genres").data;
                            vm.GenreData.forEach(function (value, index) {
                                if (storageGenres.indexOf(value.GenreID) > -1) {
                                    vm.$scope.ActiveGenres.push(value);
                                }
                                if (value.Children) {
                                    value.Children.forEach(function (child, index2) {
                                        if (storageGenres.indexOf(child.GenreID) > -1) {
                                            vm.$scope.ActiveGenres.push(child);
                                        }
                                    });
                                }
                            });
                            vm.$scope.IsGenresLoading = false;
                        }
                    };
                    FilterController.prototype._HandleRoute = function ($routeParams) {
                        var vm = this;
                        console.info($routeParams);
                        if ($routeParams["year"]) {
                            this.ActiveYear = $routeParams["year"];
                        }
                        else {
                            this.ActiveYear = new Date().getFullYear().toString();
                        }
                        if ($routeParams["month"]) {
                            this.ActiveMonthNum = $routeParams["month"];
                        }
                        else {
                            this.ActiveMonthNum = new Date().getMonth() + 1;
                        }
                    };
                    FilterController.prototype.OpenCountryModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/country-modal.html',
                            controller: 'FC.Modules.Filtering.Controllers.CountryModalController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.prototype.GetMonthURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [this.ActiveYear, key, $AppConfig.CurrentCountry]);
                    };
                    FilterController.prototype.GetYearURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [key, this.ActiveMonthNum, $AppConfig.CurrentCountry]);
                    };
                    FilterController.prototype.GetCountryURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [this.ActiveYear, this.ActiveMonthNum, key]);
                    };
                    FilterController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Calendar.Services.CalendarService',
                        'FC.Core.Services.URLManagerService',
                        'FC.Modules.Genres.Services.GenreService',
                        'FC.Modules.Countries.Services.CountriesService'
                    ];
                    return FilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterController = FilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterController", FC.Modules.Filtering.Controllers.FilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres_1) {
            var Genres = (function () {
                function Genres(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Genres.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Genres;
            }());
            Genres_1.Genres = Genres;
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var GenresModule = new FC.Modules.Genres.Genres(angular.module('FC.Modules.Genres', ApplicationDependencies), Application);
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Services;
            (function (Services) {
                var GenreService = (function (_super) {
                    __extends(GenreService, _super);
                    function GenreService(http, q) {
                        _super.call(this, http, q);
                        this.rootGenres = new Array();
                    }
                    GenreService.prototype.GetAllRoot = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllRoot');
                    };
                    GenreService.prototype.GetAllGenres = function () {
                        return this.Get('/Umbraco/API/Genre/GetAll');
                    };
                    GenreService.prototype.GetAllDefault = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllDefault');
                    };
                    GenreService.prototype.GetAllDefaultIds = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllDefaultIds');
                    };
                    GenreService.prototype.Filter = function (filter) {
                        return this.Post('/Umbraco/API/Genre/Filter', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    GenreService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/Umbraco/API/Festival/GetById?&id=' + festivalId);
                    };
                    GenreService.prototype.Regenerate = function () {
                        this.Get('/Umbraco/API/Festival/Regenerate/');
                    };
                    GenreService.$inject = ['$http', '$q'];
                    return GenreService;
                }(FC.Core.ServiceBase));
                Services.GenreService = GenreService;
                GenresModule.GetApplication().app.service('FC.Modules.Genres.Services.GenreService', FC.Modules.Genres.Services.GenreService);
            })(Services = Genres.Services || (Genres.Services = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Index;
        (function (Index_1) {
            var Index = (function () {
                function Index(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Index.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Index;
            }());
            Index_1.Index = Index;
        })(Index = Modules.Index || (Modules.Index = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var IndexModule = new FC.Modules.Index.Index(angular.module('FC.Modules.Index', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts" />
///<reference path="../Index.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Index;
        (function (Index) {
            var Controllers;
            (function (Controllers) {
                var IndexController = (function (_super) {
                    __extends(IndexController, _super);
                    function IndexController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                    }
                    IndexController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                    ];
                    return IndexController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.IndexController = IndexController;
                IndexModule.GetApplication().RegisterController("FC.Modules.Index.Controllers.IndexController", FC.Modules.Index.Controllers.IndexController);
            })(Controllers = Index.Controllers || (Index.Controllers = {}));
        })(Index = Modules.Index || (Modules.Index = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Loading;
        (function (Loading) {
            var Controllers;
            (function (Controllers) {
                var LoadController = (function (_super) {
                    __extends(LoadController, _super);
                    function LoadController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        LoadingModule.GetApplication().RegisterController("FC.Modules.Loading.Controllers.LoadController", FC.Modules.Loading.Controllers.LoadController);
                    }
                    LoadController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService"
                    ];
                    return LoadController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LoadController = LoadController;
            })(Controllers = Loading.Controllers || (Loading.Controllers = {}));
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Loading;
        (function (Loading) {
            var Directives;
            (function (Directives) {
                function LoadingDirective() {
                    return {
                        controller: FC.Modules.Loading.Controllers.LoadController,
                        controllerAs: "vm",
                        templateUrl: "/Scripts/Modules/Loading/Views/loading-default.html",
                        replace: true
                    };
                }
                Directives.LoadingDirective = LoadingDirective;
                Application.app.directive('preload', FC.Modules.Loading.Directives.LoadingDirective);
            })(Directives = Loading.Directives || (Loading.Directives = {}));
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Loading;
        (function (Loading_1) {
            var Loading = (function () {
                function Loading(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Loading.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Loading;
            }());
            Loading_1.Loading = Loading;
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var LoadingModule = new FC.Modules.Loading.Loading(angular.module('FC.Modules.Loading', ApplicationDependencies), Application);
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu_1) {
            var Menu = (function () {
                function Menu(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Menu.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Menu;
            }());
            Menu_1.Menu = Menu;
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var MenuModule = new FC.Modules.Menu.Menu(angular.module('FC.Modules.Menu', ApplicationDependencies), Application);
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../Menu.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var MenuController = (function (_super) {
                    __extends(MenuController, _super);
                    function MenuController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingService, LocalizationSvc, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        var vm = this;
                        this.$scope = $scope;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$scope.base = this;
                        this.Modal = $uibModal;
                        if (this.CacheManager.Contains("sys-genres")) {
                            this.Genres = this.CacheManager.GetStorage("sys-genres");
                        }
                        this.$scope.oneAtATime = true;
                        this.$scope.status = new Array();
                        this.$scope.children = new Array();
                        this.ActiveGenreIds = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.ActiveGenreIds = this.CacheManager.GetStorage("user-genres").data;
                        }
                        this.$scope.hasSelectedChildren = function (id, name) {
                            var status = false;
                            if (this.children[id]) {
                                $.each(this.children[id], function (k, child) {
                                    if (child.open == true) {
                                        status = true;
                                    }
                                });
                            }
                            return status;
                        };
                    }
                    MenuController.prototype.Reset = function () {
                        var vm = this;
                        this.ActiveGenreIds = new Array();
                        vm.GenreService.GetAllDefault().then(function (r) {
                            $.each(r.Data, function (key, child) {
                                vm.ActiveGenreIds.push(child.GenreID);
                            });
                        });
                        this.CacheManager.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                        this.CacheManager.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                        this.$scope.$dismiss(this.Modal);
                        this.OpenModal(400);
                    };
                    MenuController.prototype.RestoreToDefaults = function () {
                        var vm = this;
                        var doReload = window.confirm("Are you sure? All your settings (fav. countries, fav. genres etc) will be gone!");
                        if (doReload) {
                            vm.CacheManager.DeleteStorage("sys-genres");
                            vm.CacheManager.DeleteStorage("user-genres");
                            vm.CacheManager.DeleteStorage("active-theme");
                            vm.CacheManager.DeleteStorage("sys-countries");
                            vm.CacheManager.DeleteStorage("user-location");
                            vm.CacheManager.DeleteStorage("user-countries");
                            vm.CacheManager.DeleteStorage("sys-months");
                            vm.CacheManager.DeleteStorage("sys-years");
                            window.location.reload();
                        }
                    };
                    MenuController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    MenuController.prototype.Remember = function () {
                        var vm = this;
                        vm.$scope.$dismiss(vm.Modal);
                    };
                    MenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Genres.Services.GenreService'];
                    return MenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuController = MenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var ModalSelect;
        (function (ModalSelect_1) {
            var ModalSelect = (function () {
                function ModalSelect(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                ModalSelect.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return ModalSelect;
            }());
            ModalSelect_1.ModalSelect = ModalSelect;
        })(ModalSelect = Modules.ModalSelect || (Modules.ModalSelect = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var ModalSelectModule = new FC.Modules.ModalSelect.ModalSelect(angular.module('FC.Modules.ModalSelect', ApplicationDependencies), Application);
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../ModalSelect.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var ModalSelect;
        (function (ModalSelect) {
            var Controllers;
            (function (Controllers) {
                var ModalSelectController = (function (_super) {
                    __extends(ModalSelectController, _super);
                    function ModalSelectController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingService, LocalizationSvc, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        var vm = this;
                        this.GenreService = GenreService;
                        this.$scope = $scope;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$scope.base = this;
                        this.Modal = $uibModal;
                        this.$scope.$watch(localStorage["sys-genres"], function (result) {
                            //$scope.$digest();
                            if (result) {
                                vm.Genres = this.CacheManager.GetStorage("sys-genres", function (response) {
                                    vm.Genres = response.data;
                                });
                            }
                        });
                        if (this.CacheManager.Contains("sys-genres")) {
                            vm.Genres = this.CacheManager.GetStorage("sys-genres", function (response) {
                                vm.$scope.Genres = response.data;
                            });
                        }
                        this.$scope.oneAtATime = true;
                        this.$scope.status = new Array();
                        this.$scope.children = new Array();
                        this.ActiveGenreIds = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.ActiveGenreIds = this.CacheManager.GetStorage("user-genres").data;
                        }
                        this.$scope.IsOpen = this.IsOpen;
                        this.$scope.hasSelectedChildren = function (id, name) {
                            var status = false;
                            if (this.children[id]) {
                                $.each(this.children[id], function (k, child) {
                                    if (child.open == true) {
                                        status = true;
                                    }
                                });
                            }
                            return status;
                        };
                    }
                    ModalSelectController.prototype.IsOpen = function (id) {
                        if (id) {
                            if (this) {
                                if (this.ActiveGenreIds.indexOf(id) > -1) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    };
                    ModalSelectController.prototype.ToggleGenreItem = function (id) {
                        var vm = this;
                        if (id) {
                            var cm = this.CacheManager;
                            if (this.ActiveGenreIds.indexOf(id) == -1) {
                                this.ActiveGenreIds.push(id);
                                if (cm.GetStorage("user-genres").data.indexOf(id) == -1) {
                                    this.ActiveGenreIds = cm.StripNullElements(this.ActiveGenreIds);
                                    cm.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                                    $("#modal-select-item-" + id + " .fa-heart").attr('style', 'color:#' + vm.ActiveTheme.LinkActiveColor);
                                }
                            }
                            else {
                                delete this.ActiveGenreIds[this.ActiveGenreIds.indexOf(id)];
                                this.ActiveGenreIds = cm.StripNullElements(this.ActiveGenreIds);
                                cm.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                                $("#modal-select-item-" + id + " .fa-heart").attr('style', 'color:#' + vm.ActiveTheme.DefaultTextColor);
                            }
                        }
                    };
                    ModalSelectController.prototype.Reset = function () {
                        var vm = this;
                        this.ActiveGenreIds = new Array();
                        vm.GenreService.GetAllDefaultIds().then(function (r) {
                            $.each(r.Data, function (key, child) {
                                vm.ActiveGenreIds.push(child);
                            });
                        });
                        this.CacheManager.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                    };
                    ModalSelectController.prototype.Remember = function () {
                        var vm = this;
                        vm.$scope.$dismiss(vm.Modal);
                    };
                    ModalSelectController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Genres.Services.GenreService'];
                    return ModalSelectController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ModalSelectController = ModalSelectController;
                ModalSelectModule.GetApplication().RegisterController("FC.Modules.ModalSelect.Controllers.ModalSelectController", FC.Modules.ModalSelect.Controllers.ModalSelectController);
            })(Controllers = ModalSelect.Controllers || (ModalSelect.Controllers = {}));
        })(ModalSelect = Modules.ModalSelect || (Modules.ModalSelect = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News_1) {
            var News = (function () {
                function News(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/news/:newsId/:genre", "/Scripts/Modules/News/Views/news-detail.html", "FC.Modules.News.Controllers.NewsController", "NewsCtr");
                }
                News.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return News;
            }());
            News_1.News = News;
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var NewsModule = new FC.Modules.News.News(angular.module('FC.Modules.News', ApplicationDependencies), Application);
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UNews = (function (_super) {
                __extends(UNews, _super);
                function UNews(news) {
                    _super.call(this, news);
                    this.Date = news.Date;
                    this.Genres = news.Genres;
                    this.Img = news.Img;
                    this.Title = news.Title;
                    this.Text = news.Text;
                    this.DisplayDate = news.DisplayDate;
                }
                return UNews;
            }(Models.BaseModel));
            Models.UNews = UNews;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts" />
///<reference path="../News.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Models/UNews.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var NewsController = (function (_super) {
                    __extends(NewsController, _super);
                    function NewsController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc, NewsSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        vm = this;
                        this.$scope = $scope;
                        this.NewsSvc = NewsSvc;
                        this.ActiveNewsID = $routeParams["newsId"];
                        this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                        this._Init();
                    }
                    NewsController.prototype._Init = function () {
                        var vm = this;
                        this.UserGenres = new Array();
                        window.addEventListener("user-genres_Writed", function () {
                            if (this.CacheManager.Contains("user-genres")) {
                                this.UserGenres = this.CacheManager.GetStorage("user-genres").data;
                            }
                            vm.NewsSvc.GetFilteredNews(vm.UserGenres).then(function (cd) {
                                vm.$scope.News = cd.Data;
                            });
                        });
                        if (this.CacheManager.Contains("user-genres")) {
                            this.UserGenres = this.CacheManager.GetStorage("user-genres").data;
                            vm.NewsSvc.GetFilteredNews(vm.UserGenres).then(function (cd) {
                                vm.$scope.News = cd.Data;
                            });
                        }
                    };
                    NewsController.prototype._NewsMessageLoaded = function (response, $scope) {
                        vm.NewsItem = response.Data;
                        return response;
                    };
                    NewsController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        "FC.Modules.News.Services.NewsService"
                    ];
                    return NewsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsController = NewsController;
                var vm;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsController", FC.Modules.News.Controllers.NewsController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Models;
            (function (Models) {
                var NewsVm = (function () {
                    function NewsVm(data) {
                        this.Title = data.Title;
                        this.Content = data.Content;
                        this.DisplayDate = data.DisplayDate;
                        this.GenreID = data.GenreID;
                        this.Type = data.Type;
                        this.Img = data.Img;
                        this.Link = "/#/News/" + data.UmbracoID + "/" + this.GenreID;
                        this.SortDate = data.SortDate;
                        this.UmbracoID = data.UmbracoID;
                    }
                    return NewsVm;
                }());
                Models.NewsVm = NewsVm;
            })(Models = News.Models || (News.Models = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Services;
            (function (Services) {
                var NewsService = (function (_super) {
                    __extends(NewsService, _super);
                    function NewsService(http, q) {
                        _super.call(this, http, q);
                    }
                    NewsService.prototype.GetNews = function (genreId) {
                        return this.Get('/Umbraco/API/News/GetNews/?&genreId=' + genreId);
                    };
                    NewsService.prototype.GetNewsById = function (newsId) {
                        return this.Get('/Umbraco/API/News/GetById/?&newsId=' + newsId);
                    };
                    NewsService.prototype.GetFilteredNews = function (genres) {
                        var filter = new FC.Shared.Models.NewsFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = []; //prepare for future usage..
                        return this.Post('/Umbraco/API/News/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    NewsService.$inject = ['$http', '$q'];
                    return NewsService;
                }(FC.Core.ServiceBase));
                Services.NewsService = NewsService;
                NewsModule.GetApplication().app.service('FC.Modules.News.Services.NewsService', FC.Modules.News.Services.NewsService);
            })(Services = News.Services || (News.Services = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates_1) {
            var Model;
            (function (Model) {
                var CM = FC.Core.CoreModel;
                var Rates = (function () {
                    function Rates(data) {
                        this.Base = data.Base || data["base"];
                        this.Date = data.Date || data["date"];
                        this.Rates = new CM.Dictionary(data.Rates || data["rates"]);
                    }
                    return Rates;
                }());
                Model.Rates = Rates;
            })(Model = Rates_1.Model || (Rates_1.Model = {}));
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates_2) {
            var Rates = (function () {
                function Rates(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Rates.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Rates;
            }());
            Rates_2.Rates = Rates;
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var RatesModule = new FC.Modules.Rates.Rates(angular.module('FC.Modules.Rates', ApplicationDependencies), Application);
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates) {
            var Services;
            (function (Services) {
                var CM = FC.Core.CoreModel;
                var RatesService = (function (_super) {
                    __extends(RatesService, _super);
                    function RatesService(http, q) {
                        _super.call(this, http, q);
                        this.Euro = 0;
                    }
                    //CacheManager.WriteStorage("rates", rates, 600 * 60 * 24);
                    //fx.rates = CacheManager.GetStorage("rates").data;
                    //CacheManager.Contains("rates")
                    //this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {
                    RatesService.prototype.EurToUc = function (eur, localization, callback, scope) {
                        var vm = this;
                        vm.Euro = eur;
                        vm.Localization = localization;
                        var result = "";
                        var rDict = new CM.Dictionary();
                        var rates;
                        this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {
                            if (r && r.data) {
                                rates = new FC.Modules.Rates.Model.Rates(r.data);
                                callback(rates, scope);
                            }
                        });
                    };
                    RatesService.prototype.Regenerate = function () {
                        this.Get('/Umbraco/API/News/Regenerate/');
                    };
                    RatesService.$inject = ['$http', '$q'];
                    return RatesService;
                }(FC.Core.ServiceBase));
                Services.RatesService = RatesService;
                Application.app.service('FC.Modules.Rates.Services.RatesService', FC.Modules.Rates.Services.RatesService);
            })(Services = Rates.Services || (Rates.Services = {}));
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating_1) {
            var Rating = (function () {
                function Rating(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Rating.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Rating;
            }());
            Rating_1.Rating = Rating;
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var RatingModule = new FC.Modules.Rating.Rating(angular.module('FC.Modules.Rating', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts" />
///<reference path="../Rating.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Controllers;
            (function (Controllers) {
                var RatingController = (function (_super) {
                    __extends(RatingController, _super);
                    function RatingController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                    }
                    RatingController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                    ];
                    return RatingController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.RatingController = RatingController;
                RatingModule.GetApplication().RegisterController("FC.Modules.Rating.Controllers.RatingController", FC.Modules.Rating.Controllers.RatingController);
            })(Controllers = Rating.Controllers || (Rating.Controllers = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Directives;
            (function (Directives) {
                var RatingDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function RatingDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        this.template = '<div class="rating" theme="rating">                ' +
                            '    <span class="count" theme="count">100K</span>  ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '</div>                                             ';
                        var vm = this;
                        RatingDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            attrs.$observe('for', function (festival) {
                                if (festival) {
                                    var f = new FC.Shared.Models.UFestival(jQuery.parseJSON(festival));
                                }
                            });
                        };
                    }
                    RatingDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new RatingDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return RatingDirective;
                }());
                Directives.RatingDirective = RatingDirective;
                Application.app.directive('rating', FC.Modules.Rating.Directives.RatingDirective.factory());
            })(Directives = Rating.Directives || (Rating.Directives = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search_1) {
            var Search = (function () {
                function Search(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Search.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Search;
            }());
            Search_1.Search = Search;
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var SearchModule = new FC.Modules.Search.Search(angular.module('FC.Modules.Search', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts" />
///<reference path="../Search.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search) {
            var Controllers;
            (function (Controllers) {
                var SearchController = (function (_super) {
                    __extends(SearchController, _super);
                    function SearchController($uibModal, $http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc, SearchService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        _super.prototype.SetUserCountries.call(this);
                        this.initializeServices(SearchService);
                        this.initializeScope($scope, $uibModal);
                    }
                    SearchController.prototype.initializeServices = function (SearchSvc) {
                        this.SearchService = SearchSvc;
                    };
                    SearchController.prototype.initializeScope = function ($scope, $uibModal) {
                        this.$scope = $scope;
                        this.$uibModal = $uibModal;
                        this.$scope.DoSubmit = this.DoSubmit;
                        this.$scope.DoSearch = this.DoSearch;
                        this.$scope.SearchResult = new FC.Shared.ViewModels.SearchResult();
                        this.$scope.OpenModal = this.OpenModal;
                        //this.$scope.GenreData = GenreData;
                        //this.$scope.CountryData = CountryData;
                    };
                    SearchController.prototype.OpenModal = function (ctr) {
                        var modalInstance = ctr.$uibModal.open({
                            animation: true,
                            templateUrl: '/Scripts/Modules/Search/Views/searchresults.html',
                            controller: 'FC.Modules.Search.Controllers.SearchController',
                            controllerAs: 'vm',
                            size: 400,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    SearchController.prototype._ParseSearchResult = function (result, ctr) {
                        var $scope = ctr.$scope;
                        if (result.Festivals.length > 0) {
                            $scope.FestivalResultVisible = true;
                            $scope.SearchResult.Festivals = result.Festivals;
                            $scope.IsSearching = true;
                        }
                        if (result.Artists.length > 0) {
                            $scope.ArtistResultVisible = true;
                            $scope.SearchResult.Artists = result.Artists;
                            $scope.IsLoading = false;
                        }
                    };
                    SearchController.prototype.DoSubmit = function (ctr) {
                        ctr.OpenModal(ctr);
                    };
                    SearchController.prototype.DoSearch = function ($scope) {
                        var vm = $scope.$scope;
                        var ctr = $scope;
                        var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
                        SearchFilter.ActiveCountries = ctr.ActiveCountryIDs;
                        SearchFilter.Keyword = vm.Keyword;
                        if (SearchFilter.Keyword.length > 2) {
                            vm.IsLoading = true;
                            vm.IsSearching = true;
                            ctr.SearchService.Search(SearchFilter).then(function (response) {
                                ctr._ParseSearchResult(response.Data, ctr);
                            });
                        }
                    };
                    SearchController.$inject = [
                        '$uibModal',
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        "FC.Modules.Search.Services.SearchService"
                    ];
                    return SearchController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SearchController = SearchController;
                SearchModule.GetApplication().RegisterController("FC.Modules.Search.Controllers.SearchController", FC.Modules.Search.Controllers.SearchController);
            })(Controllers = Search.Controllers || (Search.Controllers = {}));
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search) {
            var Services;
            (function (Services) {
                var SearchService = (function (_super) {
                    __extends(SearchService, _super);
                    function SearchService(http, q) {
                        _super.call(this, http, q);
                    }
                    SearchService.prototype.Search = function (filter) {
                        return this.Post('/Umbraco/API/Search/Search', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    SearchService.$inject = ['$http', '$q'];
                    return SearchService;
                }(FC.Core.ServiceBase));
                Services.SearchService = SearchService;
            })(Services = Search.Services || (Search.Services = {}));
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
SearchModule.GetApplication().app.service('FC.Modules.Search.Services.SearchService', FC.Modules.Search.Services.SearchService);
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Controllers;
            (function (Controllers) {
                var ThemingController = (function (_super) {
                    __extends(ThemingController, _super);
                    function ThemingController($http, $q, $scope, $route, $routeParams, $location, ThemingSvc, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingSvc, LocalizationSvc);
                        ThemingModule.GetApplication().RegisterController("FC.Modules.Theming.Controllers.ThemingController", FC.Modules.Theming.Controllers.ThemingController);
                    }
                    ThemingController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService'
                    ];
                    return ThemingController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ThemingController = ThemingController;
            })(Controllers = Theming.Controllers || (Theming.Controllers = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming_1) {
            var Theming = (function () {
                function Theming(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Theming.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Theming;
            }());
            Theming_1.Theming = Theming;
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var ThemingModule = new FC.Modules.Theming.Theming(angular.module('FC.Modules.Theming', ApplicationDependencies), Application);
///<reference path="../Theming.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
//function asyncGreet(name) {
//    var deferred = $q.defer();
//    setTimeout(function () {
//        deferred.notify('About to greet ' + name + '.');
//        if (okToGreet(name)) {
//            deferred.resolve('Hello, ' + name + '!');
//        } else {
//            deferred.reject('Greeting ' + name + ' is not allowed.');
//        }
//    }, 1000);
//    return deferred.promise;
//}
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Services;
            (function (Services) {
                var ThemingService = (function (_super) {
                    __extends(ThemingService, _super);
                    function ThemingService(http, q, $route, routeParams, location) {
                        _super.call(this, http, q);
                        var vm = this;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$location = location;
                        this.$routeParams = routeParams;
                    }
                    ThemingService.prototype.GetByID = function (id) {
                        return this.Get('/Umracou/API/Theme/GetByID?id=' + id);
                    };
                    ThemingService.prototype.GetAll = function () {
                        return this.Get('/Umbraco/API/Theme/GetAll');
                    };
                    ThemingService.prototype.getActiveThemeFromCache = function () {
                        var vm = this;
                        var deferred = vm.$q.defer();
                        var theme = vm.CacheManager.GetStorage("active-theme").data;
                        if (theme != null) {
                        }
                    };
                    ThemingService.prototype.GetActiveTheme = function () {
                        return this.Get('/Umbraco/API/Theme/GetDefault');
                    };
                    ThemingService.$inject = ['$http', '$q', '$route', '$routeParams', '$location'];
                    return ThemingService;
                }(FC.Core.ServiceBase));
                Services.ThemingService = ThemingService;
                ThemingModule.GetApplication().RegisterService('FC.Modules.Theming.Services.ThemingService', FC.Modules.Theming.Services.ThemingService);
            })(Services = Theming.Services || (Theming.Services = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Services/ThemingService.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var BackImgDirective = (function () {
                    function BackImgDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        BackImgDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            if (attrs["watch"]) {
                                scope.$watch(attrs["watch"], function (img) {
                                    var imgSrc = "";
                                    if (img) {
                                        imgSrc = img.toString();
                                        var url = $AppConfig.URLRoot + '/' + attrs["backimg"].replace("$0$", imgSrc);
                                        element.css({
                                            'background-image': 'url(' + url + ')',
                                            'background-size': 'cover'
                                        });
                                    }
                                });
                            }
                            else {
                                var url = $AppConfig.URLRoot + '/' + attrs["backimg"];
                                element.css({
                                    'background-image': 'url(' + url + ')',
                                    'background-size': 'cover'
                                });
                            }
                        };
                    }
                    BackImgDirective.prototype.color = function (color) {
                        return "#" + color;
                    };
                    BackImgDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new BackImgDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return BackImgDirective;
                }());
                Directives.BackImgDirective = BackImgDirective;
                Application.app.directive('backimg', FC.Modules.Theming.Directives.BackImgDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Services/ThemingService.ts"/>
///<reference path="../../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var CollapsibleDirective = (function () {
                    function CollapsibleDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        CollapsibleDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            var htmltext;
                            debugger;
                            if (attrs["htmltext"]) {
                                htmltext = (attrs["htmltext"] == "true" ? true : false);
                            }
                            else {
                                htmltext = false;
                            }
                            scope.$watch(attrs["collapsible"], function (value, attrs) {
                                return attrs["collapsible"];
                            });
                        };
                    }
                    CollapsibleDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new Directives.BackImgDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return CollapsibleDirective;
                }());
                Directives.CollapsibleDirective = CollapsibleDirective;
                Application.app.directive('collapsible', FC.Modules.Theming.Directives.CollapsibleDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var SelectModalDirective = (function () {
                    function SelectModalDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        SelectModalDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            element.bind('click', function () {
                                //element.toggleClass(attrs['toggleclass']);
                                debugger;
                            });
                        };
                    }
                    SelectModalDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new SelectModalDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return SelectModalDirective;
                }());
                Directives.SelectModalDirective = SelectModalDirective;
                Application.app.directive('selectmodal', FC.Modules.Theming.Directives.SelectModalDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Services/ThemingService.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var ThemingDirective = (function () {
                    function ThemingDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        vm.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        var ActiveTheme = null;
                        ThemingDirective.prototype.link = function (scope, element, attrs) {
                            if (vm.CacheManager.Contains("active-theme")) {
                                var ActiveTheme = vm.CacheManager.GetStorage("active-theme").data;
                                vm._element = element;
                                vm._attrs = attrs;
                                if (ActiveTheme) {
                                    vm.setThemeStyles(vm._attrs, vm._element, ActiveTheme, vm);
                                }
                                else {
                                    ThemingSvc.GetActiveTheme().then(function (r) {
                                        vm.CacheManager.WriteStorage("active-theme", r.Data, 1000 * 60 * 60 * 24 * 7);
                                        ActiveTheme = r.Data;
                                        vm.setThemeStyles(vm._attrs, vm._element, ActiveTheme, vm);
                                    });
                                }
                            }
                        };
                    }
                    ThemingDirective.prototype.color = function (color) {
                        return "#" + color;
                    };
                    ThemingDirective.prototype.setThemeStyles = function (attrs, element, ActiveTheme, vm) {
                        $.each(attrs["theme"].split(','), function (key, themeProperty) {
                            themeProperty = themeProperty.replace(' ', "").toLowerCase();
                            switch (themeProperty) {
                                case "theme-font-border":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ThemeColor),
                                        'color': vm.color(ActiveTheme.ThemeColor),
                                        'border': '1px solid ' + vm.color(ActiveTheme.DefaultTextColor)
                                    });
                                    break;
                                case "rating":
                                    element.css({
                                        'border': '1px solid ' + vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "border-themecolor":
                                    element.css({
                                        'border': '1px solid ' + vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "text-themecolor":
                                    element.css({
                                        'color': vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "text-default":
                                    element.css({
                                        'color': vm.color(ActiveTheme.DefaultTextColor)
                                    });
                                    break;
                                case "theme-bg-color":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "background":
                                    if (attrs["for"]) {
                                        var e = $(attrs["for"]);
                                        var url = $AppConfig.URLRoot + '/';
                                        var width = $AppConfig.Client.ScreenWidth;
                                        var height = $AppConfig.Client.ScreenHeight;
                                        url += ActiveTheme.BackgroundImage + ".img?";
                                        if (height > width) {
                                            url += "&height=" + height;
                                        }
                                        else if (height == width) {
                                            url += "&width=" + width + "&height=" + height;
                                        }
                                        else {
                                            url += "&width=" + width;
                                        }
                                        e.css({
                                            'background-image': 'url(' + url + ')',
                                            'background-repeat': 'no-repeat',
                                            'background-color': vm.color(ActiveTheme.BackgroundColor)
                                        });
                                    }
                                    break;
                                case "button":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ThemeColor),
                                        'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                                    });
                                    break;
                                case "button-disabled":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ButtonDisabledColor),
                                        'color': vm.color(ActiveTheme.ButtonDisabledTextColor)
                                    });
                                    break;
                                case "button-hover":
                                    element.on('mouseover', function () {
                                        element.css({
                                            'background-color': vm.color(ActiveTheme.ButtonHoverColor),
                                            'color': vm.color(ActiveTheme.ButtonHoverTextColor)
                                        });
                                    }).on('mouseout', function () {
                                        element.css({
                                            'background-color': vm.color(ActiveTheme.ThemeColor),
                                            'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                                        });
                                    });
                                    break;
                                case "button-active":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ButtonActiveColor),
                                        'color': vm.color(ActiveTheme.ButtonActiveTextColor)
                                    });
                                    break;
                                case "revert-header":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ButtonDefaultTextColor),
                                        'color': vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "revert-button":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ButtonDefaultTextColor),
                                        'color': vm.color(ActiveTheme.ThemeColor)
                                    });
                                    break;
                                case "header":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ThemeColor),
                                        'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                                    });
                                    break;
                                case "link-active":
                                    element.css({
                                        'color': vm.color(ActiveTheme.LinkActiveColor)
                                    });
                                    break;
                                case "link-heart-active":
                                    element.css({
                                        'color': vm.color(ActiveTheme.ActiveHeartColor)
                                    });
                                    break;
                                case "link-heart-inactive":
                                    element.css({
                                        'color': vm.color(ActiveTheme.DefaultHeartColor) // vm.color(ActiveTheme.LinkActiveColor)
                                    });
                                    break;
                                case "count":
                                    element.css({
                                        'background-color': vm.color(ActiveTheme.ThemeColor),
                                        'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                                    });
                                    break;
                                case "link":
                                    element.css({
                                        'color': vm.color(ActiveTheme.DefaultTextColor),
                                    });
                                    break;
                                case "list-item":
                                    var cls = element.attr('class');
                                    var r = $(element.parent()[0]);
                                    //var p = r.find('.ListItem').last();
                                    element.css({
                                        'border-bottom': '2px solid ' + vm.color(ActiveTheme.ThemeColor)
                                    });
                                    //p.css({
                                    //    'border-bottom': '0'
                                    //});
                                    break;
                            }
                        });
                    };
                    ThemingDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new ThemingDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return ThemingDirective;
                }());
                Directives.ThemingDirective = ThemingDirective;
                Application.app.directive('theme', FC.Modules.Theming.Directives.ThemingDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var ToggleClassDirective = (function () {
                    function ToggleClassDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        ToggleClassDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            element.bind('click', function () {
                                element.toggleClass(attrs['toggleclass']);
                            });
                        };
                    }
                    ToggleClassDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new ToggleClassDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return ToggleClassDirective;
                }());
                Directives.ToggleClassDirective = ToggleClassDirective;
                Application.app.directive('toggleclass', FC.Modules.Theming.Directives.ToggleClassDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var CoreModel;
        (function (CoreModel) {
            var RegionInfo = (function () {
                function RegionInfo() {
                }
                return RegionInfo;
            }());
            CoreModel.RegionInfo = RegionInfo;
        })(CoreModel = Shared.CoreModel || (Shared.CoreModel = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enums;
        (function (Enums) {
            //width * height
            (function (BannerFormat) {
                BannerFormat[BannerFormat["Multi_FlexBanner"] = 921600] = "Multi_FlexBanner";
                BannerFormat[BannerFormat["Desktop_FlexBanner"] = 1115520] = "Desktop_FlexBanner";
                BannerFormat[BannerFormat["Mobile_FlexBanner"] = 786432] = "Mobile_FlexBanner";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_500"] = 86000] = "Desktop_Banner_A_172_x_500";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_400"] = 68800] = "Desktop_Banner_A_172_x_400";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_300"] = 51600] = "Desktop_Banner_A_172_x_300";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_250"] = 43000] = "Desktop_Banner_A_172_x_250";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_200"] = 34400] = "Desktop_Banner_A_172_x_200";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_150"] = 25800] = "Desktop_Banner_A_172_x_150";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_100"] = 17200] = "Desktop_Banner_A_172_x_100";
                BannerFormat[BannerFormat["Desktop_Banner_A_172_x_50"] = 8600] = "Desktop_Banner_A_172_x_50";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_50"] = 27800] = "Desktop_Banner_B_556_x_50";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_100"] = 55600] = "Desktop_Banner_B_556_x_100";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_150"] = 83400] = "Desktop_Banner_B_556_x_150";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_200"] = 111200] = "Desktop_Banner_B_556_x_200";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_250"] = 139000] = "Desktop_Banner_B_556_x_250";
                BannerFormat[BannerFormat["Desktop_Banner_B_556_x_300"] = 166800] = "Desktop_Banner_B_556_x_300";
                BannerFormat[BannerFormat["Desktop_Banner_C_336_x_50"] = 16800] = "Desktop_Banner_C_336_x_50";
                BannerFormat[BannerFormat["Desktop_Banner_C_336_x_100"] = 33600] = "Desktop_Banner_C_336_x_100";
                BannerFormat[BannerFormat["Desktop_Banner_C_336_x_150"] = 50400] = "Desktop_Banner_C_336_x_150";
                BannerFormat[BannerFormat["Desktop_Banner_C_336_x_200"] = 67200] = "Desktop_Banner_C_336_x_200";
                BannerFormat[BannerFormat["Desktop_Banner_D_364_x_50"] = 18200] = "Desktop_Banner_D_364_x_50";
                BannerFormat[BannerFormat["Desktop_Banner_D_364_x_150"] = 54600] = "Desktop_Banner_D_364_x_150";
                BannerFormat[BannerFormat["Desktop_Banner_D_364_x_200"] = 72800] = "Desktop_Banner_D_364_x_200";
                BannerFormat[BannerFormat["Desktop_Banner_D_364_x_250"] = 91000] = "Desktop_Banner_D_364_x_250";
                BannerFormat[BannerFormat["Desktop_Banner_D_364_x_300"] = 109200] = "Desktop_Banner_D_364_x_300";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_300"] = 222000] = "Mobile_Banner_A_740_x_300";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_350"] = 259000] = "Mobile_Banner_A_740_x_350";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_100"] = 74000] = "Mobile_Banner_A_740_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_150"] = 111000] = "Mobile_Banner_A_740_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_200"] = 148000] = "Mobile_Banner_A_740_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_250"] = 185000] = "Mobile_Banner_A_740_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_A_740_x_400"] = 296000] = "Mobile_Banner_A_740_x_400";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_50"] = 16000] = "Mobile_Banner_B_320_x_50";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_100"] = 32000] = "Mobile_Banner_B_320_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_150"] = 48000] = "Mobile_Banner_B_320_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_200"] = 64000] = "Mobile_Banner_B_320_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_250"] = 80000] = "Mobile_Banner_B_320_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_B_320_x_320"] = 102400] = "Mobile_Banner_B_320_x_320";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_50"] = 31800] = "Mobile_Banner_C_636_x_50";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_100"] = 63600] = "Mobile_Banner_C_636_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_150"] = 95400] = "Mobile_Banner_C_636_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_200"] = 127200] = "Mobile_Banner_C_636_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_250"] = 159000] = "Mobile_Banner_C_636_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_C_636_x_320"] = 203520] = "Mobile_Banner_C_636_x_320";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_50"] = 15650] = "Mobile_Banner_D_313_x_50";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_100"] = 31300] = "Mobile_Banner_D_313_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_150"] = 46950] = "Mobile_Banner_D_313_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_200"] = 62600] = "Mobile_Banner_D_313_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_250"] = 78250] = "Mobile_Banner_D_313_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_D_313_x_320"] = 100160] = "Mobile_Banner_D_313_x_320";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_50"] = 18250] = "Mobile_Banner_E_365_x_50";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_100"] = 36500] = "Mobile_Banner_E_365_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_150"] = 54750] = "Mobile_Banner_E_365_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_200"] = 73000] = "Mobile_Banner_E_365_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_250"] = 91250] = "Mobile_Banner_E_365_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_E_365_x_320"] = 116800] = "Mobile_Banner_E_365_x_320";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_50"] = 18250] = "Mobile_Banner_F_370_x_50";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_100"] = 36500] = "Mobile_Banner_F_370_x_100";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_150"] = 54750] = "Mobile_Banner_F_370_x_150";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_200"] = 73000] = "Mobile_Banner_F_370_x_200";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_250"] = 91250] = "Mobile_Banner_F_370_x_250";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_300"] = 109500] = "Mobile_Banner_F_370_x_300";
                BannerFormat[BannerFormat["Mobile_Banner_F_370_x_370"] = 135050] = "Mobile_Banner_F_370_x_370";
            })(Enums.BannerFormat || (Enums.BannerFormat = {}));
            var BannerFormat = Enums.BannerFormat;
        })(Enums = Shared.Enums || (Shared.Enums = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Calendar = (function () {
                function Calendar() {
                }
                return Calendar;
            }());
            Models.Calendar = Calendar;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ContentDetail = (function () {
                function ContentDetail() {
                }
                return ContentDetail;
            }());
            Models.ContentDetail = ContentDetail;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NAddress = (function () {
                function NAddress(data) {
                    this.house_number = data.house_number || data["house_number"];
                    this.road = data.road || data["road"];
                    this.suburb = data.suburb || data["suburb"];
                    this.city = data.city || data["city"];
                    this.county = data.county || data["county"];
                    this.state = data.state || data["state"];
                    this.postcode = data.postcode || data["postcode"];
                    this.country = data.country || data["country"];
                    this.country_code = data.country_code || data["country_code"];
                }
                return NAddress;
            }());
            Models.NAddress = NAddress;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NewsFilter = (function () {
                function NewsFilter() {
                    this.GenreIDs = new Array();
                    this.CountryIDs = new Array();
                }
                return NewsFilter;
            }());
            Models.NewsFilter = NewsFilter;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NLocation = (function () {
                function NLocation(data) {
                    this.place_id = data.place_id || data["place_id"];
                    this.licence = data.licence || data["licence"];
                    this.osm_type = data.osm_type || data["osm_type"];
                    this.osm_id = data.osm_id || data["osm_id"];
                    this.lat = data.lat || data["lat"];
                    this.lon = data.lon || data["lon"];
                    this.display_name = data.display_name || data["display_name"];
                    this.address = data.address || data["address"];
                    this.boundingbox = data.boundingbox || data["boundingbox"];
                }
                return NLocation;
            }());
            Models.NLocation = NLocation;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ServiceMessage = (function () {
                function ServiceMessage(data) {
                    this.Data = data;
                    this.Headers = $AppConfig.ServiceHeaders;
                }
                return ServiceMessage;
            }());
            Models.ServiceMessage = ServiceMessage;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ServiceResponse = (function () {
                function ServiceResponse(r) {
                    this.Data = r.Data;
                    this.Message = r.Message;
                    this.StatusCode = r.StatusCode;
                    this.Params = r.Params;
                }
                return ServiceResponse;
            }());
            Models.ServiceResponse = ServiceResponse;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var SimpleDateTime = (function () {
                function SimpleDateTime(s) {
                    this.CultureName = s.CultureName;
                    this.BaseDate = s.BaseDate;
                    this.Year = s.Year;
                    this.DayNum = s.DayNum;
                    this.DayName = s.DayName;
                    this.MonthNum = s.MonthNum;
                    this.MonthName = s.MonthName;
                    this.DateStr = s.DateStr;
                    this.Ticks = s.Ticks;
                    this.TimeStr = s.TimeStr;
                    this.Hour = s.Hour;
                    this.Minute = s.Minute;
                    this.Second = s.Second;
                }
                return SimpleDateTime;
            }());
            Models.SimpleDateTime = SimpleDateTime;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UAnnouncement = (function (_super) {
                __extends(UAnnouncement, _super);
                function UAnnouncement(a) {
                    _super.call(this, a);
                    this.Title = a.Title;
                    this.Date = a.Date;
                    this.Image = a.Image;
                    if (a.Genres != null) {
                        this.Genres = a.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                    this.AnnouncementID = a.AnnouncementID;
                }
                return UAnnouncement;
            }(Models.BaseModel));
            Models.UAnnouncement = UAnnouncement;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UArtist = (function (_super) {
                __extends(UArtist, _super);
                function UArtist(a) {
                    _super.call(this, a);
                    this.Name = a.Name;
                    this.Genres = a.Genres;
                    this.Website = a.Website;
                    this.Country = a.Country;
                    this.DeezerURL = a.DeezerURL;
                    this.FacebookURL = a.FacebookURL;
                    this.SoundcloudURL = a.SoundcloudURL;
                    this.YoutubeURL = a.YoutubeURL;
                    this.SpotifyURL = a.SpotifyURL;
                    this.InstagramURL = a.InstagramURL;
                    this.MyspaceURL = a.MyspaceURL;
                    this.Description = a.Description;
                    this.Image = a.Image;
                    this.Country = a.Country;
                    this.CountryID = a.CountryID;
                }
                return UArtist;
            }(Models.BaseModel));
            Models.UArtist = UArtist;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UBanner = (function (_super) {
                __extends(UBanner, _super);
                function UBanner(b) {
                    _super.call(this, b);
                    this.Title = b.Title;
                    this.ImageURL = b.ImageURL;
                    this.HTML = b.HTML;
                    this.Link = b.Link;
                    this.Visibility = b.Visibility;
                    this.StartDate = b.StartDate;
                    this.EndDate = b.EndDate;
                    this.CustomerID = b.CustomerID;
                    this.BannerID = b.BannerID;
                    this.Customer = b.Customer;
                    if (b.Genres != null) {
                        this.Genres = b.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                }
                return UBanner;
            }(Models.BaseModel));
            Models.UBanner = UBanner;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UCountry = (function (_super) {
                __extends(UCountry, _super);
                function UCountry(c) {
                    _super.call(this, c);
                    if (c) {
                        this.Name = c.Name;
                        this.CultureIsoName = c.CultureIsoName;
                        this.LanguageName = c.LanguageName;
                        this.RegionInfo = c.RegionInfo;
                    }
                }
                return UCountry;
            }(Models.BaseModel));
            Models.UCountry = UCountry;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UCustomer = (function (_super) {
                __extends(UCustomer, _super);
                function UCustomer() {
                    _super.apply(this, arguments);
                }
                return UCustomer;
            }(Models.BaseModel));
            Models.UCustomer = UCustomer;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UFestival = (function (_super) {
                __extends(UFestival, _super);
                function UFestival(f) {
                    _super.call(this, f);
                    this.FestivalID = f.FestivalID;
                    this.CountryID = f.CountryID;
                    this.Name = f.Name;
                    this.Logo = f.Logo;
                    this.IndoorOutdoor = f.IndoorOutdoor;
                    this.Country = f.Country;
                    this.City = f.City;
                    this.Location = f.Location;
                    this.TicketPrice = f.TicketPrice;
                    this.DailyTicketPrice = f.DailyTicketPrice;
                    this.Visitors = f.Visitors;
                    this.StartDate = f.StartDate;
                    this.EndDate = f.EndDate;
                    this.CampingAvailable = f.CampingAvailable;
                    if (f.Genres != null && f.Genres.length > 0) {
                        this.Genres = f.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                    this.Description = f.Description;
                    if (f.Artists != null && f.Artists.length > 0) {
                        this.Artists = f.Artists;
                    }
                    else {
                        this.Artists = new Array();
                    }
                    this.Address = f.Address;
                    this.ZIPCode = f.ZIPCode;
                    this.Website = f.Website;
                    this.Stages = f.Stages;
                    this.FacebookURL = f.FacebookURL;
                    this.InstagramURL = f.InstagramURL;
                    this.TwitterURL = f.TwitterURL;
                    this.YoutubeURL = f.YoutubeURL;
                    this.FlickrURL = f.FlickrURL;
                    this.AftermovieYoutubeURL = f.AftermovieYoutubeURL;
                    this.BusInfo = f.BusInfo;
                    this.TrainInfo = f.TrainInfo;
                    this.AirPlaneInfo = f.AirPlaneInfo;
                    this.CarInfo = f.CarInfo;
                    this.TaxiInfo = f.TaxiInfo;
                    this.IsTopFestival = f.IsTopFestival;
                    this.IsSoldOut = f.IsSoldOut;
                    this.Rating = f.Rating;
                    this.Thumbnail = f.Thumbnail;
                    this.ContentType = f.ContentType;
                    this.MetaKeys = f.MetaKeys;
                    this.MetaDescription = f.MetaDescription;
                    this.Author = f.Author;
                    this.Title = f.Title;
                    this.OrderDate = f.OrderDate;
                    this.DisplayDate = f.DisplayDate;
                    this.ShortText = f.ShortText;
                    this.DetailText = f.DetailText;
                    this.Link = f.Link;
                    this.ShowReadMore = f.ShowReadMore;
                    this.SortOrder = f.SortOrder;
                    this.Rating = f.Rating;
                }
                return UFestival;
            }(Models.BaseModel));
            Models.UFestival = UFestival;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UGenre = (function (_super) {
                __extends(UGenre, _super);
                function UGenre(g) {
                    _super.call(this, g);
                    this.Name = g.Name;
                    this.Thumbnail = g.Thumbnail;
                    this.Theme = g.Theme;
                    this.VisibleOnHome = g.VisibleOnHome;
                    this.Children = g.Children;
                    this.GenreID = g.GenreID;
                    this.ThemeID = g.ThemeID;
                    this.ParentID = g.ParentID;
                }
                return UGenre;
            }(Models.BaseModel));
            Models.UGenre = UGenre;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UserLocalization = (function () {
                function UserLocalization(UL) {
                    this.ISOCurrencySymbol = UL.ISOCurrencySymbol;
                    this.NegativeSign = UL.NegativeSign;
                    this.PositiveSign = UL.PositiveSign;
                    this.TimeSeparator = UL.TimeSeparator;
                    this.CurrencyNativeName = UL.CurrencyNativeName;
                    this.RegionEnglishName = UL.RegionEnglishName;
                    this.RegionName = UL.RegionName;
                    this.CultureIsoName = UL.CultureIsoName;
                    this.CultureCountryName = UL.CultureCountryName;
                    this.CultureMoneySign = UL.CultureMoneySign;
                    this.CultureDateSeparator = UL.CultureDateSeparator;
                    this.CultureCurrencySeparator = UL.CultureCurrencySeparator;
                    this.CurrencyCultureDecimalDigits = UL.CurrencyCultureDecimalDigits;
                    this.NumberDecimalDigits = UL.NumberDecimalDigits;
                    this.NumberDecimalSeparator = UL.NumberDecimalSeparator;
                    this.TwoLetterCountryName = UL.TwoLetterCountryName;
                    this.ThreeLetterCountryName = UL.ThreeLetterCountryName;
                }
                return UserLocalization;
            }());
            Models.UserLocalization = UserLocalization;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UTheme = (function (_super) {
                __extends(UTheme, _super);
                function UTheme(t) {
                    _super.call(this, t);
                    this.Name = t.Name;
                    this.DefaultTextColor = t.DefaultTextColor;
                    this.LinkActiveColor = t.LinkActiveColor;
                    this.LinkHoverColor = t.LinkHoverColor;
                    this.LinkDefaultColor = t.LinkDefaultColor;
                    this.ThemeColor = t.ThemeColor;
                    this.ButtonDefaultColor = t.ButtonDefaultColor;
                    this.ButtonDefaultTextColor = t.ButtonDefaultTextColor;
                    this.ButtonDisabledColor = t.ButtonDisabledColor;
                    this.ButtonDisabledTextColor = t.ButtonDisabledTextColor;
                    this.ButtonHoverColor = t.ButtonHoverColor;
                    this.ButtonHoverTextColor = t.ButtonHoverTextColor;
                    this.ButtonActiveColor = t.ButtonActiveColor;
                    this.ButtonActiveTextColor = t.ButtonActiveTextColor;
                    this.BackgroundColor = t.BackgroundColor;
                    this.BackgroundImage = t.BackgroundImage;
                    this.DefaultHeartColor = t.DefaultHeartColor;
                    this.ActiveHeartColor = t.ActiveHeartColor;
                }
                return UTheme;
            }(Models.BaseModel));
            Models.UTheme = UTheme;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UVisibility = (function (_super) {
                __extends(UVisibility, _super);
                function UVisibility() {
                    _super.apply(this, arguments);
                }
                return UVisibility;
            }(FC.Shared.Models.BaseModel));
            Models.UVisibility = UVisibility;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var BannerFilter = (function () {
                function BannerFilter() {
                }
                return BannerFilter;
            }());
            ServiceMessages.BannerFilter = BannerFilter;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var FestivalFilter = (function () {
                function FestivalFilter() {
                }
                return FestivalFilter;
            }());
            ServiceMessages.FestivalFilter = FestivalFilter;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var GenreFilter = (function () {
                function GenreFilter(filter) {
                    if (filter) {
                        this.GenreID = filter.GenreID;
                        this.ParentID = filter.ParentID;
                        this.Name = filter.Name;
                    }
                }
                return GenreFilter;
            }());
            ServiceMessages.GenreFilter = GenreFilter;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var SearchFilter = (function () {
                function SearchFilter() {
                }
                return SearchFilter;
            }());
            ServiceMessages.SearchFilter = SearchFilter;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var ArtistSearchResult = (function () {
                function ArtistSearchResult() {
                }
                return ArtistSearchResult;
            }());
            ViewModels.ArtistSearchResult = ArtistSearchResult;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var BlockModel = (function () {
                function BlockModel() {
                }
                return BlockModel;
            }());
            ViewModels.BlockModel = BlockModel;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var Model = FC.Shared.Models;
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var FestivalDetailScope = (function () {
                function FestivalDetailScope() {
                }
                return FestivalDetailScope;
            }());
            ViewModels.FestivalDetailScope = FestivalDetailScope;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var FestivalSearchResult = (function () {
                function FestivalSearchResult() {
                }
                return FestivalSearchResult;
            }());
            ViewModels.FestivalSearchResult = FestivalSearchResult;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var GenreSearchResult = (function () {
                function GenreSearchResult() {
                }
                return GenreSearchResult;
            }());
            ViewModels.GenreSearchResult = GenreSearchResult;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var NewsSearchResult = (function () {
                function NewsSearchResult() {
                }
                return NewsSearchResult;
            }());
            ViewModels.NewsSearchResult = NewsSearchResult;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var SearchResult = (function () {
                function SearchResult() {
                }
                return SearchResult;
            }());
            ViewModels.SearchResult = SearchResult;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var SearchScope = (function () {
                function SearchScope() {
                }
                return SearchScope;
            }());
            ViewModels.SearchScope = SearchScope;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=festival-calendar.js.map