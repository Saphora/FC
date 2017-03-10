///<reference path="AppConfig.ts"/>
///<reference path="ServiceBase.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        if (this.browser == "Explorer") {
            window.alert("We are so sorry! We do not support Internet Explorer at the moment. Try again later or use any other browser.");
        }
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
//# sourceMappingURL=FC.js.map