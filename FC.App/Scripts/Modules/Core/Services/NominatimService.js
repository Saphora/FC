var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
