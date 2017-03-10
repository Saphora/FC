var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=GeoIPService.js.map