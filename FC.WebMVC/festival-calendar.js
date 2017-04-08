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
            var Storage = (function () {
                function Storage() {
                }
                return Storage;
            }());
            Util.Storage = Storage;
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
                CacheManager.prototype.GetCookieValue = function (key) {
                    var vm = this;
                    var cookies = document.cookie.split(";");
                    var c = cookies.filter(function (v, i) {
                        var kvp = v.split('=');
                        var k = kvp[0];
                        var v = kvp[1];
                        return k.trim() == key.trim();
                    });
                    var val = "";
                    if (c != null) {
                        if (c.length > 0) {
                            if (c[0].split('=').length > 0) {
                                val = c[0].split('=')[1];
                            }
                        }
                    }
                    if (val == "") {
                        return null;
                    }
                    else {
                        return val;
                    }
                };
                CacheManager.prototype.SetCookieValue = function (key, value, expires) {
                    if (expires === void 0) { expires = null; }
                    var vm = this;
                    var cookies = document.cookie.split(";");
                    if (!expires) {
                        expires = new Date();
                        expires.setDate(expires.getDate() + 1);
                    }
                    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
                };
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
                    var vm = this;
                    var str = "";
                    try {
                        if (typeof (obj) == "string") {
                            str = obj;
                        }
                        else {
                            str = JSON.stringify(obj);
                        }
                        vm.SetCookieValue(key, str);
                        var event = new CustomEvent(key + "_Writed");
                        window.dispatchEvent(event);
                        var event2 = new CustomEvent("StorageWrited", { detail: key });
                        window.dispatchEvent(event2);
                    }
                    catch (ex) {
                        var event = new CustomEvent("StorageError");
                        window.dispatchEvent(event);
                    }
                };
                /**
                 * @param storageKey the localstorage identifier key.
                 * @param key  the key of the object
                 * @param value the value to match against.
                 * @param successCallback when data is not expired and the storage containst
                 * @param dataEmptyCallback when the data is empty
                 * @param expiredCallback when cache is expired... not really usefull at the moment.
                 */
                CacheManager.prototype.GetByValue = function (storageKey, key, value, successCallback, dataEmptyCallback, expiredCallback) {
                    var storage = new Array();
                    storage = this.GetStorage(storageKey, function (response) {
                        var data = response.data;
                        data.forEach(function (obj, index) {
                            if (obj[key] == value) {
                                var object = obj;
                                if (object) {
                                    if (successCallback) {
                                        successCallback(object);
                                    }
                                    else {
                                        return object;
                                    }
                                }
                                else {
                                    if (dataEmptyCallback) {
                                        dataEmptyCallback();
                                    }
                                    else {
                                        return null;
                                    }
                                }
                            }
                        });
                    }, expiredCallback).data;
                };
                CacheManager.prototype.GetByValueContains = function (storageKey, key, value, successCallback, dataEmptyCallback, expiredCallback) {
                    var storage = new Array();
                    storage = this.GetStorage(storageKey, function (response) {
                        var data = response.data;
                        data.forEach(function (obj, index) {
                            if (obj[key]) {
                                if (obj[key].toString().indexOf(value) > -1) {
                                    var object = obj;
                                    if (object) {
                                        if (successCallback) {
                                            successCallback(object);
                                        }
                                        else {
                                            return object;
                                        }
                                    }
                                    else {
                                        if (dataEmptyCallback) {
                                            dataEmptyCallback();
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                }
                            }
                        });
                    }, expiredCallback).data;
                };
                CacheManager.prototype.GetStorage = function (key, successCallback, expiredCallback) {
                    var vm = this;
                    var data = this.Get(key);
                    if (successCallback && data) {
                        successCallback(data);
                    }
                    if (expiredCallback) {
                        if (data) {
                            expiredCallback(data);
                        }
                        else {
                            expiredCallback();
                        }
                    }
                    return data;
                };
                CacheManager.prototype.Get = function (key, successCallback, expiredCallback) {
                    var data;
                    var result = new Storage();
                    if (this.GetCookieValue(key)) {
                        try {
                            data = JSON.parse(this.GetCookieValue(key));
                        }
                        catch (e) {
                            data = this.GetCookieValue(key);
                        }
                    }
                    if (data) {
                        result.data = data;
                        result.expires = 99999999999;
                        return result;
                    }
                    else {
                        return null;
                    }
                    //try {
                    //    var vm = this;
                    //    var value = localStorage.getItem(key);
                    //    var data: Storage<T> = null;
                    //    if (value) {
                    //        data = JSON.parse(value);
                    //    } else {
                    //        return null;
                    //    }
                    //    if (data && data.expires) {
                    //        if (data.expires > new Date().getTime()) {
                    //            if (successCallback) {
                    //                successCallback(data);
                    //            }
                    //            return data;
                    //        } else {
                    //            console.info('Data expired ' + key + ' from localstorage')
                    //            if (successCallback) {
                    //                successCallback(data);
                    //            }
                    //            if (expiredCallback) {
                    //                expiredCallback(data);
                    //            }
                    //            return data;
                    //        }
                    //    } else {
                    //        return null;
                    //    }
                    //} catch (ex) {
                    //    throw ex;
                    //}
                };
                CacheManager.prototype.DeleteStorage = function (key) {
                    var cookies = document.cookie.split(";");
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];
                        var eqPos = cookie.indexOf("=");
                        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        if (name.trim() == key.trim()) {
                            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        }
                    }
                    var e = new CustomEvent(key + "_Deleted", { 'detail': key });
                    window.dispatchEvent(e);
                };
                CacheManager.prototype.ClearStorage = function () {
                    console.info("Clear storage is not longer supported since migrated to cookies.");
                };
                CacheManager.prototype.Contains = function (key) {
                    if (this.GetCookieValue(key)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                return CacheManager;
            }());
            Util.CacheManager = CacheManager;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
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
            Environment.LocalBaseURL = "http://localhost:8888";
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
                this.URLRoot = Environment.GetBaseURL(EnvironmentType.Local);
                this.ServiceHeaders = new FC.Shared.Models.SystemHeaders();
                this.ServiceHeaders.Culture = this.Client.UserCulture;
                this.ServiceHeaders.UserDateTime = this.Client.CurrentTicks;
                this.ServiceHeaders.ContentType = 'application/json';
                this.ServiceHeaders.Accept = 'application/json';
                this.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
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
        var ServiceBase /*implements INT.IServiceBase<any>*/ = (function () {
            function ServiceBase /*implements INT.IServiceBase<any>*/($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                this.GetCompleted = new Object();
                this.Config = new FC.Core.AppConfig();
                // this.Loading = FC.Shared.Util.LoadQueue.GetInstance();
            }
            //public Create<T>(model: T) {
            //}
            //public Delete<T>(model: T) {
            //}
            //public Update<T>(model: T) {
            //}
            //public ForceDelete<T>(model: T) {
            //}
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.SetCookie = function (name, value, expires) {
                document.cookie = name + "=" + value + "; expires=" + expires.toUTCString() + ";path=/";
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.DeleteCookie = function (name) {
                document.cookie = name + "=; expires=1970/1/1/ 12:00:00;path=/";
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Upload = function (url, files) {
                var _this = this;
                var vm = this;
                url = $AppConfig.URLRoot + url;
                //this.Loading.Listen(url);
                var config = this.Config;
                var vm = this;
                var result;
                var svcMsg = new FC.Shared.Models.ServiceMessage(files);
                var formData = new FormData();
                var index = 0;
                svcMsg.Data.forEach(function (v, k) {
                    formData.append(v.name, v);
                    index++;
                });
                $AppConfig.ServiceHeaders["Content-Type"] = undefined;
                $AppConfig.ServiceHeaders["Process-Data"] = false;
                $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                result = this.$http({
                    headers: $AppConfig.ServiceHeaders,
                    url: url,
                    data: formData,
                    method: 'POST',
                    cache: false,
                }).then(function (response) { return _this.handlerResponded(url, response, {}); });
                result.then(function (r) {
                    if (r.ResponseToken) {
                        vm.SetCookie("Token", r.ResponseToken, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDay(), new Date().getHours() + 6, new Date().getMinutes()));
                    }
                });
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Get = function (url, params) {
                var _this = this;
                var vm = this;
                //this.Loading.Listen(url);
                var result;
                if (vm.GetCompleted[url] == null || vm.GetCompleted[url] == true) {
                    vm.GetCompleted[url] == false;
                    url = $AppConfig.URLRoot + url;
                    $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                    if (params && params.length > 0) {
                        result = this.$http.get(url, {
                            headers: $AppConfig.ServiceHeaders,
                            params: params
                        }).then(function (response) { return _this.handlerResponded(url, response, params); });
                        result.catch(function () {
                            // vm.Loading.TriggerFailure(url);
                        });
                    }
                    else {
                        $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                        result = this.$http.get(url, {
                            headers: $AppConfig.ServiceHeaders
                        }).then(function (response) { return _this.handlerResponded(url, response, params); });
                        result.catch(function () {
                            //vm.Loading.TriggerFailure(url);
                        });
                    }
                    return result;
                }
                else {
                    return result;
                }
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.GetRaw = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
                //this.Loading.Listen(url);
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var vm = this;
                var result;
                result = this.$http.get(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.GetRawTyped = function (url, params, headers) {
                var _this = this;
                //this.Loading.Listen(url);
                var hdrs = {};
                var prms = {};
                var vm = this;
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
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.JSONP = function (url, params) {
                var _this = this;
                //this.Loading.Listen(url);
                var result;
                var vm = this;
                url = $AppConfig.URLRoot + url;
                $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                if (params && params.length > 0) {
                    result = this.$http.jsonp(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(url, response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(url, response, params); });
                }
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.RawJSONP = function (url, params, headers) {
                var _this = this;
                //this.Loading.Listen(url);
                var hdrs = {};
                var prms = {};
                var vm = this;
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
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.PostRaw = function (url, params, headers) {
                var _this = this;
                //this.Loading.Listen(url);
                var vm = this;
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
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Post = function (url, svcMsg) {
                var _this = this;
                //this.Loading.Listen(url);
                url = $AppConfig.URLRoot + url;
                var config = this.Config;
                var vm = this;
                var result;
                $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                result = this.$http({
                    headers: $AppConfig.ServiceHeaders,
                    url: url,
                    data: svcMsg,
                    method: 'POST'
                }).then(function (response) { return _this.handlerResponded(url, response, {}); });
                result.catch(function () {
                    //vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.handlerResponded = function (url, response, params) {
                var vm = this;
                vm.GetCompleted[url] = true;
                //vm.Loading.TriggerComplete(url["ReplaceAll"]($AppConfig.URLRoot, "")["ReplaceAll"]('/', ''));
                if (params && params.length > 0) {
                    response.Params = params;
                }
                if (response) {
                    if (response.data) {
                        if (response.data.ResponseToken) {
                            vm.SetCookie("Token", response.data.ResponseToken, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDay(), new Date().getHours() + 6, new Date().getMinutes()));
                        }
                    }
                }
                return new FC.Shared.Models.ServiceResponse(response.data);
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.handlerRespondedRaw = function (response, params) {
                return response;
            };
            return ServiceBase /*implements INT.IServiceBase<any>*/;
        }());
        Core.ServiceBase /*implements INT.IServiceBase<any>*/ = ServiceBase /*implements INT.IServiceBase<any>*/;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="AppConfig.ts"/>
///<reference path="ServiceBase.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;
            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }
        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        }
        else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },
    dataBrowser: [
        { string: navigator.userAgent, subString: "Edge", identity: "MS Edge" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" },
        { string: navigator.userAgent, subString: "OPR", identity: "Opera" },
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" }
    ]
};
BrowserDetect.init();
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
                    CONFIG = new FC.Core.AppConfig();
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
    'ngMaterial',
    'ui.tinymce',
];
var CONFIG;
var Application = new FC.Core.FCModule("FC", ApplicationDependencies);
var CacheManager = FC.Shared.Util.CacheManager.GetInstance();
//TODO: Implement these vars in CacheManager --> Every API controller has an method Regenerate which will Regenerate the Cache files.
//let GenreData: any;  //genres.js
//let SortedGenreData: any; //genres.js
var fx;
var accounting;
var ThemeData;
var PhoneCodes;
var ActionType;
var ServiceType;
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists_1) {
            var Artists = (function () {
                function Artists(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/artists", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                    this.$Application.AddRoute("/artists/:pagenum", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                    this.$Application.AddRoute("/artists/sort/:character", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                }
                Artists.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Artists;
            }());
            Artists_1.Artists = Artists;
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var ArtistsModule = new FC.Modules.Artists.Artists(angular.module('FC.Modules.Artists', ApplicationDependencies), Application);
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
                    if (dict) {
                        $.each(dict, function (key, value) {
                            vm.Add(key, value, vm);
                        });
                    }
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
                    this.data.push(new KeyValuePair(key, value));
                };
                Dictionary.prototype.GetAll = function () {
                    return this.data;
                };
                Dictionary.prototype.Delete = function (key, source) {
                    var vm = this;
                    var success = false;
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    source.data.forEach(function (kvp, index) {
                        if (kvp.Key == key) {
                            delete vm.data[index];
                            success = true;
                        }
                    });
                    if (success) {
                        var tmp = new Array();
                        source.data.forEach(function (v, k) {
                            if (v != null) {
                                tmp.push(v);
                            }
                        });
                        vm.data = tmp;
                        source.data = tmp;
                    }
                };
                Dictionary.prototype.ContainsKey = function (key, source) {
                    var vm = this;
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    var result = false;
                    return source.data.some(function (v, k) {
                        if (v.Key == key) {
                            return true;
                        }
                        return false;
                    });
                };
                Dictionary.prototype.Get = function (k, source) {
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    var result = null;
                    source.data.forEach(function (value, index) {
                        if (value.Key == k) {
                            result = value.Value;
                        }
                    });
                    return result;
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
            (function (ServiceType) {
                ServiceType[ServiceType["ArtistService"] = 0] = "ArtistService";
                ServiceType[ServiceType["FestivalService"] = 1] = "FestivalService";
                ServiceType[ServiceType["LocationService"] = 2] = "LocationService";
                ServiceType[ServiceType["GenreService"] = 3] = "GenreService";
                ServiceType[ServiceType["TicketService"] = 4] = "TicketService";
                ServiceType[ServiceType["ResellerService"] = 5] = "ResellerService";
                ServiceType[ServiceType["NewsService"] = 6] = "NewsService";
                ServiceType[ServiceType["ReportsService"] = 7] = "ReportsService";
                ServiceType[ServiceType["CountryService"] = 8] = "CountryService";
                ServiceType[ServiceType["AuthService"] = 9] = "AuthService";
                ServiceType[ServiceType["ApplicationUserService"] = 10] = "ApplicationUserService";
                ServiceType[ServiceType["MenuSectionService"] = 11] = "MenuSectionService";
                ServiceType[ServiceType["MenuItemService"] = 12] = "MenuItemService";
                ServiceType[ServiceType["SocialService"] = 13] = "SocialService";
                ServiceType[ServiceType["RoleService"] = 14] = "RoleService";
            })(Controllers.ServiceType || (Controllers.ServiceType = {}));
            var ServiceType = Controllers.ServiceType;
            (function (ActionType) {
                ActionType[ActionType["GetListBy"] = 0] = "GetListBy";
                ActionType[ActionType["GetList"] = 1] = "GetList";
                ActionType[ActionType["Create"] = 2] = "Create";
                ActionType[ActionType["Read"] = 3] = "Read";
                ActionType[ActionType["Update"] = 4] = "Update";
                ActionType[ActionType["Delete"] = 5] = "Delete";
                ActionType[ActionType["ForceDelete"] = 6] = "ForceDelete";
            })(Controllers.ActionType || (Controllers.ActionType = {}));
            var ActionType = Controllers.ActionType;
            var META = (function () {
                function META() {
                }
                return META;
            }());
            Controllers.META = META;
            var BaseController = (function () {
                function BaseController($http, $q, $scope, $location, $routeParams, $mdDialog) {
                    this.BaseIsLoading = true;
                    this.HtmlSafe = function ($sce, data) {
                        var vm = this;
                        return $sce.trustAsHtml(data);
                    };
                    this._detectCount = 0;
                    this._timeout = null;
                    var vm = this;
                    this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                    this.$scope = $scope;
                    this.$scope.inst = this;
                    this.$scope.Now = new Date();
                    this.$http = $http;
                    this.$q = $q;
                    this.$scope.$q = $q;
                    this.$scope['CONFIRMATION'] = FC.Core.Controllers.CONFIRMATION;
                    if ($routeParams["page"]) {
                        this.SetPageNum(parseInt($routeParams["page"]));
                    }
                    else {
                        this.SetPageNum(1);
                    }
                    if ($routeParams["year"]) {
                        this.$scope.ActiveYear = $routeParams["year"];
                    }
                    else {
                        this.$scope.ActiveYear = new Date().getFullYear();
                    }
                    if ($routeParams["month"]) {
                        this.$scope.ActiveMonth = $routeParams["month"];
                    }
                    else {
                        this.$scope.ActiveMonth = new Date().getMonth() + 1;
                    }
                    this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                    this.CountriesSvc = new FC.Modules.Countries.Services.CountriesService($http, $q);
                    this.GeoIPSvc = new FC.Core.Services.GeoIPService($http, $q);
                    this.AuthService = new FC.Core.Services.AuthService($http, $q);
                    this.FestivalService = new FC.Modules.Festival.Services.FestivalService($http, $q);
                    this.LocationService = new FC.Modules.Location.Services.LocationService($http, $q);
                    this.ArtistService = new FC.Modules.Artists.Services.ArtistService($http, $q);
                    this.NewsService = new FC.Modules.News.Services.NewsService($http, $q);
                    this.FavoriteService = new FC.Modules.Favorites.Services.FavoriteService($http, $q);
                    this.GeonamesService = new FC.Modules.Location.Services.GeonamesService($http, $q);
                    this.MenuSectionService = new FC.Modules.Menu.Services.MenuSectionService($http, $q);
                    this.MenuItemService = new FC.Modules.Menu.Services.MenuItemService($http, $q);
                    this.RoleService = new FC.Core.Services.RolesService($http, $q);
                    //public ReportsService: FC.Modules.Report.Services.ReportsService;
                    this.$location = $location;
                    this.$routeParams = $routeParams;
                    this.$inst = this;
                    this.$scope.IsLoading = true;
                    this.$scope.MEDIA_ROOT_ID = FC.Core.Environment.MEDIA_ROOT_ID;
                    this.$scope.ENV = FC.Core.Environment;
                    //avoid multiple calls to API. this is caused by inheriting from basecontroller.
                    this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                    this.$scope.MediaIsObsolete = this.MediaIsObsolete;
                    this.$scope.FormatDate = this.FormatDate;
                    this.$scope.RecoverModel = this.RecoverModel;
                    this.$scope.GetFieldState = this.GetFieldState;
                    this.$scope.SaveFieldState = this.SaveFieldState;
                    this.$scope.SaveFormState = this.SaveFormState;
                    this.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    this.$scope.RepairArray = this.RepairArray;
                    this.$scope.FinishForm = this.FinishForm;
                    this.$scope.DoCancelCRUD = this.DoCancelCRUD;
                    CONFIG = new FC.Core.AppConfig();
                    this.initLoadingScope();
                    this.SetCountryCache();
                    this.SetUserYearAndMonth();
                    this.SetGenreData();
                    this.SetPageNum($routeParams['page']);
                    this.RuleRegister = new Array();
                    this.DoAddSaveListener(null);
                    this.$scope.TinymceOptions = {
                        plugins: 'link image code, media',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    };
                    this.$scope.META = new META();
                    this.$scope.META.PageTitle = "Discover the most amazing festivals! BETA 1.0";
                    this.$scope.META.PageKeys = "Festival, Artists, Calendar, Agenda, EDM, Dance, Hardcore, Hardrock, metal, festivals, overview, oversight";
                    this.$scope.META.PageDesc = "Festival Calendar is THE most complete guide for your Festival, with news, updates, and many more!";
                    this.$scope.META.PageIMG = "";
                    window.addEventListener("FCDataLoadingComplete", function (e) {
                        vm.$scope.IsLoading = false;
                    });
                }
                BaseController.prototype.initLoadingScope = function () {
                    var vm = this;
                    vm.$scope.IsThemesLoading = true;
                    vm.$scope.IsCountriesLoading = true;
                    vm.$scope.IsGenresLoading = true;
                    vm.$scope.IsFestivalsLoading = true;
                };
                BaseController.prototype.AddValidationRule = function (rule) {
                    this.RuleRegister.push(rule);
                };
                BaseController.prototype.SetPageKey = function (pageKey) {
                    var vm = this;
                    debugger;
                    vm.$scope.inst.$scope.PageKey = pageKey;
                };
                /**
                 * @param modelPropertyName this is the key of the model. model[modelKey].
                 */
                BaseController.prototype.DoValidate = function (modelPropertyName) {
                    if (modelPropertyName === void 0) { modelPropertyName = null; }
                    var vm = this;
                    var model = vm.$scope.model;
                    if (modelPropertyName) {
                        model = vm.$scope[modelPropertyName];
                    }
                    vm.$scope.ModelIsValid = true;
                    this.RuleRegister.forEach(function (v, index) {
                        var msgEl = $('<span class="invalid-msg" id="invalid_' + v.FieldName + '"></span>');
                        var regex = new RegExp(v.Rule.Regex, "g");
                        var fieldName = "";
                        if (v.FieldLabel) {
                            fieldName = v.FieldLabel;
                        }
                        else {
                            fieldName = v.FieldName;
                        }
                        if ($("#" + v.FieldName).hasClass('ng-dirty') || $("#" + v.FieldName).hasClass('ng-untouched')) {
                            if (model[v.FieldName]) {
                                if (model[v.FieldName].length == 0 && v.Rule.Required == true) {
                                    if (v.Rule.Required) {
                                        $('#invalid_' + v.FieldName).remove();
                                        vm.$scope.ModelIsValid = false;
                                        msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + v.Rule.RequiredMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                        $("#" + v.FieldName).after(msgEl);
                                    }
                                }
                                else if (v.Rule.MaxLength <= model[v.FieldName].length) {
                                    //$("#" + v.FieldName).addClass('invalid');
                                    vm.$scope.ModelIsValid = false;
                                    $('#invalid_' + v.FieldName).remove();
                                    vm.$scope.ModelIsValid = false;
                                    var toLongMsg = "The input of field $FIELD_NAME$ is too long.";
                                    msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + toLongMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                }
                                else if (!regex.test(model[v.FieldName])) {
                                    //$("#" + v.FieldName).removeClass('valid');
                                    //$("#" + v.FieldName).addClass('invalid');
                                    if ($("#invalid_" + v.FieldName).length > 0) {
                                        $("#invalid_" + v.FieldName).remove();
                                    }
                                    msgEl.html('<i id="invalid_' + v.FieldName + '" class="fa fa-exclamation-triangle"></i><span>' + v.Rule.InvalidMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                    vm.$scope.ModelIsValid = false;
                                }
                                else {
                                    $("#invalid_" + v.FieldName).remove();
                                }
                            }
                            else if (!model[v.FieldName] && v.Rule.Required == true) {
                                if (v.Rule.Required) {
                                    $('#invalid_' + v.FieldName).remove();
                                    vm.$scope.ModelIsValid = false;
                                    msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + v.Rule.RequiredMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                }
                            }
                        }
                    });
                };
                BaseController.prototype.GetPageNum = function () {
                    var vm = this;
                    if (vm.$scope.PageNum) {
                        if (vm.$scope.PageNum <= 0) {
                            vm.$scope.PageNum = 1;
                        }
                    }
                    else {
                        vm.$scope.PageNum = 1;
                    }
                    return vm.$scope.PageNum;
                };
                BaseController.prototype.SetPageNum = function (page) {
                    var vm = this;
                    if (page) {
                        vm.$scope.PageNum = parseInt(page.toString());
                        if (vm.$scope.PageNum <= 0) {
                            vm.$scope.PageNum = 1;
                        }
                    }
                };
                BaseController.prototype.IsFavorite = function (contentID) {
                    var vm = this;
                    return vm.$scope.UserFavorites.Contains("ContentID", contentID);
                };
                BaseController.prototype.SetUserFavorites = function () {
                    throw new Error("BaseController.SetUserFavorites is obsolete");
                };
                BaseController.prototype.DoMarkFavorite = function (contentID, type) {
                    var vm = this;
                    var it;
                    switch (type) {
                        case "artist":
                            it = FC.Shared.Enum.InternalContentType.Artist;
                            break;
                        case "festival":
                            it = FC.Shared.Enum.InternalContentType.Festival;
                            break;
                        case "location":
                            it = FC.Shared.Enum.InternalContentType.Location;
                            break;
                        case "news":
                            it = FC.Shared.Enum.InternalContentType.News;
                            break;
                        case "genre":
                            it = FC.Shared.Enum.InternalContentType.Genre;
                            break;
                        case "report":
                            it = FC.Shared.Enum.InternalContentType.Report;
                            break;
                        default:
                            throw new Error("Unknown type " + type + ".");
                    }
                    vm.FavoriteService.MarkFavorite(contentID, it).then(function (r) {
                        var opts = {};
                        var $scope = vm.$scope;
                        vm.SetUserFavorites();
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if ($scope.MtModal) {
                            $scope.MtModal.hide();
                        }
                        opts.controller = FC.Core.Controllers.AlertController;
                        opts.locals = { local: { ServerMsg: r.Data.MSG } };
                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                        });
                    });
                };
                BaseController.prototype.DoUnMarkFavorite = function (contentID) {
                    var vm = this;
                    vm.FavoriteService.UnmarkFavorite(contentID).then(function (r) {
                        var opts = {};
                        var $scope = vm.$scope;
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if ($scope.MtModal) {
                            $scope.MtModal.hide();
                        }
                        vm.SetUserFavorites();
                        opts.controller = FC.Core.Controllers.AlertController;
                        opts.locals = { local: { ServerMsg: r.Data.MSG } };
                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                        });
                    });
                };
                BaseController.prototype.SetMETA = function (meta, $scope) {
                    if ($scope === void 0) { $scope = null; }
                    if (!$scope) {
                        $scope = this.$scope;
                    }
                    $scope.META = meta;
                    window.dispatchEvent(new CustomEvent("META-REFRESH", { detail: $scope.META }));
                };
                BaseController.prototype.GoNativeBack = function () {
                    history.go(-1);
                };
                BaseController.prototype.ShowLoginModal = function () {
                    var vm = this;
                    var $scope = vm.$scope;
                    var opts = {};
                    window.addEventListener("AUTH_SUCCESS", function () {
                        $scope.MtModal.hide();
                        $scope.IsAuthorized = true;
                    });
                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                    opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = false;
                    $scope.MtModal.show(opts);
                    $scope.IsAuthorized = false;
                };
                BaseController.prototype.ShowLogoutModal = function () {
                    var vm = this;
                    var $scope = vm.$scope;
                    var opts = {};
                    window.addEventListener("AUTH_SUCCESS", function () {
                        $scope.MtModal.hide();
                        $scope.IsAuthorized = true;
                    });
                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                    opts.templateUrl = '/Scripts/modules/auth/views/logout.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = false;
                    $scope.MtModal.show(opts);
                    $scope.IsAuthorized = false;
                };
                /**
                 *
                 * @param $scope
                 * @param forceLogin default is true. When true, user will forced to login.
                 */
                BaseController.prototype.CheckAuth = function ($scope, forceLogin) {
                    if (forceLogin === void 0) { forceLogin = true; }
                    this.AuthService.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                        var opts = {};
                        if (r == true) {
                            $scope.IsAuthorized = true;
                        }
                        else {
                            if (forceLogin) {
                                window.addEventListener("AUTH_SUCCESS", function () {
                                    $scope.MtModal.hide();
                                    $scope.IsAuthorized = true;
                                });
                                opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                opts.parent = document.body;
                                opts.clickOutsideToClose = false;
                                $scope.MtModal.show(opts);
                                $scope.IsAuthorized = false;
                            }
                            $scope.IsAuthorized = false;
                        }
                    });
                };
                BaseController.prototype.RecoverModel = function (model, $scope) {
                    var vm = this;
                    var r = FC.Shared.CoreModel.Recovery.RecoverModel($scope.FormID, model);
                    return r;
                };
                BaseController.prototype.FinishForm = function ($scope) {
                    FC.Shared.CoreModel.Recovery.FinishForm($scope.FormID);
                };
                /*
                * @$scope: IVMBase
                * @name: <string> the name of the field
                * @value: <any> the value of the field
                */
                BaseController.prototype.SaveFieldState = function ($scope, name, value) {
                    var model = $scope.model;
                    FC.Shared.CoreModel.Recovery.Add($scope.FormID, name, value);
                    $scope.inst.SaveFormState($scope);
                    $scope.inst.DoValidate();
                };
                BaseController.prototype.RestoreModel = function ($scope) {
                    $.each($scope.model, function (i, v) {
                        FC.Shared.CoreModel.Recovery.Add($scope.FormID, i, v);
                    });
                };
                BaseController.prototype.GetFieldState = function ($scope, name) {
                    //if ($scope.model) {
                    //    $scope.model[name] = FC.Shared.CoreModel.Recovery.Get<string>($scope.FormID, name);
                    //}
                };
                BaseController.prototype.SaveFormState = function ($scope) {
                    FC.Shared.CoreModel.Recovery.SaveState($scope.FormID, $scope.$location.path());
                };
                BaseController.prototype.SplitToColData = function (columnCount, data) {
                    var vm = this;
                    vm.$scope.ColData1 = new Array();
                    vm.$scope.ColData2 = new Array();
                    vm.$scope.ColData3 = new Array();
                    vm.$scope.ColData4 = new Array();
                    if (columnCount > 4) {
                        throw new Error("Invalid column quantity max = 4");
                    }
                    if (columnCount < 1) {
                        throw new Error("Invalid column quantity min = 1");
                    }
                    if (data == null || data == undefined) {
                        data = new Array();
                    }
                    var index = 0;
                    var settedColCount = 0;
                    data.forEach(function (v, i) {
                        if (columnCount >= 1 && index == 0) {
                            if (index == 0) {
                                vm.$scope.ColData1.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 1) {
                                index = 0;
                            }
                        }
                        if (columnCount >= 2 && index == 1) {
                            if (index == 1) {
                                vm.$scope.ColData2.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 2) {
                                index == 0;
                            }
                        }
                        if (columnCount >= 3 && index == 2) {
                            if (index == 2) {
                                vm.$scope.ColData3.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 3) {
                                index = 0;
                            }
                        }
                        if (columnCount == 4 && index == 3) {
                            if (index == 3) {
                                vm.$scope.ColData4.push(v);
                                settedColCount++;
                                index = 0;
                            }
                        }
                        if (settedColCount == columnCount) {
                            index = 0;
                            settedColCount = 0;
                        }
                        else {
                            index++;
                        }
                    });
                };
                BaseController.prototype.MediaIsObsolete = function (mediaID) {
                    if (mediaID) {
                        if (mediaID.toString().length > 10) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };
                BaseController.prototype.ExplodeTagString = function ($sce, tagString) {
                    var tpl = '<i class="fa fa-tag"/><ul class="taglist">';
                    if (tagString) {
                        var array = tagString.split(',');
                        array.forEach(function (v, i) {
                            if (i <= 2) {
                                tpl += '<li class="taglist-item"> ' + v.trim().toLowerCase() + '</li>';
                            }
                        });
                        tpl += '</ul>';
                        return $sce.trustAsHtml(tpl);
                    }
                    else {
                        return "";
                    }
                };
                BaseController.prototype.ShortenText = function (text) {
                    var txt = text.split(' ');
                    var result = "";
                    txt.forEach(function (word, index) {
                        if (index == 10) {
                            result += word + " ";
                        }
                        result += "";
                    });
                };
                BaseController.prototype.FormatDate = function (d) {
                    if (d) {
                        d = new Date(d.toString());
                        return d.toLocaleDateString();
                    }
                };
                BaseController.prototype.detectByLang = function ($scope) {
                    var vm = this;
                    $AppConfig.CurrentCountry = navigator.language;
                };
                BaseController.prototype.SetUserYearAndMonth = function () {
                    if (!this.CacheManager.Contains("user-month")) {
                        this.CacheManager.WriteStorage("user-month", new Date().getMonth() + 1, 9999999999999999999999);
                    }
                    if (!this.CacheManager.Contains("user-year")) {
                        this.CacheManager.WriteStorage("user-year", new Date().getFullYear(), 9999999999999999999999);
                    }
                };
                BaseController.prototype.SetCountryCache = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-countries")) {
                        if (vm.$scope.MemReg.Get("sys-countries-set") == null) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 999999999999999999999);
                                vm.$scope.IsCountriesLoading = false;
                                vm.$scope.SysCountries = r.Data;
                                var tmp = new Array();
                                r.Data.forEach(function (v, i) {
                                    if (v.IsPopular == true) {
                                        tmp.push(v);
                                    }
                                });
                                CacheManager.WriteStorage("UserCountries", tmp, 99999999999999999999);
                            });
                            vm.$scope.MemReg.Register("sys-countries-set", true);
                        }
                    }
                    else {
                        vm.$scope.SysCountries = CacheManager.Get("sys-countries").data;
                    }
                };
                BaseController.prototype.SetGenreData = function (force) {
                    if (force === void 0) { force = false; }
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-genres") || force == true) {
                        if (vm.$scope.MemReg.Get("sys-genres-set") == null) {
                            vm.GenreService.GetAllGenres().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-genres", r.Data, 9999999999999999999);
                                vm.$scope.SysGenres = r.Data;
                            });
                            vm.$scope.MemReg.Register("sys-genres-set", true);
                        }
                    }
                    else {
                        vm.$scope.SysGenres = CacheManager.Get("sys-genres").data;
                    }
                };
                BaseController.prototype.ClearNullIndexes = function (arr) {
                    console.warn("BaseController::ClearNullIndexes is obsolete, use BaseController::RepairArray instead");
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.prototype.RepairArray = function (arr) {
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.prototype.HasAuth = function (roles) {
                    return this.AuthService.HasAuth(roles);
                };
                BaseController.prototype.DoCancelSearch = function ($scope) {
                    $scope.DoCancelSearch;
                };
                BaseController.prototype.DoCancelCRUD = function ($scope) {
                    $scope = $scope.inst.$scope;
                    $scope.IsCreating = false;
                    $scope.IsDeleting = false;
                    $scope.IsEditing = false;
                    $scope.IsSearching = false;
                    $scope.IsViewDetail = false;
                };
                BaseController.prototype.DoAddSaveListener = function (ev) {
                    var vm = this;
                    if (!this.$scope.MemReg.GetAny("CRUDLISTENERS")) {
                        this.$scope.MemReg.Register("CRUDLISTENERS", "CRUDLISTENERS");
                        window.addEventListener("SAVE_SUCCESS", function (e) {
                            var opts = {};
                            var $scope = e['detail'];
                            //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                            if ($scope.MtModal) {
                                $scope.MtModal.hide();
                            }
                            opts.controller = FC.Core.Controllers.AlertController;
                            opts.locals = { local: { ServerMsg: $scope.ServerMsg } };
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                            });
                        });
                        window.addEventListener("SAVE_FAILURE", function (e) {
                            var opts = {};
                            var $scope = e['detail'];
                            $scope.MtModal.hide();
                            opts.controller = FC.Core.Controllers.AlertController;
                            opts.locals = { local: { ServerMsg: $scope.ServerMsg } };
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-failure.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE_FAIL"));
                            });
                        });
                    }
                };
                BaseController.prototype.DoSaveCRUD = function (action, st, $scope, modelKey) {
                    if (modelKey === void 0) { modelKey = null; }
                    var vm = this;
                    var model = $scope.model;
                    if (modelKey) {
                        if ($scope[modelKey]) {
                            model = $scope[modelKey];
                        }
                    }
                    var result = null;
                    var instance;
                    switch (st) {
                        case ServiceType.ArtistService:
                            instance = new FC.Modules.Artists.Services.ArtistService(this.$http, this.$location);
                            break;
                        case ServiceType.FestivalService:
                            instance = new FC.Modules.Festival.Services.FestivalService(this.$http, this.$location);
                            break;
                        case ServiceType.CountryService:
                            instance = new FC.Modules.Countries.Services.CountriesService(this.$http, this.$location);
                            break;
                        case ServiceType.LocationService:
                            instance = new FC.Modules.Location.Services.LocationService(this.$http, this.$location);
                            break;
                        case ServiceType.NewsService:
                            instance = new FC.Modules.News.Services.NewsService(this.$http, this.$location);
                            break;
                        case ServiceType.ReportsService:
                            //  instance = new FC.Modules.Reports.Services.ReportsService(this.$http, this.$location);
                            console.info("Service ReportsService is not implemented.");
                            break;
                        case ServiceType.GenreService:
                            instance = new FC.Modules.Genres.Services.GenreService(this.$http, this.$location);
                            break;
                        case ServiceType.SocialService:
                            instance = new FC.Modules.Social.Services.SocialService(this.$http, this.$location);
                            break;
                        case ServiceType.MenuItemService:
                            instance = new FC.Modules.Menu.Services.MenuItemService(this.$http, this.$location);
                            break;
                        case ServiceType.MenuSectionService:
                            instance = new FC.Modules.Menu.Services.MenuSectionService(this.$http, this.$location);
                            break;
                    }
                    if (!instance) {
                        throw new Error("Instance is null in method DoSaveCRUD.");
                    }
                    switch (action) {
                        case ActionType.Create:
                            result = instance.Create(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsCreated = true;
                                    $scope.IsCreating = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsCreated = false;
                                    $scope.IsCreating = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot create the item. Please try again later.";
                                $scope.IsCreated = false;
                                $scope.IsCreating = false;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                        case ActionType.Delete:
                            vm.ConfirmDelete($scope);
                            window.addEventListener("CONFIRM_DELETE", function (e) {
                                if (e.detail == "OK") {
                                    result = instance.Delete(model);
                                    $scope.IsLoading = true;
                                    result.then(function (r) {
                                        if (r.Data.SUCCESS) {
                                            $scope.DoCancelCRUD($scope);
                                            $scope.ServerMsg = r.Data.MSG;
                                            $scope.IsDeleted = true;
                                            $scope.IsDeleting = false;
                                            window.dispatchEvent(new CustomEvent("REFRESH"));
                                            window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                        }
                                        else {
                                            $scope.ServerMsg = r.Data.MSG;
                                            $scope.IsDeleted == false;
                                            $scope.IsDeleting = true;
                                            window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                        }
                                        $scope.IsLoading = false;
                                    }).catch(function (r) {
                                        $scope.ServerMsg = "Cannot delete the item. Please try again later.";
                                        $scope.IsDeleted == false;
                                        $scope.IsDeleting = false;
                                        $scope.IsLoading = false;
                                        window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                    });
                                }
                            });
                            break;
                        case ActionType.Update:
                            result = instance.Update(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsEdited = true;
                                    $scope.IsEditing = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsEdited = false;
                                    $scope.IsEditing = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot modify the item. Please try again later.";
                                $scope.IsEdited = false;
                                $scope.IsEditing = true;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                        case ActionType.ForceDelete:
                            result = instance.ForceDelete(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsDeleted = true;
                                    $scope.IsDeleting = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsDeleted == false;
                                    $scope.IsDeleting = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot delete the item. Please try again later.";
                                $scope.IsDeleted == false;
                                $scope.IsDeleting = false;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                    }
                    return result;
                };
                BaseController.prototype._handleCreateAction = function (svc, model) {
                };
                BaseController.prototype._handleUpdateAction = function (svc, model) {
                };
                BaseController.prototype.ConfirmDelete = function ($scope) {
                    var vm = this;
                    var opts = {};
                    //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                    if ($scope.MtModal) {
                        $scope.MtModal.hide();
                    }
                    opts.controller = FC.Core.Controllers.AlertController;
                    opts.controllerAs = 'vm';
                    opts.locals = { local: { ServerMsg: $scope.ServerMsg, model: $scope.model } };
                    opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/delete-confirm.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = true;
                    $scope.MtModal.show(opts);
                };
                BaseController.prototype.Warn = function ($scope, msg) {
                    var vm = this;
                    var opts = {};
                    //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                    if ($scope.MtModal) {
                        $scope.MtModal.hide();
                    }
                    opts.controller = FC.Core.Controllers.AlertController;
                    opts.controllerAs = 'vm';
                    opts.locals = { local: { ServerMsg: $scope.ServerMsg, model: msg } };
                    opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/warning.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = true;
                    $scope.MtModal.show(opts);
                };
                BaseController.prototype.SetLogoutURL = function (url) {
                    var vm = this;
                    vm.$scope.LogoutURL = '/#/logout/' + btoa(url);
                    return vm.$scope.LogoutURL;
                };
                BaseController.$inject = ['$q', '$http', '$scope', '$mdDialog'];
                return BaseController;
            }());
            Controllers.BaseController = BaseController;
        })(Controllers = Shared.Controllers || (Shared.Controllers = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistDetailController = (function (_super) {
                    __extends(ArtistDetailController, _super);
                    function ArtistDetailController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, BannerService, UrlManagerService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                    }
                    //public ActiveGenreID: number;
                    ArtistDetailController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "FC.Modules.Banners.Services.BannerService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService"
                    ];
                    return ArtistDetailController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDetailController = ArtistDetailController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDetailController", FC.Modules.Artists.Controllers.ArtistDetailController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistDialogController = (function (_super) {
                    __extends(ArtistDialogController, _super);
                    function ArtistDialogController($http, $q, $uibModal, $scope, $mdDialog, $route, $routeParams, $location, UrlManagerService, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService, TicketService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '63049361-2BD5-4162-BAD5-4F2F62E49E07';
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        this.setData($routeParams["festivalID"]);
                        var v = FC.Shared.Util.Validator.GetInstance();
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveCreate = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveForceDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.ForceDelete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                    }
                    ArtistDialogController.prototype.setData = function (sortIndex) {
                        var vm = this;
                        vm.ArtistService.GetSorted(sortIndex).then(function (r) {
                            vm.$scope.Artists = r.Data;
                        });
                    };
                    ArtistDialogController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService",
                        "FC.Modules.Ticket.Services.TicketService"
                    ];
                    return ArtistDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDialogController = ArtistDialogController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDialogController", FC.Modules.Artists.Controllers.ArtistDialogController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistModalController = (function (_super) {
                    __extends(ArtistModalController, _super);
                    function ArtistModalController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce, GenreService, ArtistsService, local) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.SaveEventName = local[1];
                        vm.$scope.inst = this;
                        vm.ArtistService = ArtistsService;
                        vm.$scope.inst = vm;
                        vm.$scope.FormID = "5A60475F-E220-493F-99BC-88C7AC937AF3";
                        vm.$scope.DoSaveCreate = this.SaveArtist;
                        vm.$scope.SaveModal = this.SaveModal;
                        vm.$scope.$location = $location;
                        vm.$scope.URLRoot = FC.Core.Environment.MediaURLRoot;
                        //vm.Modal = $uibModal;
                        vm.$scope.MtModal = $mdDialog;
                        vm.SetArtistList();
                        if (vm.$scope.MemReg.Get("SelectedArtists")) {
                            vm.$scope.SelectedArtists = vm.$scope.MemReg.Get("SelectedArtists");
                        }
                        else {
                            vm.$scope.SelectedArtists = new Array();
                        }
                        this.$scope.ServerMsg = null;
                        this.$scope.ArtistCreated = false;
                        this.$scope.DoCreate = this.DoCreateArtist;
                        this.$scope.DoEdit = this.DoEditArtist;
                        this.$scope.DoDelete = this.DoDeleteArtist;
                        this.$scope.DoSaveDelete = this.DoSaveDelete;
                        this.$scope.DoSaveForceDelete = this.DoSaveForceDelete;
                        this.$scope.DoCancelCRUD = this.DoCancelCRUD;
                        this.$scope.IsActive = this.IsActive;
                        this.$scope.DoSaveCreate = this.SaveArtist;
                        this.$scope.DoSaveEdit = this.DoSaveEdit;
                        this.$scope.SelectedHidden = false;
                        this.$scope.ToggleSelected = this.ToggleSelected;
                        this.$scope.model = new FC.Shared.Models.UArtist();
                        this.AddListeners(this.$scope);
                        this.$scope.Close = this.Close;
                        this.RecoverModel(this.$scope.model, this.$scope);
                    }
                    ArtistModalController.prototype.Close = function ($scope) {
                        $scope.MtModal.hide();
                    };
                    ArtistModalController.prototype.AddListeners = function ($scope) {
                        $scope = $scope.inst.$scope;
                        window.addEventListener("ArtistGenrePickerSaved", function (e) {
                            $scope.model.Genres = e["detail"].SelectedGenres;
                            $scope.SaveFieldState($scope, 'Genres', $scope.model.Genres);
                        });
                        window.addEventListener("ArtistLogoSaved", function (e) {
                            $scope.model.Image = e["detail"].MediaID;
                            if ($scope.MediaIsObsolete($scope.model.Image)) {
                                $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=true&Width=50&MediaID=' + $scope.model.Image;
                            }
                            else {
                                $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=false&Width=50&MediaID=' + $scope.model.Image;
                            }
                            $scope.SaveFieldState($scope, 'Image', $scope.model.Image);
                            //model.Image = ....
                        });
                    };
                    ArtistModalController.prototype.ToggleSelected = function ($scope, state) {
                        var $scope = $scope.inst.$scope;
                        $scope.SelectedHidden = state;
                    };
                    ArtistModalController.prototype.SaveArtist = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Create($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            if (r.Data.SUCCESS == true) {
                                $scope.IsCreated = true;
                                $scope.IsCreating = false;
                                $scope.FinishForm($scope);
                            }
                            else {
                                $scope.IsCreated = false;
                                $scope.IsCreating = true;
                            }
                        }).catch(function (r) {
                            $scope.IsCreated = false;
                            $scope.IsCreating = true;
                        });
                    };
                    ArtistModalController.prototype.DoSaveEdit = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Update($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsEdited = true;
                                $scope.IsEditing = false;
                            }
                            else {
                                $scope.IsEditing = true;
                                $scope.IsEdited = false;
                            }
                            $scope.ServerMsg = r.Message;
                        });
                    };
                    ArtistModalController.prototype.DoCreateArtist = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        $scope.IsCreated = false;
                        $scope.IsCreating = true;
                        $scope.ServerMsg = null;
                    };
                    ArtistModalController.prototype.DoEditArtist = function ($scope, artist) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.GetByID(artist.ArtistID).then(function (r) {
                            $scope = $scope.inst.$scope;
                            $scope.model = r.Data;
                            $scope.ServerMsg = null;
                            $scope.IsCreating = false;
                            $scope.IsDeleting = false;
                            $scope.IsEditing = true;
                            if ($scope.model) {
                                if ($scope.inst.MediaIsObsolete($scope.model.Image)) {
                                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=true&MediaID=' + $scope.model.Image;
                                }
                                else {
                                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + $scope.model.Image;
                                }
                            }
                            $scope.RecoverModel($scope.model, $scope);
                        });
                    };
                    ArtistModalController.prototype.DoDeleteArtist = function ($scope, artist) {
                        var vm = this;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.ArtistService, $scope).then(function (r) {
                        });
                    };
                    ArtistModalController.prototype.DoSaveDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Delete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                                $scope.ServerMsg = r.Message;
                                $scope.inst.Filter($scope);
                            }
                            else {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                                $scope.ServerMsg = r.Message;
                            }
                        });
                    };
                    ArtistModalController.prototype.DoSaveForceDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.ForceDelete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                                $scope.ServerMsg = r.Message;
                                $scope.inst.Filter($scope);
                            }
                            else {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                                $scope.ServerMsg = r.Message;
                            }
                        });
                    };
                    ArtistModalController.prototype.Filter = function (scope) {
                        var vm = this;
                        if (scope.ArtistSearchKey) {
                            scope.ArtistSearchKey = scope.ArtistSearchKey.charAt(0).toUpperCase() + scope.ArtistSearchKey.slice(1);
                            vm.$scope.SysArtists = vm.$scope.SelectedArtists;
                            vm.ArtistService.GetSorted(scope.ArtistSearchKey).then(function (r) {
                                vm.$scope.SysArtists = r.Data;
                            });
                        }
                        else {
                            vm.SetArtistList();
                        }
                    };
                    ArtistModalController.prototype.Deactivate = function ($scope, artist, saveEvt, model) {
                        var index = 0;
                        $scope.SelectedArtists = model;
                        var tmp = $scope.SelectedArtists;
                        tmp.forEach(function (v, i) {
                            if (v.ArtistID == artist.ArtistID) {
                                delete $scope.SelectedArtists[index];
                            }
                            index++;
                        });
                        $scope.SelectedArtists = $scope.inst.RepairArray($scope.SelectedArtists);
                        var evt = new CustomEvent(saveEvt, { "detail": $scope });
                        window.dispatchEvent(evt);
                    };
                    ArtistModalController.prototype.Activate = function ($scope, artist) {
                        $scope = $scope.inst.$scope;
                        if (!$scope.SelectedArtists.some(function (v, i) {
                            if (v.ArtistID == artist.ArtistID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })) {
                            $scope.SelectedArtists.push(artist);
                        }
                        else {
                            var index = 0;
                            var tmp = $scope.SelectedArtists;
                            tmp.forEach(function (v, i) {
                                if (v.ArtistID == artist.ArtistID) {
                                    delete $scope.SelectedArtists[index];
                                }
                                index++;
                            });
                            $scope.SelectedArtists = $scope.inst.RepairArray($scope.SelectedArtists);
                        }
                    };
                    ArtistModalController.prototype.IsActive = function ($scope, artist) {
                        var vm = this;
                        if ($scope.SelectedArtists) {
                            var existing = $scope.SelectedArtists.filter(function (v, k) {
                                if (v.ArtistID == artist.ArtistID) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                            if (existing[0]) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        return false;
                    };
                    ArtistModalController.prototype.SetArtistList = function () {
                        var vm = this;
                        //this.ArtistService.GetPaged(50, 1).then(function (r: INT.IServiceResponse<Models.ArtistListVM[]>) {
                        //    vm.$scope.SysArtists = r.Data;
                        //});
                    };
                    ArtistModalController.prototype.SaveModal = function ($scope) {
                        $scope = $scope.inst.$scope;
                        var evt = new CustomEvent($scope.SaveEventName, { "detail": $scope });
                        window.dispatchEvent(evt);
                        if ($scope.$dismiss) {
                            $scope.$dismiss($scope.inst.Modal);
                        }
                    };
                    ArtistModalController.prototype.Cancel = function ($scope) {
                        var vm = this;
                        $scope.$dismiss(vm.Modal);
                    };
                    //public ActiveGenreID: number;
                    ArtistModalController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        'local',
                    ];
                    return ArtistModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistModalController = ArtistModalController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistModalController", FC.Modules.Artists.Controllers.ArtistModalController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistOverviewController = (function (_super) {
                    __extends(ArtistOverviewController, _super);
                    function ArtistOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setArtists();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("SAVE_SUCCESS", function (r) {
                            vm.setArtists();
                        });
                        window.addEventListener("ArtistLogoSaved", function (e) {
                            vm.$scope.model.LogoID = e['detail'];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.ArtistService, $scope);
                            vm.setArtists();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    ArtistOverviewController.prototype.DoEdit = function (partialName, $scope, model) {
                        var vm = this;
                        var opts = {};
                        vm.ArtistService.GetByID(model.ArtistID).then(function (r) {
                            vm.$scope.model = r.Data;
                            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                                if (r == true) {
                                    switch (partialName) {
                                        case "artist-name":
                                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                            opts.parent = document.body;
                                            opts.clickOutsideToClose = true;
                                            $scope.MtModal.show(opts).then(function (answer) {
                                            }, function () {
                                                ;
                                            });
                                            break;
                                        case "logo":
                                            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                                            opts.controllerAs = 'vm';
                                            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                                            opts.parent = document.body;
                                            opts.locals = { local: [$scope.MtModal, "ArtistLogoSaved", vm.$scope.model.MediaDirectoryID] };
                                            opts.clickOutsideToClose = true;
                                            $scope.MtModal.show(opts).then(function (answer) {
                                                //$scope.status = 'You said the information was "' + answer + '".';
                                            }, function () {
                                                // $scope.status = 'You cancelled the dialog.';
                                            });
                                            break;
                                    }
                                }
                                else {
                                    window.addEventListener("AUTH_SUCCESS", function () {
                                        $scope.MtModal.hide();
                                    });
                                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                    opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                    opts.parent = document.body;
                                    opts.clickOutsideToClose = true;
                                    $scope.MtModal.show(opts).then(function (answer) {
                                    }, function () {
                                    });
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.ArtistService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Artists = r.Data;
                            vm.ArtistService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.setArtists = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.ArtistService.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.Artists = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.ArtistService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.DoDelete = function (artist) {
                        var vm = this;
                        vm.$scope.model = artist;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.ArtistService, vm.$scope);
                    };
                    //public ActiveGenreID: number;
                    ArtistOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return ArtistOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistOverviewController = ArtistOverviewController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistOverviewController", FC.Modules.Artists.Controllers.ArtistOverviewController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Models;
            (function (Models) {
                var ArtistListVM = (function () {
                    function ArtistListVM() {
                    }
                    return ArtistListVM;
                }());
                Models.ArtistListVM = ArtistListVM;
            })(Models = Artists.Models || (Artists.Models = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Services;
            (function (Services) {
                var ArtistService = (function (_super) {
                    __extends(ArtistService, _super);
                    function ArtistService(http, q) {
                        _super.call(this, http, q);
                    }
                    ArtistService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    ArtistService.prototype.Search = function (keyword) {
                        return this.Get('/API/Artist/GetByPartialName?name=' + keyword);
                    };
                    ArtistService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Artist/GetPaged?size=' + size + '&page=' + page);
                    };
                    ArtistService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Artist/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    ArtistService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Artist/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    ArtistService.prototype.GetAll = function () {
                        return this.Get('/API/Artist/GetAll');
                    };
                    ArtistService.prototype.GetByID = function (id) {
                        return this.Get('/API/Artist/GetByID?&id=' + id);
                    };
                    ArtistService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Artist/GetByPartialName?&name=' + name);
                    };
                    ArtistService.prototype.Create = function (model) {
                        var result = this.Post('/API/Artist/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.Update = function (model) {
                        var result = this.Post('/API/Artist/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Artist/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Artist/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.$inject = ['$http', '$q'];
                    return ArtistService;
                }(FC.Core.ServiceBase));
                Services.ArtistService = ArtistService;
                ArtistsModule.GetApplication().app.service('FC.Modules.Artists.Services.ArtistService', FC.Modules.Artists.Services.ArtistService);
            })(Services = Artists.Services || (Artists.Services = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth_1) {
            var Auth = (function () {
                function Auth(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/logout/:ref", "/Scripts/Modules/Auth/Views/logout.html", "FC.Modules.Auth.Controllers.AuthController", "vm");
                }
                Auth.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Auth;
            }());
            Auth_1.Auth = Auth;
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var AuthModule = new FC.Modules.Auth.Auth(angular.module('FC.Modules.Auth', ApplicationDependencies), Application);
//?q=77.251.172.231
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var vm;
            var AuthService = (function (_super) {
                __extends(AuthService, _super);
                function AuthService(http, q) {
                    _super.call(this, http, q);
                    var vm = this;
                    this.$q = q;
                }
                AuthService.prototype.GetList = function () {
                    throw new Error("AuthService.GetList() is not implemented.");
                };
                AuthService.prototype.HasAuth = function (roles) {
                    var vm = this;
                    var sid;
                    var uid;
                    var token;
                    var session;
                    if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID") && CacheManager.Contains("Token") && CacheManager.Contains("Session")) {
                        sid = CacheManager.Get("SessionID");
                        uid = CacheManager.Get("UserID");
                        token = CacheManager.Get("Token");
                        session = CacheManager.Get("Session");
                        if (AuthService.Token == null) {
                            AuthService.Token = token.data;
                        }
                        if (AuthService.Session == null) {
                            AuthService.Session = session.data;
                        }
                        if (AuthService.SessionID == null) {
                            AuthService.SessionID = sid.data;
                        }
                        if (AuthService.UserID == null) {
                            AuthService.UserID = uid.data;
                        }
                    }
                    var LastChecked = CacheManager.Get("LastAuthChecked");
                    if (LastChecked == null) {
                        CacheManager.WriteStorage("LastAuthChecked", new Date(), 1000 * 60 * 10);
                        if (!sid || !uid || !token) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return this.$q.resolve(false);
                        }
                    }
                    else if (LastChecked.expires <= new Date().getTime()) {
                        console.log("SERVER AUTHENTICATION CHECKUP ROUTINE");
                        CacheManager.WriteStorage("LastAuthChecked", new Date(), 1000 * 60 * 10);
                        var sm = new FC.Shared.ServiceMessages.IsAuthMsg();
                        if (!sid || !uid || !token) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return vm.$q.resolve(false);
                        }
                        sm.SessionID = sid.data;
                        sm.Token = token.data;
                        if (roles) {
                            sm.Roles = roles;
                        }
                        return this.IsAuth(sm).then(function (r) {
                            AuthService.Session = r.Data;
                            AuthService.Token = r.Data.Token;
                            AuthService.UserID = r.Data.UserID;
                            AuthService.User = AuthService.Session.User;
                            AuthService.IsAuthenticated = r.Data.Authenticated;
                            AuthService.IsAuthorized = r.Data.Authorized;
                            if (r.Data.Authenticated == true && r.Data.Authorized == true) {
                                CacheManager.WriteStorage("SessionID", r.Data.SessionID, parseInt(r.Data.Expires));
                                CacheManager.WriteStorage("Token", r.Data.Token, parseInt(r.Data.Expires));
                                CacheManager.WriteStorage("Session", r.Data, parseInt(r.Data.Expires));
                                CacheManager.WriteStorage("UserID", r.Data.UserID, parseInt(r.Data.Expires));
                                return vm.$q.resolve(true);
                            }
                            else {
                                CacheManager.DeleteStorage("SessionID");
                                CacheManager.DeleteStorage("UserID");
                                CacheManager.DeleteStorage("Token");
                                CacheManager.DeleteStorage("Session");
                                return vm.$q.resolve(false);
                            }
                        });
                    }
                    else if (LastChecked.expires > new Date().getTime()) {
                        if (sid == null || uid == null || token == null) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return vm.$q.resolve(false);
                        }
                        else {
                            if (AuthService.Session.User) {
                                if (AuthService.Session.User.Roles) {
                                    var UserRoles = AuthService.Session.User.Roles;
                                    var any = UserRoles.some(function (v, i) {
                                        return roles.some(function (value, key) {
                                            return (v.Name == value);
                                        });
                                    });
                                    if (any && any == true) {
                                        AuthService.IsAuthenticated = true;
                                        AuthService.IsAuthorized = true;
                                        return vm.$q.resolve(true);
                                    }
                                    else {
                                        AuthService.IsAuthenticated = false;
                                        AuthService.IsAuthorized = false;
                                        CacheManager.DeleteStorage("SessionID");
                                        CacheManager.DeleteStorage("Session");
                                        CacheManager.DeleteStorage("UserID");
                                        CacheManager.DeleteStorage("Token");
                                        return vm.$q.resolve(false);
                                    }
                                }
                            }
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            CacheManager.DeleteStorage("SessionID");
                            CacheManager.DeleteStorage("Session");
                            CacheManager.DeleteStorage("UserID");
                            CacheManager.DeleteStorage("Token");
                            return vm.$q.resolve(false);
                        }
                    }
                    else {
                        throw new Error("Unexpected authorization situation detected.");
                    }
                };
                AuthService.prototype.IsAuth = function (model) {
                    var result = this.Post('/API/Auth/HasAuth', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                AuthService.prototype.Login = function (model) {
                    var result = this.Post('/API/Auth/Login', new FC.Shared.Models.ServiceMessage(model));
                    if (result) {
                        result.then(function (r) {
                            CacheManager.WriteStorage("UserID", r.Data.UserID, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("Session", r.Data, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("SessionID", r.Data.SessionID, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("Token", r.Data.Token, new Date(r.Data.Expires).getTime());
                        });
                    }
                    return result;
                };
                AuthService.prototype.Logout = function (model) {
                    var result = this.Post('/API/Auth/Logout', new FC.Shared.Models.ServiceMessage(model));
                    if (result) {
                        result.then(function (r) {
                            if (CacheManager.Contains("UserID") && CacheManager.Contains("SessionID") && CacheManager.Contains("Token") && CacheManager.Contains("Session")) {
                                CacheManager.DeleteStorage("UserID");
                                CacheManager.DeleteStorage("SessionID");
                                CacheManager.DeleteStorage("Session");
                                CacheManager.DeleteStorage("Token");
                            }
                        });
                    }
                    return result;
                };
                AuthService.$inject = ['$http', '$q'];
                AuthService.Token = "";
                AuthService.SessionID = "";
                AuthService.UserID = "";
                AuthService.IsAuthorized = false;
                AuthService.IsAuthenticated = false;
                return AuthService;
            }(FC.Core.ServiceBase));
            Services.AuthService = AuthService;
            Application.app.service('FC.Core.Services.AuthService', FC.Core.Services.AuthService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/Services/AuthService.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth) {
            var Controllers;
            (function (Controllers) {
                var AuthController = (function (_super) {
                    __extends(AuthController, _super);
                    function AuthController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, AuthService, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$location = $location;
                        $scope.SubmitLoginForm = this.SubmitLoginForm;
                        $scope.SubmitRegisterForm = this.SubmitRegisterForm;
                        $scope.LoginFormVM = new FC.Shared.ServiceMessages.LoginMsg();
                        $scope.RegisterFormVM = new FC.Shared.ServiceMessages.RegisterMsg();
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.AuthSvc = AuthService;
                        this.$scope.inst = this;
                        this.$scope = $scope;
                        this.$scope.StartLogout = this.StartLogout;
                        this.$routeParams = $routeParams;
                        var vm = this;
                        if (window.location.href.indexOf("logout") > -1) {
                            if (this.$routeParams['ref']) {
                                var model = new FC.Shared.ServiceMessages.LogoutMsg();
                                if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                                    model.SessionID = CacheManager.Get("SessionID").data;
                                    model.UserID = CacheManager.Get("UserID").data;
                                    CacheManager.DeleteStorage('UserID');
                                    CacheManager.DeleteStorage('SessionID');
                                    CacheManager.DeleteStorage('Session');
                                    CacheManager.DeleteStorage('Token');
                                    $scope.inst.AuthSvc.Logout(model).then(function (r) {
                                        var url = atob(vm.$routeParams['ref']);
                                        vm.$location.path(url);
                                    });
                                }
                                else {
                                    var url = atob(vm.$routeParams['ref']);
                                    vm.$location.path(url);
                                }
                            }
                            else {
                                throw new Error("Cannot logout without ref argument");
                            }
                        }
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                    }
                    AuthController.prototype.initialize = function ($scope) {
                        var vm = this;
                        vm.AuthSvc.HasAuth(FC.Shared.Enum.Roles.GetAll()).then(function (r) {
                            vm.$scope.HasAuth = r;
                        });
                    };
                    AuthController.prototype.StartLogout = function ($scope) {
                        var vm = this;
                        if (this.$routeParams['ref']) {
                            var model = new FC.Shared.ServiceMessages.LogoutMsg();
                            if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                                model.SessionID = CacheManager.Get("SessionID").data;
                                model.UserID = CacheManager.Get("UserID").data;
                                CacheManager.DeleteStorage('UserID');
                                CacheManager.DeleteStorage('SessionID');
                                CacheManager.DeleteStorage('Session');
                                CacheManager.DeleteStorage('Token');
                                $scope.inst.AuthSvc.Logout(model).then(function (r) {
                                    var url = atob(vm.$routeParams['ref']);
                                    vm.$location.path(url);
                                });
                            }
                            else {
                                var url = atob(vm.$routeParams['ref']);
                                vm.$location.path(url);
                            }
                        }
                        else {
                            throw new Error("Cannot logout without ref argument");
                        }
                    };
                    AuthController.prototype.SubmitLoginForm = function ($scope) {
                        var inst = $scope.inst;
                        var $scope = $scope.inst.$scope;
                        $scope.inst.AuthSvc.Login($scope.LoginFormVM).then(function (r) {
                            if (r.Data != null) {
                                if (r.Data.Authenticated == true) {
                                    var rp = inst.$routeParams;
                                    inst.$location.path(rp.ref);
                                    window.dispatchEvent(new CustomEvent("AUTH_SUCCESS"));
                                }
                                else {
                                    $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                                }
                            }
                            else {
                                $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                            }
                        });
                    };
                    AuthController.prototype.SubmitRegisterForm = function ($scope) {
                    };
                    //public ActiveGenreID: number;
                    AuthController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "FC.Core.Services.AuthService",
                        "$sce",
                    ];
                    return AuthController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.AuthController = AuthController;
                AuthModule.GetApplication().RegisterController("FC.Modules.Auth.Controllers.AuthController", FC.Modules.Auth.Controllers.AuthController);
            })(Controllers = Auth.Controllers || (Auth.Controllers = {}));
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth) {
            var Directives;
            (function (Directives) {
                var AuthDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function AuthDirective($route, $routeParams, $location, $http, $q, $compile) {
                        //public template = '';
                        //public templateUrl = '';
                        //public controller = FC.Modules.Media.Controllers.MediaModalController;
                        //public controllerAs = 'vm';
                        this.replace = true;
                        var vm = this;
                        vm.$http = $http;
                        vm.$q = $q;
                        vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
                        AuthDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                            vm._element = element;
                            vm._attrs = attrs;
                            ///todo validate roles...
                            var isForRoles = false;
                            var isNotForRoles = false;
                            var roles = [];
                            if (vm._attrs["forRoles"]) {
                                isForRoles = true;
                                isNotForRoles = false;
                                if (vm._attrs["forRoles"] == "ROOT") {
                                    roles = FC.Shared.Enum.Roles.GetAllRoot();
                                }
                                else if (vm._attrs["forRoles"] == "ADMIN") {
                                    roles = FC.Shared.Enum.Roles.GetAdmins();
                                }
                                else if (vm._attrs["forRoles"] == "PARTNER") {
                                    roles = FC.Shared.Enum.Roles.GetAllPartner();
                                }
                                else if (vm._attrs["forRoles"] == "ALL") {
                                    roles = FC.Shared.Enum.Roles.GetAll();
                                }
                                else {
                                    roles = vm._attrs['forRoles'].split(',');
                                }
                            }
                            if (vm._attrs["notForRoles"]) {
                                isNotForRoles = true;
                                isForRoles = false;
                                if (vm._attrs["notForRoles"] == "ROOT") {
                                    roles = FC.Shared.Enum.Roles.GetAllRoot();
                                }
                                else if (vm._attrs["notForRoles"] == "ADMIN") {
                                    roles = FC.Shared.Enum.Roles.GetAdmins();
                                }
                                else if (vm._attrs["notForRoles"] == "PARTNER") {
                                    roles = FC.Shared.Enum.Roles.GetAllPartner();
                                }
                                else if (vm._attrs["notForRoles"] == "ALL") {
                                    roles = FC.Shared.Enum.Roles.GetAll();
                                }
                                else {
                                    roles = vm._attrs['notForRoles'].split(',');
                                }
                            }
                            if (isForRoles == true && isNotForRoles == true) {
                                throw new Error("is-for-roles is combined with a not-for-roles which conflicts.");
                            }
                            else if (isForRoles) {
                                vm._element.hide();
                                if (CacheManager.Contains("Session")) {
                                    var session = CacheManager.Get("Session").data;
                                    if (session.User != null) {
                                        if (session.User.Roles != null) {
                                            var any = false;
                                            any = session.User.Roles.some(function (v, k) {
                                                return roles.some(function (v2, k2) {
                                                    if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                                        return true;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                });
                                            });
                                            if (any && any == true) {
                                                vm._element.show();
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Some elements are hidden because you are not permitted to view them.");
                                }
                            }
                            else if (isNotForRoles) {
                                if (CacheManager.Contains("Session")) {
                                    var session = CacheManager.Get("Session").data;
                                    if (session.User != null) {
                                        if (session.User.Roles != null) {
                                            var any = false;
                                            any = session.User.Roles.some(function (v, k) {
                                                return roles.some(function (v2, k2) {
                                                    if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                                        return true;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                });
                                            });
                                            if (any && any == true) {
                                                vm._element.hide();
                                            }
                                            else {
                                                vm._element.show();
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Elements were hidden because they are unecessary.");
                                }
                            }
                        };
                    }
                    AuthDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                            return new AuthDirective($route, $routeParams, $location, $http, $q, $compile);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
                        return directive;
                    };
                    return AuthDirective;
                }());
                Directives.AuthDirective = AuthDirective;
                Application.app.directive('forRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
                Application.app.directive('notForRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
            })(Directives = Auth.Directives || (Auth.Directives = {}));
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
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
                    BannerService.prototype.GetList = function () {
                        throw new Error("BannerService.GetList() is not implemented.");
                    };
                    BannerService.prototype.GetBanners = function (filter) {
                        return this.Post('/API/Banner/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
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
                    this.$Application.AddRoute("/", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month:/:country", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/festival/@:festivalName", "/scripts/modules/details/detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
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
/////<reference path="../../Core/FC.ts" />
/////<reference path="../../Core/Services/NominatimService.ts" />
/////<reference path="../Calendar.ts"/>
/////<reference path="../Services/CalendarService.ts"/>
/////<reference path="../../../Shared/Controllers/BaseController.ts"/>
/////<reference path="../../../Shared/Util/CacheManager.ts"/>
////Loading properties;
//// IsThemesLoading: boolean;//
//// IsCountriesLoading: boolean;//
//// IsGenresLoading: boolean;//
//// IsFestivalsLoading: boolean;//
//module FC.Modules.Calendar.Controllers {
//    import CM = FC.Shared.CoreModel;
//    import INT = FC.Shared.Interfaces;
//    import MODELS = FC.Shared.Models;
//    import MODULES = FC.Modules;
//    export class CalendarController extends FC.Shared.Controllers.BaseController {
//        public $scope: FC.Shared.ViewModels.ICalendarVm;
//        public _inst: FC.Modules.Calendar.Controllers.CalendarController;
//        //base
//        public URLManager: FC.Core.Services.URLManagerService;
//        private CalendarSvc: FC.Modules.Calendar.Services.CalendarService;
//        public NewsSvc: FC.Modules.News.Services.NewsService;
//        public CacheManager: FC.Shared.Util.CacheManager;
//        private CalendarMonths: Array<string>;
//        private CalendarYears: Array<number>;
//        public ActiveMonthNum: number;
//        public ActiveYear: number;
//        public UserGenres: Array<string>;
//        //col data
//        public Festivals: Array<FC.Shared.ViewModels.IFestivalVM>;
//        static $inject = [
//            '$http',
//            '$q',
//            '$scope',
//            '$route',
//            '$routeParams',
//            '$location',
//            '$mdDialog',
//            '$sce',
//            "FC.Core.Services.URLManagerService",
//            "FC.Modules.Calendar.Services.CalendarService",
//            "FC.Modules.News.Services.NewsService"
//        ];
//        private _InitColDbo() {
//            this.Festivals = new Array<FC.Shared.ViewModels.IFestivalVM>();
//        }
//        private _InitServices(
//            CalendarService: FC.Modules.Calendar.Services.CalendarService,
//            NewsService: FC.Modules.News.Services.NewsService
//        ) {
//            this.CalendarSvc = CalendarService;
//            this.NewsSvc = NewsService;
//        }
//        private WatchSearchResult() {
//            var vm = this;
//            vm.$scope.HasSearchResults = false;
//            vm.$scope.IsFestivalsLoading = true;
//            vm.$scope.SearchNoResults = false;
//            vm.$scope.Searching = false;
//            window.addEventListener("Searching", function () {
//                vm.CacheManager.DeleteStorage("search-result");
//                vm.$scope.IsFestivalsLoading = true;
//                vm.$scope.SearchNoResults = false;
//                vm.$scope.Searching = true;
//                vm.$scope.IsLoading = true;
//            })
//            window.addEventListener("SearchCompletedWithResults", function () {
//                vm.$scope.Searching = false;
//                vm.CacheManager.GetStorage("search-result", function (data: any) {
//                    vm.$scope.HasSearchResults = true;
//                    var d = data.data as FC.Shared.ViewModels.IFestivalVM[];
//                    if (d.length == 0) {
//                        vm.$scope.SearchNoResults = true;
//                        vm.$scope.Searching = false;
//                        vm.$scope.IsLoading = false;
//                    } else {
//                        vm.$scope.BaseIsLoading = false;
//                        vm.$scope.Festivals = d;
//                        vm.$scope.Searching = false;
//                        vm.$scope.IsLoading = false;
//                    }
//                });
//            });
//            window.addEventListener("SearchCompletedWithNoResults", function () {
//                vm.$scope.IsLoading = false;
//                vm.$scope.SearchNoResults = true;
//                vm.$scope.Searching = false;
//            });
//        }
//        private _InitializeDateData($scope: any) {
//            //var vm = this;
//            //this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
//            //$scope.ActiveYear = new Date().getFullYear();
//            //this.CalendarSvc.GetMonths().then(function (r: INT.IServiceResponse<Array<string>>) {
//            //    vm.CalendarMonths = r.Data;
//            //});
//        }
//        private compare(a, b) {
//            if (a.OrderDate < b.OrderDate) {
//                return -1;
//            }
//            else if (a.OrderDate > b.OrderDate) {
//                return 1;
//            }
//            else {
//                return 0;
//            }
//        }
//        private _InitViewData($scope: any) {
//            var vm = this;
//            var genres: FC.Shared.Models.UGenre[] = new Array<FC.Shared.Models.UGenre>();
//            var genresFilter: MODELS.UGenre[] = new Array<MODELS.UGenre>();
//            if (vm.CacheManager.Contains('ActiveGenres')) {
//                var tmpGenres = vm.CacheManager.Get<FC.Shared.Models.UGenre[]>('ActiveGenres');
//                genres = tmpGenres.data;
//                genresFilter = genres;
//            }
//            var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//            if (vm.CacheManager.Contains("UserCountries")) {
//                countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//            }
//            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                vm.$scope.Festivals = result.Data;
//                vm.$scope.IsLoading = false;
//            });
//            window.addEventListener("ActiveGenres_Deleted", function (e) {
//                vm.$scope.IsLoading = true;
//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }
//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, new Array<MODELS.UGenre>(), countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });
//            window.addEventListener('ActiveGenres_Writed', function (e) {
//                vm.$scope.IsLoading = true;
//                var genres = new Array<FC.Shared.Models.UGenre>();
//                var tmpGenres = vm.CacheManager.Get<FC.Shared.Models.UGenre[]>('ActiveGenres');
//                genres = tmpGenres.data;
//                var genresFilter = genres;
//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }
//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });
//            window.addEventListener('UserCountries_Writed', function (e) {
//                var countries = vm.CacheManager.GetStorage('UserCountries');
//                var genres = new Array<MODELS.UGenre>();
//                if (vm.CacheManager.Contains("ActiveGenres")) {
//                    genres = vm.CacheManager.Get<MODELS.UGenre[]>('ActiveGenres').data;
//                }
//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres, countries.data).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });
//            window.addEventListener('UserCountries_Deleted', function (e) {
//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }
//                var genres = vm.CacheManager.GetStorage('UserCountries');
//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres.data, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });
//        }
//        constructor(
//            $http,
//            $q,
//            $scope,
//            $route,
//            $routeParams,
//            $location,
//            $mdDialog,
//            $sce,
//            URLManagerService: FC.Core.Services.URLManagerService,
//            CalendarService: FC.Modules.Calendar.Services.CalendarService,
//            NewsService: FC.Modules.News.Services.NewsService
//        ) {
//            super($http, $q, $scope, $location, $routeParams,$mdDialog);
//            var genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
//            var vm = this;
//            this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
//            this.$scope = $scope;
//            this.URLManager = new FC.Core.Services.URLManagerService($http,$q,null);
//            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
//            this.initLoadingScope();
//            this._InitColDbo();
//            this._InitServices(CalendarService, NewsService);
//            this._InitializeDateData($scope);
//            if (!this.$scope.ActiveYear) {
//                if ($routeParams["year"] != null) {
//                    this.$scope.ActiveYear = $routeParams["year"];
//                } else if (CacheManager.Contains("ActiveYear")) {
//                    vm.$scope.ActiveYear = CacheManager.Get<number>("ActiveYear").data;
//                } else {
//                    this.$scope.ActiveYear = new Date().getFullYear();
//                }
//            }
//            if (!this.$scope.ActiveMonth) {
//                if ($routeParams["month"] != null) {
//                    this.$scope.ActiveMonth = $routeParams["month"];
//                } else if (CacheManager.Contains("ActiveMonth")) {
//                    vm.$scope.ActiveMonth = CacheManager.Get<number>("ActiveMonth").data;
//                } else {
//                    vm.$scope.ActiveMonth = new Date().getMonth() + 1;
//                }
//            }
//            this._InitViewData($scope);
//            this.WatchSearchResult();
//            this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/");
//            this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/{1}");
//        }
//        public GetFestivalURL(festival: FC.Shared.Models.UFestival): string {
//            var vm = this;
//            var retUrl = this.URLManager.GetURL("festival", "FestivalURL", [festival.FestivalID.toString()]);
//            return retUrl;
//        }
//    }
//    CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.CalendarController", FC.Modules.Calendar.Controllers.CalendarController);
//} 
///<reference path="../../Core/FC.ts"/>
///<reference path="../Calendar.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Controllers;
            (function (Controllers) {
                var SimpleCalendarController = (function (_super) {
                    __extends(SimpleCalendarController, _super);
                    function SimpleCalendarController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var vm = this;
                        vm.$scope = $scope;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.IsLoading = false;
                        CacheManager.ClearStorage();
                        this.addFilterChangeListener();
                        this.handleSearch();
                        this.$scope.ShowCancelSearch = false;
                        vm.init();
                    }
                    SimpleCalendarController.prototype.ClearFilters = function () {
                        CacheManager.DeleteStorage("Filter_Year");
                        CacheManager.DeleteStorage("Filter_Month");
                        CacheManager.DeleteStorage("ActiveGenres");
                        CacheManager.DeleteStorage("ActiveCountries");
                        CacheManager.DeleteStorage("ActiveLocations");
                        CacheManager.DeleteStorage("ActiveArtists");
                        var e = new CustomEvent("ClearFilter");
                        window.dispatchEvent(e);
                        this.init();
                    };
                    SimpleCalendarController.prototype.handleSearch = function () {
                        var vm = this;
                        window.addEventListener("SearchReset", function (e) {
                            var festivals = e.detail;
                            vm.init();
                        });
                        window.addEventListener("SearchComplete", function (e) {
                            var festivals = e.detail;
                            vm.$scope.Festivals = festivals;
                            vm.$scope.ShowCancelSearch = true;
                        });
                        window.addEventListener("SearchCompleteNoResult", function (e) {
                            var festivals = e.detail;
                            vm.$scope.Festivals = [];
                            vm.$scope.ShowCancelSearch = true;
                        });
                    };
                    SimpleCalendarController.prototype.init = function () {
                        var vm = this;
                        var genres = new Array();
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        var countries = new Array();
                        var locations = new Array();
                        var artists = new Array();
                        vm.$scope.IsLoading = false;
                        try {
                            if (CacheManager.GetCookieValue("UserID")) {
                                vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), FC.Shared.Enum.InternalContentType.All).then(function (r) {
                                    var filter = new FC.Shared.ServiceMessages.FestivalFilter(r.Data.filter(function (v, k) {
                                        return v.ContentType == FC.Shared.Enum.InternalContentType.Genre;
                                    }), r.Data.filter(function (v, k) {
                                        return v.ContentType == FC.Shared.Enum.InternalContentType.Artist;
                                    }), r.Data.filter(function (v, k) {
                                        return v.ContentType == FC.Shared.Enum.InternalContentType.Location;
                                    }), r.Data.filter(function (v, k) {
                                        return v.ContentType == FC.Shared.Enum.InternalContentType.Country;
                                    }));
                                    if (CacheManager.GetCookieValue("Filter_Month")) {
                                        filter.MonthNum = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                                    }
                                    if (CacheManager.GetCookieValue("Filter_Year")) {
                                        filter.YearNum = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                                    }
                                    if (vm.CacheManager.Contains("ActiveGenres")) {
                                        genres = vm.CacheManager.Get("ActiveGenres").data;
                                        genres.forEach(function (v, k) {
                                            filter.GenreIDs.push(v.GenreID);
                                        });
                                    }
                                    if (vm.CacheManager.Contains("ActiveCountries")) {
                                        countries = vm.CacheManager.Get("ActiveCountries").data;
                                        countries.forEach(function (v, k) {
                                            filter.CountryIDs.push(v.CountryID);
                                        });
                                    }
                                    if (vm.CacheManager.Contains("ActiveArtists")) {
                                        artists = vm.CacheManager.Get("ActiveArtists").data;
                                        artists.forEach(function (v, k) {
                                            filter.ArtistIDs.push(v.CountryID);
                                        });
                                    }
                                    if (vm.CacheManager.Contains("ActiveLocations")) {
                                        locations = vm.CacheManager.Get("ActiveLocations").data;
                                        locations.forEach(function (v, k) {
                                            filter.LocationIDs.push(v.LocationID);
                                        });
                                    }
                                    vm.CalendarService.GetByFilter(filter).then(function (r) {
                                        vm.$scope.Festivals = r.Data;
                                        vm.$scope.IsLoading = false;
                                    });
                                });
                            }
                            else {
                                var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                                filter.YearNum = -1;
                                filter.MonthNum = -1;
                                var genres = new Array();
                                var countries = new Array();
                                var locations = new Array();
                                var artists = new Array();
                                var month = new Date().getMonth() + 1;
                                var year = new Date().getFullYear();
                                if (CacheManager.GetCookieValue("Filter_Month")) {
                                    month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                                }
                                if (CacheManager.GetCookieValue("Filter_Year")) {
                                    year = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                                }
                                if (vm.CacheManager.Contains("ActiveGenres")) {
                                    genres = vm.CacheManager.Get("ActiveGenres").data;
                                }
                                if (vm.CacheManager.Contains("ActiveCountries")) {
                                    countries = vm.CacheManager.Get("ActiveCountries").data;
                                }
                                if (vm.CacheManager.Contains("ActiveArtists")) {
                                    artists = vm.CacheManager.Get("ActiveArtists").data;
                                }
                                if (vm.CacheManager.Contains("ActiveLocations")) {
                                    locations = vm.CacheManager.Get("ActiveLocations").data;
                                }
                                filter.YearNum = year;
                                filter.MonthNum = month;
                                vm.CalendarService.GetFilteredFestivals(filter.MonthNum, filter.YearNum, genres, countries).then(function (r) {
                                    vm.$scope.Festivals = r.Data;
                                    vm.$scope.IsLoading = false;
                                });
                            }
                        }
                        catch (e) {
                            year = new Date().getFullYear();
                            month = new Date().getMonth() + 1;
                            genres = new Array();
                            countries = new Array();
                        }
                    };
                    SimpleCalendarController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        //document.getElementById("initialResult").remove();
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    vm.$scope.IsLoading = true;
                                    var d = e.detail;
                                    var genres = new Array();
                                    var countries = new Array();
                                    var locations = new Array();
                                    var artists = new Array();
                                    var month = new Date().getMonth() + 1;
                                    var year = new Date().getFullYear();
                                    if (CacheManager.GetCookieValue("Filter_Month")) {
                                        month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                                    }
                                    if (CacheManager.GetCookieValue("Filter_Year")) {
                                        year = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                                    }
                                    if (vm.CacheManager.Contains("ActiveGenres")) {
                                        genres = vm.CacheManager.Get("ActiveGenres").data;
                                    }
                                    if (vm.CacheManager.Contains("ActiveCountries")) {
                                        countries = vm.CacheManager.Get("ActiveCountries").data;
                                    }
                                    if (vm.CacheManager.Contains("ActiveArtists")) {
                                        artists = vm.CacheManager.Get("ActiveArtists").data;
                                    }
                                    if (vm.CacheManager.Contains("ActiveLocations")) {
                                        locations = vm.CacheManager.Get("ActiveLocations").data;
                                    }
                                    vm.CalendarService.GetFilteredFestivals(month, year, genres, countries).then(function (r) {
                                        vm.$scope.Festivals = r.Data;
                                        vm.$scope.IsLoading = false;
                                    });
                                }
                            }
                        });
                    };
                    //public ActiveGenreID: number;
                    SimpleCalendarController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return SimpleCalendarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SimpleCalendarController = SimpleCalendarController;
                CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.SimpleCalendarController", FC.Modules.Calendar.Controllers.SimpleCalendarController);
            })(Controllers = Calendar.Controllers || (Calendar.Controllers = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedGenres.some(function (v, i) {
//    if (v.GenreID == genre.GenreID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedGenres.push(genre);
//    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedGenres.some(function (v, i) {
//        if (v.GenreID == genre.GenreID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedGenres[index];
//        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
//        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//        modified = false;
//    }
//}
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var BaseModel = (function () {
                function BaseModel() {
                }
                return BaseModel;
            }());
            Models.BaseModel = BaseModel;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../../../Shared/Models/BaseModel.ts"/>
///<reference path="../../../Shared/Interfaces/IFestivalMonthItem.ts"/>
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
                        _super.call(this);
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
                    CalendarService.prototype.GetList = function () {
                        throw new Error("CalendarService.GetList() is not implemented.");
                    };
                    CalendarService.prototype.GetMonths = function () {
                        return this.Get('/API/Calendar/GetMonths');
                    };
                    CalendarService.prototype.GetFestivals = function (genre, month, year) {
                        return this.Get('/API/Festival/GetByMonth?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year);
                    };
                    CalendarService.prototype.GetFestivalsByCountry = function (genre, month, year, country) {
                        return this.Get('/API/Festival/GetByCountry?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year + '&country=' + country);
                    };
                    CalendarService.prototype.GetDaysInMonth = function (year, month) {
                        if (!CacheManager.Contains('monthdays-' + year + '-' + month)) {
                            var result = this.Get('/API/Calendar/GetDaysInMonth?year=' + year + '&month=' + month);
                            result.then(function (r) {
                                CacheManager.WriteStorage('monthdays-' + year + '-' + month, r.Data);
                            });
                            return result;
                        }
                        else {
                            var rsp = { Data: {}, Message: "" };
                            rsp.Data = CacheManager.Get('monthdays-' + year + '-' + month).data;
                            rsp.Message = '{"success":"true"}';
                            return this.$q.resolve(rsp);
                        }
                    };
                    CalendarService.prototype.GetByFilter = function (filter) {
                        return this.Post('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    CalendarService.prototype.GetFilteredFestivals = function (month, year, genres, countries) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.GenreIDs = new Array();
                        filter.CountryIDs = new Array();
                        if (genres) {
                            genres.forEach(function (v, k) {
                                filter.GenreIDs.push(v.GenreID);
                            });
                        }
                        if (countries) {
                            countries.forEach(function (v, k) {
                                filter.CountryIDs.push(v.CountryID);
                            });
                        }
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    CalendarService.prototype.GetByMonthYear = function (month, year) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
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
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Auth = (function () {
            function Auth() {
            }
            return Auth;
        }());
        Core.Auth = Auth;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Controllers;
        (function (Controllers) {
            var CONFIRMATION = (function () {
                function CONFIRMATION() {
                }
                CONFIRMATION.OK = "OK";
                CONFIRMATION.CANCEL = "CANCEL";
                CONFIRMATION.FORCE = "FORCE";
                CONFIRMATION.EDIT = "EDIT";
                CONFIRMATION.CREATE = "CREATE";
                CONFIRMATION.DELETE = "DELETE";
                CONFIRMATION.PUBLISH = "PUBLISH";
                CONFIRMATION.FORCE_DELETE = "FORCE DELETE";
                return CONFIRMATION;
            }());
            Controllers.CONFIRMATION = CONFIRMATION;
            var AlertController = (function (_super) {
                __extends(AlertController, _super);
                function AlertController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, local) {
                    _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                    var vm = this;
                    vm.$scope.inst = this;
                    vm.$scope = $scope;
                    vm.$scope.MtModal = $mdDialog;
                    vm.$scope.Close = this.Close;
                    if (local["ServerMsg"]) {
                        vm.$scope.ServerMsg = local["ServerMsg"];
                    }
                    else {
                        vm.$scope.ServerMsg = "OK";
                    }
                    if (local["model"]) {
                        vm.$scope.model = local["model"];
                    }
                    //key of item to delete?
                    if (local["key"]) {
                        var key = local["key"];
                    }
                }
                AlertController.prototype.DoDeleteConfirm = function (confirm) {
                    var vm = this;
                    switch (confirm.toUpperCase()) {
                        case CONFIRMATION.OK:
                            window.dispatchEvent(new CustomEvent("CONFIRM_DELETE", { detail: CONFIRMATION.OK }));
                            window.dispatchEvent(new CustomEvent("REFRESH"));
                            break;
                        case CONFIRMATION.CANCEL:
                            vm.$scope.MtModal.cancel(CONFIRMATION.CANCEL);
                            window.dispatchEvent(new CustomEvent("CONFIRM_DELETE", { detail: CONFIRMATION.CANCEL }));
                            break;
                        default:
                            break;
                    }
                };
                AlertController.prototype.Close = function ($scope) {
                    $scope.MtModal.hide();
                    $scope.inst.$scope = $scope;
                };
                AlertController.$inject = [
                    '$http',
                    '$q',
                    '$scope',
                    '$mdDialog',
                    '$route',
                    '$routeParams',
                    '$location',
                    "$sce",
                    'local',
                ];
                return AlertController;
            }(FC.Shared.Controllers.BaseController));
            Controllers.AlertController = AlertController;
            Application.RegisterController("FC.Core.Controllers.AlertController", FC.Core.Controllers.AlertController);
        })(Controllers = Core.Controllers || (Core.Controllers = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Controllers;
        (function (Controllers) {
            var HeadController = (function (_super) {
                __extends(HeadController, _super);
                function HeadController($http, $q, $scope, $mdDialog, $route, $routeParams, $location) {
                    _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                    var vm = this;
                    window.addEventListener("META-REFRESH", function (e) {
                        vm.$scope.META = e.detail;
                    });
                }
                HeadController.prototype.Close = function ($scope) {
                    $scope.MtModal.hide();
                    $scope.inst.$scope = $scope;
                };
                HeadController.$inject = [
                    '$http',
                    '$q',
                    '$scope',
                    '$mdDialog',
                    '$route',
                    '$routeParams',
                    '$location',
                ];
                return HeadController;
            }(FC.Shared.Controllers.BaseController));
            Controllers.HeadController = HeadController;
            Application.RegisterController("FC.Core.Controllers.HeadController", FC.Core.Controllers.HeadController);
        })(Controllers = Core.Controllers || (Core.Controllers = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Controllers;
        (function (Controllers) {
            var NavBarController = (function (_super) {
                __extends(NavBarController, _super);
                function NavBarController($http, $q, $scope, $mdDialog, $location, $routeParams, $sce) {
                    _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                    var vm = this;
                    vm.$scope.inst = this;
                    vm.$scope = $scope;
                    vm.$scope.MtModal = $mdDialog;
                    if (CacheManager.GetCookieValue("UserID")) {
                        vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), FC.Shared.Enum.InternalContentType.All).then(function (r) {
                            var genres = r.Data.filter(function (k, v) {
                                return k.ContentType == FC.Shared.Enum.InternalContentType.Genre;
                            });
                            var artists = r.Data.filter(function (k, v) {
                                return k.ContentType == FC.Shared.Enum.InternalContentType.Artist;
                            });
                            var countries = r.Data.filter(function (k, v) {
                                return k.ContentType == FC.Shared.Enum.InternalContentType.Country;
                            });
                            var locations = r.Data.filter(function (k, v) {
                                return k.ContentType == FC.Shared.Enum.InternalContentType.Location;
                            });
                            vm.$scope.CountryCount = countries.length;
                            vm.$scope.ArtistCount = artists.length;
                            vm.$scope.LocationCount = locations.length;
                            vm.$scope.GenreCount = genres.length;
                        });
                    }
                }
                NavBarController.$inject = [
                    '$http',
                    '$q',
                    '$scope',
                    '$mdDialog',
                    '$location',
                    '$routeParams',
                    "$sce"
                ];
                return NavBarController;
            }(FC.Shared.Controllers.BaseController));
            Controllers.NavBarController = NavBarController;
            Application.RegisterController("FC.Core.Controllers.NavBarController", FC.Core.Controllers.NavBarController);
        })(Controllers = Core.Controllers || (Core.Controllers = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var STD;
(function (STD) {
    var Controllers;
    (function (Controllers) {
        var RolePickerController = (function (_super) {
            __extends(RolePickerController, _super);
            function RolePickerController($e, $http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.IsLoading = true;
                vm.$scope.$watch('value', function (v) {
                    if (v) {
                        debugger;
                    }
                });
            }
            RolePickerController.prototype.OpenRolesModal = function () {
                var $scope = this.$scope;
                var opts = {};
                opts.controller = STD.Controllers.RolePickerDialogController;
                opts.controllerAs = 'vm';
                opts.templateUrl = '/Scripts/modules/core/views/role-picker-dialog.html';
                opts.parent = document.body;
                opts.clickOutsideToClose = true;
                $scope.MtModal.show(opts).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    // $scope.status = 'You cancelled the dialog.';
                });
            };
            RolePickerController.prototype.DoChange = function () {
                debugger;
            };
            RolePickerController.prototype.Close = function () {
                var vm = this;
                vm.MtModal.hide();
            };
            RolePickerController.$inject = [
                '$element',
                '$http',
                '$q',
                '$scope',
                '$mdDialog',
                '$route',
                '$routeParams',
                '$location',
                "$sce"
            ];
            return RolePickerController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.RolePickerController = RolePickerController;
        Application.RegisterController("STD.Controllers.RolePickerController", STD.Controllers.RolePickerController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var STD;
(function (STD) {
    var Controllers;
    (function (Controllers) {
        var RolePickerDialogController = (function (_super) {
            __extends(RolePickerDialogController, _super);
            function RolePickerDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.IsLoading = true;
                //todo: check if model not empty and fill list.
                //vm.$scope.ActiveRoles = new FC.List<MODELS.Role>();
                //vm.$scope.SysRoles = new FC.List<MODELS.Role>();
                //vm.RoleService.GetList().then(function (r) {
                //    vm.$scope.SysRoles = new FC.List<MODELS.Role>(r.Data);
                //});
            }
            RolePickerDialogController.prototype.DoSelectAll = function () {
                var vm = this;
                // vm.$scope.ActiveRoles.AddRange(vm.$scope.SysRoles.Where([{Key:'Name',Value:'Developer', Operator: '=='}, {Key:'Name',Value:'Admin', Operator:'=='}]));
            };
            RolePickerDialogController.prototype.DoChange = function () {
                var vm = this;
                var a = vm.$scope.SysRoles.Find('RoleID', vm.$scope.Activated);
                vm.$scope.ActiveRoles.Add(a);
            };
            RolePickerDialogController.prototype.Close = function () {
                var vm = this;
                vm.MtModal.hide();
            };
            RolePickerDialogController.$inject = [
                '$http',
                '$q',
                '$scope',
                '$mdDialog',
                '$route',
                '$routeParams',
                '$location',
                "$sce"
            ];
            return RolePickerDialogController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.RolePickerDialogController = RolePickerDialogController;
        Application.RegisterController("STD.Controllers.RolePickerDialogController", STD.Controllers.RolePickerDialogController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var STD;
(function (STD) {
    var Controllers;
    (function (Controllers) {
        var StdDatePickerController = (function (_super) {
            __extends(StdDatePickerController, _super);
            function StdDatePickerController($e, $http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.Year = new Date().getFullYear().toString();
                vm.$scope.PrevYear = (new Date().getFullYear() - 1).toString();
                vm.$scope.NextYear = (new Date().getFullYear() + 1).toString();
                vm.$scope.CurrentYear = new Date().getFullYear().toString();
                vm.$scope.Month = (new Date().getMonth() + 1).toString();
                vm.$scope.Day = new Date().getDate().toString();
                vm.$scope.Hours = "0";
                //round up to 5, 15 etc..
                vm.$scope.Minutes = "0";
                vm.$scope.Seconds = "1";
                vm.$scope.DoChange = this.DoChange;
                vm.$scope.Days = new Array();
                var d = new Date(parseInt(vm.$scope.Year), parseInt(vm.$scope.Month), 0);
                for (var i = 1; i <= d.getDate(); i++) {
                    vm.$scope.Days.push(i.toString());
                }
                vm.$scope.IsLoading = true;
                vm.$scope.$watch('value', function (v) {
                    if (v) {
                        var value = v;
                        vm.$scope.IsLoading = false;
                        vm.$scope.Year = value.getFullYear().toString();
                        vm.$scope.Month = (value.getMonth() + 1).toString();
                        vm.$scope.Day = value.getDate().toString();
                        vm.$scope.Hours = value.getHours().toString();
                        vm.$scope.Minutes = value.getMinutes().toString();
                        vm.$scope.Seconds = "1";
                    }
                });
            }
            StdDatePickerController.prototype.DoChange = function ($scope) {
                var vm = $scope.inst;
                $scope.Days = new Array();
                var d = new Date(parseInt($scope.Year), parseInt($scope.Month), 0);
                for (var i = 1; i <= d.getDate(); i++) {
                    $scope.Days.push(i.toString());
                }
                $scope.value = new Date(parseInt($scope.Year), parseInt($scope.Month) - 1, parseInt($scope.Day), parseInt($scope.Hours), parseInt($scope.Minutes));
                if ($scope.ChangeEvent) {
                    window.dispatchEvent(new CustomEvent($scope.ChangeEvent, { detail: $scope.value }));
                }
            };
            StdDatePickerController.prototype.Close = function ($scope) {
                $scope.MtModal.hide();
                $scope.inst.$scope = $scope;
            };
            StdDatePickerController.$inject = [
                '$element',
                '$http',
                '$q',
                '$scope',
                '$mdDialog',
                '$route',
                '$routeParams',
                '$location',
                "$sce"
            ];
            return StdDatePickerController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.StdDatePickerController = StdDatePickerController;
        Application.RegisterController("STD.Controllers.StdDatePickerController", STD.Controllers.StdDatePickerController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
var STD;
(function (STD) {
    var RolePickerDirective = (function () {
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        function RolePickerDirective($route, $routeParams, $location, $http, $q, $compile) {
            //public template = '';
            this.templateUrl = '/Scripts/modules/Core/views/RolePickerDirective.html';
            this.controller = STD.Controllers.RolePickerController;
            //public controller = FC.Modules.Media.Controllers.MediaModalController;
            this.controllerAs = 'vm';
            this.replace = true;
            this.require = ['ngModel'];
            this.scope = {
                value: '=ngModel'
            };
            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
            RolePickerDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                vm._element = element;
                vm._attrs = attrs;
                scope.ID = attrs["id"];
                scope.ModelName = attrs["ngModel"];
                scope.Label = attrs["stdLabel"];
            };
        }
        RolePickerDirective.factory = function () {
            var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                return new RolePickerDirective($route, $routeParams, $location, $http, $q, $compile);
            };
            directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
            return directive;
        };
        return RolePickerDirective;
    }());
    STD.RolePickerDirective = RolePickerDirective;
    Application.app.directive('rolePicker', STD.RolePickerDirective.factory());
})(STD || (STD = {}));
var STD;
(function (STD) {
    var DatePickerDirective = (function () {
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        function DatePickerDirective($route, $routeParams, $location, $http, $q, $compile) {
            //public template = '';
            this.templateUrl = '/Scripts/modules/Core/views/StdDatePicker.html';
            this.controller = STD.Controllers.StdDatePickerController;
            //public controller = FC.Modules.Media.Controllers.MediaModalController;
            //public controllerAs = 'vm';
            this.replace = true;
            this.require = ['ngModel'];
            this.scope = {
                value: '=ngModel'
            };
            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
            DatePickerDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                vm._element = element;
                vm._attrs = attrs;
                scope.ID = attrs["id"];
                scope.ModelName = attrs["ngModel"];
                scope.Label = attrs["stdLabel"];
                scope.IconVisible = (attrs["iconVisible"] == "true" ? true : false);
                if (attrs["change"]) {
                    scope.ChangeEvent = attrs["change"];
                }
                if (attrs["columns"]) {
                    scope.Columns = attrs["columns"];
                }
                else {
                    scope.Columns = "col-xs-24";
                }
                if (attrs["timeVisible"]) {
                    scope.TimeVisible = (attrs["timeVisible"] == "true" ? true : false);
                    if (scope.TimeVisible == false) {
                        scope.Hours = "1";
                        scope.Minutes = "1";
                        scope.Seconds = "1";
                    }
                }
                else {
                    scope.TimeVisible = true;
                }
                if (attrs["dateVisible"]) {
                    scope.DateVisible = (attrs["dateVisible"] == "true" ? true : false);
                }
                else {
                    scope.DateVisible = true;
                }
                if (attrs["dayVisible"]) {
                    scope.DayVisible = (attrs["dayVisible"] == "true" ? true : false);
                    if (scope.DayVisible == false) {
                        scope.Day = "1";
                    }
                }
                else {
                    scope.DayVisible = true;
                }
                //  debugger;
            };
        }
        DatePickerDirective.factory = function () {
            var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                return new DatePickerDirective($route, $routeParams, $location, $http, $q, $compile);
            };
            directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
            return directive;
        };
        return DatePickerDirective;
    }());
    STD.DatePickerDirective = DatePickerDirective;
    Application.app.directive('stdDatePicker', STD.DatePickerDirective.factory());
})(STD || (STD = {}));
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Directives;
        (function (Directives) {
            var ViewTitleDirective = (function () {
                function ViewTitleDirective() {
                    this.restrict = 'E';
                }
                ViewTitleDirective.prototype.link = function ($scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head title').text(text);
                };
                return ViewTitleDirective;
            }());
            var ViewDescriptionDirective = (function () {
                function ViewDescriptionDirective() {
                    this.restrict = 'E';
                }
                ViewDescriptionDirective.prototype.link = function (scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head meta[name=description]').attr("content", text);
                };
                return ViewDescriptionDirective;
            }());
            var ViewKeysDirective = (function () {
                function ViewKeysDirective() {
                    this.restrict = 'E';
                }
                ViewKeysDirective.prototype.link = function (scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head meta[name=keys]').attr("content", text);
                };
                return ViewKeysDirective;
            }());
            Application.app.directive('viewTitle', function () { return new ViewTitleDirective(); });
            Application.app.directive('viewDescription', function () { return new ViewDescriptionDirective(); });
            Application.app.directive('viewKeys', function () { return new ViewKeysDirective(); });
        })(Directives = Core.Directives || (Core.Directives = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//?q=77.251.172.231
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var GeoIPService = (function (_super) {
                __extends(GeoIPService, _super);
                function GeoIPService(http, q) {
                    _super.call(this, http, q);
                    this.Euro = 0;
                }
                GeoIPService.prototype.GetList = function () {
                    throw new Error("GeoIPService.GetList() is not implemented.");
                };
                GeoIPService.prototype.GetByIP = function (ip) {
                    if (ip) {
                        return this.GetRaw(Core.Environment.GeoIPURL + '?q=' + ip);
                    }
                    else {
                        return this.GetRaw(Core.Environment.GeoIPURL);
                    }
                };
                GeoIPService.$inject = ['$http', '$q'];
                return GeoIPService;
            }(FC.Core.ServiceBase));
            Services.GeoIPService = GeoIPService;
            Application.app.service('FC.Core.Services.NominatimService', FC.Core.Services.NominatimService);
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
            var LocalizationService = (function (_super) {
                __extends(LocalizationService, _super);
                function LocalizationService(http, q) {
                    _super.call(this, http, q);
                }
                LocalizationService.prototype.GetList = function () {
                    throw new Error("LocalizationService.GetList() is not implemented.");
                };
                LocalizationService.prototype.GetLocaleInfo = function () {
                    return this.Get('/API/Localization/GetLocaleInfo');
                };
                LocalizationService.prototype.Regenerate = function () {
                    this.Get('/API/Festival/Regenerate/');
                };
                LocalizationService.$inject = ['$http', '$q'];
                return LocalizationService;
            }(FC.Core.ServiceBase));
            Services.LocalizationService = LocalizationService;
            Application.app.service('FC.Core.Services.LocalizationService', FC.Core.Services.LocalizationService);
        })(Services = Core.Services || (Core.Services = {}));
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
            var Coordinate = (function () {
                function Coordinate() {
                }
                return Coordinate;
            }());
            Services.Coordinate = Coordinate;
            var NominatimService = (function (_super) {
                __extends(NominatimService, _super);
                function NominatimService(http, q) {
                    _super.call(this, http, q);
                    this.Euro = 0;
                }
                //public GetUserlocation(lat: number, long: number): ng.IPromise<FC.Shared.Models.NLocation> {
                //    //var location: FC.Shared.Models.NLocation;
                //    //return this.GetRaw(Environment.GeoServicesURL+'/reverse.php?format=html&lat=' + lat + '&lon=' + long + '&format=json');
                //}
                NominatimService.prototype.GetList = function () {
                    throw new Error("NominatimService.GetList() is not implemented.");
                };
                NominatimService.prototype.GetCoordByCode = function (code) {
                    return this.GetRaw(Core.Environment.GeoServicesURL + '/search.php?format=html&countrycodes=' + code + '&format=json');
                };
                NominatimService.$inject = ['$http', '$q'];
                return NominatimService;
            }(FC.Core.ServiceBase));
            Services.NominatimService = NominatimService;
            Application.app.service('FC.Core.Services.NominatimService', FC.Core.Services.NominatimService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var RolesService = (function (_super) {
                __extends(RolesService, _super);
                function RolesService(http, q) {
                    _super.call(this, http, q);
                }
                RolesService.prototype.GetList = function () {
                    return this.Get('/API/Auth/GetRoleList');
                };
                RolesService.prototype.Create = function (model) {
                    var result = this.Post('/API/Auth/CreateRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.Update = function (model) {
                    var result = this.Post('/API/Auth/UpdateRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.Delete = function (model) {
                    var result = this.Post('/API/Auth/DeleteRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.ForceDelete = function (model) {
                    var result = this.Post('/API/Auth/ForceDeleteRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.$inject = ['$http', '$q'];
                return RolesService;
            }(FC.Core.ServiceBase));
            Services.RolesService = RolesService;
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
                URLManagerService.prototype.GetList = function () { return null; };
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
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Validation;
        (function (Validation_1) {
            (function (ValidationRule) {
                ValidationRule[ValidationRule["Email"] = 0] = "Email";
                ValidationRule[ValidationRule["Zip"] = 1] = "Zip";
                ValidationRule[ValidationRule["Website"] = 2] = "Website";
                ValidationRule[ValidationRule["Name"] = 3] = "Name";
                ValidationRule[ValidationRule["Phone"] = 4] = "Phone";
                ValidationRule[ValidationRule["Number"] = 5] = "Number";
                ValidationRule[ValidationRule["Word"] = 6] = "Word";
                ValidationRule[ValidationRule["Text"] = 7] = "Text";
                ValidationRule[ValidationRule["Sentence"] = 8] = "Sentence";
                ValidationRule[ValidationRule["Any"] = 9] = "Any";
                ValidationRule[ValidationRule["FacebookURL"] = 10] = "FacebookURL";
                ValidationRule[ValidationRule["TwitterURL"] = 11] = "TwitterURL";
                ValidationRule[ValidationRule["InstagramURL"] = 12] = "InstagramURL";
                ValidationRule[ValidationRule["YoutubeURL"] = 13] = "YoutubeURL";
                ValidationRule[ValidationRule["FlickrURL"] = 14] = "FlickrURL";
                ValidationRule[ValidationRule["GoogleURL"] = 15] = "GoogleURL";
                ValidationRule[ValidationRule["LinkedInURL"] = 16] = "LinkedInURL";
                ValidationRule[ValidationRule["MySpaceURL"] = 17] = "MySpaceURL";
                ValidationRule[ValidationRule["SoundcloudURL"] = 18] = "SoundcloudURL";
                ValidationRule[ValidationRule["PinterestURL"] = 19] = "PinterestURL";
                ValidationRule[ValidationRule["DeezerURL"] = 20] = "DeezerURL";
                ValidationRule[ValidationRule["SpotifyURL"] = 21] = "SpotifyURL";
                ValidationRule[ValidationRule["Guid"] = 22] = "Guid";
            })(Validation_1.ValidationRule || (Validation_1.ValidationRule = {}));
            var ValidationRule = Validation_1.ValidationRule;
            var ValidationRuleItem = (function () {
                function ValidationRuleItem() {
                }
                return ValidationRuleItem;
            }());
            Validation_1.ValidationRuleItem = ValidationRuleItem;
            var Validation = (function () {
                function Validation(rule, required) {
                    if (required === void 0) { required = false; }
                    this.HasRegex = false;
                    this.RequiredMsg = "The field $FIELD_NAME$ is empty but required.";
                    this.setRegex(rule);
                    this.Required = required;
                    this.Rule = rule;
                }
                Validation.prototype.setRegex = function (r) {
                    this.Rule = r;
                    switch (r) {
                        case ValidationRule.Any:
                            this.MaxLength = 255;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Name:
                            this.MaxLength = 50;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Email:
                            this.MaxLength = 255;
                            this.Regex = "([a-z-A-Z-0-9\-_\.]+@+[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid e-mail address.";
                            break;
                        case ValidationRule.Number:
                            this.Regex = "([0-9]+)";
                            this.MaxLength = 50;
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid number.";
                            break;
                        case ValidationRule.Phone:
                            this.MaxLength = 20;
                            this.Regex = "(\\+[0-9]{10,20})";
                            this.InvalidMsg = "$FIELD_NAME$ has an invalid format. +XXXXXXXXXXX.";
                            break;
                        case ValidationRule.Text:
                            this.MaxLength = 2048;
                            this.Regex = ".*";
                            this.InvalidMsg = "$FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Zip:
                            this.MaxLength = 15;
                            this.Regex = "[0-9A-Za-z]+";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid ZIP code.";
                            break;
                        case ValidationRule.Website:
                            this.MaxLength = 512;
                            this.Regex = "(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid website.";
                            break;
                        case ValidationRule.Guid:
                            this.MaxLength = 40;
                            this.Regex = "(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid GUID.";
                            break;
                        case ValidationRule.DeezerURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Deezer URL";
                            break;
                        case ValidationRule.SpotifyURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid spotify URL";
                            break;
                        case ValidationRule.PinterestURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Pinterest URL";
                            break;
                        case ValidationRule.SoundcloudURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Soundcloud URL";
                            break;
                        case ValidationRule.MySpaceURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid MySpace URL";
                            break;
                        case ValidationRule.YoutubeURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Youtube URL";
                            break;
                        case ValidationRule.FacebookURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?facebook.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Facebook URL";
                            break;
                        case ValidationRule.InstagramURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?instagram.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Instagram URL";
                            break;
                        case ValidationRule.FlickrURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid FlickR URL";
                            break;
                        case ValidationRule.LinkedInURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid LinkedIn URL";
                            break;
                        case ValidationRule.GoogleURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Google URL";
                            break;
                        case ValidationRule.TwitterURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "$FIELD_NAME$ is not a valid Twitter URL";
                            break;
                        case ValidationRule.Word:
                            this.MaxLength = 255;
                            this.Regex = "\w+";
                            this.InvalidMsg = "$FIELD_NAME$ is not in a valid format.";
                            break;
                        case ValidationRule.Sentence:
                            this.MaxLength = 1024;
                            this.Regex = "([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";
                            break;
                        default:
                            debugger;
                            this.Rule = ValidationRule.Any;
                            this.Regex = ".*";
                            this.MaxLength = 2048;
                            this.InvalidMsg = "The input of $FIELD_NAME$ exceeds the max. character limit of 2048";
                            break;
                    }
                };
                return Validation;
            }());
            Validation_1.Validation = Validation;
        })(Validation = Core.Validation || (Core.Validation = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Validation;
        (function (Validation) {
            var ValidationError = (function () {
                function ValidationError() {
                }
                return ValidationError;
            }());
            Validation.ValidationError = ValidationError;
        })(Validation = Core.Validation || (Core.Validation = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Validation;
        (function (Validation) {
            var Validator = (function () {
                function Validator() {
                }
                Validator.prototype.Validate = function (value, rule, required) {
                    if (required === void 0) { required = false; }
                    var v = new FC.Core.Validation.Validation(rule, required);
                    if (value == null && required == false) {
                        return true;
                    }
                    else {
                        var tmp = new Array();
                        if (typeof (value) == typeof (Array)) {
                            tmp = value;
                            if (tmp.length == 0) {
                                return false;
                            }
                        }
                        else {
                            if ((value == null || value == "") && required == true) {
                                return false;
                            }
                            else if (required == true && value) {
                                var str = value;
                                if (str.length > v.MaxLength) {
                                    return false;
                                }
                                if (str.match(v.Regex)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (required == false && value) {
                                var str = value;
                                if (str.length > v.MaxLength) {
                                    return false;
                                }
                                if (str.match(v.Regex)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                };
                return Validator;
            }());
            Validation.Validator = Validator;
        })(Validation = Core.Validation || (Core.Validation = {}));
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
                    this.$Application.AddRoute("/countries", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
                    this.$Application.AddRoute("/countries/:pagenum", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
                    this.$Application.AddRoute("/countries/sort/:character", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
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
///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Controllers;
            (function (Controllers) {
                var CountryFilterController = (function (_super) {
                    __extends(CountryFilterController, _super);
                    function CountryFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope = $scope;
                        vm.$scope.FormID = 'CCFDB150-42F0-4F0E-8CA3-C48069E09CBE';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Reset = this.Reset;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.IsLoading = true;
                        vm.SetCountryList();
                        vm.$scope.IsActive = this.IsActive;
                        if (vm.$scope.SelectedCountries == null) {
                            vm.$scope.SelectedCountries = new Array();
                            vm.$scope.Selected = "SELECT COUNTRIES";
                        }
                        if (vm.$scope.SelectedCountries.length == 1) {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
                        }
                        else {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
                        }
                        if (vm.$scope.SelectedCountries.length == 0) {
                            vm.$scope.Selected = "SELECT COUNTRIES";
                        }
                        //this.RecoverModel(this.$scope.model, this.$scope);
                    }
                    CountryFilterController.prototype.IsActive = function (country) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveCountries")) {
                            var activated = CacheManager.Get("ActiveCountries").data;
                            var isactive = activated.some(function (g, i) {
                                return g.CountryID == country.CountryID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    CountryFilterController.prototype.ToggleCountry = function ($scope, country) {
                        var vm = this;
                        if (!this.IsActive(country)) {
                            vm.$scope.SelectedCountries.push(country);
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        else {
                            var tmp = new Array();
                            vm.$scope.SelectedCountries.forEach(function (v, i) {
                                if (v.CountryID != country.CountryID) {
                                    tmp.push(v);
                                }
                            });
                            vm.$scope.SelectedCountries = tmp;
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        if (vm.$scope.SelectedCountries.length == 1) {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
                        }
                        else {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
                        }
                        vm.$scope.model.Countries = vm.$scope.SelectedCountries;
                        vm.Save(vm.$scope);
                    };
                    CountryFilterController.prototype.SetCountryList = function () {
                        var vm = this;
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.$scope.SysCountries = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    };
                    CountryFilterController.prototype.Save = function ($scope) {
                        var vm = this;
                        vm.$scope.MtModal.cancel();
                        var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
                        //vm.$scope.IsLoading = true;
                    };
                    CountryFilterController.prototype.Reset = function ($scope) {
                        CacheManager.DeleteStorage("ActiveCountries");
                        $scope.Close();
                    };
                    //public ActiveGenreID: number;
                    CountryFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return CountryFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryFilterController = CountryFilterController;
                CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryFilterController", FC.Modules.Countries.Controllers.CountryFilterController);
            })(Controllers = Countries.Controllers || (Countries.Controllers = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Controllers;
            (function (Controllers) {
                var CountryOverviewController = (function (_super) {
                    __extends(CountryOverviewController, _super);
                    function CountryOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, CountriesService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setCountries();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("REFRESH", function (r) {
                            vm.setCountries();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    CountryOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.CountriesSvc.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Countries = r.Data;
                            vm.CountriesSvc.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    CountryOverviewController.prototype.setCountries = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.CountriesSvc.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.Countries = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.CountriesSvc.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    CountryOverviewController.prototype.DoDelete = function (Country) {
                        var vm = this;
                        vm.$scope.model = Country;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.CountryService, vm.$scope);
                    };
                    //public ActiveCountryID: number;
                    CountryOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "$sce",
                        "FC.Modules.Countries.Services.CountriesService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return CountryOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryOverviewController = CountryOverviewController;
                CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryOverviewController", FC.Modules.Countries.Controllers.CountryOverviewController);
            })(Controllers = Countries.Controllers || (Countries.Controllers = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../Countries.ts"/>
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
                    CountriesService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    CountriesService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Country/GetPaged?size=' + size + '&page=' + page);
                    };
                    CountriesService.prototype.Search = function (name) {
                        return this.Get('/API/Country/Search?name=' + name);
                    };
                    CountriesService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Country/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    CountriesService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Country/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    CountriesService.prototype.GetCountry = function (id) {
                        return this.Get('/API/Country/GetByID?id=' + id);
                    };
                    CountriesService.prototype.GetAll = function () {
                        return this.Get('/API/Country/GetAll');
                    };
                    CountriesService.prototype.GetByCode = function (code) {
                        return this.Get('/API/Country/GetByCode?code=' + code);
                    };
                    CountriesService.prototype.Create = function (model) {
                        return null;
                    };
                    CountriesService.prototype.Delete = function (model) {
                        return null;
                    };
                    CountriesService.prototype.Update = function (model) {
                        return null;
                    };
                    CountriesService.prototype.ForceDelete = function (model) {
                        return null;
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
        var Details;
        (function (Details_1) {
            var Details = (function () {
                function Details(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/details/festival/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/location/:locationID", "/Scripts/Modules/Details/Views/location-detail.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
                    this.$Application.AddRoute("/details/artist/:artistID", "/Scripts/Modules/Details/Views/artist-detail.html", "FC.Modules.Details.Controllers.ArtistDetailsController", "vm");
                    this.$Application.AddRoute("/details/artists/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/travelinfo/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/news/:newsID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/report/:reportID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                }
                Details.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Details.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Details;
            }());
            Details_1.Details = Details;
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var DetailsModule = new FC.Modules.Details.Details(angular.module('FC.Modules.Details', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details) {
            var Controllers;
            (function (Controllers) {
                var SCTRL = FC.Shared.Controllers;
                var ArtistDetailsController = (function (_super) {
                    __extends(ArtistDetailsController, _super);
                    function ArtistDetailsController($http, $q, $uibModal, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '2F97BF92-A295-4D5C-A47C-67A274801DD0';
                        vm.$scope.inst = this;
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        //vm.$scope.DoDelete = this.DoDelete;
                        //vm.$scope.DoSaveDelete = this.DoSaveDelete;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.ArtistService, vm.$scope).then(function (r) {
                            });
                        };
                        //vm.$scope.DoCreate = this.DoCreate;
                        //vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.determineDetailType($routeParams, $route);
                        vm.LogoSaveListener();
                    }
                    ArtistDetailsController.prototype.Close = function ($scope, $parent) {
                        $scope.MtModal.hide();
                    };
                    //public LocationSaveListener() {
                    //    var vm = this;
                    //    vm.$scope.IsLoading = true;
                    //    window.addEventListener("LocationSaveEvent", function (e) {
                    //        vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
                    //        vm.FestivalService.Update(vm.$scope.model).then(function (r) {
                    //            vm.FestivalService.GetFestival(vm.$scope.model.FestivalID).then(function (r2) {
                    //                vm.$scope.MtModal.hide();
                    //                vm.$scope.IsLoading = false;
                    //            });
                    //        });
                    //    });
                    //}
                    ArtistDetailsController.prototype.LogoSaveListener = function () {
                        var vm = this;
                        window.addEventListener("LogoImageSaved", function (e) {
                            vm.$scope.model.LogoID = e["detail"];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.ArtistService, vm.$scope);
                        });
                    };
                    ArtistDetailsController.prototype.DoEdit = function (partialName, $scope, ev) {
                        var opts = {};
                        $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                            if (r == true) {
                                switch (partialName) {
                                    case "artist-name":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                        }, function () {
                                            ;
                                        });
                                        break;
                                    case "logo":
                                        debugger;
                                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                                        opts.controllerAs = 'vm';
                                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                                        opts.parent = document.body;
                                        opts.locals = { local: [$scope.MtModal, "LogoImageSaved", $scope.model.MediaDirectoryID] },
                                            opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "artist-thumbnail":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                        }, function () {
                                        });
                                        break;
                                    case "artist-social":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                        }, function () {
                                        });
                                        break;
                                    case "artist-genres":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                        }, function () {
                                        });
                                        break;
                                }
                            }
                            else {
                                window.addEventListener("AUTH_SUCCESS", function () {
                                    $scope.MtModal.hide();
                                });
                                opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                opts.parent = document.body;
                                opts.targetEvent = ev;
                                opts.clickOutsideToClose = true;
                                $scope.MtModal.show(opts).then(function (answer) {
                                }, function () {
                                });
                            }
                        });
                    };
                    ArtistDetailsController.prototype.setArtistDetailData = function (detailID) {
                        var vm = this;
                        vm.ArtistService.GetByID(detailID).then(function (r) {
                            vm.$scope.Artist = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    ArtistDetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.ArtistService.GetByID(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Artist = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    ArtistDetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["artistID"]) {
                            this.setArtistDetailData($routeParams["artistID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    ArtistDetailsController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return ArtistDetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDetailsController = ArtistDetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.ArtistDetailsController", FC.Modules.Details.Controllers.ArtistDetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details) {
            var Controllers;
            (function (Controllers) {
                var SC = FC.Shared.Controllers;
                var DetailsController = (function (_super) {
                    __extends(DetailsController, _super);
                    function DetailsController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.FestivalService = FestivalService;
                        vm.LocationService = LocationService;
                        vm.$scope.inst = this;
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.DoStartEdit = this.DoStartEdit;
                        vm.$scope.$routeParams = $routeParams;
                        vm.determineDetailType($routeParams, $route);
                        vm.ArtistSaveListener();
                        vm.LogoSaveListener();
                        vm.LocationSaveListener();
                        vm.ListenRefresh();
                    }
                    DetailsController.prototype.Close = function ($scope, $parent) {
                        $scope.MtModal.hide();
                    };
                    DetailsController.prototype.ListenRefresh = function () {
                        var vm = this;
                        window.addEventListener("REFRESH", function () {
                            vm.setFestivalDetailData(vm.$scope.$routeParams["festivalID"]);
                        });
                    };
                    DetailsController.prototype.LocationSaveListener = function () {
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("LocationSaveEvent", function (e) {
                            vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.LogoSaveListener = function () {
                        var vm = this;
                        window.addEventListener("FestivalLogoSaved", function (e) {
                            vm.$scope.model.LogoID = e["detail"];
                            vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.ArtistSaveListener = function () {
                        var vm = this;
                        window.addEventListener("ArtistsSaved", function (e) {
                            var selected = e["detail"]["SelectedArtists"];
                            var result = new Array();
                            selected.forEach(function (v, i) {
                                var artist = new FC.Shared.Models.UArtist();
                                artist.ArtistID = v.ArtistID;
                                result.push(artist);
                            });
                            vm.$scope.model.Artists = result;
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.DoStartEdit = function (partialName, $scope, ev) {
                        var opts = {};
                        $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                            if (r == true) {
                                switch (partialName) {
                                    case "festival-name":
                                        opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/festival/festival-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "festival-logo":
                                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                                        opts.controllerAs = 'vm';
                                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                                        opts.parent = document.body;
                                        opts.locals = { local: [$scope.MtModal, "FestivalLogoSaved", $scope.model.MediaDirectoryID] },
                                            opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                                        $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "festival-date":
                                        opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/festival/festival-date.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "location":
                                        opts.controller = FC.Modules.Location.Controllers.LocationDialogController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/select.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                                        $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "festival-artists":
                                        opts.controller = FC.Modules.Artists.Controllers.ArtistModalController;
                                        opts.controllerAs = 'vm';
                                        opts.templateUrl = '/Scripts/modules/artists/views/artist-modal.html';
                                        opts.parent = document.body;
                                        opts.locals = { local: [$scope.MtModal, "ArtistsSaved"] },
                                            opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                                        $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "headlines":
                                        opts.controller = FC.Modules.News.Controllers.NewsDialogController;
                                        opts.templateUrl = '/Scripts/modules/news/views/news-dialog.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                                        $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "social":
                                        opts.controller = FC.Modules.Social.Controllers.SocialDialogController;
                                        if (!$scope.model.SocialProfiles) {
                                            $scope.model.SocialProfiles = new Array();
                                        }
                                        opts.controllerAs = 'vm';
                                        opts.locals = { profiles: $scope.model.SocialProfiles, genericId: $scope.model.FestivalID, contentType: FC.Shared.Enum.SocialMediaBindable.Festival };
                                        opts.templateUrl = '/Scripts/modules/Social/views/social-dialog.html';
                                        opts.parent = document.body;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                }
                            }
                            else {
                                window.addEventListener("AUTH_SUCCESS", function () {
                                    $scope.MtModal.hide();
                                });
                                opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                opts.parent = document.body;
                                opts.targetEvent = ev;
                                opts.clickOutsideToClose = true;
                                //$scope.model.EndDate = new Date($scope.model.EndDate.toString());
                                //$scope.model.StartDate = new Date($scope.model.StartDate.toString());
                                $scope.MtModal.show(opts).then(function (answer) {
                                    //$scope.status = 'You said the information was "' + answer + '".';
                                }, function () {
                                    // $scope.status = 'You cancelled the dialog.';
                                });
                            }
                        });
                    };
                    DetailsController.prototype.setFestivalDetailData = function (detailID) {
                        var vm = this;
                        vm.FestivalService.GetFestival(detailID).then(function (r) {
                            vm.$scope.model = r.Data;
                            vm.$scope.Festival = r.Data;
                            vm.$scope.Location = r.Data.FestivalLocation;
                            var m = new SC.META();
                            m.PageDesc = r.Data.Description;
                            m.PageTitle = r.Data.Name;
                            m.PageIMG = vm.$scope.MediaURLRoot + "/" + r.Data.LogoID + ".img?&thumb=true";
                            m.PageKeys = r.Data.Name + "," + r.Data.FestivalLocation.LocationName + "," + r.Data.FestivalLocation.Country.Name + "," + r.Data.FestivalLocation.City + "," + r.Data.StartDate;
                            vm.SetMETA(m, null);
                            vm.$scope.model = r.Data;
                            var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                            if (r.Data.ProfileImage) {
                                profileImgUrl = FC.Core.Environment.MediaURLRoot + "/?action=getimg&MediaID=" + r.Data.ProfileImage.MediaID + "&IsObsolete=false&Width=" + r.Data.ProfileImage.Width;
                            }
                            vm.$scope.ProfileHeaderImg = profileImgUrl;
                            vm.$scope.IsLoading = false;
                        });
                    };
                    DetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.LocationService.GetLocation(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Location = r.Data;
                        });
                    };
                    DetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["festivalID"]) {
                            this.setFestivalDetailData($routeParams["festivalID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    DetailsController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService"
                    ];
                    return DetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.DetailsController = DetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.DetailsController", FC.Modules.Details.Controllers.DetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details) {
            var Controllers;
            (function (Controllers) {
                var FestivalDetailDialogController = (function (_super) {
                    __extends(FestivalDetailDialogController, _super);
                    function FestivalDetailDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '953ACE20-92CE-47DC-9360-B0F9D5200884';
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        this.setFestivalDetailData($routeParams["festivalID"]);
                        var v = FC.Shared.Util.Validator.GetInstance();
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveCreate = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveForceDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.ForceDelete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                    }
                    FestivalDetailDialogController.prototype.setFestivalDetailData = function (detailID) {
                        var vm = this;
                        vm.FestivalService.GetFestival(detailID).then(function (r) {
                            var $scope = vm.$scope;
                            $scope.model = new FC.Shared.Models.UFestival();
                            $scope.model = r.Data;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                            if (r.Data.ProfileImage) {
                                profileImgUrl = FC.Core.Environment.MediaURLRoot + "/?action=getimg&MediaID=" + r.Data.ProfileImage.MediaID + "&IsObsolete=false&Width=" + r.Data.ProfileImage.Width;
                            }
                            $scope.IsLoading = false;
                        });
                    };
                    FestivalDetailDialogController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return FestivalDetailDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalDetailDialogController = FestivalDetailDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.FestivalDetailDialogController", FC.Modules.Details.Controllers.FestivalDetailDialogController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details) {
            var Controllers;
            (function (Controllers) {
                var SCTRL = FC.Shared.Controllers;
                var LocationDetailsController = (function (_super) {
                    __extends(LocationDetailsController, _super);
                    function LocationDetailsController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.FestivalService = FestivalService;
                        vm.LocationService = LocationService;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '653ACEF0-92CE-47DC-9360-B0FED5200884';
                        vm.$scope.inst = this;
                        vm.$scope = $scope;
                        //vm.$scope.DoDelete = this.DoDelete;
                        //vm.$scope.DoSaveDelete = this.DoSaveDelete;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.LocationService, vm.$scope).then(function (r) {
                            });
                        };
                        //vm.$scope.DoCreate = this.DoCreate;
                        //vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.determineDetailType($routeParams, $route);
                        vm.LogoSaveListener();
                    }
                    LocationDetailsController.prototype.Close = function ($scope, $parent) {
                        $scope.MtModal.hide();
                    };
                    //public LocationSaveListener() {
                    //    var vm = this;
                    //    vm.$scope.IsLoading = true;
                    //    window.addEventListener("LocationSaveEvent", function (e) {
                    //        vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
                    //        vm.FestivalService.Update(vm.$scope.model).then(function (r) {
                    //            vm.FestivalService.GetFestival(vm.$scope.model.FestivalID).then(function (r2) {
                    //                vm.$scope.MtModal.hide();
                    //                vm.$scope.IsLoading = false;
                    //            });
                    //        });
                    //    });
                    //}
                    LocationDetailsController.prototype.LogoSaveListener = function () {
                        var vm = this;
                        window.addEventListener("LocationThumbSaved", function (e) {
                            vm.$scope.model.ThumbnailID = e["detail"];
                            vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
                            vm.LocationService.Update(vm.$scope.model).then(function (r) {
                                if (r.Data.SUCCESS == true) {
                                    window.alert(r.Data.MSG);
                                }
                            }).catch(function (r) {
                                window.alert("There was error while saving your festival. Please try again later.");
                            });
                        });
                    };
                    LocationDetailsController.prototype.DoEdit = function (partialName, $scope, ev) {
                        var opts = {};
                        $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                            if (r == true) {
                                switch (partialName) {
                                    case "location-name":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "location":
                                        opts.controller = FC.Modules.Location.Controllers.LocationDialogController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/create.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                    case "location-thumbnail":
                                        opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                        opts.parent = document.body;
                                        opts.targetEvent = ev;
                                        opts.clickOutsideToClose = true;
                                        $scope.MtModal.show(opts).then(function (answer) {
                                            //$scope.status = 'You said the information was "' + answer + '".';
                                        }, function () {
                                            // $scope.status = 'You cancelled the dialog.';
                                        });
                                        break;
                                }
                            }
                            else {
                                window.addEventListener("AUTH_SUCCESS", function () {
                                    $scope.MtModal.hide();
                                });
                                opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                opts.parent = document.body;
                                opts.targetEvent = ev;
                                opts.clickOutsideToClose = true;
                                $scope.MtModal.show(opts).then(function (answer) {
                                    //$scope.status = 'You said the information was "' + answer + '".';
                                }, function () {
                                    // $scope.status = 'You cancelled the dialog.';
                                });
                            }
                        });
                    };
                    //private setFestivalDetailData(detailID: string): void {
                    //    var vm = this;
                    //    vm.FestivalService.GetFestival(detailID).then(function (r) {
                    //        vm.$scope.Festival = r.Data;
                    //        vm.$scope.model = r.Data;
                    //        var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                    //        if (r.Data.ProfileImage) {
                    //            profileImgUrl = FC.Core.Environment.MediaURLRoot +"/?action=getimg&MediaID="+r.Data.ProfileImage.MediaID+"&IsObsolete=false&Width="+r.Data.ProfileImage.Width;
                    //        }
                    //        vm.$scope.ProfileHeaderImg = profileImgUrl;
                    //        vm.$scope.IsLoading = false;
                    //    });
                    //}
                    LocationDetailsController.prototype.setNewsDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setArtistDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setReportDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.LocationService.GetLocation(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Location = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    LocationDetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["festivalID"]) {
                        }
                        else if ($routeParams["newsID"]) {
                            this.setNewsDetailData($routeParams["newsID"]);
                        }
                        else if ($routeParams["artistID"]) {
                            this.setArtistDetailData($routeParams["artistID"]);
                        }
                        else if ($routeParams["reportID"]) {
                            this.setReportDetailData($routeParams["reportID"]);
                        }
                        else if ($routeParams["locationID"]) {
                            this.setLocationDetailData($routeParams["locationID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    LocationDetailsController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService"
                    ];
                    return LocationDetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationDetailsController = LocationDetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.LocationDetailsController", FC.Modules.Details.Controllers.LocationDetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Favorites;
        (function (Favorites_1) {
            var Favorites = (function () {
                function Favorites(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Favorites.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Favorites;
            }());
            Favorites_1.Favorites = Favorites;
        })(Favorites = Modules.Favorites || (Modules.Favorites = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FavoritesModule = new FC.Modules.Favorites.Favorites(angular.module('FC.Modules.Favorites', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../Favorites.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Favorites;
        (function (Favorites) {
            var Controllers;
            (function (Controllers) {
                var FavoriteController = (function (_super) {
                    __extends(FavoriteController, _super);
                    function FavoriteController($http, $q, $mdDialog, $scope, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.SelectedArtists = new Array();
                        vm.$scope.SelectedGenres = new Array();
                        vm.$scope.SelectedLocations = new Array();
                        vm.$scope.SelectedCountries = new Array();
                        vm.$scope.SelectedFestivals = new Array();
                        //vm.$scope.model = new FC.Shared.Models.UGenre();
                    }
                    FavoriteController.prototype.FavoriteActive = function (contentID) {
                        var vm = this;
                        var result = new Array();
                        if (vm.$scope.SelectedArtists.filter(function (v, k) {
                            return (v.ArtistID == contentID);
                        }).length > 0) {
                            return true;
                        }
                        if (vm.$scope.SelectedCountries.filter(function (v, k) {
                            return (v.CountryID == contentID);
                        }).length > 0) {
                            return true;
                        }
                        if (vm.$scope.SelectedFestivals.filter(function (v, k) {
                            return (v.FestivalID == contentID);
                        }).length > 0) {
                            return true;
                        }
                        if (vm.$scope.SelectedGenres.filter(function (v, k) {
                            return (v.GenreID == contentID);
                        }).length > 0) {
                            return true;
                        }
                        return false;
                    };
                    FavoriteController.prototype.RegisterType = function (icType) {
                        var vm = this;
                        //debugger;
                        vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                            vm.handleToggleResponse(vm, icType, r.Data);
                        });
                    };
                    FavoriteController.prototype.handleToggleResponse = function (vm, icType, data) {
                        switch (icType) {
                            case FC.Shared.Enum.InternalContentType.Artist:
                                vm.$scope.SelectedArtists = new Array();
                                data.forEach(function (v, k) {
                                    if (v != null) {
                                        if (v.Content) {
                                            vm.$scope.SelectedArtists.push(v.Content);
                                        }
                                    }
                                });
                                break;
                            case FC.Shared.Enum.InternalContentType.Festival:
                                vm.$scope.SelectedFestivals = new Array();
                                data.forEach(function (v, k) {
                                    if (v != null) {
                                        if (v.Content) {
                                            vm.$scope.SelectedFestivals.push(v.Content);
                                        }
                                    }
                                });
                                break;
                            case FC.Shared.Enum.InternalContentType.Country:
                                vm.$scope.SelectedCountries = new Array();
                                data.forEach(function (v, k) {
                                    if (v != null) {
                                        if (v.Content) {
                                            vm.$scope.SelectedCountries.push(v.Content);
                                        }
                                    }
                                });
                                break;
                            case FC.Shared.Enum.InternalContentType.Location:
                                vm.$scope.SelectedLocations = new Array();
                                data.forEach(function (v, k) {
                                    if (v != null) {
                                        if (v.Content) {
                                            vm.$scope.SelectedLocations.push(v.Content);
                                        }
                                    }
                                });
                                break;
                            case FC.Shared.Enum.InternalContentType.Genre:
                                vm.$scope.SelectedGenres = new Array();
                                data.forEach(function (v, k) {
                                    if (v != null) {
                                        if (v.Content) {
                                            vm.$scope.SelectedGenres.push(v.Content);
                                        }
                                    }
                                });
                                break;
                        }
                    };
                    FavoriteController.prototype.ToggleFavorite = function (icType, contentID) {
                        var vm = this;
                        vm.FavoriteService.IsFavorite(CacheManager.GetCookieValue("UserID"), contentID).then(function (r) {
                            if (r.Data == true) {
                                vm.FavoriteService.UnmarkFavorite(contentID).then(function (r) {
                                    if (r.Data.SUCCESS == true) {
                                        vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                                            vm.handleToggleResponse(vm, icType, r.Data);
                                        });
                                    }
                                });
                            }
                            if (r.Data == false) {
                                vm.FavoriteService.MarkFavorite(contentID, icType).then(function (r) {
                                    if (r.Data.SUCCESS == true) {
                                        vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                                            vm.handleToggleResponse(vm, icType, r.Data);
                                        });
                                    }
                                });
                            }
                        });
                    };
                    FavoriteController.prototype.search = function (icType) {
                        var vm = this;
                        if (icType == FC.Shared.Enum.InternalContentType.Genre) {
                            this.GenreService.Search(this.$scope.SearchKey).then(function (r) {
                                vm.$scope.SearchResult = r.Data;
                            });
                        }
                        if (icType == FC.Shared.Enum.InternalContentType.Location) {
                            this.LocationService.Search(this.$scope.SearchKey).then(function (r) {
                                vm.$scope.SearchResult = r.Data;
                            });
                        }
                        if (icType == FC.Shared.Enum.InternalContentType.Artist) {
                            this.ArtistService.Search(this.$scope.SearchKey).then(function (r) {
                                vm.$scope.SearchResult = r.Data;
                            });
                        }
                        if (icType == FC.Shared.Enum.InternalContentType.Country) {
                            this.CountriesSvc.Search(this.$scope.SearchKey).then(function (r) {
                                vm.$scope.SearchResult = r.Data;
                            });
                        }
                        if (icType == FC.Shared.Enum.InternalContentType.Festival) {
                        }
                    };
                    //public ActiveGenreID: number;
                    FavoriteController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return FavoriteController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FavoriteController = FavoriteController;
                FavoritesModule.GetApplication().RegisterController("FC.Modules.Favorites.Controllers.FavoriteController", FC.Modules.Favorites.Controllers.FavoriteController);
            })(Controllers = Favorites.Controllers || (Favorites.Controllers = {}));
        })(Favorites = Modules.Favorites || (Modules.Favorites = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Favorites;
        (function (Favorites) {
            var Services;
            (function (Services) {
                var FavoriteService = (function (_super) {
                    __extends(FavoriteService, _super);
                    function FavoriteService(http, q) {
                        _super.call(this, http, q);
                    }
                    FavoriteService.prototype.GetList = function () {
                        return this.Get('/API/Favorite/GetList');
                    };
                    FavoriteService.prototype.MarkFavorite = function (contentID, contentType) {
                        return this.Get('/API/Favorite/Mark/?&contentID=' + contentID + '&type=' + contentType);
                    };
                    FavoriteService.prototype.GetUserFavorites = function (userID, icType) {
                        return this.Get('/API/Favorite/GetUserFavorites?&userID=' + userID + '&icType=' + icType);
                    };
                    FavoriteService.prototype.GetUserFavoritesCount = function (userID, icType) {
                        return this.Get('/API/Favorite/GetUserFavoritesCount?&userID=' + userID + '&icType=' + icType);
                    };
                    FavoriteService.prototype.IsFavorite = function (userID, contentID) {
                        return this.Get('/API/Favorite/IsFavorite/?&userID=' + userID + '&contentID=' + contentID);
                    };
                    FavoriteService.prototype.UnmarkFavorite = function (contentID) {
                        return this.Get('/API/Favorite/Unmark/?&contentID=' + contentID);
                    };
                    FavoriteService.$inject = ['$http', '$q'];
                    return FavoriteService;
                }(FC.Core.ServiceBase));
                Services.FavoriteService = FavoriteService;
                FavoritesModule.GetApplication().app.service('FC.Modules.Favorites.Services.FavoriteService', FC.Modules.Favorites.Services.FavoriteService);
            })(Services = Favorites.Services || (Favorites.Services = {}));
        })(Favorites = Modules.Favorites || (Modules.Favorites = {}));
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
                    this.$Application.AddRoute("/festival/add", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/add/confirm", "/Scripts/Modules/Festival/Views/wizard/confirmation.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/add/error", "/Scripts/Modules/Festival/Views/wizard/error.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/publish/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/delete/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID/confirm", "/Scripts/Modules/Festival/Views/wizard/confirmation.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                    this.$Application.AddRoute("/festival/edit/:festivalID/error", "/Scripts/Modules/Festival/Views/wizard/error.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
                }
                Festival.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Festival.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Festival;
            }());
            Festival_1.Festival = Festival;
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FestivalModule = new FC.Modules.Festival.Festival(angular.module('FC.Modules.Festival', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
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
                var FestivalCRUDController = (function (_super) {
                    __extends(FestivalCRUDController, _super);
                    function FestivalCRUDController($http, $q, $scope, $routeParams, $location, $sce, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.inst = this;
                        this.$scope.SaveFormState = this.SaveFormState;
                        this.$location = $location;
                        this.$scope.model = new FC.Shared.Models.UFestival();
                        this.$scope.MtModal = $mdDialog;
                        this.$scope.Token = CacheManager.GetCookieValue("Token");
                        window.addEventListener("LogoImageSaved", function (e) {
                            vm.$scope.model.LogoID = e.detail;
                            vm.$scope.MtModal.hide();
                            vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + "/" + vm.$scope.model.LogoID;
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, $scope);
                        });
                        window.addEventListener("HeaderImageSaved", function (e) {
                            vm.$scope.model.ProfileImageID = e.detail;
                            vm.$scope.MtModal.hide();
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, $scope);
                            ///vm.$scope["ProfileHeaderPath"]= FC.Core.Environment.MediaURLRoot + "/" + vm.$scope.model.LogoID;
                        });
                    }
                    FestivalCRUDController.prototype.RegisterID = function (id) {
                        this.$scope.model.FestivalID = id;
                    };
                    FestivalCRUDController.prototype.GetSelectedLogo = function () {
                        var vm = this;
                        window.addEventListener("ModalMediaSaveEvent", function (e) {
                            vm.$scope.model.LogoID = e.detail;
                        });
                        return vm.$scope.model.LogoID;
                    };
                    FestivalCRUDController.prototype.OpenLogoModal = function (dirID, validationWidth, validationHeight, isThumbnail) {
                        if (isThumbnail === void 0) { isThumbnail = false; }
                        var vm = this;
                        var opts = {};
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if (vm.$scope.MtModal) {
                            vm.$scope.MtModal.hide();
                        }
                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                        opts.locals = { local: [vm.$scope.MtModal, "LogoImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
                            opts.clickOutsideToClose = true;
                        vm.$scope.MtModal.show(opts);
                    };
                    FestivalCRUDController.prototype.OpenHeaderImageModal = function (dirID, validationWidth, validationHeight, isThumbnail) {
                        if (isThumbnail === void 0) { isThumbnail = false; }
                        var vm = this;
                        var opts = {};
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if (vm.$scope.MtModal) {
                            vm.$scope.MtModal.hide();
                        }
                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                        opts.locals = { local: [vm.$scope.MtModal, "HeaderImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
                            opts.clickOutsideToClose = true;
                        vm.$scope.MtModal.show(opts);
                    };
                    //public ActiveGenreID: number;
                    FestivalCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "$mdDialog"
                    ];
                    return FestivalCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalCRUDController = FestivalCRUDController;
                FestivalModule.GetApplication().RegisterController("FC.Modules.Festival.Controllers.FestivalCRUDController", FC.Modules.Festival.Controllers.FestivalCRUDController);
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
            var Models;
            (function (Models) {
                var FestivalListVM = (function () {
                    function FestivalListVM() {
                    }
                    ;
                    return FestivalListVM;
                }());
                Models.FestivalListVM = FestivalListVM;
            })(Models = Festival.Models || (Festival.Models = {}));
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
                    FestivalService.prototype.GetList = function () {
                        return this.Get('/API/Festival/GetList');
                    };
                    FestivalService.prototype.GetUpcoming = function () {
                        return this.Get('/API/Festival/GetUpcoming');
                    };
                    FestivalService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/API/Festival/GetByID?&id=' + festivalId);
                    };
                    FestivalService.prototype.GetByFilter = function (filter) {
                        if (CacheManager.GetCookieValue("UserID")) {
                            return this.Post('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage(filter));
                        }
                        else {
                            return this.Post('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage(filter));
                        }
                    };
                    FestivalService.prototype.Create = function (festival) {
                        return this.Post('/API/Festival/Create', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.ToggleGenre = function (festivalID, genreID) {
                        if (festivalID && genreID) {
                            return this.Get('/API/Festival/ToggleGenre?&festivalID=' + festivalID + "&genreID=" + genreID);
                        }
                        else {
                            return null;
                        }
                    };
                    FestivalService.prototype.Update = function (festival) {
                        return this.Post('/API/Festival/Update', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.Delete = function (festival) {
                        return this.Post('/API/Festival/Delete', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.ForceDelete = function (festival) {
                        return this.Post('/API/Festival/ForceDelete', new FC.Shared.Models.ServiceMessage(festival));
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
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Services;
            (function (Services) {
                var LineupService = (function (_super) {
                    __extends(LineupService, _super);
                    function LineupService(http, q) {
                        _super.call(this, http, q);
                    }
                    LineupService.prototype.GetList = function () {
                        return this.Get('/API/Lineups/GetList');
                    };
                    LineupService.prototype.GetByStage = function (stageID) {
                        return this.Get('/API/Lineups/GetByFestival?stageID=' + stageID);
                    };
                    LineupService.prototype.Create = function (model) {
                        var result = this.Post('/API/Lineup/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.Update = function (model) {
                        var result = this.Post('/API/Lineup/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Lineup/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Lineup/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.$inject = ['$http', '$q'];
                    return LineupService;
                }(FC.Core.ServiceBase));
                Services.LineupService = LineupService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Services;
            (function (Services) {
                var StageService = (function (_super) {
                    __extends(StageService, _super);
                    function StageService(http, q) {
                        _super.call(this, http, q);
                    }
                    StageService.prototype.GetList = function () {
                        return this.Get('/API/Stages/GetList');
                    };
                    StageService.prototype.GetByFestival = function (festivalID) {
                        return this.Get('/API/Stages/GetByFestival?festivalID=' + festivalID);
                    };
                    StageService.prototype.Create = function (model) {
                        var result = this.Post('/API/Stage/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.Update = function (model) {
                        var result = this.Post('/API/Stage/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Stage/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Stage/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.$inject = ['$http', '$q'];
                    return StageService;
                }(FC.Core.ServiceBase));
                Services.StageService = StageService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
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
///<reference path="../../Core/FC.ts"/>
///<reference path="../Filtering.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var CountryFilterController = (function (_super) {
                    __extends(CountryFilterController, _super);
                    function CountryFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.SelectedCountries = new Array();
                        var userID = CacheManager.GetCookieValue("UserID");
                        if (CacheManager.Contains("ActiveCountries")) {
                            vm.$scope.inst.$scope.SelectedCountries = CacheManager.Get("ActiveCountries").data;
                        }
                        if (userID) {
                            vm.FavoriteService.GetUserFavorites(userID, FC.Shared.Enum.InternalContentType.Country).then(function (r) {
                                r.Data.forEach(function (v, k) {
                                    if (v.Content) {
                                        var any = vm.$scope.SelectedCountries.some(function (country, k) {
                                            return country.CountryID == v.ContentID;
                                        });
                                        if (any == false) {
                                            vm.$scope.SelectedCountries.push(v.Content);
                                        }
                                    }
                                });
                                CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedCountries, 9999999999);
                            });
                        }
                        vm.SetCountryList();
                        vm.$scope.IsActive = this.IsActive;
                        if (vm.$scope.SelectedCountries.length == 1) {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
                        }
                        else {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
                        }
                        if (vm.$scope.SelectedCountries.length == 0) {
                            vm.$scope.Selected = "SELECT COUNTRIES";
                        }
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                        vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
                        vm.addFilterChangeListener();
                        window.addEventListener('ClearFilter', function () {
                            vm.$scope.Selected = "0 SELECTED";
                            vm.$scope.SelectedCountries = new Array();
                            CacheManager.DeleteStorage('ActiveGenres');
                        });
                    }
                    CountryFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Countries) {
                                        vm.$scope.Selected = d.Countries.length + " SELECTED";
                                        vm.$scope.SelectedCountries = d.Countries;
                                    }
                                }
                            }
                        });
                    };
                    CountryFilterController.prototype.ShowFilter = function () {
                        var vm = this;
                        var $scope = vm.$scope;
                        var opts = {};
                        opts.controller = FC.Modules.Filtering.Controllers.CountryFilterController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/filtering/views/country-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    CountryFilterController.prototype.IsActive = function (country) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveCountries")) {
                            var activated = CacheManager.Get("ActiveCountries").data;
                            var isactive = activated.some(function (g, i) {
                                return g.CountryID == country.CountryID;
                            });
                            return isactive;
                        }
                        else {
                        }
                    };
                    CountryFilterController.prototype.ToggleCountry = function (country) {
                        var vm = this;
                        if (!this.IsActive(country)) {
                            vm.$scope.SelectedCountries.push(country);
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        else {
                            var tmp = new Array();
                            vm.$scope.SelectedCountries.forEach(function (v, i) {
                                if (v.CountryID != country.CountryID) {
                                    tmp.push(v);
                                }
                            });
                            vm.$scope.SelectedCountries = tmp;
                            vm.$scope.Selected = tmp.length + " SELECTED";
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        if (vm.$scope.SelectedCountries.length == 1) {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
                        }
                        else {
                            vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
                        }
                        if (vm.$scope.SelectedCountries.length == 0) {
                            vm.$scope.Selected = "SELECT COUNTRIES";
                        }
                        vm.$scope.model.Countries = vm.$scope.SelectedCountries;
                        vm.Save();
                    };
                    CountryFilterController.prototype.SetCountryList = function () {
                        var vm = this;
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.$scope.SysCountries = r.Data;
                        });
                    };
                    CountryFilterController.prototype.Save = function () {
                        var vm = this;
                        //vm.$scope.Selected = vm.$scope.SelectedCountries.length + " SELECTED";
                        vm.Close();
                        var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
                        //vm.$scope.IsLoading = true;
                    };
                    CountryFilterController.prototype.Close = function () {
                        this.$scope.MtModal.hide();
                    };
                    CountryFilterController.prototype.Reset = function () {
                        CacheManager.DeleteStorage("ActiveCountries");
                    };
                    //public ActiveCountryID: number;
                    CountryFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return CountryFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryFilterController = CountryFilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryFilterController", FC.Modules.Filtering.Controllers.CountryFilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedCountries.some(function (v, i) {
//    if (v.CountryID == country.CountryID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedCountries.push(country);
//    CacheManager.WriteStorage("ActiveCountries", $scope.SelectedCountries, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedCountries.some(function (v, i) {
//        if (v.CountryID == country.CountryID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedCountries[index];
//        $scope.SelectedCountries = $scope.RepairArray($scope.SelectedCountries);
//        CacheManager.WriteStorage("ActiveCountries", $scope.SelectedCountries, 999999999999999);
//        modified = false;
//    }
//}
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
                    function CountryModalController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.MtModal = $mdDialog;
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
                        //this.$scope.IsOpen = this.IsOpen;
                        //this.$scope.hasSelectedChildren = function (id, name) {
                        //    var status = false;
                        //    if (this.children) {
                        //        if (this.children[id]) {
                        //            $.each(this.children[id], function (k, child) {
                        //                if (child.open == true) {
                        //                    status = true;
                        //                }
                        //            });
                        //        }
                        //    }
                        //    return status;
                        //};
                        //this.$scope.ToggleItem = this.ToggleItem;
                        this.SetActiveCountriesScope();
                    }
                    CountryModalController.prototype.OpenCountryModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: true,
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
                    CountryModalController.prototype.SetActiveCountriesScope = function () {
                        var vm = this;
                        var ActiveCountries = new Array();
                        this.CacheManager.GetStorage("user-countries", function (response) {
                            ActiveCountries = new Array();
                            var data = response.data;
                            data.forEach(function (value, index) {
                                vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response) {
                                    if (response) {
                                        ActiveCountries.push(response);
                                        vm.$scope.ActiveCountries = ActiveCountries;
                                    }
                                });
                            });
                        });
                        window.addEventListener("user-countries_Writed", function () {
                            ActiveCountries = new Array();
                            vm.CacheManager.GetStorage("user-countries", function (response) {
                                var data = response.data;
                                data.forEach(function (value, index) {
                                    vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response) {
                                        if (response) {
                                            ActiveCountries.push(response);
                                            vm.$scope.ActiveCountries = ActiveCountries;
                                        }
                                    });
                                });
                            });
                        });
                    };
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
                                if (this.ActiveCountryIDs.length < 5) {
                                    this.ActiveCountryIDs.push(id);
                                    if (cm.GetStorage("user-countries").data && cm.GetStorage("user-countries").data.indexOf(id) == -1) {
                                        this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                        cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                                    }
                                    // vm.$scope.ShowCountryLengthWarning = true;
                                    window.setTimeout(function () {
                                        // vm.$scope.ShowCountryLengthWarning = false;
                                    }, 5000);
                                }
                                else {
                                    //vm.$scope.ShowCountryLengthWarning = true;
                                    window.setTimeout(function () {
                                        // vm.$scope.ShowCountryLengthWarning = false;
                                    }, 5000);
                                }
                            }
                            else {
                                delete this.ActiveCountryIDs[this.ActiveCountryIDs.indexOf(id)];
                                this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
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
                        '$mdDialog'
                    ];
                    return CountryModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryModalController = CountryModalController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryModalController", FC.Modules.Filtering.Controllers.CountryModalController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Filtering.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var DateFilterController = (function (_super) {
                    __extends(DateFilterController, _super);
                    function DateFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var vm = this;
                        vm.$scope = $scope;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Close = this.Close;
                        vm.$scope.MtModal = $mdDialog;
                        //fetch from localstorage
                        vm.$scope.CurrentYear = new Date().getFullYear();
                        vm.$scope.PrevYear = new Date().getFullYear() - 1;
                        vm.$scope.NextYear = new Date().getFullYear() + 1;
                        vm.$scope.Month = new Date().getMonth() + 1;
                        vm.$scope.Year = new Date().getFullYear().toString();
                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        try {
                            if (CacheManager.GetCookieValue("Filter_Month")) {
                                vm.$scope.Month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                                vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                            }
                            if (CacheManager.GetCookieValue("Filter_Year")) {
                                vm.$scope.Year = CacheManager.GetCookieValue("Filter_Year");
                                vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                            }
                        }
                        catch (e) {
                            vm.$scope.Year = new Date().getFullYear().toString();
                            vm.$scope.Month = new Date().getMonth() + 1;
                            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        }
                        vm.$scope.IsLoading = false;
                        this.addFilterChangeListener();
                        window.addEventListener('ClearFilter', function () {
                            vm.$scope.Year = new Date().getFullYear().toString();
                            vm.$scope.Month = new Date().getMonth() + 1;
                            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                            CacheManager.DeleteStorage("Filter_Year");
                            CacheManager.DeleteStorage("Filter_Month");
                        });
                    }
                    DateFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (CacheManager.GetCookieValue("Filter_Month")) {
                                        vm.$scope.Month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                    }
                                    if (CacheManager.GetCookieValue("Filter_Year")) {
                                        vm.$scope.Year = CacheManager.GetCookieValue("Filter_Year");
                                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                    }
                                    vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                }
                            }
                        });
                    };
                    DateFilterController.prototype.filterByUrl = function (url) {
                        //var vm = this;
                        //var urlArr = url.split('/');
                        //var year = urlArr[2];
                        //var month = urlArr[3];
                        //debugger;
                        //vm.$scope.Year = year;
                        //CacheManager.WriteStorage("Filter_Year", this.$scope.Year, 1000 * 60 * 60 * 24);
                        //vm.$scope.Month = parseInt(month);
                        //CacheManager.WriteStorage("Filter_Month", this.$scope.Month, 1000 * 60 * 60 * 24);
                        //var e = new FilterChangedEvent(vm.$scope);
                    };
                    DateFilterController.prototype.ShowFilter = function () {
                        var vm = this;
                        var $scope = vm.$scope;
                        var opts = {};
                        opts.controller = FC.Modules.Filtering.Controllers.DateFilterController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/filtering/views/date-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    DateFilterController.prototype.IsActive = function (month) {
                        var vm = this;
                        return vm.$scope.Month == month;
                    };
                    DateFilterController.prototype.DoChangeYear = function () {
                        CacheManager.SetCookieValue("Filter_Year", this.$scope.Year);
                        var e = new Filtering.FilterChangedEvent(this.$scope);
                        this.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.ToggleMonth = function (month) {
                        if (this.$scope.Month != month) {
                            this.$scope.Month = month;
                            CacheManager.SetCookieValue("Filter_Month", this.$scope.Month.toString());
                            var e = new Filtering.FilterChangedEvent(this.$scope);
                        }
                        if (month == -1) {
                            month = new Date().getFullYear();
                        }
                        this.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.Save = function () {
                        var vm = this;
                        vm.Close();
                        //vm.$scope.IsLoading = true;
                    };
                    DateFilterController.prototype.Close = function () {
                        var vm = this;
                        vm.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.Reset = function () {
                        var vm = this;
                        CacheManager.DeleteStorage("Filter_Month");
                        CacheManager.DeleteStorage("Filter_Year");
                        vm.Close();
                    };
                    //public ActiveGenreID: number;
                    DateFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return DateFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.DateFilterController = DateFilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.DateFilterController", FC.Modules.Filtering.Controllers.DateFilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedGenres.some(function (v, i) {
//    if (v.GenreID == genre.GenreID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedGenres.push(genre);
//    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedGenres.some(function (v, i) {
//        if (v.GenreID == genre.GenreID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedGenres[index];
//        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
//        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//        modified = false;
//    }
//}
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
                var FilterBarController = (function (_super) {
                    __extends(FilterBarController, _super);
                    function FilterBarController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope.$q = $q;
                        vm.$scope.$http = $http;
                        vm.$scope.$sce = $sce;
                        try {
                            vm.CacheManager.Get("Filter_Month", function (storage) {
                                vm.$scope.Month = storage.data;
                            });
                            vm.CacheManager.Get("Filter_Year", function (storage) {
                                vm.$scope.Year = storage.data.toString();
                            });
                        }
                        catch (e) {
                            vm.$scope.Year = new Date().getFullYear().toString();
                            vm.$scope.Month = new Date().getMonth();
                        }
                        if (vm.$scope.Year == null || vm.$scope.Year == undefined || vm.$scope.Year == "-1") {
                            vm.$scope.Year = new Date().getFullYear().toString();
                        }
                        if (vm.$scope.Month == null || vm.$scope.Month == undefined || vm.$scope.Month == -1) {
                            vm.$scope.Month = new Date().getMonth();
                        }
                        this.addFilterChangeListenerDate();
                    }
                    FilterBarController.prototype.addFilterChangeListenerDate = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Month >= 0 && d.Year) {
                                        vm.$scope.Month = d.Month;
                                        vm.$scope.Year = d.Year;
                                        if (!d.Year) {
                                            vm.$scope.Year = new Date().getFullYear().toString();
                                        }
                                        vm.$scope.DateString = vm.months[d.Month].toUpperCase() + " / " + d.Year;
                                        vm.$scope.FormURL = vm.$scope.$sce.getTrustedResourceUrl("/calendar/" + d.Year + "/" + d.Month + "/");
                                    }
                                }
                            }
                            //form.submit();
                        });
                    };
                    FilterBarController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        '$sce'
                    ];
                    return FilterBarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterBarController = FilterBarController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterBarController", FC.Modules.Filtering.Controllers.FilterBarController);
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
                var CM = FC.Core.CoreModel;
                var FilterController = (function (_super) {
                    __extends(FilterController, _super);
                    function FilterController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "April", "March", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.Controller = this;
                        this.Modal = $mdDialog;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$scope.ActiveGenres = new CM.Dictionary();
                        vm.$scope.IsGenresLoading = true;
                        if (vm.CacheManager.Contains("sys-genres")) {
                            vm.CacheManager.GetStorage("sys-genres", function (response) {
                                vm.$scope.SysGenres = response.data;
                                vm.$scope.IsGenresLoading = false;
                            });
                        }
                        this.$scope.IsActive = this.IsActive;
                        vm.$scope.ToggleState = this.ToggleState;
                    }
                    FilterController.prototype.IsActive = function (genre, scope) {
                        if (scope) {
                            if (scope.ActiveGenres == null) {
                                scope.ActiveGenres = new FC.Core.CoreModel.Dictionary();
                            }
                            if (scope.ActiveGenres.data.length == 0) {
                                if (scope.Controller.CacheManager.Contains('ActiveGenres')) {
                                    scope.Controller.CacheManager.GetStorage('ActiveGenres', function (response) {
                                        scope.ActiveGenres.data = response.data.data;
                                    });
                                }
                            }
                        }
                        return scope.ActiveGenres.ContainsKey(genre.GenreID);
                    };
                    FilterController.prototype.ToggleState = function (genre, scope) {
                        if (scope.ActiveGenres.ContainsKey(genre.GenreID)) {
                            scope.ActiveGenres.Delete(genre.GenreID);
                        }
                        else {
                            scope.ActiveGenres.Add(genre.GenreID, genre);
                        }
                        scope.Controller.CacheManager.WriteStorage('ActiveGenres', scope.ActiveGenres);
                    };
                    FilterController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: 'fullsize',
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return FilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterController = FilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterController", FC.Modules.Filtering.Controllers.FilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var FilterChangedEvent = (function () {
                function FilterChangedEvent(detail) {
                    window.dispatchEvent(new CustomEvent("FilterChanged", { detail: detail }));
                }
                return FilterChangedEvent;
            }());
            Filtering.FilterChangedEvent = FilterChangedEvent;
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Models;
            (function (Models) {
                var FilterBarVM = (function () {
                    function FilterBarVM() {
                    }
                    return FilterBarVM;
                }());
                Models.FilterBarVM = FilterBarVM;
            })(Models = Filtering.Models || (Filtering.Models = {}));
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
                    this.$Application.AddRoute("/genres", "/scripts/modules/genres/views/overview.html", "FC.Modules.Genres.Controllers.GenreOverviewController", "vm");
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
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenreFormController = (function (_super) {
                    __extends(GenreFormController, _super);
                    function GenreFormController($http, $q, $mdDialog, $scope, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.RecoverModel(this.$scope.model, this.$scope);
                        //vm.$scope.model = new FC.Shared.Models.UGenre();
                    }
                    GenreFormController.prototype.GenreActive = function (genre) {
                        var vm = this;
                        var result = vm.$scope.SelectedGenres.filter(function (v, k) {
                            return v.GenreID == genre.GenreID;
                        });
                        if (result.length == 1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    GenreFormController.prototype.RegisterID = function (festivalID) {
                        var vm = this;
                        vm.GenreService.GetByFestivalID(festivalID).then(function (r) {
                            vm.$scope.SelectedGenres = r.Data;
                        });
                    };
                    GenreFormController.prototype.DoSelectGenre = function (festivalID, genreID) {
                        var vm = this;
                        this.FestivalService.ToggleGenre(festivalID, genreID).then(function (r) {
                            vm.$scope.SelectedGenres = r.Data.Data;
                        });
                    };
                    GenreFormController.prototype.search = function () {
                        var vm = this;
                        this.GenreService.Search(this.$scope.SearchKey).then(function (r) {
                            vm.$scope.SearchResult = r.Data;
                        });
                    };
                    //public ActiveGenreID: number;
                    GenreFormController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return GenreFormController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreFormController = GenreFormController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFormController", FC.Modules.Genres.Controllers.GenreFormController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var _OldGenreFilterController = (function (_super) {
                    __extends(_OldGenreFilterController, _super);
                    function _OldGenreFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.SetGenreList();
                        vm.$scope.ToggleGenre = this.ToggleGenre;
                        if (vm.$scope.MemReg.Get("ActiveGenres")) {
                            vm.$scope.inst.$scope.SelectedGenres = vm.$scope.MemReg.Get("ActiveGenres");
                        }
                        else {
                            vm.$scope.SelectedGenres = new Array();
                            if (CacheManager.Contains("ActiveGenres")) {
                                vm.$scope.inst.$scope.SelectedGenres = CacheManager.Get("ActiveGenres").data;
                            }
                        }
                        vm.$scope.IsActive = this.IsActive;
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                    }
                    _OldGenreFilterController.prototype.IsActive = function (genre) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveGenres")) {
                            var activated = CacheManager.Get("ActiveGenres").data;
                            var isactive = activated.some(function (g, i) {
                                return g.GenreID == genre.GenreID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    _OldGenreFilterController.prototype.ToggleGenre = function ($scope, genre) {
                        $scope = $scope.inst.$scope;
                        var any = false;
                        var modified = false;
                        any = $scope.SelectedGenres.some(function (v, i) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        if (any == false) {
                            $scope.SelectedGenres.push(genre);
                            modified = true;
                        }
                        else {
                            var index = $scope.SelectedGenres.indexOf(genre);
                            if (index > -1) {
                                delete $scope.SelectedGenres[index];
                                $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
                                modified = true;
                            }
                        }
                        if (modified) {
                            CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
                            modified = false;
                        }
                    };
                    _OldGenreFilterController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                        });
                    };
                    _OldGenreFilterController.prototype.Save = function ($scope) {
                        var vm = this;
                        vm.Close($scope);
                        //vm.$scope.IsLoading = true;
                    };
                    _OldGenreFilterController.prototype.Close = function ($scope) {
                        $("#GenreFilterControl").removeClass("ctx-visible").addClass("ctx-hidden");
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                    };
                    _OldGenreFilterController.prototype.Reset = function ($scope) {
                        CacheManager.DeleteStorage("ActiveGenres");
                        $scope.Close();
                    };
                    //public ActiveGenreID: number;
                    _OldGenreFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return _OldGenreFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers._OldGenreFilterController = _OldGenreFilterController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers._OldGenreFilterController", FC.Modules.Genres.Controllers._OldGenreFilterController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenreFilterController = (function (_super) {
                    __extends(GenreFilterController, _super);
                    function GenreFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.SelectedGenreIds = "";
                        vm.$scope.IsActive = this.IsActive;
                        var userID = CacheManager.GetCookieValue("UserID");
                        if (CacheManager.Contains("ActiveGenres")) {
                            vm.$scope.SelectedGenres = CacheManager.Get("ActiveGenres").data;
                            if (vm.$scope.SelectedGenres.length == 1) {
                                vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE SELECTED";
                            }
                            else {
                                vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRES SELECTED";
                            }
                        }
                        if (userID) {
                            vm.FavoriteService.GetUserFavorites(userID, FC.Shared.Enum.InternalContentType.Genre).then(function (r) {
                                r.Data.forEach(function (v, k) {
                                    if (v.Content) {
                                        var any = vm.$scope.SelectedGenres.some(function (genre, k) {
                                            return genre.GenreID == v.ContentID;
                                        });
                                        if (any == false) {
                                            vm.$scope.SelectedGenres.push(v.Content);
                                        }
                                        vm.$scope.Selected = vm.$scope.SelectedGenres.length + " SELECTED";
                                    }
                                });
                                CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 9999999999);
                            });
                        }
                        if (vm.$scope.SelectedGenres.length == 0) {
                            vm.$scope.Selected = "SELECT GENRES";
                        }
                        vm.SetGenreList();
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                        vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
                        vm.addFilterChangeListener();
                        window.addEventListener('ClearFilter', function () {
                            vm.$scope.Selected = "SELECT GENRES";
                            vm.$scope.SelectedGenres = new Array();
                            CacheManager.DeleteStorage('ActiveGenres');
                        });
                    }
                    GenreFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Genres) {
                                        vm.$scope.Selected = d.Genres.length + " GENRE(S) SELECTED";
                                        d.Genres.forEach(function (g, i) {
                                            vm.$scope.SelectedGenreIds += g.GenreID + ',';
                                        });
                                        vm.$scope.SelectedGenres = d.Genres;
                                        if (vm.$scope.SelectedGenres.length == 1) {
                                            vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE SELECTED";
                                        }
                                        else {
                                            vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRES SELECTED";
                                        }
                                        if (vm.$scope.SelectedGenres.length == 0) {
                                            vm.$scope.Selected = "SELECT GENRES";
                                        }
                                        vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
                                    }
                                }
                            }
                        });
                    };
                    GenreFilterController.prototype.ShowFilter = function ($scope) {
                        var vm = this;
                        vm.$scope = $scope;
                        var $scope = vm.$scope;
                        var opts = {};
                        opts.controller = FC.Modules.Genres.Controllers.GenreFilterController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/genres/views/genre-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    GenreFilterController.prototype.IsActive = function (genre) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveGenres")) {
                            var activated = CacheManager.Get("ActiveGenres").data;
                            var isactive = activated.some(function (g, i) {
                                return g.GenreID == genre.GenreID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    GenreFilterController.prototype.ToggleGenre = function (genre) {
                        var vm = this;
                        if (!this.IsActive(genre)) {
                            vm.$scope.SelectedGenres.push(genre);
                            CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 999999999999999);
                        }
                        else {
                            var tmp = new Array();
                            vm.$scope.SelectedGenres.forEach(function (v, i) {
                                if (v.GenreID != genre.GenreID) {
                                    tmp.push(v);
                                }
                            });
                            vm.$scope.SelectedGenres = tmp;
                            CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 999999999999999);
                        }
                        vm.$scope.SelectedGenres.forEach(function (v, i) {
                            vm.$scope.SelectedGenreIds += v.GenreID + ",";
                        });
                        if (vm.$scope.SelectedGenres) {
                            if (vm.$scope.SelectedGenres.length == 0) {
                                vm.$scope.Selected = "SELECT GENRES";
                            }
                            else {
                                vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE(S) SELECTED";
                            }
                        }
                        vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
                        vm.$scope.model.Genres = vm.$scope.SelectedGenres;
                        this.Save();
                    };
                    GenreFilterController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                            if (CacheManager.Contains("ActiveGenres")) {
                                vm.$scope.SelectedGenres = CacheManager.GetStorage("ActiveGenres").data;
                            }
                            else {
                                vm.$scope.SelectedGenres = new Array();
                            }
                        });
                    };
                    GenreFilterController.prototype.Save = function () {
                        var vm = this;
                        //vm.$scope.Selected = vm.$scope.SelectedGenres.length + " SELECTED";
                        vm.Close();
                        var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
                        //vm.$scope.IsLoading = true;
                    };
                    GenreFilterController.prototype.Close = function () {
                        this.$scope.MtModal.hide();
                    };
                    GenreFilterController.prototype.Reset = function () {
                        CacheManager.DeleteStorage("ActiveGenres");
                    };
                    //public ActiveGenreID: number;
                    GenreFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return GenreFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreFilterController = GenreFilterController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFilterController", FC.Modules.Genres.Controllers.GenreFilterController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedGenres.some(function (v, i) {
//    if (v.GenreID == genre.GenreID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedGenres.push(genre);
//    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedGenres.some(function (v, i) {
//        if (v.GenreID == genre.GenreID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedGenres[index];
//        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
//        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//        modified = false;
//    }
//}
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenreOverviewController = (function (_super) {
                    __extends(GenreOverviewController, _super);
                    function GenreOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setGenres();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("REFRESH", function (r) {
                            vm.setGenres();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    GenreOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.GenreService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Genres = r.Data;
                            vm.GenreService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    GenreOverviewController.prototype.setGenres = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.GenreService.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.Genres = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.GenreService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    GenreOverviewController.prototype.DoDelete = function (Genre) {
                        var vm = this;
                        vm.$scope.model = Genre;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.GenreService, vm.$scope);
                    };
                    //public ActiveGenreID: number;
                    GenreOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return GenreOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreOverviewController = GenreOverviewController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreOverviewController", FC.Modules.Genres.Controllers.GenreOverviewController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenrePickerController = (function (_super) {
                    __extends(GenrePickerController, _super);
                    function GenrePickerController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = 'C0232ABF-7A60-46D2-942D-A2843B3D1AA0';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.URLRoot = $AppConfig.URLRoot;
                        //vm.Modal = $uibModal;
                        vm.$scope.MtModal = $mdDialog;
                        vm.SetGenreList();
                        vm.$scope.Save = this.Save;
                        if (!vm.$scope.SelectedGenres) {
                            vm.$scope.SelectedGenres = new Array();
                        }
                        vm.$scope.SelectedHidden = false;
                        vm.$scope.ToggleSelected = this.ToggleSelected;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        vm.$scope.DoSaveCreate = this.DoAddGenre;
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoDelete = this.DoDelete;
                        vm.$scope.DoCancelCRUD = this.DoCancelCRUD;
                        vm.$scope.DoSaveEdit = this.DoSaveEditGenre;
                        vm.$scope.DoSaveDelete = this.DoSaveDeleteGenre;
                        vm.$scope.DoSaveForceDelete = this.DoSaveForceDeleteGenre;
                        vm.$scope.IsCreating = false;
                        vm.$scope.IsEditing = false;
                        vm.$scope.IsDeleting = false;
                        vm.$scope.GenreCreated = false;
                        vm.$scope.Activate = this.Activate;
                        vm.$scope.IsActive = this.IsActive;
                        vm.$scope.Close = this.Close;
                        vm.$scope.DoSearch = this.DoSearch;
                        vm.$scope.DoCancelSearch = this.DoCancelSearch;
                        if (vm.$scope.MemReg.Get("SelectedGenres")) {
                            vm.$scope.SelectedGenres = vm.$scope.MemReg.Get("SelectedGenres");
                        }
                        this.RecoverModel(this.$scope.model, this.$scope);
                        //vm.$scope.model = new FC.Shared.Models.UGenre();
                    }
                    GenrePickerController.prototype.DoSearch = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.SearchResult = $scope.SysGenres.filter(function (v) {
                            return v.Name.substr(0, $scope.SearchKey.length).toLowerCase() == $scope.SearchKey.toLowerCase();
                        });
                        if (!$scope.model) {
                            $scope.model = new FC.Shared.Models.UGenre();
                        }
                        $scope.model.Name = $scope.SearchKey;
                    };
                    GenrePickerController.prototype.DoCancelSearch = function ($scope) {
                        $scope.SearchKey = '';
                    };
                    GenrePickerController.prototype.Close = function ($scope) {
                        $scope.MtModal.hide();
                    };
                    GenrePickerController.prototype.ToggleSelected = function ($scope, state) {
                        var $scope = $scope.inst.$scope;
                        $scope.SelectedHidden = state;
                    };
                    GenrePickerController.prototype.DoCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        if ($scope.SearchKey) {
                            $scope.model.Name = $scope.SearchKey;
                        }
                        $scope.IsCreating = true;
                    };
                    GenrePickerController.prototype.DoEdit = function ($scope, genre) {
                        var $scope = $scope.inst.$scope;
                        $scope.model = genre;
                        $scope.IsEditing = true;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                    };
                    GenrePickerController.prototype.DoDelete = function ($scope, genre) {
                        var $scope = $scope.inst.$scope;
                        $scope.model = genre;
                        $scope.ServerMsg = null;
                        $scope.IsEditing = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                    };
                    GenrePickerController.prototype.DoSaveEditGenre = function ($scope) {
                        $scope.inst.GenreService.Update($scope.model).then(function (r) {
                            if (r.Data.EXISTS == true) {
                                $scope.IsEditing = true;
                                $scope.IsEdited = true;
                                $scope.ServerMsg = r.Message;
                            }
                            if (r.Data.SUCCESS == true) {
                                $scope.GenreModified = true;
                                $scope.ServerMsg = r.Message;
                                $scope.IsEditing = false;
                                $scope.IsEdited = true;
                            }
                            else {
                                $scope.GenreModified = false;
                                $scope.ServerMsg = r.Message;
                                $scope.IsEditing = true;
                                $scope.IsEdited = false;
                            }
                        });
                    };
                    GenrePickerController.prototype.DoSaveDeleteGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.Delete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                            }
                            else {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                            }
                        });
                    };
                    GenrePickerController.prototype.DoSaveForceDeleteGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.ForceDelete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                            }
                            else {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                            }
                        });
                    };
                    GenrePickerController.prototype.Filter = function () {
                        var vm = this;
                        if (vm.$scope.GenreSearchKey) {
                            vm.$scope.GenreSearchKey = vm.$scope.GenreSearchKey.charAt(0).toUpperCase() + vm.$scope.GenreSearchKey.slice(1);
                            vm.GenreService.Search(vm.$scope.GenreSearchKey).then(function (r) {
                                vm.$scope.SysGenres = r.Data;
                            });
                        }
                        else {
                            vm.SetGenreList();
                        }
                    };
                    GenrePickerController.prototype.Deactivate = function ($scope, genre, saveEvt, model) {
                        var index = 0;
                        $scope.SelectedGenres = model;
                        var tmp = $scope.SelectedGenres;
                        tmp.forEach(function (v, i) {
                            if (v == null || genre == null) {
                                delete $scope.SelectedGenres[index];
                            }
                            else if (v.GenreID == genre.GenreID) {
                                delete $scope.SelectedGenres[index];
                            }
                            index++;
                        });
                        $scope.SelectedGenres = $scope.inst.RepairArray($scope.SelectedGenres);
                        var evt = new CustomEvent(saveEvt, { "detail": $scope });
                        window.dispatchEvent(evt);
                    };
                    GenrePickerController.prototype.Activate = function ($scope, genre, formID, saveEvt) {
                        $scope = $scope.inst.$scope;
                        if (!$scope.SelectedGenres.some(function (v, i) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })) {
                            $scope.SelectedGenres.push(genre);
                        }
                        else {
                            var index = 0;
                            var tmp = $scope.SelectedGenres;
                            tmp.forEach(function (v, i) {
                                if (v.GenreID == genre.GenreID) {
                                    delete $scope.SelectedGenres[index];
                                }
                                index++;
                            });
                            $scope.SelectedGenres = $scope.inst.RepairArray($scope.SelectedGenres);
                        }
                        if (saveEvt) {
                            var evt = new CustomEvent(saveEvt, { "detail": $scope });
                            window.dispatchEvent(evt);
                        }
                    };
                    GenrePickerController.prototype.RegisterEvt = function (evt) {
                        var vm = this;
                        vm.$scope.MemReg.Register("ModalGenreSaveEvent", evt);
                    };
                    GenrePickerController.prototype.IsActive = function ($scope, genre) {
                        var vm = this;
                        var existing = $scope.SelectedGenres.filter(function (v, k) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        if (existing[0]) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    GenrePickerController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                        });
                    };
                    GenrePickerController.prototype.DoAddGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.Create($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            $scope.inst.SetGenreData(true);
                            if (r.Data.EXISTS == true) {
                                $scope.IsCreated = false;
                                $scope.IsCreating = true;
                            }
                            if (r.Data.SUCCESS == true) {
                                $scope.IsCreated = true;
                                $scope.IsCreating = false;
                                $scope.FinishForm($scope);
                            }
                            else {
                                $scope.IsCreated = false;
                                $scope.IsCreating = false;
                            }
                        });
                    };
                    GenrePickerController.prototype.Cancel = function ($scope) {
                        var vm = this;
                        $scope.MtModal.cancel();
                    };
                    GenrePickerController.prototype.Save = function ($scope) {
                        $scope = $scope.inst.$scope;
                        var e = $scope.inst.MemReg.GetAny("ModalGenreSaveEvent");
                        var evt = new CustomEvent(e, { "detail": $scope });
                        window.dispatchEvent(evt);
                        $scope.$dismiss($scope.inst.Modal);
                        //todo dispose selected data...
                    };
                    //public ActiveGenreID: number;
                    GenrePickerController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                    ];
                    return GenrePickerController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenrePickerController = GenrePickerController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenrePickerController", FC.Modules.Genres.Controllers.GenrePickerController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
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
                    GenreService.prototype.GetList = function () {
                        return this.Get('/API/Genre/GetList');
                    };
                    GenreService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Genre/GetPaged?size=' + size + '&page=' + page);
                    };
                    GenreService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Genre/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    GenreService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Genre/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    GenreService.prototype.Search = function (key) {
                        return this.Get('/API/Genre/Search?name=' + key);
                    };
                    GenreService.prototype.GetByID = function (id) {
                        return this.Get('/API/Genre/GetByID?id=' + id);
                    };
                    GenreService.prototype.GetByFestivalID = function (id) {
                        return this.Get('/API/Genre/GetByFestivalID?festivalID=' + id);
                    };
                    GenreService.prototype.GetAllRoot = function () {
                        return this.Get('/API/Genre/GetAllRoot');
                    };
                    GenreService.prototype.GetAllGenres = function () {
                        return this.Get('/API/Genre/GetAll');
                    };
                    GenreService.prototype.GetAllChildGenres = function () {
                        return this.Get('/API/Genre/GetAllChildren');
                    };
                    GenreService.prototype.GetAllDefault = function () {
                        return this.Get('/API/Genre/GetAllDefault');
                    };
                    GenreService.prototype.GetAllDefaultIds = function () {
                        return this.Get('/API/Genre/GetAllDefaultIds');
                    };
                    GenreService.prototype.Filter = function (filter) {
                        return this.Post('/API/Genre/Filter', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    GenreService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/API/Festival/GetById?&id=' + festivalId);
                    };
                    GenreService.prototype.Regenerate = function () {
                        //regenerate genre cache
                        this.Get('/API/Festival/Regenerate/');
                    };
                    GenreService.prototype.Create = function (genre) {
                        return this.Post('/API/Genre/Create', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.Update = function (genre) {
                        return this.Post('/API/Genre/Update', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.Delete = function (genre) {
                        return this.Post('/API/Genre/Delete', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.ForceDelete = function (genre) {
                        return this.Post('/API/Genre/ForceDelete', new FC.Shared.Models.ServiceMessage(genre));
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
                    function LoadController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        LoadingModule.GetApplication().RegisterController("FC.Modules.Loading.Controllers.LoadController", FC.Modules.Loading.Controllers.LoadController);
                    }
                    LoadController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$mdDialog'
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
        var Location;
        (function (Location_1) {
            var Location = (function () {
                function Location(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/locations", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationOverviewController", "vm");
                    this.$Application.AddRoute("/locations/details/:LocationID", "/Scripts/Modules/Location/Views/details.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
                    this.$Application.AddRoute("/locations/create", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/create/:step", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/edit/:LocationID", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/delete/:LocationID", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                }
                Location.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Location.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Location;
            }());
            Location_1.Location = Location;
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var LocationModule = new FC.Modules.Location.Location(angular.module('FC.Modules.Location', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location) {
            var Controllers;
            (function (Controllers) {
                var CORE = FC.Core;
                var LocationCRUDController = (function (_super) {
                    __extends(LocationCRUDController, _super);
                    function LocationCRUDController($http, $q, $scope, $route, $routeParams, $location, $sce, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        vm.CheckAuth($scope);
                        this.$scope.inst = this;
                        this.$scope.$sce = $sce;
                        this.$scope.MtModal = $mdDialog;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.FormID = "89A2B8B1-6087-407C-BBAB-DC4961F927D0";
                        this.$scope.SaveFieldState = this.SaveFieldState;
                        this.$scope.GetFieldState = this.GetFieldState;
                        this.$scope.SaveFormState = this.SaveFormState;
                        this.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        this.$location = $location;
                        this.$scope.model = new FC.Shared.Models.Location();
                        this.$scope.$location = $location;
                        this.$scope.$routeParams = $routeParams;
                        if ($routeParams["step"]) {
                            this.$scope.WizardStep = $routeParams["step"];
                        }
                        else {
                            this.$scope.WizardStep = 1;
                        }
                        if ($routeParams["LocationID"]) {
                            vm.FinishForm(vm.$scope);
                            vm.$scope.IsEditing = true;
                            vm.$scope.LocationID = $routeParams["LocationID"];
                            vm.$scope.SaveFieldState($scope, "LocationID", vm.$scope.LocationID);
                            vm.$scope.IsCreating = false;
                            vm.$scope.IsLoading = true;
                            vm.LocationService.GetLocation($routeParams["LocationID"]).then(function (r) {
                                vm.$scope.model = r.Data;
                                vm.$scope.IsLoading = false;
                                vm.$scope.MapsReady = true;
                                vm.$scope.MapsURL = vm.$scope.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?&zoom=16&key=AIzaSyAaqNdfzf3K2JVYb5hu9lvabVg8rXG6RiQ&q=' + r.Data.Country.Name + '+' + r.Data.City + '+' + r.Data.Address + '&maptype=roadmap');
                            });
                        }
                        else {
                            vm.$scope.IsLoading = false;
                            vm.$scope.IsCreating = true;
                            vm.$scope.IsEditing = false;
                        }
                        this.RecoverModel();
                        this.AddValidation();
                    }
                    LocationCRUDController.prototype.removeCharacters = function (zipcode) {
                        return zipcode.replace(/[^0-9]+/g, "");
                    };
                    LocationCRUDController.prototype.AutoFill = function () {
                        var vm = this;
                        if (vm.$scope.model.CountryID && vm.$scope.model.ZIPCode && vm.$scope.model.City && vm.$scope.model.Address) {
                            var countries = new FC.List(vm.$scope.SysCountries);
                            var country = countries.Find("CountryID", vm.$scope.model.CountryID);
                            var countryCode = country.CultureIsoName.split('-')[1];
                            vm.GeonamesService.Search(vm.removeCharacters(vm.$scope.model.ZIPCode), countryCode).then(function (r) {
                                if (r['data']['postalCodes']) {
                                    var response = new FC.List(r['data']['postalCodes']);
                                    var first = response.First();
                                    if (first) {
                                        vm.$scope.model.Latitude = first.lat;
                                        vm.$scope.model.Longitude = first.lng;
                                        vm.$scope.model.City = first.placeName;
                                        vm.$scope.MapsURL = vm.$scope.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?&zoom=16&key=AIzaSyAaqNdfzf3K2JVYb5hu9lvabVg8rXG6RiQ&q=' + country.Name + '+' + vm.$scope.model.City + '+' + vm.$scope.model.Address + '&maptype=roadmap');
                                        vm.$scope.LatLongSet = true;
                                        vm.$scope.MapsReady = true;
                                    }
                                }
                            });
                        }
                        else {
                            vm.$scope.MapsReady = false;
                        }
                    };
                    LocationCRUDController.prototype.AddValidation = function () {
                        var vm = this;
                        var rule = new CORE.Validation.ValidationRuleItem();
                        rule.FieldName = "Website";
                        rule.FieldLabel = "website";
                        rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Website, false);
                        var rule2 = new CORE.Validation.ValidationRuleItem();
                        rule2.FieldName = "ZIPCode";
                        rule2.FieldLabel = "zip code";
                        rule2.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Zip, true);
                        var rule3 = new CORE.Validation.ValidationRuleItem();
                        rule3.FieldName = "Email";
                        rule3.FieldLabel = "e-mail address";
                        rule3.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Email, false);
                        var rule4 = new CORE.Validation.ValidationRuleItem();
                        rule4.FieldName = "LocationName";
                        rule4.FieldLabel = "name";
                        rule4.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        var rule5 = new CORE.Validation.ValidationRuleItem();
                        rule5.FieldName = "Phone";
                        rule5.FieldLabel = "phone";
                        rule5.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Phone, false);
                        var rule6 = new CORE.Validation.ValidationRuleItem();
                        rule6.FieldName = "City";
                        rule6.FieldLabel = "city";
                        rule6.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        var rule7 = new CORE.Validation.ValidationRuleItem();
                        rule7.FieldName = "Address";
                        rule7.FieldLabel = "address";
                        rule7.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        this.AddValidationRule(rule);
                        this.AddValidationRule(rule2);
                        this.AddValidationRule(rule3);
                        this.AddValidationRule(rule4);
                        this.AddValidationRule(rule5);
                        this.AddValidationRule(rule6);
                        this.AddValidationRule(rule7);
                    };
                    LocationCRUDController.prototype.DoSaveCreate = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.DoSaveEdit = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.DoSaveDelete = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.RecoverModel = function () {
                        var vm = this;
                        var r = _super.prototype.RecoverModel.call(this, vm.$scope.model, vm.$scope);
                        vm.$scope.model = r;
                    };
                    //public ActiveGenreID: number;
                    LocationCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "$mdDialog"
                    ];
                    return LocationCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationCRUDController = LocationCRUDController;
                LocationModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationCRUDController", FC.Modules.Location.Controllers.LocationCRUDController);
            })(Controllers = Location.Controllers || (Location.Controllers = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location) {
            var Controllers;
            (function (Controllers) {
                var LocationDialogController = (function (_super) {
                    __extends(LocationDialogController, _super);
                    function LocationDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.FormID = '940BD72D-88E3-4201-98D6-042919BD918C';
                        vm.$scope.$location = $location;
                        vm.$scope.DoSaveEdit = this.DoSaveEdit;
                        vm.$scope = $scope;
                        vm.$scope.GetLocations = this.GetLocations;
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.$scope.IsLoading = false;
                        vm.$scope.IsCreating = false;
                        vm.$scope.IsEditing = false;
                        vm.$scope.IsDeleting = false;
                        vm.$scope.SetCountry = this.SetCountry;
                        vm.$scope.DoSave = this.DoSave;
                        vm.$scope.PhoneCodes = PhoneCodes;
                        vm.$scope.SelectedImagePath = FC.Core.Environment.MediaURLRoot;
                        vm.AddLocationThumbSavedListener(vm.$scope);
                        vm.AddProfileImageSavedListener(vm.$scope);
                        vm.RecoverModel(vm.$scope.model, $scope);
                        window.addEventListener("FCDataLoadingComplete", function (e) {
                            vm.$scope.inst.$scope.IsLoading = false;
                        });
                    }
                    LocationDialogController.prototype.SetCountry = function ($scope, countryID) {
                        $scope = $scope.inst.$scope;
                        var country = $scope.SysCountries.filter(function (v, i) {
                            return v.CountryID == countryID;
                        });
                        if (country[0]) {
                            $scope.model.Country = country[0];
                            var index = country[0].CultureIsoName.split("-")[1];
                            $scope.PhoneCode = PhoneCodes[index];
                        }
                    };
                    LocationDialogController.prototype.AddLocationThumbSavedListener = function ($scope) {
                        window.addEventListener("LocationThumbSaved", function (e) {
                            $scope.model.ThumbnailID = e["detail"];
                        });
                    };
                    LocationDialogController.prototype.AddProfileImageSavedListener = function ($scope) {
                        window.addEventListener("ProfileImageSaved", function (e) {
                            $scope.model.ProfileImageID = e["detail"];
                        });
                    };
                    LocationDialogController.prototype.DoEdit = function ($scope, model) {
                        $scope = $scope.inst.$scope;
                        $scope.DoCancelCRUD($scope);
                        $scope.IsEditing = true;
                        $scope.model = model;
                        $scope.inst.LocationService.GetLocation($scope.model.LocationID).then(function (r) {
                            $scope.model = r.Data;
                        });
                    };
                    LocationDialogController.prototype.DoCreate = function ($scope, countryID) {
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                        $scope.model = new FC.Shared.Models.Location();
                        $scope.model.CountryID = countryID;
                        $scope.SetCountry($scope, countryID);
                    };
                    LocationDialogController.prototype.DoSaveCreate = function ($scope) {
                        var vm = this;
                        $scope.IsCreating = false;
                        vm.FinishForm(vm.$scope);
                        $scope.inst.LocationService.Create($scope.model).then(function (r) {
                            $scope.IsCreated = r.Data.SUCCESS;
                        });
                    };
                    LocationDialogController.prototype.GetLocations = function ($scope, countryID) {
                        var vm = this;
                        $scope.inst.LocationService.GetByCountry(countryID).then(function (r) {
                            $scope.Locations = r.Data;
                        });
                    };
                    LocationDialogController.prototype.DoSaveEdit = function ($scope) {
                        var vm = this;
                        $scope.inst.LocationService.Update($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            $scope.IsSuccess = r.Data.SUCCESS;
                            $scope.DoCancelCRUD($scope);
                        });
                    };
                    LocationDialogController.prototype.DoSave = function ($scope) {
                        window.dispatchEvent(new CustomEvent("LocationSaveEvent", { 'detail': $scope.model }));
                    };
                    LocationDialogController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return LocationDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationDialogController = LocationDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationDialogController", FC.Modules.Location.Controllers.LocationDialogController);
            })(Controllers = Location.Controllers || (Location.Controllers = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location_2) {
            var Controllers;
            (function (Controllers) {
                var LocationOverviewController = (function (_super) {
                    __extends(LocationOverviewController, _super);
                    function LocationOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setLocations();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("SAVE_SUCCESS", function (r) {
                            vm.setLocations();
                        });
                        window.addEventListener("ProfileImageIDSaved", function (e) {
                            vm.$scope.model.ProfileImageID = e['detail'];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                            vm.setLocations();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    LocationOverviewController.prototype.DoEdit = function (partialName, $scope, model) {
                        var vm = this;
                        var opts = {};
                        vm.LocationService.GetLocation(model.LocationID).then(function (r) {
                            vm.$scope.model = r.Data;
                            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                                if (r == true) {
                                    switch (partialName) {
                                        case "name":
                                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                            opts.parent = document.body;
                                            opts.clickOutsideToClose = true;
                                            $scope.MtModal.show(opts).then(function (answer) {
                                            }, function () {
                                                ;
                                            });
                                            break;
                                        case "logo":
                                            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                                            opts.controllerAs = 'vm';
                                            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                                            opts.parent = document.body;
                                            opts.locals = { local: [$scope.MtModal, "ProfileImageIDSaved", vm.$scope.model.MediaDirectoryID] };
                                            opts.clickOutsideToClose = true;
                                            $scope.MtModal.show(opts).then(function (answer) {
                                                //$scope.status = 'You said the information was "' + answer + '".';
                                            }, function () {
                                                // $scope.status = 'You cancelled the dialog.';
                                            });
                                            break;
                                    }
                                }
                                else {
                                    window.addEventListener("AUTH_SUCCESS", function () {
                                        $scope.MtModal.hide();
                                    });
                                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                    opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                    opts.parent = document.body;
                                    opts.clickOutsideToClose = true;
                                    $scope.MtModal.show(opts).then(function (answer) {
                                    }, function () {
                                    });
                                }
                            });
                        });
                    };
                    LocationOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        var sortID = "";
                        if (vm.$scope.CountrySortID) {
                            sortID = vm.$scope.CountrySortID;
                        }
                        vm.LocationService.GetSorted(sortID, sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Locations = r.Data;
                            vm.LocationService.GetPagedCount(sortID, p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Locations?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Locations?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    LocationOverviewController.prototype.setLocations = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.LocationService.GetSorted("", sortIndex, p).then(function (r) {
                            vm.$scope.Locations = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.LocationService.GetPagedCount("", p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Locations?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Locations?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    LocationOverviewController.prototype.DoDelete = function (Location) {
                        var vm = this;
                        vm.$scope.model = Location;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.LocationService, vm.$scope);
                    };
                    //public ActiveGenreID: number;
                    LocationOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return LocationOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationOverviewController = LocationOverviewController;
                LocationModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationOverviewController", FC.Modules.Location.Controllers.LocationOverviewController);
            })(Controllers = Location_2.Controllers || (Location_2.Controllers = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../Location.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location) {
            var Services;
            (function (Services) {
                var GeonamesService = (function (_super) {
                    __extends(GeonamesService, _super);
                    function GeonamesService(http, q) {
                        _super.call(this, http, q);
                    }
                    /**
                     * The gets the english city name by postalcode & two letter country code
                     * @param postalcode (6832) etc.
                     * @param country (NL, UK, US) etc.
                     */
                    GeonamesService.prototype.Search = function (postalcode, country) {
                        return this.GetRaw('http://api.geonames.org/postalCodeSearchJSON?postalcode=' + postalcode + '&maxRows=10&username=festivalcalendar&country=' + country);
                    };
                    GeonamesService.prototype.GetList = function () {
                        throw new Error("GeonamesService.GetList() is not implemented.");
                    };
                    GeonamesService.$inject = ['$http', '$q'];
                    return GeonamesService;
                }(FC.Core.ServiceBase));
                Services.GeonamesService = GeonamesService;
            })(Services = Location.Services || (Location.Services = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
LocationModule.GetApplication().app.service('FC.Modules.Location.Services.GeonamesService', FC.Modules.Location.Services.GeonamesService);
///<reference path="../Location.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location_3) {
            var Services;
            (function (Services) {
                var LocationService = (function (_super) {
                    __extends(LocationService, _super);
                    function LocationService(http, q) {
                        _super.call(this, http, q);
                    }
                    LocationService.prototype.GetList = function () {
                        return this.Get('/API/Location/GetList');
                    };
                    LocationService.prototype.GetByID = function (id) {
                        return this.Get('/API/Location/GetByID?id=' + id);
                    };
                    LocationService.prototype.Search = function (keyword) {
                        return this.Get('/API/Location/GetByPartialName?name=' + keyword);
                    };
                    LocationService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Location/GetPaged?size=' + size + '&page=' + page);
                    };
                    LocationService.prototype.GetSorted = function (countryID, sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        if (!sortIndex) {
                            sortIndex = "0-9";
                        }
                        return this.Get('/API/Location/GetSorted?&countryID=' + countryID + '&sortIndex=' + sortIndex + '&page=' + page);
                    };
                    LocationService.prototype.GetPagedCount = function (countryID, page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Location/GetPagedCount?&countryID=' + countryID + '&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    LocationService.prototype.GetLocation = function (LocationId) {
                        return this.Get('/API/Location/GetByID?&id=' + LocationId);
                    };
                    LocationService.prototype.GetByCountry = function (countryID) {
                        return this.Get('/API/Location/GetByCountry?&countryID=' + countryID);
                    };
                    LocationService.prototype.Create = function (Location) {
                        return this.Post('/API/Location/Create', new FC.Shared.Models.ServiceMessage(Location));
                    };
                    LocationService.prototype.Update = function (Location) {
                        return this.Post('/API/Location/Update', new FC.Shared.Models.ServiceMessage(Location));
                    };
                    LocationService.prototype.Delete = function (Location) {
                        return this.Post('/API/Location/Delete', new FC.Shared.Models.ServiceMessage(Location));
                    };
                    LocationService.prototype.ForceDelete = function (Location) {
                        return this.Post('/API/Location/ForceDelete', new FC.Shared.Models.ServiceMessage(Location));
                    };
                    LocationService.$inject = ['$http', '$q'];
                    return LocationService;
                }(FC.Core.ServiceBase));
                Services.LocationService = LocationService;
            })(Services = Location_3.Services || (Location_3.Services = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
LocationModule.GetApplication().app.service('FC.Modules.Location.Services.LocationService', FC.Modules.Location.Services.LocationService);
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media_1) {
            var Media = (function () {
                function Media(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/media/embed-upload", "/Scripts/Modules/Media/Views/file-upload.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
                    this.$Application.AddRoute("/media/browsefiles/:isxhr", "/Scripts/Modules/Media/Views/files.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
                }
                Media.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Media;
            }());
            Media_1.Media = Media;
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var MediaModule = new FC.Modules.Media.Media(angular.module('FC.Modules.Media', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Media.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Controllers;
            (function (Controllers) {
                var ENV = FC.Core.Environment;
                var MediaModalController = (function (_super) {
                    __extends(MediaModalController, _super);
                    function MediaModalController($http, $q, $scope, $route, $routeParams, $location, $uibModal, $mdDialog, MediaSvc, $sce, $local) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$sce = $sce;
                        vm.$sce.whiteListR;
                        vm.EventManager = FC.Shared.Util.EventManager.GetInstance();
                        vm.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        this.MediaSvc = MediaSvc;
                        this.$scope = $scope;
                        this.$scope.$local = $local;
                        this.Modal = $uibModal;
                        this.Crumb = new Array();
                        vm.$scope.Crumb = this.Crumb;
                        vm.$scope.RegisterEvt = vm.RegisterEvt;
                        vm.$scope.MemReg = this.MemReg;
                        vm.$scope.Activate = vm.Activate;
                        vm.$scope.inst = this;
                        vm.$scope.ActiveDir = null;
                        if ($local[2]) {
                            vm.$scope.DirectoryID = $local[2];
                        }
                        else {
                            throw new Error("No directory id is defined.");
                        }
                        if ($local[3]) {
                            vm.$scope.DirectoryID = $local[2];
                        }
                        else {
                            throw new Error("Not authorized, because there is no token defined.");
                        }
                        if ($local[4]) {
                            vm.$scope.ValidationWidth = $local[4];
                        }
                        else {
                            vm.$scope.ValidationWidth = 0;
                        }
                        if ($local[5]) {
                            vm.$scope.ValidationHeight = $local[5];
                        }
                        else {
                            vm.$scope.ValidationHeight = 0;
                        }
                        if ($local[6] && $local[6] == true) {
                            vm.$scope.IsThumbnail = true;
                        }
                        else {
                            vm.$scope.IsThumbnail = false;
                        }
                        vm.$scope.DoEditMediaDir = this.DoEditMediaDir;
                        vm.$scope.DoSaveEditMediaDir = this.DoSaveEditMediaDir;
                        vm.$scope.DoDeleteMediaDir = this.DoDeleteMediaDir;
                        vm.$scope.DoDeleteMediaItem = this.DoDeleteMediaItem;
                        vm.$scope.DoCreateMediaItem = this.DoCreateMediaItem;
                        vm.$scope.DoCreateMediaDir = this.DoCreateMediaDir;
                        vm.$scope.DoSaveCreateMediaDir = this.DoSaveCreateMediaDir;
                        vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.$scope.DoSaveDeleteMediaDir = this.DoSaveDeleteMediaDir;
                        vm.$scope.DoSaveDelete = this.DoSaveDelete;
                        vm.$scope.DoCancelCRUD = this.DoCancelCRUD;
                        vm.$scope.GoBack = this.GoBack;
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.IsMediaDirCreating = false;
                        vm.$scope.IsCreating = false;
                        vm.$scope.IsDeleting = false;
                        vm.$scope.IsMediaDirEditing = false;
                        vm.$scope.IsLoading = true;
                        vm.$scope.IsMediaDirDeleting = false;
                        vm.$scope.DoSubmit = this.DoSubmit;
                        vm.$scope.Close = this.Close;
                        vm.$scope.GetChildren = vm.GetChildren;
                        vm.$scope.URLRoot = ENV.MediaURLRoot;
                        vm.$scope.ShortenFileName = vm.ShortenFileName;
                        vm.$scope.ActivateMediaItem = vm.ActivateMediaItem;
                        vm.initAdvancedUpload($scope.inst.$scope);
                        if (!vm.$scope.inst.AuthService.HasAuth(FC.Shared.Enum.Roles.GetAdmins())) {
                            vm.$scope.IsMediaDirCreating = false;
                            vm.$scope.IsCreating = false;
                            vm.$scope.IsDeleting = false;
                            vm.$scope.IsMediaDirEditing = false;
                            vm.$scope.IsMediaDirDeleting = false;
                            vm.$scope.ActiveDir = null;
                            vm.$scope.ServerMsg = "You are not authorized to view this section.";
                        }
                        if (CacheManager.Contains("UserID")) {
                            vm.$scope.UserID = CacheManager.Get("UserID").data;
                        }
                        if (CacheManager.Contains("Token")) {
                            vm.$scope.Token = CacheManager.Get("Token").data;
                        }
                        else {
                            vm.$scope.Token = CacheManager.GetCookieValue("Token");
                        }
                        //window.addEventListener("");
                        window.addEventListener("FCDataLoadingComplete", function (e) {
                            vm.$scope.inst.$scope.IsLoading = false;
                        });
                        window.addEventListener("MediaServiceFileUploaded", function (e) {
                            var state = e["detail"];
                        });
                        this.SetDirectories(vm.$scope);
                        window.addEventListener("iframeSrcChanged", function (r) {
                            var currentNum = vm.MemReg.Get("PrevMediaCount") || 0;
                            if ($scope.ActiveDir) {
                                vm.MediaSvc.HandleUploaded($scope.ActiveDir.DirectoryID).then(function (r) {
                                    vm.$scope.ActiveDir = r.Data;
                                    vm.$scope.IsLoading = false;
                                    if (r.State) {
                                        vm.$scope.State = r.State;
                                    }
                                });
                            }
                        });
                        $scope.getUploadURL = function () {
                            var url = vm.$sce.trustAsResourceUrl($AppConfig.URLRoot + "/API/Media/Upload?dirID=" + vm.$scope.DirectoryID + "&width=" + vm.$scope.ValidationWidth + "&height=" + vm.$scope.ValidationHeight + "&thumb=" + vm.$scope.IsThumbnail + "&Token=" + vm.$scope.Token + "&callback=uploadcb");
                            return url;
                        };
                        vm.$scope.Save = vm.Save;
                        if (!vm.isAdvancedUpload()) {
                            vm.$scope.IsAdvancedUpload = false;
                        }
                        else {
                            vm.$scope.IsAdvancedUpload = true;
                        }
                    }
                    MediaModalController.prototype.DoCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsMediaItemCreating = false;
                        $scope.IsMediaDirDeleting = false;
                        $scope.IsMediaDirEditing = false;
                    };
                    MediaModalController.prototype.handleDroppedFiles = function ($scope, files, $form) {
                        throw new Error("Method not supported");
                        //var vm = this;
                        ////TODO: This is not the way that we want but it works for now. Problem: when files is uploaded and there is a success/failure response from server. My scope seems not to be available.
                        //$scope = $scope.inst.$scope;
                        //if (!$scope.Token) {
                        //    //$scope.DoCancelCRUD($scope);
                        //    var state = new FC.Shared.ViewModels.RepositoryState();
                        //    state.MSG = "You are not authorized to upload images.";
                        //    var r: INT.IServiceResponse<VM.RepositoryState> = { Data: state, Message: "You are not authorized to upload images.", StatusCode: 500, Params: null,State:null };
                        //    window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", { 'detail': r }));
                        //} else {
                        //    this.MediaSvc.UploadFiles(files, vm.$scope.ActiveDir.DirectoryID, vm.$scope.Token).then(function (state) {
                        //        vm.$scope = vm.$scope.inst.$scope;
                        //        vm.$scope.ServerMsg = state.Data.MSG;
                        //        vm.$scope.IsMediaItemCreated = true;
                        //        vm.$scope.IsLoading = true;
                        //        vm.MediaSvc.GetDirByID(vm.$scope.ActiveDir.DirectoryID).then(function (r) {
                        //            vm.$scope.ActiveDir = r.Data;
                        //            vm.$scope.IsLoading = false;
                        //            if (state.Data.SUCCESS == true) {
                        //                vm.$scope.DoCancelCRUD($scope);
                        //                vm.$scope.IsMediaDirCreating = false;
                        //                vm.$scope.IsCreating = false;
                        //                vm.$scope.IsDeleting = false;
                        //                vm.$scope.IsEditing = false;
                        //                vm.$scope.IsMediaDirEditing = false;
                        //                vm.$scope.IsMediaDirDeleting = false;
                        //            } else {
                        //                vm.$scope.IsMediaItemCreated = false;
                        //                vm.$scope.IsMediaDirCreating = false;
                        //                vm.$scope.IsCreating = false;
                        //                vm.$scope.IsDeleting = false;
                        //                vm.$scope.IsEditing = false;
                        //                vm.$scope.IsMediaDirEditing = false;
                        //                vm.$scope.IsMediaDirDeleting = false;
                        //            }
                        //        });
                        //    });
                        //}
                    };
                    MediaModalController.prototype.initAdvancedUpload = function ($scope) {
                        var vm = this;
                        var droppedFiles = new Array();
                        var $form = $('.dropzone');
                        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        })
                            .on('dragover dragenter', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            $form.addClass('is-dragover');
                            return false;
                        })
                            .on('dragleave dragend drop', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            $form.removeClass('is-dragover');
                            return false;
                        }).on('drop', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            $form.trigger('submit');
                            var tmp = e.originalEvent["dataTransfer"]["files"];
                            $.each(tmp, function (k, v) {
                                droppedFiles.push(v);
                            });
                            if (droppedFiles != null && droppedFiles != undefined) {
                                if (droppedFiles.length > 0) {
                                    $scope.IsLoading = true;
                                    vm.handleDroppedFiles($scope, droppedFiles, $form);
                                    e.originalEvent["dataTransfer"]["files"] = null;
                                    droppedFiles = new Array();
                                }
                            }
                            return false;
                        });
                    };
                    MediaModalController.prototype.isAdvancedUpload = function () {
                        var div = document.createElement('div');
                        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
                    };
                    MediaModalController.prototype.ShortenFileName = function (name) {
                        var ext = name.split('.').reverse()[0];
                        var name = name.substr(0, 5) + "..." + ext;
                        return name;
                    };
                    MediaModalController.prototype.Repair = function (arr) {
                        var result = new Array();
                        arr.forEach(function (v, k) {
                            if (v.DirectoryID) {
                                result.push(v);
                            }
                        });
                        return result;
                    };
                    MediaModalController.prototype.GoBack = function ($scope, dir) {
                        $scope = $scope.inst.$scope;
                        var index = $scope.Crumb.length - 2;
                        var lastIndex = $scope.Crumb.length - 1;
                        if (index > -1) {
                            $scope.ActiveDir = $scope.Crumb[index];
                            if ($scope.Crumb[lastIndex]) {
                                delete $scope.Crumb[lastIndex];
                            }
                            $scope.Crumb = $scope.RepairArray($scope.Crumb);
                            if ($scope.Crumb.length > 1 && $scope.ActiveDir.DirectoryID != $scope.RootID) {
                                $scope.ShowFolderUp = true;
                            }
                            else {
                                $scope.ShowFolderUp = false;
                            }
                        }
                    };
                    MediaModalController.prototype.Activate = function ($scope, dir) {
                        var vm = $scope.inst;
                        $scope = $scope.inst.$scope;
                        $scope.ActiveDir = dir;
                        if ($scope.Crumb.indexOf(dir) == -1) {
                            $scope.Crumb.push(dir);
                        }
                        if ($scope.Crumb.length > 1 && $scope.ActiveDir.DirectoryID != $scope.RootID) {
                            $scope.ShowFolderUp = true;
                        }
                        else {
                            $scope.ShowFolderUp = false;
                        }
                        vm.SetDirectories($scope);
                    };
                    MediaModalController.prototype.RegisterEvt = function (evt) {
                        var vm = this;
                        vm.MemReg.Register("ModalMediaSaveEvent", evt);
                    };
                    MediaModalController.prototype.Save = function ($scope) {
                        var evt = $scope.$local[1];
                        if (!evt) {
                            throw new Error("SaveEvent not defined for media browser.");
                        }
                        window.dispatchEvent(new CustomEvent(evt, { "detail": $scope.SelectedMediaItem.MediaID }));
                        $scope.MtModal.cancel();
                    };
                    MediaModalController.prototype.Close = function ($scope) {
                        var vm = this;
                        $scope.$dismiss(vm.Modal);
                    };
                    MediaModalController.prototype.ActivateMediaItem = function ($scope, item) {
                        $scope = $scope.inst.$scope;
                        $scope.SelectedMediaItem = item;
                    };
                    MediaModalController.prototype.SetDirectories = function ($scope) {
                        var rootDir = $scope.RootID;
                        if ($scope.DirectoryID) {
                            rootDir = $scope.DirectoryID;
                        }
                        var vm = this;
                        if (rootDir) {
                            this.MediaSvc.GetDirByID(rootDir).then(function (r) {
                                vm.$scope.IsLoading = false;
                                vm.$scope.ActiveDir = r.Data;
                                if (vm.$scope.Crumb.length == 0) {
                                    vm.$scope.Crumb[0] = $scope.ActiveDir;
                                }
                                vm.$scope.RootDir = $scope.ActiveDir;
                                // vm.$scope.Crumb.push($scope.ActiveDir);
                                if (vm.$scope.ActiveDir.DirectoryID == vm.$scope.RootID) {
                                    vm.$scope.ShowFolderUp = false;
                                }
                                else {
                                    vm.$scope.ShowFolderUp = true;
                                }
                                vm.initAdvancedUpload(vm.$scope);
                            });
                        }
                    };
                    MediaModalController.prototype.GetChildren = function ($scope, id) {
                        $scope.inst.CheckAuth($scope);
                        var vm = $scope.inst;
                        vm.$scope.Directories = new Array();
                        vm.$scope.MediaLoading = true;
                        vm.MediaSvc.GetDirByID(id).then(function (r) {
                            $scope.ActiveDir = r.Data;
                        });
                    };
                    MediaModalController.prototype.DoSubmit = function () {
                        $("#MediaModalForm").submit();
                    };
                    MediaModalController.prototype.DoCancelCRUD = function ($scope) {
                        _super.prototype.DoCancelCRUD.call(this, $scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsMediaItemCreating = false;
                        $scope.IsMediaItemDeleting = false;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                        $scope.IsEditing = false;
                        $scope.SelectedMediaItem = null;
                    };
                    MediaModalController.prototype.DoDeleteMediaDir = function ($scope, dir, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = true;
                        $scope.DirectoryModel = dir;
                    };
                    MediaModalController.prototype.DoSaveDeleteMediaDir = function ($scope, dir, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.inst.MediaSvc.DeleteMediaDir(dir).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsMediaDirDeleted = true;
                                $scope.IsMediaDirDeleting = false;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            else {
                                $scope.IsMediaDirDeleting = true;
                                $scope.IsMediaDirDeleted == false;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            $scope.inst.SetDirectories($scope);
                        });
                    };
                    MediaModalController.prototype.DoDeleteMediaItem = function ($scope, media, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.FileModel = media;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                        $scope.IsMediaItemDeleting = true;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                    };
                    MediaModalController.prototype.DoSaveDelete = function ($scope, media, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        if ($scope.FileModel) {
                            if (!force) {
                                $scope.inst.MediaSvc.DeleteMedia(media).then(function (state) {
                                    $scope.inst.MediaSvc.GetDirByID(media.DirectoryID).then(function (r2) {
                                        $scope.ActiveDir = r2.Data;
                                        $scope.IsLoading = false;
                                        if (state.Data.SUCCESS == true) {
                                            $scope.DoCancelCRUD($scope);
                                            $scope.IsMediaDirCreating = false;
                                            $scope.IsCreating = false;
                                            $scope.ServerMsg = state.Data.MSG;
                                            $scope.IsDeleting = false;
                                            $scope.IsEditing = false;
                                            $scope.IsMediaDirEditing = false;
                                            $scope.IsMediaDirDeleting = false;
                                            $scope.IsMediaItemDeleted = true;
                                        }
                                        else {
                                            $scope.IsMediaItemCreated = false;
                                            $scope.IsMediaDirCreating = false;
                                            $scope.IsCreating = false;
                                            $scope.IsDeleting = false;
                                            $scope.IsEditing = false;
                                            $scope.ServerMsg = state.Data.MSG;
                                            $scope.IsMediaDirEditing = false;
                                            $scope.IsMediaDirDeleting = false;
                                        }
                                    });
                                });
                            }
                            else {
                                throw new Error("Force delete is not implemented yet.");
                            }
                        }
                    };
                    MediaModalController.prototype.DoCreateMediaItem = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        var dirName = dir.Name;
                        $scope.model["DirectoryID"] = $scope.DirectoryID;
                        $("#fileUploader").trigger('click');
                        $("#fileUploader").change(this.DoSubmit);
                    };
                    MediaModalController.prototype.DoSaveCreate = function ($scope, media) {
                        throw new Error("MediaModalController::DoSaveCreate is not implemented");
                    };
                    MediaModalController.prototype.DoEditMediaDir = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsEditing = true;
                        $scope.IsMediaDirEditing = true;
                        $scope.IsMediaDirDeleting = false;
                        $scope.DirectoryModel = dir;
                    };
                    MediaModalController.prototype.DoSaveEditMediaDir = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsEditing = true;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                        $scope.inst.MediaSvc.EditMediaDir(dir).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsMediaDirModified = true;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            else {
                                $scope.IsMediaDirModified = false;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            $scope.inst.SetDirectories($scope);
                            $scope.IsMediaDirCreating = false;
                            $scope.IsCreating = false;
                            $scope.IsDeleting = false;
                            $scope.IsEditing = false;
                            $scope.IsMediaDirEditing = false;
                            $scope.IsMediaDirDeleting = false;
                        });
                    };
                    MediaModalController.prototype.DoCreateMediaDir = function ($scope, dirID) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = true;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsEditing = false;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                    };
                    MediaModalController.prototype.DoSaveCreateMediaDir = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.DirectoryModel = dir;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                        var msg = new FC.Shared.ServiceMessages.MediaDirectoryMsg();
                        var recoveredUserID = CacheManager.Get("UserID");
                        if (recoveredUserID) {
                            msg.Author = recoveredUserID.data;
                            msg.DirectoryName = dir.Name;
                            msg.ParentID = $scope.ActiveDir.DirectoryID;
                            $scope.inst.MediaSvc.CreateDirectory(msg).then(function (r) {
                                if (r.Data.SUCCESS == true) {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsCreating = false;
                                    $scope.IsEditing = false;
                                    $scope.IsDeleting = false;
                                    $scope.IsMediaDirCreated = true;
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsMediaDirCreated = false;
                                }
                            });
                        }
                    };
                    MediaModalController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        '$mdDialog',
                        'FC.Modules.Media.Services.MediaService',
                        '$sce',
                        'local',
                    ];
                    return MediaModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MediaModalController = MediaModalController;
            })(Controllers = Media.Controllers || (Media.Controllers = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
MediaModule.GetApplication().RegisterController("FC.Modules.Media.Controllers.MediaModalController", FC.Modules.Media.Controllers.MediaModalController);
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Directives;
            (function (Directives) {
                var Crumb = (function () {
                    function Crumb() {
                    }
                    return Crumb;
                }());
                Directives.Crumb = Crumb;
                var MediaBrowserDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function MediaBrowserDirective($route, $routeParams, $location, $http, $q, $compile) {
                        this.template = '';
                        this.templateUrl = '/Scripts/Modules/Media/Views/media-browser.html';
                        this.controller = FC.Modules.Media.Controllers.MediaModalController;
                        this.controllerAs = 'vm';
                        this.replace = true;
                        var vm = this;
                        vm.$http = $http;
                        vm.$q = $q;
                        vm.MediaSvc = new FC.Modules.Media.Services.MediaService(vm.$http, vm.$q);
                        MediaBrowserDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                            vm._element = element;
                            vm._attrs = attrs;
                        };
                    }
                    MediaBrowserDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                            return new MediaBrowserDirective($route, $routeParams, $location, $http, $q, $compile);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
                        return directive;
                    };
                    return MediaBrowserDirective;
                }());
                Directives.MediaBrowserDirective = MediaBrowserDirective;
                Application.app.directive('filebrowser', FC.Modules.Media.Directives.MediaBrowserDirective.factory());
            })(Directives = Media.Directives || (Media.Directives = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Services;
            (function (Services) {
                var MediaService = (function (_super) {
                    __extends(MediaService, _super);
                    function MediaService(http, q) {
                        _super.call(this, http, q);
                        this.Token = CacheManager.Get('Token');
                    }
                    MediaService.prototype.GetList = function () {
                        return this.Get('/API/Media/GetItemList');
                    };
                    MediaService.prototype.GetRoot = function () {
                        return this.Get('/API/Media/GetRoot');
                    };
                    MediaService.prototype.GetDirectories = function () {
                        return this.Get('/API/Media/GetDirectories');
                    };
                    MediaService.prototype.GetByID = function (id) {
                        return this.Get('/API/Media/GetByID?id=' + id);
                    };
                    MediaService.prototype.GetDirByID = function (id) {
                        return this.Get('/API/Media/GetDirByID?id=' + id);
                    };
                    MediaService.prototype.HandleUploaded = function (id) {
                        var g = this.Get('/API/Media/HandleUploaded?id=' + id);
                        return g;
                    };
                    MediaService.prototype.GetDirectoryMedia = function (id) {
                        return this.Get('/API/Media/GetDirectoryMedia?id=' + id);
                    };
                    MediaService.prototype.GetAllChildren = function (parentId) {
                        return this.Get('/API/Media/GetChildren?id=' + parentId);
                    };
                    MediaService.prototype.CreateDirectory = function (dir) {
                        var result = null;
                        result = this.Post('/API/Media/CreateDirectory', new FC.Shared.Models.ServiceMessage(dir));
                        return result;
                    };
                    MediaService.prototype.UploadFiles = function (files, dirID, token, width, height, thumb) {
                        if (width === void 0) { width = 0; }
                        if (height === void 0) { height = 0; }
                        if (thumb === void 0) { thumb = false; }
                        var result = this.Upload('/API/Media/Upload/?dirID=' + dirID + '&width=' + width + '&height=' + height + '&thumb=' + thumb + '&token=' + token, files);
                        result.then(function (r) {
                            window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", { 'detail': r }));
                        });
                        return result;
                    };
                    MediaService.prototype.DeleteMedia = function (media) {
                        var result = this.Get('/API/Media/DeleteMedia/?mediaID=' + media.MediaID);
                        return result;
                    };
                    MediaService.prototype.DeleteMediaDir = function (mediaDir) {
                        var result = this.Get('/API/Media/DeleteMediaDir/?id=' + mediaDir.DirectoryID);
                        return result;
                    };
                    MediaService.prototype.ForceDeleteMediaDir = function (mediaDir) {
                        var result = this.Get('/API/Media/ForceDeleteDirectory/?' + mediaDir.DirectoryID);
                        return result;
                    };
                    MediaService.prototype.EditMediaDir = function (mediaDir) {
                        var result = this.Post('/API/Media/EditDirectory', new FC.Shared.Models.ServiceMessage(mediaDir));
                        return result;
                    };
                    MediaService.$inject = ['$http', '$q'];
                    return MediaService;
                }(FC.Core.ServiceBase));
                Services.MediaService = MediaService;
            })(Services = Media.Services || (Media.Services = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
MediaModule.GetApplication().app.service('FC.Modules.Media.Services.MediaService', FC.Modules.Media.Services.MediaService);
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
                    function MenuController($http, $q, $scope, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        var vm = this;
                        this.$scope.inst = this;
                    }
                    MenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return MenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuController = MenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Menu.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var MenuCRUDController = (function (_super) {
                    __extends(MenuCRUDController, _super);
                    function MenuCRUDController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setData();
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.$sce = $sce;
                        vm.$scope.$location = $location;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.FormID = '150F44C7-CD67-49D3-B1C5-4C8BE7157F96';
                        vm.$scope.IsCreating = true;
                        vm.RecoverModel(vm.$scope.model, $scope);
                        vm.$scope.model = vm.$scope.RecoverModel(vm.$scope.model, vm.$scope);
                        if (vm.$scope.model == null) {
                            vm.$scope.model = new FC.Shared.Models.MenuSection();
                        }
                        if (vm.$routeParams['menuitemid'] != null || vm.$routeParams['menusectionid'] != null) {
                            vm.$scope.IsEditing = true;
                            vm.$scope.IsCreating = false;
                            if (vm.$routeParams['menuitemid'] != null) {
                                vm.MenuItemService.GetByID(vm.$routeParams['menuitemid']).then(function (r) {
                                    vm.$scope.MenuItemModel = r.Data;
                                    vm.$scope.model = vm.$scope.MenuItemModel;
                                });
                            }
                            if (vm.$routeParams['menusectionid']) {
                                vm.MenuSectionService.GetByID(vm.$routeParams['menusectionid']).then(function (r) {
                                    vm.$scope.MenuSectionModel = r.Data;
                                    vm.$scope.model = vm.$scope.MenuSectionModel;
                                });
                            }
                        }
                        else {
                            vm.$scope.IsCreating = true;
                            vm.$scope.IsEditing = false;
                        }
                        vm.MenuSectionService.GetAll().then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                        });
                        vm.MenuItemService.GetAll().then(function (r) {
                            vm.$scope.MenuItems = r.Data;
                        });
                    }
                    MenuCRUDController.prototype.DoSave = function (action, sectionOrItem) {
                        var vm = this;
                        if (sectionOrItem == "section") {
                            if (action == "c") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                            if (action == "e") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                        }
                        if (sectionOrItem == "item") {
                            if (action == "c") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                            if (action == "e") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                        }
                        vm.FinishForm(vm.$scope);
                    };
                    MenuCRUDController.prototype.setData = function () {
                        var vm = this;
                        if (vm.$routeParams['menuid']) {
                            vm.MenuSectionService.GetByID(vm.$routeParams['menuid']).then(function (r) {
                                vm.$scope.model = r.Data;
                            });
                        }
                        else {
                            vm.$scope.model = new FC.Shared.Models.MenuSection();
                        }
                    };
                    //public ActiveGenreID: number;
                    MenuCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce"
                    ];
                    return MenuCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuCRUDController = MenuCRUDController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuCRUDController", FC.Modules.Menu.Controllers.MenuCRUDController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../Menu.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var MenuOverviewController = (function (_super) {
                    __extends(MenuOverviewController, _super);
                    function MenuOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce, MenuSectionService, MenuItemService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.MenuSectionService = MenuSectionService;
                        vm.MenuItemService = MenuItemService;
                        vm.$scope.IsLoading = true;
                        this.$scope.IsAuthorized = false;
                        this.HasAuth(['Developer', 'Admin']).then(function (r) {
                            if (r == true) {
                                vm.$scope.IsAuthorized = true;
                            }
                            else {
                                vm.$scope.IsAuthorized = false;
                                vm.ShowLoginModal();
                            }
                        });
                        window.addEventListener("REFRESH", function (r) {
                            vm.setMenu();
                        });
                        if (vm.$routeParams['sectionid']) {
                            vm.MenuItemService.GetBySectionID(vm.$routeParams['sectionid']).then(function (r) {
                                vm.$scope.MenuItems = r.Data;
                            });
                        }
                        else {
                            this.setMenu();
                        }
                    }
                    MenuOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.MenuSectionService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.MenuSections = r.Data;
                            vm.MenuSectionService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    MenuOverviewController.prototype.setMenu = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.MenuSectionService.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.MenuSectionService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    MenuOverviewController.prototype.DoDelete = function (section) {
                        var vm = this;
                        vm.$scope.model = section;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope);
                    };
                    MenuOverviewController.prototype.DoDeleteMenuItem = function (item) {
                        var vm = this;
                        vm.$scope.model = item;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope);
                    };
                    //public ActiveCountryID: number;
                    MenuOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce",
                        "FC.Modules.Menu.Services.MenuSectionService",
                        "FC.Modules.Menu.Services.MenuItemService"
                    ];
                    return MenuOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuOverviewController = MenuOverviewController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuOverviewController", FC.Modules.Menu.Controllers.MenuOverviewController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
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
                var QuickMenuController = (function (_super) {
                    __extends(QuickMenuController, _super);
                    function QuickMenuController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        var vm = this;
                        this.$scope.inst = this;
                        this.QuickMenuService = new Menu.Services.QuickMenuService($http, $q);
                    }
                    QuickMenuController.prototype.HandleMIClick = function (clickStr) {
                        var vm = this;
                        clickStr = clickStr.replace('$event.preventDefault();', '');
                        clickStr = clickStr.replace('vm.', '');
                        clickStr = clickStr.replace('()', '');
                        clickStr = clickStr.replace(';', '');
                        vm[clickStr]();
                    };
                    QuickMenuController.prototype.init = function (pageKey) {
                        var vm = this;
                        vm.QuickMenuService.GetMenu(pageKey).then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                        });
                    };
                    QuickMenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return QuickMenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.QuickMenuController = QuickMenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.QuickMenuController", FC.Modules.Menu.Controllers.QuickMenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Services;
            (function (Services) {
                var MenuItemService = (function (_super) {
                    __extends(MenuItemService, _super);
                    function MenuItemService(http, q) {
                        _super.call(this, http, q);
                    }
                    MenuItemService.prototype.GetList = function () {
                        return this.Get('/API/Menu/GetItemList');
                    };
                    MenuItemService.prototype.Search = function (keyword) {
                        return this.Get('/API/Menu/GetByPartialName?name=' + keyword);
                    };
                    MenuItemService.prototype.GetBySectionID = function (sectionID) {
                        return this.Get('/API/Menu/GetBySectionID?sectionID=' + sectionID);
                    };
                    MenuItemService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Menu/GetPagedMenuItem?size=' + size + '&page=' + page);
                    };
                    MenuItemService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetSortedMenuItem?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    MenuItemService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    MenuItemService.prototype.GetAll = function () {
                        return this.Get('/API/Menu/GetAllItems');
                    };
                    MenuItemService.prototype.GetByID = function (id) {
                        return this.Get('/API/Menu/GetMenuItemByID?&id=' + id);
                    };
                    MenuItemService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Menu/GetByPartialName?&name=' + name);
                    };
                    MenuItemService.prototype.Create = function (model) {
                        var result = this.Post('/API/Menu/CreateMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.Update = function (model) {
                        var result = this.Post('/API/Menu/UpdateMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Menu/DeleteMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Menu/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.$inject = ['$http', '$q'];
                    return MenuItemService;
                }(FC.Core.ServiceBase));
                Services.MenuItemService = MenuItemService;
                MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuItemService', FC.Modules.Menu.Services.MenuItemService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Services;
            (function (Services) {
                var MenuSectionService = (function (_super) {
                    __extends(MenuSectionService, _super);
                    function MenuSectionService(http, q) {
                        _super.call(this, http, q);
                    }
                    MenuSectionService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    MenuSectionService.prototype.Search = function (keyword) {
                        return this.Get('/API/Menu/GetByPartialName?name=' + keyword);
                    };
                    MenuSectionService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Menu/GetPaged?size=' + size + '&page=' + page);
                    };
                    MenuSectionService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    MenuSectionService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    MenuSectionService.prototype.GetAll = function () {
                        return this.Get('/API/Menu/GetAllSections');
                    };
                    MenuSectionService.prototype.GetByID = function (id) {
                        return this.Get('/API/Menu/GetByID?&id=' + id);
                    };
                    MenuSectionService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Menu/GetByPartialName?&name=' + name);
                    };
                    MenuSectionService.prototype.Create = function (model) {
                        var result = this.Post('/API/Menu/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.Update = function (model) {
                        var result = this.Post('/API/Menu/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Menu/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Menu/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.$inject = ['$http', '$q'];
                    return MenuSectionService;
                }(FC.Core.ServiceBase));
                Services.MenuSectionService = MenuSectionService;
                MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuSectionService', FC.Modules.Menu.Services.MenuSectionService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Services;
            (function (Services) {
                var QuickMenuService = (function (_super) {
                    __extends(QuickMenuService, _super);
                    function QuickMenuService(http, q) {
                        _super.call(this, http, q);
                        this.rootGenres = new Array();
                    }
                    QuickMenuService.prototype.GetList = function () {
                        return this.Get('/API/Menu/GetList');
                    };
                    QuickMenuService.prototype.GetMenu = function (pageKey) {
                        if (pageKey === void 0) { pageKey = ''; }
                        if (pageKey == null) {
                            pageKey = '';
                        }
                        return this.Get('/API/Menu/GetMenu?pageKey=' + pageKey);
                    };
                    QuickMenuService.$inject = ['$http', '$q'];
                    return QuickMenuService;
                }(FC.Core.ServiceBase));
                Services.QuickMenuService = QuickMenuService;
                GenresModule.GetApplication().app.service('FC.Modules.Menu.Services.QuickMenuService', FC.Modules.Menu.Services.QuickMenuService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
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
                    this.$Application.AddRoute("/news", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/detail/:newsid", "/Scripts/Modules/News/Views/detail.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/delete/:newsid", "/Scripts/Modules/News/Views/delete.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
                    this.$Application.AddRoute("/news/:page", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/:page/:year/:month", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/create/:step", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
                    this.$Application.AddRoute("/news/edit/:newsid", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
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
            var UNews = (function () {
                function UNews() {
                }
                return UNews;
            }());
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
                    function NewsController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, NewsSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope.inst = this;
                        this.$scope = $scope;
                        this.NewsSvc = NewsSvc;
                        this.ActiveNewsID = $routeParams["newsId"];
                        this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                        this._Init();
                    }
                    NewsController.prototype._Init = function () {
                        var vm = this;
                        this.UserGenres = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.UserGenres = this.CacheManager.GetStorage("user-genres").data;
                        }
                        vm.NewsSvc.GetFilteredNews(vm.UserGenres).then(function (cd) {
                            //vm.$scope.News = cd.Data;
                        });
                    };
                    NewsController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "FC.Modules.News.Services.NewsService"
                    ];
                    return NewsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsController = NewsController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsController", FC.Modules.News.Controllers.NewsController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var NewsCRUDController = (function (_super) {
                    __extends(NewsCRUDController, _super);
                    function NewsCRUDController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setData();
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.$sce = $sce;
                        vm.$scope.$location = $location;
                        vm.$scope.Date = new Date();
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.FormID = 'A96CA9E2-D76B-4443-A35B-F9D54EADC2E0';
                        vm.$scope.IsCreating = true;
                        vm.RecoverModel(vm.$scope.model, $scope);
                        vm.$scope.model = vm.$scope.RecoverModel(vm.$scope.model, vm.$scope);
                        if (vm.$scope.model == null) {
                            vm.$scope.model = new FC.Shared.Models.UNews();
                        }
                        vm.$scope.model.SourceName = "Festival Calendar";
                        vm.$scope.model.SourceURL = "http://www.festival-calendar.com";
                        window.addEventListener('DateChanged', this.DateChanged);
                        window.addEventListener('NewsImageSaved', function (e) {
                            vm.$scope.model.ThumbnailID = e.detail;
                        });
                        window.addEventListener("MODAL_CLOSE_SUCCESS", function (r) {
                            vm.$scope.$location.path('/news/');
                        });
                    }
                    NewsCRUDController.prototype.DoSave = function (action) {
                        var vm = this;
                        if (action == "c") {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                        }
                        if (action == "e") {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                        }
                        vm.FinishForm(vm.$scope);
                    };
                    NewsCRUDController.prototype.NewsImageSaved = function (e) {
                        this.$scope.model.ThumbnailID = e.detail;
                    };
                    NewsCRUDController.prototype.DateChanged = function (e) {
                        var vm = this;
                        var value = new Date(e.detail);
                        this.$scope.Date = value;
                    };
                    NewsCRUDController.prototype.setData = function () {
                        var vm = this;
                        if (vm.$routeParams['newsid']) {
                            vm.NewsService.GetNewsById(vm.$routeParams['newsid']).then(function (r) {
                                vm.$scope.model = r.Data;
                            });
                        }
                        else {
                            vm.$scope.model = new FC.Shared.Models.UNews();
                        }
                    };
                    //public ActiveGenreID: number;
                    NewsCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce"
                    ];
                    return NewsCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsCRUDController = NewsCRUDController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsCRUDController", FC.Modules.News.Controllers.NewsCRUDController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var SCTRL = FC.Shared.Controllers;
                var NewsDialogController = (function (_super) {
                    __extends(NewsDialogController, _super);
                    function NewsDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.NewsService = new FC.Modules.News.Services.NewsService($http, $q);
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = 'B6317654-30F4-4091-B0BE-E2E3568178D0';
                        vm.$scope.inst = this;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope = $scope;
                        vm.$scope.PageNum = 0;
                        vm.$scope.DoSaveEdit = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveDelete = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Delete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveForceDelete = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.ForceDelete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveCreate = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Create, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoDelete = this.DoDelete;
                        //vm.determineDetailType($routeParams, $route);
                        //vm.LogoSaveListener();
                        vm.RegisterModel(vm.$scope);
                    }
                    NewsDialogController.prototype.ShowMore = function ($scope) {
                        $scope.PageNum++;
                    };
                    NewsDialogController.prototype.RegisterModel = function ($scope) {
                        $scope.News = new Array();
                        var m = (new Date().getMonth() + 1).toString();
                        var y = (new Date().getFullYear()).toString();
                        this.NewsService.GetPaged(0, m, y).then(function (r) {
                            $scope.News = r.Data;
                        });
                    };
                    NewsDialogController.prototype.DoCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                    };
                    NewsDialogController.prototype.DoEdit = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsEditing = true;
                    };
                    NewsDialogController.prototype.DoDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsDeleting = true;
                    };
                    NewsDialogController.prototype.Close = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.MtModal.hide();
                    };
                    NewsDialogController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService"
                    ];
                    return NewsDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsDialogController = NewsDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsDialogController", FC.Modules.News.Controllers.NewsDialogController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var NewsOverviewController = (function (_super) {
                    __extends(NewsOverviewController, _super);
                    function NewsOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.$sce = $sce;
                        vm.$scope.META.PageTitle = "News";
                        vm.$scope.META.PageDesc = "News overview";
                        vm.$scope.META.PageIMG = "";
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.$location = $location;
                        if ($routeParams["month"] && $routeParams["year"]) {
                            vm.$scope.Date = new Date($routeParams["year"], parseInt($routeParams["month"]) - 1);
                        }
                        vm.$scope.IsLoading = true;
                        this.setData();
                        this.setDetailData();
                        window.addEventListener('DateChanged', function (e) {
                            vm.DateChanged(e);
                            vm.setData();
                        });
                    }
                    NewsOverviewController.prototype.DateChanged = function (options) {
                        var vm = this;
                        var value = new Date(options.detail);
                        this.$scope.Date = value;
                        this.$scope.ActiveYear = value.getFullYear();
                        this.$scope.ActiveMonth = value.getMonth() + 1;
                        this.$scope.PageNum = 1;
                        this.$scope.$location.url("/news?page=" + this.GetPageNum() + "&year=" + this.$scope.ActiveYear + "&month=" + this.$scope.ActiveMonth);
                    };
                    NewsOverviewController.prototype.setDetailData = function () {
                        var vm = this;
                        if (vm.$routeParams["newsid"]) {
                            vm.NewsService.GetNewsById(vm.$routeParams["newsid"]).then(function (r) {
                                vm.$scope.Detail = r.Data;
                            });
                        }
                    };
                    NewsOverviewController.prototype.DoDelete = function () {
                        var vm = this;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                    };
                    NewsOverviewController.prototype.setData = function () {
                        var vm = this;
                        var index = 0;
                        vm.NewsService.GetPaged(vm.$scope.PageNum, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r) {
                            vm.$scope.model = r.Data;
                            vm.SplitToColData(3, r.Data);
                            var p = vm.GetPageNum() + 1;
                            vm.NewsService.GetPagedCount(p, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/news?page=" + (p) + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/news?page=" + vm.GetPageNum() + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                                }
                            });
                            index++;
                        });
                    };
                    //public ActiveGenreID: number;
                    NewsOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce",
                    ];
                    return NewsOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsOverviewController = NewsOverviewController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsOverviewController", FC.Modules.News.Controllers.NewsOverviewController);
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
        (function (News_2) {
            var Services;
            (function (Services) {
                var NewsService = (function (_super) {
                    __extends(NewsService, _super);
                    function NewsService(http, q) {
                        _super.call(this, http, q);
                    }
                    NewsService.prototype.GetList = function () {
                        return this.Get('/API/News/GetList');
                    };
                    NewsService.prototype.GetNews = function (genreId) {
                        return this.Get('/API/News/GetNews/?&genreId=' + genreId);
                    };
                    NewsService.prototype.GetNewsById = function (newsId) {
                        return this.Get('/API/News/GetById/?&id=' + newsId);
                    };
                    NewsService.prototype.GetPaged = function (page, month, year) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/News/GetPaged?&page=' + page + '&month=' + month + '&year=' + year);
                    };
                    NewsService.prototype.GetPagedCount = function (page, month, year) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/News/GetPagedCount?&page=' + page + '&month=' + month + '&year=' + year);
                    };
                    NewsService.prototype.GetFilteredNews = function (genres) {
                        var filter = new FC.Shared.Models.NewsFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = []; //prepare for future usage..
                        return this.Post('/API/News/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    NewsService.prototype.Create = function (News) {
                        return this.Post('/API/News/Create', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.Update = function (News) {
                        return this.Post('/API/News/Update', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.Delete = function (News) {
                        return this.Post('/API/News/Delete', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.ForceDelete = function (News) {
                        return this.Post('/API/News/ForceDelete', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.$inject = ['$http', '$q'];
                    return NewsService;
                }(FC.Core.ServiceBase));
                Services.NewsService = NewsService;
                NewsModule.GetApplication().app.service('FC.Modules.News.Services.NewsService', FC.Modules.News.Services.NewsService);
            })(Services = News_2.Services || (News_2.Services = {}));
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
                    RatesService.prototype.GetList = function () {
                        throw new Error("RatesService.GetList() is not available.");
                    };
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
                        this.Get('/API/News/Regenerate/');
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
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var AppUserSession = (function () {
                function AppUserSession() {
                }
                return AppUserSession;
            }());
            Models.AppUserSession = AppUserSession;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
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
                    function RatingController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, RatingService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.RatingSvc = RatingService;
                        this.$scope = $scope;
                        this.$scope.Rating = FC.Shared.ViewModels.RatingVm;
                    }
                    RatingController.prototype.GetRates = function (contentItemID, type) {
                        var vm = this;
                        this.RatingSvc.GetRate(contentItemID, type).then(function (r) {
                            vm.$scope.Rating = r.Data;
                        });
                    };
                    RatingController.prototype.Rate = function (contentItemID, type, index) {
                        var vm = this;
                        if (index <= 5) {
                            this.RatingSvc.Rate(contentItemID, type, index).then(function () {
                                vm.GetRates(contentItemID, type);
                            });
                        }
                    };
                    RatingController.$inject = [
                        "$http",
                        "$q",
                        "$scope",
                        "$route",
                        "$routeParams",
                        "$location",
                        "$mdDialog",
                        "FC.Modules.Rating.Services.RatingService",
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
                    function RatingDirective($route, $routeParams, $location) {
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
                                }
                            });
                        };
                    }
                    RatingDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location) {
                            return new RatingDirective($route, $routeParams, $location);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location'];
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
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Services;
            (function (Services) {
                var RatingService = (function (_super) {
                    __extends(RatingService, _super);
                    function RatingService(http, q) {
                        _super.call(this, http, q);
                    }
                    RatingService.prototype.GetList = function () {
                        throw new Error("Rating service GetList is not available");
                    };
                    RatingService.prototype.GetRate = function (ContentItemID, ContentItemType) {
                        return this.Get('/API/Rating/GetRating?&contentItemID=' + ContentItemID + '&type=' + ContentItemType);
                    };
                    RatingService.prototype.Rate = function (ContentItemID, ContentItemType, CreditAmmount) {
                        var msg = new FC.Shared.ServiceMessages.RatingMsg();
                        if (CreditAmmount <= 5) {
                            msg.CreditAmmount = CreditAmmount;
                            msg.ContentType = ContentItemType;
                            msg.ContentItemID = ContentItemID;
                            return this.Post('/API/Rating/Rate', new FC.Shared.Models.ServiceMessage(msg));
                        }
                        else {
                            return null;
                        }
                    };
                    RatingService.$inject = ['$http', '$q'];
                    return RatingService;
                }(FC.Core.ServiceBase));
                Services.RatingService = RatingService;
            })(Services = Rating.Services || (Rating.Services = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
RatingModule.GetApplication().app.service('FC.Modules.Rating.Services.RatingService', FC.Modules.Rating.Services.RatingService);
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
                    function SearchController($mdDialog, $http, $q, $scope, $routeParams, $location, SearchService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.SearchService = new FC.Modules.Search.Services.SearchService($http, $q);
                        this.initializeScope($scope);
                    }
                    SearchController.prototype.initializeScope = function ($scope) {
                        this.$scope = $scope;
                        this.$scope.DoSearch = this.DoSearch;
                        this.$scope.OpenModal = this.OpenModal;
                        //this.$scope.GenreData = GenreData;
                        //this.$scope.CountryData = CountryData;
                    };
                    SearchController.prototype.OpenModal = function (ctr) {
                        //var modalInstance = ctr.$uibModal.open({
                        //    animation:true,
                        //    templateUrl: '/Scripts/Modules/Search/Views/searchresults.html',
                        //    controller: 'FC.Modules.Search.Controllers.SearchController',
                        //    controllerAs: 'vm',
                        //    size: 400,
                        //    resolve: {
                        //        items: function () {
                        //            return null;
                        //        }
                        //    }
                        //});
                    };
                    SearchController.prototype.DoChangeSearch = function () {
                    };
                    SearchController.prototype.DoSearch = function () {
                        var vm = this;
                        var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
                        SearchFilter.Keyword = vm.$scope.Keyword;
                        if (SearchFilter.Keyword.length > 2) {
                            vm.$scope.IsLoading = true;
                            vm.$scope.IsSearching = true;
                            vm.SearchService.Search(SearchFilter).then(function (response) {
                                if (response.Data) {
                                    var e = new CustomEvent("SearchComplete", { detail: response.Data });
                                    window.dispatchEvent(e);
                                }
                                else {
                                    var e = new CustomEvent("SearchCompleteNoResult", { detail: response.Data });
                                    window.dispatchEvent(e);
                                }
                                vm.$scope.IsLoading = false;
                                vm.$scope.Completed = true;
                            }).catch(function () {
                                window.dispatchEvent(new CustomEvent("SearchCompletedWithNoResults"));
                            });
                        }
                        else if (SearchFilter.Keyword == null || SearchFilter.Keyword == undefined) {
                            var e = new CustomEvent("SearchReset");
                            window.dispatchEvent(e);
                        }
                        else if (SearchFilter.Keyword.length == 0) {
                            var e = new CustomEvent("SearchReset");
                            window.dispatchEvent(e);
                        }
                    };
                    SearchController.$inject = [
                        '$mdDialog',
                        '$http',
                        '$q',
                        '$scope',
                        '$routeParams',
                        '$location'
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
                    SearchService.prototype.GetList = function () {
                        throw new Error("SearchService GetList is not available");
                    };
                    SearchService.prototype.Search = function (filter) {
                        return this.Post('/API/Search/Search', new FC.Shared.Models.ServiceMessage(filter));
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
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Social;
        (function (Social_1) {
            var Social = (function () {
                function Social(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Social.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Social;
            }());
            Social_1.Social = Social;
        })(Social = Modules.Social || (Modules.Social = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var SocialModule = new FC.Modules.Social.Social(angular.module('FC.Modules.Social', ApplicationDependencies), Application);
///<reference path="../../Core/FC.ts"/>
///<reference path="../Social.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/Validation/Validation.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Social;
        (function (Social) {
            var Controllers;
            (function (Controllers) {
                var CORE = FC.Core;
                var SocialDialogController = (function (_super) {
                    __extends(SocialDialogController, _super);
                    function SocialDialogController($http, $q, $uibModal, $scope, $mdDialog, $route, $routeParams, $location, $profiles, $genericId, $contentType, UrlManagerService, $sce, $socialService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.$location = $location;
                        vm.$scope.SocialProfiles = $profiles;
                        vm.$scope.FormID = "415F7EA0-2A5B-48A0-B52B-C3EF5DE2A97D";
                        vm.$scope = $scope;
                        vm.$scope.IsCreating = false;
                        vm.$genericID = $genericId;
                        vm.$contentType = $contentType;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.SocialProfiles = $profiles;
                        var v = FC.Shared.Util.Validator.GetInstance();
                        vm.SocialService = $socialService;
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.SocialService, vm.$scope);
                        };
                        vm.$scope.DoSaveCreate = function () {
                            vm.$scope.model.GenericID = vm.$genericID;
                            vm.$scope.model.ContentType = vm.$contentType;
                            //@arg "CreateModel" overrides the default $scope["model"] because services requires a service message instead of DbEntity.
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.SocialService, vm.$scope);
                        };
                        vm.$scope.DoSaveDelete = function () {
                            vm.$scope.model = arguments[0];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.SocialService, vm.$scope);
                        };
                        vm.$scope.DoSaveForceDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.ForceDelete, FC.Shared.Controllers.ServiceType.SocialService, vm.$scope);
                        };
                        this.setData();
                    }
                    SocialDialogController.prototype.listen = function () {
                        var vm = this;
                        window.addEventListener("REFRESH", function () {
                            vm.setData();
                        });
                    };
                    SocialDialogController.prototype.SetRule = function () {
                        var vm = this;
                        var rule = new CORE.Validation.ValidationRuleItem();
                        switch (vm.$scope.model.ProfileTypeID.toUpperCase()) {
                            case "F090893B-A2F5-479A-A1C7-6221EED54DC0":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.InstagramURL);
                                break;
                            case "33105BA5-0A40-4C70-852C-BF5F89A662C4":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.LinkedInURL);
                                break;
                            case "C1036074-3FA5-4ACD-9CF5-8CFF8DB1337E":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.PinterestURL);
                                break;
                            case "B7C6367D-3DF7-491E-98BA-F51E1D70B41B":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.GoogleURL);
                                break;
                            case "0336CDB3-5CAC-4F6D-90F0-1B1378EA3990":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.SpotifyURL);
                                break;
                            case "26C9840B-4496-457D-BFAF-1832C28EF291":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.DeezerURL);
                                break;
                            case "67E9D8C7-7266-41A1-9275-3239FA25D04B":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.YoutubeURL);
                                break;
                            case "D80118C6-4BEE-41DC-8F87-6E9BAE13DA49":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.MySpaceURL);
                                break;
                            case "8A5C85BC-A5C2-4EE2-B1AF-985B183B2C92":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.FacebookURL);
                                break;
                            case "06BA2AEA-8059-4E0E-AAA5-DA28CCE9988F":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.SoundcloudURL);
                                break;
                            case "26FE0A26-7D52-440C-B0A8-31615D508A87":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.TwitterURL);
                                break;
                            case "0E8AE414-BF77-464A-8DCE-2983AB9F6E59":
                                rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Website);
                                break;
                            default:
                                rule.Rule = new CORE.Validation.Validation(FC.Core.Validation.ValidationRule.Any);
                                break;
                        }
                        rule.FieldName = "URL";
                        this.AddValidationRule(rule);
                    };
                    SocialDialogController.prototype.DoCreate = function (step) {
                        var vm = this;
                        vm.$scope.IsCreating = true;
                        vm.$scope.model = new FC.Shared.Models.SocialProfile();
                        vm.$scope.model.GenericID = vm.$scope.GenericID;
                        vm.$scope.model.ContentType = vm.$scope.ContentType;
                        debugger;
                        this.$scope.WizardCreateStep = step;
                    };
                    SocialDialogController.prototype.setData = function () {
                        var vm = this;
                        vm.SocialService.GetAllTypes().then(function (r) {
                            var sysProfileTypes = new FC.List(r.Data);
                            var currentProfileTypes = new FC.List();
                            vm.$scope.SocialProfiles.forEach(function (value, index) {
                                currentProfileTypes.push(value.ProfileType);
                            });
                            vm.$scope.ProfileTypes = sysProfileTypes.RemoveRange(currentProfileTypes, "SocialProfileTypeID");
                        });
                    };
                    SocialDialogController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        'profiles',
                        'genericId',
                        'contentType',
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Social.Services.SocialService"
                    ];
                    return SocialDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SocialDialogController = SocialDialogController;
                SocialModule.GetApplication().RegisterController("FC.Modules.Social.Controllers.SocialDialogController", FC.Modules.Social.Controllers.SocialDialogController);
            })(Controllers = Social.Controllers || (Social.Controllers = {}));
        })(Social = Modules.Social || (Modules.Social = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Social;
        (function (Social) {
            var Services;
            (function (Services) {
                var MODELS = FC.Shared.Models;
                var SocialService = (function (_super) {
                    __extends(SocialService, _super);
                    function SocialService(http, q) {
                        _super.call(this, http, q);
                    }
                    SocialService.prototype.GetList = function () {
                        return this.Get('/API/Social/GetList');
                    };
                    SocialService.prototype.GetAllTypes = function () {
                        return this.Get("/API/Social/GetAllTypes");
                    };
                    SocialService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        throw new Error("SocialService.GetPagedCount is not implemented yet.");
                    };
                    SocialService.prototype.GetAll = function () {
                        return this.Get('/API/Social/GetAll');
                    };
                    SocialService.prototype.GetByID = function (id) {
                        return this.Get('/API/Social/GetByID?&id=' + id);
                    };
                    SocialService.prototype.GetByContentID = function (id) {
                        return this.Get('/API/Social/GetByContentID?&id=' + id);
                    };
                    SocialService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Social/GetByPartialName?&name=' + name);
                    };
                    SocialService.prototype.Create = function (msg) {
                        var result = this.Post('/API/Social/Create', new MODELS.ServiceMessage(msg));
                        return result;
                    };
                    SocialService.prototype.Update = function (model) {
                        var result = this.Post('/API/Social/Update', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Social/Delete', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Social/ForceDelete', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.$inject = ['$http', '$q'];
                    return SocialService;
                }(FC.Core.ServiceBase));
                Services.SocialService = SocialService;
                SocialModule.GetApplication().app.service('FC.Modules.Social.Services.SocialService', FC.Modules.Social.Services.SocialService);
            })(Services = Social.Services || (Social.Services = {}));
        })(Social = Modules.Social || (Modules.Social = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Ticket = (function () {
                function Ticket() {
                }
                return Ticket;
            }());
            Models.Ticket = Ticket;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Ticket;
        (function (Ticket_1) {
            var Ticket = (function () {
                function Ticket(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Ticket.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Ticket.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Ticket;
            }());
            Ticket_1.Ticket = Ticket;
        })(Ticket = Modules.Ticket || (Modules.Ticket = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var TicketModule = new FC.Modules.Ticket.Ticket(angular.module('FC.Modules.Ticket', ApplicationDependencies), Application);
///<reference path="../Ticket.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Ticket;
        (function (Ticket_2) {
            var Services;
            (function (Services) {
                var TicketService = (function (_super) {
                    __extends(TicketService, _super);
                    function TicketService(http, q) {
                        _super.call(this, http, q);
                    }
                    TicketService.prototype.GetList = function () {
                        return this.Get('/API/Ticket/GetList');
                    };
                    TicketService.prototype.GetTicket = function (TicketId) {
                        return this.Get('/API/Ticket/GetByID?&id=' + TicketId);
                    };
                    TicketService.prototype.GetByFestival = function (festivalID) {
                        return this.Get('/API/Ticket/GetByFestival?&festivalID=' + festivalID);
                    };
                    TicketService.prototype.Create = function (Ticket) {
                        return this.Post('/API/Ticket/Create', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.Update = function (Ticket) {
                        return this.Post('/API/Ticket/Update', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.Delete = function (Ticket) {
                        return this.Post('/API/Ticket/Delete', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.prototype.ForceDelete = function (Ticket) {
                        return this.Post('/API/Ticket/ForceDelete', new FC.Shared.Models.ServiceMessage(Ticket));
                    };
                    TicketService.$inject = ['$http', '$q'];
                    return TicketService;
                }(FC.Core.ServiceBase));
                Services.TicketService = TicketService;
            })(Services = Ticket_2.Services || (Ticket_2.Services = {}));
        })(Ticket = Modules.Ticket || (Modules.Ticket = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
TicketModule.GetApplication().app.service('FC.Modules.Ticket.Services.TicketService', FC.Modules.Ticket.Services.TicketService);
///<reference path="../Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var CoreModel;
        (function (CoreModel) {
            var FormDirty = (function () {
                function FormDirty() {
                }
                return FormDirty;
            }());
            CoreModel.FormDirty = FormDirty;
            var Recovery = (function () {
                function Recovery() {
                }
                Recovery.RepairArray = function (arr) {
                    var result = new Array();
                    arr.forEach(function (v, t) {
                        if (v) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                Recovery.RecoverModel = function (formID, model) {
                    var data = CacheManager.Get(formID);
                    if (data) {
                        if (data.data) {
                            var m = new Object();
                            data.data.data.forEach(function (v, k) {
                                m[v.Key] = v.Value;
                            });
                        }
                    }
                    else {
                        return null;
                    }
                    return m;
                };
                Recovery.Add = function (formID, fieldName, value) {
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = null;
                    dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    if (dict == null) {
                        dict = new FC.Core.CoreModel.Dictionary();
                    }
                    if (dict.ContainsKey(fieldName)) {
                        dict.Delete(fieldName);
                    }
                    dict.Add(fieldName, value);
                    this.MemReg.Register(formID, dict);
                };
                //Set localstorage form dirty id. this is required for notify about editing the current form.
                Recovery.WriteFormDirty = function (formID, location, formName) {
                    var dirty = new FormDirty();
                    dirty.FormID = formID;
                    dirty.FormLocation = location;
                    dirty.FormName = formName;
                    CacheManager.WriteStorage("DirtyForm-" + formID, dirty, 999999999999);
                    this.DetectDirty();
                };
                Recovery.DetectDirty = function () {
                    var dirtyForms = new Array();
                    var i = 0;
                    while (i <= localStorage.length - 1) {
                        var key = localStorage.key(i);
                        if (key.indexOf("DirtyForm-") != -1) {
                            dirtyForms.push(localStorage[key]);
                        }
                        i++;
                    }
                    if (dirtyForms.length > 0) {
                        console.info("DIRTY FORM ITEM SET");
                    }
                    CacheManager.WriteStorage("MSG_FORM_DIRTY", dirtyForms, 99999999999);
                };
                Recovery.ClearFormDirty = function (formID) {
                    var vm = this; //?
                    var dirtyForms = CacheManager.Get("MSG_FORM_DIRTY").data;
                    var newDirty;
                    if (dirtyForms) {
                        dirtyForms.forEach(function (v, k) {
                            if (formID) {
                                if (v.FormID == formID) {
                                    delete dirtyForms[k];
                                    newDirty = vm.RepairArray(dirtyForms);
                                    console.info("FORM " + formID + " CLEARED FROM STORAGE");
                                }
                            }
                        });
                    }
                    if (newDirty.length == 0) {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    else {
                        CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
                    }
                    this.DetectDirty();
                };
                Recovery.ClearAllDirty = function () {
                    var vm = this; //?
                    var dirtyForms = CacheManager.Get("MSG_FORM_DIRTY").data;
                    var newDirty;
                    if (dirtyForms) {
                        dirtyForms.forEach(function (v, k) {
                            delete dirtyForms[k];
                            newDirty = vm.RepairArray(dirtyForms);
                        });
                    }
                    else {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    if (newDirty.length == 0) {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    else {
                        CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
                    }
                    this.DetectDirty();
                };
                Recovery.Get = function (formID, fieldName) {
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = null;
                    dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    if (dict.ContainsKey(fieldName)) {
                        var result = dict.Get(fieldName);
                        return result;
                    }
                    else {
                        return "";
                    }
                };
                Recovery.SaveState = function (formID, locationPath) {
                    var cm = FC.Shared.Util.CacheManager.GetInstance();
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    cm.WriteStorage(formID, dict, 1000000000);
                };
                Recovery.FinishForm = function (formID) {
                    var cm = FC.Shared.Util.CacheManager.GetInstance();
                    cm.DeleteStorage(formID);
                    //this.ClearFormDirty(formID);
                };
                return Recovery;
            }());
            CoreModel.Recovery = Recovery;
        })(CoreModel = Shared.CoreModel || (Shared.CoreModel = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
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
        var Enum;
        (function (Enum) {
            (function (AuthMode) {
                AuthMode[AuthMode["FACEBOOK"] = 0] = "FACEBOOK";
                AuthMode[AuthMode["SPOTIFY"] = 1] = "SPOTIFY";
                AuthMode[AuthMode["DEEZER"] = 2] = "DEEZER";
                AuthMode[AuthMode["MYSPACE"] = 3] = "MYSPACE";
                AuthMode[AuthMode["TWITTER"] = 4] = "TWITTER";
                AuthMode[AuthMode["YOUTUBE"] = 5] = "YOUTUBE";
                AuthMode[AuthMode["GOOGLE"] = 6] = "GOOGLE";
                AuthMode[AuthMode["LOCAL"] = 7] = "LOCAL";
            })(Enum.AuthMode || (Enum.AuthMode = {}));
            var AuthMode = Enum.AuthMode;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
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
        var Enum;
        (function (Enum) {
            var CurrencyBase = (function () {
                function CurrencyBase() {
                }
                CurrencyBase.ToArray = function () {
                    return ["AED",
                        "AFN",
                        "ALL",
                        "AMD",
                        "ANG",
                        "AOA",
                        "ARS",
                        "AUD",
                        "AWG",
                        "AZN",
                        "BAM",
                        "BBD",
                        "BDT",
                        "BGN",
                        "BHD",
                        "BIF",
                        "BMD",
                        "BND",
                        "BOB",
                        "BRL",
                        "BSD",
                        "BTN",
                        "BWP",
                        "BYN",
                        "BZD",
                        "CAD",
                        "CDF",
                        "CHF",
                        "CLP",
                        "CNY",
                        "COP",
                        "CRC",
                        "CUC",
                        "CUP",
                        "CVE",
                        "CZK",
                        "DJF",
                        "DKK",
                        "DOP",
                        "DZD",
                        "EGP",
                        "ERN",
                        "ETB",
                        "EUR",
                        "FJD",
                        "FKP",
                        "GBP",
                        "GEL",
                        "GGP",
                        "GHS",
                        "GIP",
                        "GMD",
                        "GNF",
                        "GTQ",
                        "GYD",
                        "HKD",
                        "HNL",
                        "HRK",
                        "HTG",
                        "HUF",
                        "IDR",
                        "ILS",
                        "IMP",
                        "INR",
                        "IQD",
                        "IRR",
                        "ISK",
                        "JEP",
                        "JMD",
                        "JOD",
                        "JPY",
                        "KES",
                        "KGS",
                        "KHR",
                        "KMF",
                        "KPW",
                        "KRW",
                        "KWD",
                        "KYD",
                        "KZT",
                        "LAK",
                        "LBP",
                        "LKR",
                        "LRD",
                        "LSL",
                        "LYD",
                        "MAD",
                        "MDL",
                        "MGA",
                        "MKD",
                        "MMK",
                        "MNT",
                        "MOP",
                        "MRO",
                        "MUR",
                        "MVR",
                        "MWK",
                        "MXN",
                        "MYR",
                        "MZN",
                        "NAD",
                        "NGN",
                        "NIO",
                        "NOK",
                        "NPR",
                        "NZD",
                        "OMR",
                        "PAB",
                        "PEN",
                        "PGK",
                        "PHP",
                        "PKR",
                        "PLN",
                        "PYG",
                        "QAR",
                        "RON",
                        "RSD",
                        "RUB",
                        "RWF",
                        "SAR",
                        "SBD",
                        "SCR",
                        "SDG",
                        "SEK",
                        "SGD",
                        "SHP",
                        "SLL",
                        "SOS",
                        "SPL",
                        "SRD",
                        "STD",
                        "SVC",
                        "SYP",
                        "SZL",
                        "THB",
                        "TJS",
                        "TMT",
                        "TND",
                        "TOP",
                        "TRY",
                        "TTD",
                        "TVD",
                        "TWD",
                        "TZS",
                        "UAH",
                        "UGX",
                        "USD",
                        "UYU",
                        "UZS",
                        "VEF",
                        "VND",
                        "VUV",
                        "WST",
                        "XAF",
                        "XCD",
                        "XDR",
                        "XOF",
                        "XPF",
                        "YER",
                        "ZAR",
                        "ZMW",
                        "ZWD"
                    ];
                };
                CurrencyBase.AED = "AED"; /* United Arab Emirates Dirham*/
                CurrencyBase.AFN = "AFN"; /* Afghanistan Afghani*/
                CurrencyBase.ALL = "ALL"; /* Albania Lek*/
                CurrencyBase.AMD = "AMD"; /* Armenia Dram*/
                CurrencyBase.ANG = "ANG"; /* Netherlands Antilles Guilder*/
                CurrencyBase.AOA = "AOA"; /* Angola Kwanza*/
                CurrencyBase.ARS = "ARS"; /* Argentina Peso*/
                CurrencyBase.AUD = "AUD"; /* Australia Dollar*/
                CurrencyBase.AWG = "AWG"; /* Aruba Guilder*/
                CurrencyBase.AZN = "AZN"; /* Azerbaijan New Manat*/
                CurrencyBase.BAM = "BAM"; /* Bosnia and Herzegovina Convertible Marka*/
                CurrencyBase.BBD = "BBD"; /* Barbados Dollar*/
                CurrencyBase.BDT = "BDT"; /* Bangladesh Taka*/
                CurrencyBase.BGN = "BGN"; /* Bulgaria Lev*/
                CurrencyBase.BHD = "BHD"; /* Bahrain Dinar*/
                CurrencyBase.BIF = "BIF"; /* Burundi Franc*/
                CurrencyBase.BMD = "BMD"; /* Bermuda Dollar*/
                CurrencyBase.BND = "BND"; /* Brunei Darussalam Dollar*/
                CurrencyBase.BOB = "BOB"; /* Bolivia Bolíviano*/
                CurrencyBase.BRL = "BRL"; /* Brazil Real*/
                CurrencyBase.BSD = "BSD"; /* Bahamas Dollar*/
                CurrencyBase.BTN = "BTN"; /* Bhutan Ngultrum*/
                CurrencyBase.BWP = "BWP"; /* Botswana Pula*/
                CurrencyBase.BYN = "BYN"; /* Belarus Ruble*/
                CurrencyBase.BZD = "BZD"; /* Belize Dollar*/
                CurrencyBase.CAD = "CAD"; /* Canada Dollar*/
                CurrencyBase.CDF = "CDF"; /* Congo/Kinshasa Franc*/
                CurrencyBase.CHF = "CHF"; /* Switzerland Franc*/
                CurrencyBase.CLP = "CLP"; /* Chile Peso*/
                CurrencyBase.CNY = "CNY"; /* China Yuan Renminbi*/
                CurrencyBase.COP = "COP"; /* Colombia Peso*/
                CurrencyBase.CRC = "CRC"; /* Costa Rica Colon*/
                CurrencyBase.CUC = "CUC"; /* Cuba Convertible Peso*/
                CurrencyBase.CUP = "CUP"; /* Cuba Peso*/
                CurrencyBase.CVE = "CVE"; /* Cape Verde Escudo*/
                CurrencyBase.CZK = "CZK"; /* Czech Republic Koruna*/
                CurrencyBase.DJF = "DJF"; /* Djibouti Franc*/
                CurrencyBase.DKK = "DKK"; /* Denmark Krone*/
                CurrencyBase.DOP = "DOP"; /* Dominican Republic Peso*/
                CurrencyBase.DZD = "DZD"; /* Algeria Dinar*/
                CurrencyBase.EGP = "EGP"; /* Egypt Pound*/
                CurrencyBase.ERN = "ERN"; /* Eritrea Nakfa*/
                CurrencyBase.ETB = "ETB"; /* Ethiopia Birr*/
                CurrencyBase.EUR = "EUR"; /* Euro Member Countries*/
                CurrencyBase.FJD = "FJD"; /* Fiji Dollar*/
                CurrencyBase.FKP = "FKP"; /* Falkland Islands (Malvinas) Pound*/
                CurrencyBase.GBP = "GBP"; /* United Kingdom Pound*/
                CurrencyBase.GEL = "GEL"; /* Georgia Lari*/
                CurrencyBase.GGP = "GGP"; /* Guernsey Pound*/
                CurrencyBase.GHS = "GHS"; /* Ghana Cedi*/
                CurrencyBase.GIP = "GIP"; /* Gibraltar Pound*/
                CurrencyBase.GMD = "GMD"; /* Gambia Dalasi*/
                CurrencyBase.GNF = "GNF"; /* Guinea Franc*/
                CurrencyBase.GTQ = "GTQ"; /* Guatemala Quetzal*/
                CurrencyBase.GYD = "GYD"; /* Guyana Dollar*/
                CurrencyBase.HKD = "HKD"; /* Hong Kong Dollar*/
                CurrencyBase.HNL = "HNL"; /* Honduras Lempira*/
                CurrencyBase.HRK = "HRK"; /* Croatia Kuna*/
                CurrencyBase.HTG = "HTG"; /* Haiti Gourde*/
                CurrencyBase.HUF = "HUF"; /* Hungary Forint*/
                CurrencyBase.IDR = "IDR"; /* Indonesia Rupiah*/
                CurrencyBase.ILS = "ILS"; /* Israel Shekel*/
                CurrencyBase.IMP = "IMP"; /* Isle of Man Pound*/
                CurrencyBase.INR = "INR"; /* India Rupee*/
                CurrencyBase.IQD = "IQD"; /* Iraq Dinar*/
                CurrencyBase.IRR = "IRR"; /* Iran Rial*/
                CurrencyBase.ISK = "ISK"; /* Iceland Krona*/
                CurrencyBase.JEP = "JEP"; /* Jersey Pound*/
                CurrencyBase.JMD = "JMD"; /* Jamaica Dollar*/
                CurrencyBase.JOD = "JOD"; /* Jordan Dinar*/
                CurrencyBase.JPY = "JPY"; /* Japan Yen*/
                CurrencyBase.KES = "KES"; /* Kenya Shilling*/
                CurrencyBase.KGS = "KGS"; /* Kyrgyzstan Som*/
                CurrencyBase.KHR = "KHR"; /* Cambodia Riel*/
                CurrencyBase.KMF = "KMF"; /* Comoros Franc*/
                CurrencyBase.KPW = "KPW"; /* Korea (North) Won*/
                CurrencyBase.KRW = "KRW"; /* Korea (South) Won*/
                CurrencyBase.KWD = "KWD"; /* Kuwait Dinar*/
                CurrencyBase.KYD = "KYD"; /* Cayman Islands Dollar*/
                CurrencyBase.KZT = "KZT"; /* Kazakhstan Tenge*/
                CurrencyBase.LAK = "LAK"; /* Laos Kip*/
                CurrencyBase.LBP = "LBP"; /* Lebanon Pound*/
                CurrencyBase.LKR = "LKR"; /* Sri Lanka Rupee*/
                CurrencyBase.LRD = "LRD"; /* Liberia Dollar*/
                CurrencyBase.LSL = "LSL"; /* Lesotho Loti*/
                CurrencyBase.LYD = "LYD"; /* Libya Dinar*/
                CurrencyBase.MAD = "MAD"; /* Morocco Dirham*/
                CurrencyBase.MDL = "MDL"; /* Moldova Leu*/
                CurrencyBase.MGA = "MGA"; /* Madagascar Ariary*/
                CurrencyBase.MKD = "MKD"; /* Macedonia Denar*/
                CurrencyBase.MMK = "MMK"; /* Myanmar (Burma) Kyat*/
                CurrencyBase.MNT = "MNT"; /* Mongolia Tughrik*/
                CurrencyBase.MOP = "MOP"; /* Macau Pataca*/
                CurrencyBase.MRO = "MRO"; /* Mauritania Ouguiya*/
                CurrencyBase.MUR = "MUR"; /* Mauritius Rupee*/
                CurrencyBase.MVR = "MVR"; /* Maldives (Maldive Islands) Rufiyaa*/
                CurrencyBase.MWK = "MWK"; /* Malawi Kwacha*/
                CurrencyBase.MXN = "MXN"; /* Mexico Peso*/
                CurrencyBase.MYR = "MYR"; /* Malaysia Ringgit*/
                CurrencyBase.MZN = "MZN"; /* Mozambique Metical*/
                CurrencyBase.NAD = "NAD"; /* Namibia Dollar*/
                CurrencyBase.NGN = "NGN"; /* Nigeria Naira*/
                CurrencyBase.NIO = "NIO"; /* Nicaragua Cordoba*/
                CurrencyBase.NOK = "NOK"; /* Norway Krone*/
                CurrencyBase.NPR = "NPR"; /* Nepal Rupee*/
                CurrencyBase.NZD = "NZD"; /* New Zealand Dollar*/
                CurrencyBase.OMR = "OMR"; /* Oman Rial*/
                CurrencyBase.PAB = "PAB"; /* Panama Balboa*/
                CurrencyBase.PEN = "PEN"; /* Peru Sol*/
                CurrencyBase.PGK = "PGK"; /* Papua New Guinea Kina*/
                CurrencyBase.PHP = "PHP"; /* Philippines Peso*/
                CurrencyBase.PKR = "PKR"; /* Pakistan Rupee*/
                CurrencyBase.PLN = "PLN"; /* Poland Zloty*/
                CurrencyBase.PYG = "PYG"; /* Paraguay Guarani*/
                CurrencyBase.QAR = "QAR"; /* Qatar Riyal*/
                CurrencyBase.RON = "RON"; /* Romania New Leu*/
                CurrencyBase.RSD = "RSD"; /* Serbia Dinar*/
                CurrencyBase.RUB = "RUB"; /* Russia Ruble*/
                CurrencyBase.RWF = "RWF"; /* Rwanda Franc*/
                CurrencyBase.SAR = "SAR"; /* Saudi Arabia Riyal*/
                CurrencyBase.SBD = "SBD"; /* Solomon Islands Dollar*/
                CurrencyBase.SCR = "SCR"; /* Seychelles Rupee*/
                CurrencyBase.SDG = "SDG"; /* Sudan Pound*/
                CurrencyBase.SEK = "SEK"; /* Sweden Krona*/
                CurrencyBase.SGD = "SGD"; /* Singapore Dollar*/
                CurrencyBase.SHP = "SHP"; /* Saint Helena Pound*/
                CurrencyBase.SLL = "SLL"; /* Sierra Leone Leone*/
                CurrencyBase.SOS = "SOS"; /* Somalia Shilling*/
                CurrencyBase.SPL = "SPL"; /**	Seborga Luigino*/
                CurrencyBase.SRD = "SRD"; /* Suriname Dollar*/
                CurrencyBase.STD = "STD"; /* São Tomé and Príncipe Dobra*/
                CurrencyBase.SVC = "SVC"; /* El Salvador Colon*/
                CurrencyBase.SYP = "SYP"; /* Syria Pound*/
                CurrencyBase.SZL = "SZL"; /* Swaziland Lilangeni*/
                CurrencyBase.THB = "THB"; /* Thailand Baht*/
                CurrencyBase.TJS = "TJS"; /* Tajikistan Somoni*/
                CurrencyBase.TMT = "TMT"; /* Turkmenistan Manat*/
                CurrencyBase.TND = "TND"; /* Tunisia Dinar*/
                CurrencyBase.TOP = "TOP"; /* Tonga Pa'anga*/
                CurrencyBase.TRY = "TRY"; /* Turkey Lira*/
                CurrencyBase.TTD = "TTD"; /* Trinidad and Tobago Dollar*/
                CurrencyBase.TVD = "TVD"; /* Tuvalu Dollar*/
                CurrencyBase.TWD = "TWD"; /* Taiwan New Dollar*/
                CurrencyBase.TZS = "TZS"; /* Tanzania Shilling*/
                CurrencyBase.UAH = "UAH"; /* Ukraine Hryvnia*/
                CurrencyBase.UGX = "UGX"; /* Uganda Shilling*/
                CurrencyBase.USD = "USD"; /* United States Dollar*/
                CurrencyBase.UYU = "UYU"; /* Uruguay Peso*/
                CurrencyBase.UZS = "UZS"; /* Uzbekistan Som*/
                CurrencyBase.VEF = "VEF"; /* Venezuela Bolivar*/
                CurrencyBase.VND = "VND"; /* Viet Nam Dong*/
                CurrencyBase.VUV = "VUV"; /* Vanuatu Vatu*/
                CurrencyBase.WST = "WST"; /* Samoa Tala*/
                CurrencyBase.XAF = "XAF"; /* Communauté Financière Africaine (BEAC) CFA Franc BEAC*/
                CurrencyBase.XCD = "XCD"; /* East Caribbean Dollar*/
                CurrencyBase.XDR = "XDR"; /* International Monetary Fund (IMF) Special Drawing Rights*/
                CurrencyBase.XOF = "XOF"; /* Communauté Financière Africaine (BCEAO) Franc*/
                CurrencyBase.XPF = "XPF"; /* Comptoirs Français du Pacifique (CFP) Franc*/
                CurrencyBase.YER = "YER"; /* Yemen Rial*/
                CurrencyBase.ZAR = "ZAR"; /* South Africa Rand*/
                CurrencyBase.ZMW = "ZMW"; /* Zambia Kwacha*/
                CurrencyBase.ZWD = "ZWD"; /* Zimbabwe Dollar*/
                return CurrencyBase;
            }());
            Enum.CurrencyBase = CurrencyBase;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            (function (GenericMessageStatus) {
                GenericMessageStatus[GenericMessageStatus["DBError"] = 100] = "DBError";
                GenericMessageStatus[GenericMessageStatus["SystemError"] = 200] = "SystemError";
                GenericMessageStatus[GenericMessageStatus["GenericError"] = 300] = "GenericError";
                GenericMessageStatus[GenericMessageStatus["AuthorizationError"] = 400] = "AuthorizationError";
                GenericMessageStatus[GenericMessageStatus["HTTPError"] = 500] = "HTTPError";
                GenericMessageStatus[GenericMessageStatus["UIError"] = 600] = "UIError";
                GenericMessageStatus[GenericMessageStatus["InvalidTestResult"] = 700] = "InvalidTestResult";
                GenericMessageStatus[GenericMessageStatus["SensitiveDataError"] = 800] = "SensitiveDataError";
                GenericMessageStatus[GenericMessageStatus["SecurityBreach"] = 900] = "SecurityBreach";
                GenericMessageStatus[GenericMessageStatus["Warning"] = 1000] = "Warning";
                GenericMessageStatus[GenericMessageStatus["Info"] = 2000] = "Info";
                GenericMessageStatus[GenericMessageStatus["Message"] = 3000] = "Message";
            })(Enum.GenericMessageStatus || (Enum.GenericMessageStatus = {}));
            var GenericMessageStatus = Enum.GenericMessageStatus;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            (function (InternalContentType) {
                InternalContentType[InternalContentType["Festival"] = 0] = "Festival";
                InternalContentType[InternalContentType["Discount"] = 1] = "Discount";
                InternalContentType[InternalContentType["User"] = 2] = "User";
                InternalContentType[InternalContentType["Profile"] = 3] = "Profile";
                InternalContentType[InternalContentType["Ticket"] = 4] = "Ticket";
                InternalContentType[InternalContentType["Location"] = 5] = "Location";
                InternalContentType[InternalContentType["News"] = 6] = "News";
                InternalContentType[InternalContentType["Report"] = 7] = "Report";
                InternalContentType[InternalContentType["Genre"] = 8] = "Genre";
                InternalContentType[InternalContentType["Artist"] = 9] = "Artist";
                InternalContentType[InternalContentType["Advertisement"] = 10] = "Advertisement";
                InternalContentType[InternalContentType["Country"] = 11] = "Country";
                InternalContentType[InternalContentType["All"] = 12] = "All";
            })(Enum.InternalContentType || (Enum.InternalContentType = {}));
            var InternalContentType = Enum.InternalContentType;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            (function (SocialMediaBindable) {
                SocialMediaBindable[SocialMediaBindable["Festival"] = 0] = "Festival";
                SocialMediaBindable[SocialMediaBindable["Artist"] = 1] = "Artist";
                SocialMediaBindable[SocialMediaBindable["News"] = 2] = "News";
                SocialMediaBindable[SocialMediaBindable["Genre"] = 3] = "Genre";
                SocialMediaBindable[SocialMediaBindable["User"] = 4] = "User";
                SocialMediaBindable[SocialMediaBindable["Location"] = 5] = "Location";
                SocialMediaBindable[SocialMediaBindable["Reseller"] = 6] = "Reseller";
            })(Enum.SocialMediaBindable || (Enum.SocialMediaBindable = {}));
            var SocialMediaBindable = Enum.SocialMediaBindable;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ApplicationUser = (function () {
                function ApplicationUser() {
                }
                return ApplicationUser;
            }());
            Models.ApplicationUser = ApplicationUser;
        })(Models = Shared.Models || (Shared.Models = {}));
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
            var Favorite = (function () {
                function Favorite() {
                }
                return Favorite;
            }());
            Models.Favorite = Favorite;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var FestivalTicket = (function () {
                function FestivalTicket(currencyBase) {
                    this.IsAllinclusive = false;
                    this.IsCombiDeal = false;
                    this.IsDiscount = false;
                    this.CurrencyBase = FC.Shared.Enum.CurrencyBase.EUR;
                }
                return FestivalTicket;
            }());
            Models.FestivalTicket = FestivalTicket;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var FreeGeoIPModel = (function () {
                function FreeGeoIPModel() {
                }
                return FreeGeoIPModel;
            }());
            Models.FreeGeoIPModel = FreeGeoIPModel;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var LineupItem = (function () {
                function LineupItem() {
                }
                return LineupItem;
            }());
            Models.LineupItem = LineupItem;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Location = (function () {
                function Location() {
                }
                return Location;
            }());
            Models.Location = Location;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Media = (function () {
                function Media() {
                }
                return Media;
            }());
            Models.Media = Media;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var MediaDirectory = (function () {
                function MediaDirectory() {
                    this.Media = new Array();
                    this.Children = new Array();
                }
                return MediaDirectory;
            }());
            Models.MediaDirectory = MediaDirectory;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var MediaType = (function () {
                function MediaType() {
                }
                return MediaType;
            }());
            Models.MediaType = MediaType;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var MenuItem = (function () {
                function MenuItem() {
                }
                return MenuItem;
            }());
            Models.MenuItem = MenuItem;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var MenuSection = (function () {
                function MenuSection() {
                }
                return MenuSection;
            }());
            Models.MenuSection = MenuSection;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var MimeType = (function () {
                function MimeType() {
                }
                return MimeType;
            }());
            Models.MimeType = MimeType;
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
            var Permission = (function () {
                function Permission() {
                }
                return Permission;
            }());
            Models.Permission = Permission;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Role = (function () {
                function Role() {
                }
                return Role;
            }());
            Models.Role = Role;
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
                    this.State = r.State;
                    this.RequestToken = r.RequestToken;
                    this.ResponseToken = r.ResponseToken;
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
            var SocialProfile = (function () {
                function SocialProfile() {
                }
                return SocialProfile;
            }());
            Models.SocialProfile = SocialProfile;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var SocialProfileType = (function () {
                function SocialProfileType() {
                }
                return SocialProfileType;
            }());
            Models.SocialProfileType = SocialProfileType;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var Stage = (function () {
                function Stage() {
                }
                return Stage;
            }());
            Models.Stage = Stage;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UAnnouncement = (function () {
                function UAnnouncement(a) {
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
            }());
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
            var UArtist = (function () {
                function UArtist() {
                }
                return UArtist;
            }());
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
            var UBanner = (function () {
                function UBanner(b) {
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
            }());
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
            var UCountry = (function () {
                function UCountry(c) {
                    if (c) {
                        this.Name = c.Name;
                        this.CultureIsoName = c.CultureIsoName;
                        this.LanguageName = c.LanguageName;
                        this.RegionInfo = c.RegionInfo;
                    }
                }
                return UCountry;
            }());
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
            var UCustomer = (function () {
                function UCustomer() {
                }
                return UCustomer;
            }());
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
            var UFestival = (function () {
                function UFestival() {
                }
                return UFestival;
            }());
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
            var UGenre = (function () {
                function UGenre() {
                }
                return UGenre;
            }());
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
            var UTheme = (function () {
                function UTheme() {
                }
                return UTheme;
            }());
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
        var Models;
        (function (Models) {
            var ZIPSearchResult = (function () {
                function ZIPSearchResult() {
                }
                return ZIPSearchResult;
            }());
            Models.ZIPSearchResult = ZIPSearchResult;
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
                function FestivalFilter(genres, artists, locations, countries) {
                    if (genres === void 0) { genres = null; }
                    if (artists === void 0) { artists = null; }
                    if (locations === void 0) { locations = null; }
                    if (countries === void 0) { countries = null; }
                    this.GenreIDs = new Array();
                    this.ArtistIDs = new Array();
                    this.LocationIDs = new Array();
                    this.FestivalIDs = new Array();
                    this.CountryIDs = new Array();
                    var vm = this;
                    if (genres) {
                        genres.forEach(function (v, k) {
                            vm.GenreIDs.push(v.ContentID);
                        });
                    }
                    if (artists) {
                        artists.forEach(function (v, k) {
                            vm.ArtistIDs.push(v.ContentID);
                        });
                    }
                    if (locations) {
                        locations.forEach(function (v, k) {
                            vm.LocationIDs.push(v.ContentID);
                        });
                    }
                    if (countries) {
                        countries.forEach(function (v, k) {
                            vm.CountryIDs.push(v.ContentID);
                        });
                    }
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
            var IsAuthMsg = (function () {
                function IsAuthMsg() {
                }
                return IsAuthMsg;
            }());
            ServiceMessages.IsAuthMsg = IsAuthMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var LoginMsg = (function () {
                function LoginMsg() {
                }
                return LoginMsg;
            }());
            ServiceMessages.LoginMsg = LoginMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var LogoutMsg = (function () {
                function LogoutMsg() {
                }
                return LogoutMsg;
            }());
            ServiceMessages.LogoutMsg = LogoutMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var MediaDirectoryMsg = (function () {
                function MediaDirectoryMsg() {
                }
                return MediaDirectoryMsg;
            }());
            ServiceMessages.MediaDirectoryMsg = MediaDirectoryMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var RatingMsg = (function () {
                function RatingMsg() {
                }
                return RatingMsg;
            }());
            ServiceMessages.RatingMsg = RatingMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ServiceMessages;
        (function (ServiceMessages) {
            var RegisterMsg = (function () {
                function RegisterMsg() {
                }
                return RegisterMsg;
            }());
            ServiceMessages.RegisterMsg = RegisterMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//TODO
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            var Roles = (function () {
                function Roles() {
                }
                Roles.GetAllPublic = function () {
                    return [
                        Roles.Advertiser,
                        Roles.Festival,
                        Roles.Venue,
                        Roles.Artist,
                        Roles.EndUser,
                        Roles.Retailer,
                        Roles.TravelAgent
                    ];
                };
                Roles.GetAnonymous = function () {
                    return [
                        this.Anonymous,
                        this.Bot
                    ];
                };
                Roles.GetAllRoot = function () {
                    return [
                        this.UserAdmin,
                        this.FestivalAdmin,
                        this.Developer,
                        this.Admin,
                        this.Owner
                    ];
                };
                Roles.GetAllPartner = function () {
                    var r = [
                        this.Developer,
                        this.Reporter,
                        this.Journalist,
                        this.Partner,
                        this.Analyzer,
                        this.Customer,
                        this.Owner
                    ];
                    this.GetAllRoot().forEach(function (v, k) {
                        r.push(v);
                    });
                    this.GetAdmins().forEach(function (v, k) {
                        r.push(v);
                    });
                    this.GetAllRoot().forEach(function (v, k) {
                        r.push(v);
                    });
                    return r;
                };
                Roles.GetAll = function () {
                    return [
                        this.UserAdmin,
                        this.Reporter,
                        this.GenreAdmin,
                        this.RoleAdmin,
                        this.Analyzer,
                        this.EndUser,
                        this.Developer,
                        this.Customer,
                        this.Journalist,
                        this.Bot,
                        this.BannerAdmin,
                        this.AnnouncementAdmin,
                        this.NewsAdmin,
                        this.Partner,
                        this.ArtistAdmin,
                        this.Admin,
                        this.SponsorAdmin,
                        this.FestivalAdmin,
                        this.Owner,
                        Roles.Advertiser,
                        Roles.Festival,
                        Roles.Venue,
                        Roles.Artist,
                        Roles.EndUser,
                        Roles.Retailer,
                        Roles.TravelAgent
                    ];
                };
                Roles.GetAdmins = function () {
                    return [
                        this.Developer,
                        this.UserAdmin,
                        this.FestivalAdmin,
                        this.RoleAdmin,
                        this.GenreAdmin,
                        this.ArtistAdmin,
                        this.BannerAdmin,
                        this.NewsAdmin,
                        this.SponsorAdmin,
                        this.AnnouncementAdmin,
                        this.Owner
                    ];
                };
                Roles.Festival = "Festival";
                Roles.Artist = "Artist";
                Roles.Venue = "Venue";
                Roles.Retailer = "Retailer";
                Roles.TravelAgent = "TravelAgent";
                Roles.Advertiser = "Advertiser";
                Roles.Anonymous = "Anonymous";
                Roles.UserAdmin = "UserAdmin";
                Roles.Reporter = "Reporter";
                Roles.GenreAdmin = "GenreAdmin";
                Roles.RoleAdmin = "RoleAdmin";
                Roles.Analyzer = "Analyzer";
                Roles.EndUser = "EndUser";
                Roles.Developer = "Developer";
                Roles.Customer = "Customer";
                Roles.Journalist = "Journalist";
                Roles.Bot = "Bot";
                Roles.BannerAdmin = "BannerAdmin";
                Roles.AnnouncementAdmin = "AnnouncementAdmin";
                Roles.NewsAdmin = "NewsAdmin";
                Roles.Partner = "Partner";
                Roles.ArtistAdmin = "ArtistAdmin";
                Roles.Admin = "Admin";
                Roles.SponsorAdmin = "SponsorAdmin";
                Roles.FestivalAdmin = "FestivalAdmin";
                Roles.Owner = "Owner";
                return Roles;
            }());
            Enum.Roles = Roles;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
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
        var ServiceMessages;
        (function (ServiceMessages) {
            var SocialProfileMsg = (function () {
                function SocialProfileMsg() {
                }
                return SocialProfileMsg;
            }());
            ServiceMessages.SocialProfileMsg = SocialProfileMsg;
        })(ServiceMessages = Shared.ServiceMessages || (Shared.ServiceMessages = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    (function (Operator) {
        Operator[Operator["GreaterThen"] = 0] = "GreaterThen";
        Operator[Operator["SmallerThen"] = 1] = "SmallerThen";
        Operator[Operator["Larger"] = 2] = "Larger";
        Operator[Operator["Smaller"] = 3] = "Smaller";
        Operator[Operator["Equality"] = 4] = "Equality";
        Operator[Operator["Inequality"] = 5] = "Inequality";
        Operator[Operator["LargerEqual"] = 6] = "LargerEqual";
        Operator[Operator["SmallerEqual"] = 7] = "SmallerEqual";
    })(FC.Operator || (FC.Operator = {}));
    var Operator = FC.Operator;
    (function (Logical) {
        Logical[Logical["Or"] = 0] = "Or";
        Logical[Logical["And"] = 1] = "And";
    })(FC.Logical || (FC.Logical = {}));
    var Logical = FC.Logical;
    var List = (function (_super) {
        __extends(List, _super);
        /**
         * An array with extension methods.
         * @param data when data is not null, the passed array is transformed to a list.
         */
        function List(data) {
            if (data === void 0) { data = null; }
            _super.call(this);
            if (data != null) {
                var vm = this;
                data.forEach(function (v, k) {
                    vm.push(v);
                });
            }
        }
        /**
         * Get the first element in list.
         */
        List.prototype.First = function () {
            if (this[0]) {
                return this[0];
            }
            else {
                return null;
            }
        };
        /**
         * Get the last element in list.
         */
        List.prototype.Last = function () {
            if (this[this.length - 1]) {
                return this[this.length - 1];
            }
            else {
                return null;
            }
        };
        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        List.prototype.Find = function (key, value) {
            var result = this.filter(function (v, i) {
                if (v[key] == value) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return result[0];
        };
        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        List.prototype.Contains = function (key, value) {
            return this.some(function (v, index) {
                if (v[key].toLowerCase() == value.toLowerCase()) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        //public Where(exp: IWhere[]): IList<T> {
        //    var tmp = new List<T>();
        //    exp.forEach(function (r, i) {
        //    });
        //}
        /**
         * Add item to list.
         * @param item
         */
        List.prototype.Add = function (item) {
            if (this.indexOf(item) == -1) {
                this.push(item);
            }
            else {
                console.log("Critical array error prevented.");
            }
        };
        /**
         * Add multiple to list.
         * @param items
         */
        List.prototype.AddRange = function (items) {
            var vm = this;
            items.forEach(function (v, k) {
                vm.push(v);
            });
        };
        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        List.prototype.RemoveRange = function (range, keyName) {
            var vm = this;
            var index = -1;
            var data = vm;
            range.forEach(function (value, key) {
                var result = data.filter(function (v, i) {
                    return v[keyName] == value[keyName];
                });
                var index = vm.indexOf(result[0]);
                delete vm[index];
            });
            return vm.Repair();
        };
        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        List.prototype.Remove = function (item, keyName) {
            var vm = this;
            var index = -1;
            var data = vm;
            var result = data.filter(function (v, i) {
                return v[keyName] == item[keyName];
            });
            var index = vm.indexOf(result[0]);
            delete vm[index];
            return vm.Repair();
        };
        /**
         * Remove null values when deleted from array.
         */
        List.prototype.Repair = function () {
            var vm = this;
            var data = vm;
            var _vm = new List();
            data.forEach(function (v, k) {
                if (v != null) {
                    _vm.push(v);
                }
            });
            data = null;
            return _vm;
        };
        return List;
    }(Array));
    FC.List = List;
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            var FCEvent = (function () {
                function FCEvent() {
                }
                return FCEvent;
            }());
            Util.FCEvent = FCEvent;
            var EventManager = (function () {
                function EventManager(instKey) {
                    if (instKey) {
                        if (instKey != "DE46E36D-BC3D-4C59-9A86-6A17D37A8E88") {
                            console.warn("EventManager.constructor() Be aware that creating instances of singleton classes can be hard thing to debug:) ");
                        }
                        this.EventRegister = new Array();
                    }
                }
                EventManager.GetInstance = function () {
                    if (EventManager.inst == null) {
                        EventManager.inst = new EventManager("DE46E36D-BC3D-4C59-9A86-6A17D37A8E88");
                        return EventManager.inst;
                    }
                    else {
                        return EventManager.inst;
                    }
                };
                EventManager.prototype.RegisterEvt = function (key, evt) {
                    var existing = this.EventRegister.filter(function (v, k) {
                        if (v.RegisterKey == key) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })[0];
                    if (!existing) {
                        this.EventRegister.push(evt);
                    }
                    else {
                        console.log("Duplicate FCEvent entry detected. This can lead to invalid data");
                    }
                };
                EventManager.prototype.DispatchEvt = function (key) {
                    var vm = this;
                    var evt = this.EventRegister.filter(function (v, k) {
                        if (v.RegisterKey == key) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })[0];
                    if (evt) {
                        window.dispatchEvent(evt.Event);
                    }
                };
                return EventManager;
            }());
            Util.EventManager = EventManager;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//module FC.Shared.Util {
//    export class QueueMsg {
//        public key: string;
//        public completed: boolean;
//        public failed: boolean;
//    }
//    export class LoadQueue {
//        public queue = new Array<QueueMsg>();
//        public static lqinst: LoadQueue;
//        public static GetInstance() {
//            String.prototype['ReplaceAll'] = function (search, replacement) {
//                var target = this;
//                return target.split(search).join(replacement);
//            };
//            if (LoadQueue.lqinst == null) {
//                LoadQueue.lqinst = new LoadQueue();
//            }
//            return LoadQueue.lqinst;
//        }
//        public TriggerComplete(key: string) {
//            key = key["ReplaceAll"]('/', '');
//            var e = new CustomEvent(key+"Complete");
//            window.dispatchEvent(e);
//        }
//        public TriggerFailure(key: string) {
//            key = key["ReplaceAll"]('/', '');
//            var e = new CustomEvent(key+"Failure");
//            window.dispatchEvent(e);
//        }
//        public Listen(key: string): void {
//            key = key["ReplaceAll"]('/', '');
//            var qm = new QueueMsg();
//            var vm = LoadQueue.GetInstance();
//            qm.completed = false;
//            qm.key = key;
//            var any = false;
//            any = vm.queue.some(function (v, k) {
//                return v.key == key;
//            });
//            if (any) {
//                console.info("KEY EXISTS: " + key);
//            } else {
//                vm.queue.push(qm);
//                window.addEventListener(key + "Complete", function () {
//                    var msg: QueueMsg = vm.queue.filter(function (v, i) {
//                        if (v.key == key) {
//                            return true;
//                        } else {
//                            return false;
//                        }
//                    })[0];
//                    if (msg) {
//                        var i = vm.queue.indexOf(msg);
//                        msg.completed = true;
//                        vm.queue[i] = msg;
//                        var totalLength = vm.queue.length;
//                        var completedLength = vm.queue.filter(function (v, i) {
//                            return v.completed;
//                        }).length;
//                        if (totalLength == completedLength) {
//                            var e = new CustomEvent("FCDataLoadingComplete", { 'detail': vm.queue });
//                            vm.queue = new Array<QueueMsg>();
//                            window.dispatchEvent(e);
//                        }
//                    }
//                });
//                window.addEventListener(key + "Failure", function () {
//                    var msg: QueueMsg = vm.queue.filter(function (v, i) {
//                        if (v.key == key) {
//                            return true;
//                        } else {
//                            return false;
//                        }
//                    })[0];
//                    if (msg) {
//                        var i = vm.queue.indexOf(msg);
//                        msg.completed = true;
//                        msg.failed = true;
//                        vm.queue[i] = msg;
//                        var totalLength = vm.queue.length;
//                        var completedLength = vm.queue.filter(function (v, i) {
//                            return (v.completed || v.failed);
//                        }).length;
//                        if (totalLength == completedLength) {
//                            var e = new CustomEvent("FCDataLoadingComplete", { 'detail': vm.queue });
//                            vm.queue = new Array<QueueMsg>();
//                            window.dispatchEvent(e);
//                        }
//                    }
//                });
//            }
//        }
//    }
//} 
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            var MemReg = (function () {
                function MemReg(instKey) {
                    if (instKey) {
                        if (instKey != "6031F692-0493-4BFB-97D8-8239FAE89F7A") {
                            throw new Error("EventManager.constructor() Be aware that creating instances of singleton classes can be hard thing to debug:) ");
                        }
                        this.maxObjSize = 1024;
                        this.registry = {};
                    }
                }
                /**
                 * @param key
                 * @param value (Absolute max is 1Megabyte, please be carefull with usage, it stores values in memory for application wide usage).
                 */
                MemReg.prototype.Register = function (key, value) {
                    var vm = this;
                    //well it is not very reliable... but it is better than no checking at all.
                    //This will force the developer to not store very large values in memory.
                    if (value) {
                        if ((value.toString().length / 8) > vm.maxObjSize) {
                            console.error("MemReg.Register object size is to large to store in memory)");
                        }
                        else {
                            vm.registry[key] = value;
                        }
                    }
                    else {
                        console.debug("MemReg::Register value is undefined. key is '" + key + "'");
                    }
                };
                MemReg.prototype.Get = function (key) {
                    var vm = this;
                    if (vm.registry[key]) {
                        return vm.registry[key]; //this is only for typehinting...
                    }
                    else {
                        return null;
                    }
                };
                MemReg.prototype.GetAny = function (key) {
                    var vm = this;
                    return vm.registry[key]; //this is only for typehinting...
                };
                MemReg.GetInstance = function () {
                    if (MemReg.inst == null) {
                        MemReg.inst = new MemReg("6031F692-0493-4BFB-97D8-8239FAE89F7A");
                        return MemReg.inst;
                    }
                    else {
                        return MemReg.inst;
                    }
                };
                return MemReg;
            }());
            Util.MemReg = MemReg;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            (function (ValidationRule) {
                ValidationRule[ValidationRule["Email"] = 0] = "Email";
                ValidationRule[ValidationRule["Zip"] = 1] = "Zip";
                ValidationRule[ValidationRule["Website"] = 2] = "Website";
                ValidationRule[ValidationRule["Phone"] = 3] = "Phone";
                ValidationRule[ValidationRule["Number"] = 4] = "Number";
                ValidationRule[ValidationRule["Word"] = 5] = "Word";
                ValidationRule[ValidationRule["Text"] = 6] = "Text";
                ValidationRule[ValidationRule["Sentence"] = 7] = "Sentence";
                ValidationRule[ValidationRule["Any"] = 8] = "Any";
                ValidationRule[ValidationRule["FacebookURL"] = 9] = "FacebookURL";
                ValidationRule[ValidationRule["TwitterURL"] = 10] = "TwitterURL";
                ValidationRule[ValidationRule["InstagramURL"] = 11] = "InstagramURL";
                ValidationRule[ValidationRule["YoutubeURL"] = 12] = "YoutubeURL";
                ValidationRule[ValidationRule["FlickrURL"] = 13] = "FlickrURL";
                ValidationRule[ValidationRule["GoogleURL"] = 14] = "GoogleURL";
                ValidationRule[ValidationRule["LinkedInURL"] = 15] = "LinkedInURL";
                ValidationRule[ValidationRule["MySpaceURL"] = 16] = "MySpaceURL";
                ValidationRule[ValidationRule["SoundcloudURL"] = 17] = "SoundcloudURL";
                ValidationRule[ValidationRule["PinterestURL"] = 18] = "PinterestURL";
                ValidationRule[ValidationRule["DeezerURL"] = 19] = "DeezerURL";
                ValidationRule[ValidationRule["SpotifyURL"] = 20] = "SpotifyURL";
                ValidationRule[ValidationRule["Guid"] = 21] = "Guid";
                ValidationRule[ValidationRule["BigText"] = 22] = "BigText";
                ValidationRule[ValidationRule["ShortText"] = 23] = "ShortText";
                ValidationRule[ValidationRule["Time"] = 24] = "Time";
            })(Util.ValidationRule || (Util.ValidationRule = {}));
            var ValidationRule = Util.ValidationRule;
            var _VALIDATOR_REGITEM = (function () {
                function _VALIDATOR_REGITEM() {
                    this.rule = ValidationRule.Any;
                    this.required = false;
                }
                return _VALIDATOR_REGITEM;
            }());
            Util._VALIDATOR_REGITEM = _VALIDATOR_REGITEM;
            var Validator = (function () {
                function Validator(instKey) {
                    this.HasRegex = false;
                    this.Required = false;
                    this.RequiredMsg = "The field $FIELD_NAME$ is empty but required.";
                    if (instKey != "13B072C0-E000-47CB-BEDC-8D0A8C9690FD") {
                        throw new Error("Use Validator.GetInstance() instead of manually creating instances.");
                    }
                }
                Validator.GetInstance = function () {
                    if (Validator.instance == null) {
                        Validator.instance = new Validator("13B072C0-E000-47CB-BEDC-8D0A8C9690FD");
                    }
                    return Validator.instance;
                };
                Validator.prototype.Validate = function (rule, fieldID, fieldValue) {
                    this.setRegex(rule);
                    var regex = new RegExp(this.Regex);
                    if (regex.test(fieldValue) != true) {
                        $("#" + fieldID).addClass("invalid");
                    }
                    else {
                        $("#" + fieldID).removeClass("invalid");
                        $("#" + fieldID).addClass("valid");
                    }
                };
                Validator.prototype.setRegex = function (r) {
                    this.Rule = r;
                    switch (r) {
                        case ValidationRule.Any:
                            this.MaxLength = 255;
                            this.Regex = ".*";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Email:
                            this.MaxLength = 255;
                            this.Regex = "([a-z-A-Z-0-9\-_\.]++[a-z-A-Z-0-9\-_]+[a-z-A-Z-0-9\.\-_]+\.[a-zA-Z-0-9\-_]+)";
                            this.InvalidMsg = "The field $FIELD_NAME$ is not a valid e-mail address.";
                            break;
                        case ValidationRule.Number:
                            this.Regex = "([0-9]+)";
                            this.MaxLength = 50;
                            this.InvalidMsg = "The field $FIELD_NAME$ is not a valid number.";
                            break;
                        case ValidationRule.Phone:
                            this.MaxLength = 20;
                            this.Regex = "((\+[0-9]{9,12}))";
                            this.InvalidMsg = "The field $FIELD_NAME$ is not a valid phone number.";
                            break;
                        case ValidationRule.Text:
                            this.MaxLength = 2048;
                            this.Regex = ".*";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.BigText:
                            this.MaxLength = 2048000;
                            this.Regex = ".*";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.ShortText:
                            this.MaxLength = 125;
                            this.Regex = ".*";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is too long.";
                            break;
                        case ValidationRule.Time:
                            this.MaxLength = 5;
                            this.Regex = "^([0-9]{1,2}:[0-9]{2})$";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid time format.";
                            break;
                        case ValidationRule.Zip:
                            this.MaxLength = 15;
                            this.Regex = "[0-9A-Za-z]+";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid ZIP code.";
                            break;
                        case ValidationRule.Website:
                            this.MaxLength = 512;
                            this.Regex = "(((http(s)?)(://+))(www\.)?[a-zA-Z0-9\-\._]+\.+([\.a-zA-Z0-9\-]+)?(:[0-9]+)?)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid website.";
                            break;
                        case ValidationRule.Guid:
                            this.MaxLength = 40;
                            this.Regex = "(([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12}(-?)([A-Fa-f0-9_]){4,12})";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid GUID.";
                            break;
                        case ValidationRule.DeezerURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?deezer.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Deezer URL";
                            break;
                        case ValidationRule.SpotifyURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?spotify.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid spotify URL";
                            break;
                        case ValidationRule.PinterestURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?pinterest.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Pinterest URL";
                            break;
                        case ValidationRule.SoundcloudURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?soundcloud.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Soundcloud URL";
                            break;
                        case ValidationRule.MySpaceURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?myspace.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid MySpace URL";
                            break;
                        case ValidationRule.YoutubeURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?youtube.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Youtube URL";
                            break;
                        case ValidationRule.FlickrURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?flickr.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid FlickR URL";
                            break;
                        case ValidationRule.LinkedInURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?linkedin.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid LinkedIn URL";
                            break;
                        case ValidationRule.GoogleURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?google.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Google URL";
                            break;
                        case ValidationRule.TwitterURL:
                            this.MaxLength = 255;
                            this.Regex = "(((http(s)?)(://+))(www\.)?([a-zA-Z0-9\.\-_]+)?twitter.com+([a-zA-Z0-9\.\-_/\?\=])+)";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not a valid Twitter URL";
                            break;
                        case ValidationRule.Word:
                            this.MaxLength = 255;
                            this.Regex = "\w+";
                            this.InvalidMsg = "The input of $FIELD_NAME$ is not in a valid format.";
                            break;
                        case ValidationRule.Sentence:
                            this.MaxLength = 1024;
                            this.Regex = "([0-9A-Z]+[a-zA-Z0-9\s\,\-\'\(\)\%\+\-\=\;\:\[\]\{\}\*\#\!\\\|\?]+?(\.|\?|\!))";
                            break;
                        default:
                            this.Rule = ValidationRule.Any;
                            this.Regex = ".*";
                            this.MaxLength = 2048;
                            this.InvalidMsg = "The input of $FIELD_NAME$ exceeds the max. character limit of 2048";
                            break;
                    }
                };
                return Validator;
            }());
            Util.Validator = Validator;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var ArtistListVM = (function () {
                function ArtistListVM() {
                }
                return ArtistListVM;
            }());
            ViewModels.ArtistListVM = ArtistListVM;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
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
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var DateVM = (function () {
                function DateVM() {
                }
                return DateVM;
            }());
            ViewModels.DateVM = DateVM;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var DetailVM = (function () {
                function DetailVM() {
                }
                return DetailVM;
            }());
            ViewModels.DetailVM = DetailVM;
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
            var RatingVm = (function () {
                function RatingVm() {
                }
                return RatingVm;
            }());
            ViewModels.RatingVm = RatingVm;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var RepositoryState = (function () {
                function RepositoryState() {
                }
                return RepositoryState;
            }());
            ViewModels.RepositoryState = RepositoryState;
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
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var ViewModels;
        (function (ViewModels) {
            var ValidationError = (function () {
                function ValidationError() {
                }
                return ValidationError;
            }());
            ViewModels.ValidationError = ValidationError;
        })(ViewModels = Shared.ViewModels || (Shared.ViewModels = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=festival-calendar.js.map