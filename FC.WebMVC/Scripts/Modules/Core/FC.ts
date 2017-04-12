///<reference path="AppConfig.ts"/>
///<reference path="ServiceBase.ts"/>
///<reference path="../../Shared/Util/CacheManager.ts"/>
window.onresize = function (event) {
    $("#bg").css("width", $(window).width());
}
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
        } else {
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

module FC {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
}
module FC.Core {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;

    export function IsNullOrEmpty(obj: any): boolean {
        if (obj == null) {
            return true;
        } else if (obj.length == 0) {
            return true;
        } else if (obj == undefined) {
            return true;
        } else if (obj.lenght == 0) {
            return true;
        } else if (typeof (obj) == "string" && obj == "") {
            return true;
        }
        return false;
    }

    export function StrFormat(template: string, args: Array<string>) {
        if (!IsNullOrEmpty(template)) {
            var tpl = template;
            var returnStr = "";
            if (args.length > 1) {
                $.each(args, function (k, v) {
                    if (k > 0) {
                        var readKey = k - 1;
                        tpl = tpl.replace("{" + readKey + "}", v)
                    }
                });
                return tpl;
            } else {
                console.error("StrFormat function called whitout any formatting arguments.");
            }
        } else {
            console.error("No string template was specified for the StrFormat function");
        }
    }
    var ModuleRegister = new Array<any>();
    export class FCModule {
        public app: ng.IModule;
        constructor(public name: string, public modules: Array<string>) {
            if (modules.length > 0) {
                this.app = angular.module(name, modules);
                this.app.config(function ($routeProvider, $locationProvider) {
                    $locationProvider.html5Mode(false);
                });
            } else {
                this.app = angular.module(name);
                CONFIG = new FC.Core.AppConfig();
                
            }
        }
        public RegisterController(controllerName: string, controller: ng.Injectable<ng.IControllerConstructor>): void {
            this.app.controller(controllerName, controller);
        }
        public RegisterService(serviceName: string, service: Function): void {
            this.app.service(serviceName, service);
        }
        public RegisterModule(moduleName: string, module: any) {
            ModuleRegister[moduleName] = module;
        }
        public GetModule(name: string):any {
            return ModuleRegister[name]; 
        }
        public AddRoute(urlFormat: string, tplName: string, controllerName: string, controllerAlias): void {
            this.app.config(function ($routeProvider, $locationProvider) {
                $routeProvider.when(urlFormat, {
                    templateUrl: tplName,
                    controller: controllerName,
                    controllerAs: controllerAlias
                });
            });
        }
    }
}

var ApplicationDependencies = [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ngMaterial',
    'ui.tinymce',
];
let CONFIG: FC.Core.AppConfig;
var Application = new FC.Core.FCModule("FC", ApplicationDependencies);
var CacheManager = FC.Shared.Util.CacheManager.GetInstance();
//TODO: Implement these vars in CacheManager --> Every API controller has an method Regenerate which will Regenerate the Cache files.
//let GenreData: any;  //genres.js
//let SortedGenreData: any; //genres.js
let fx: any;
let accounting: any;
let ThemeData: Array<FC.Shared.Interfaces.IUTheme>;
let PhoneCodes: any;
let ActionType: FC.Shared.Controllers.ActionType;
let ServiceType: FC.Shared.Controllers.ServiceType;