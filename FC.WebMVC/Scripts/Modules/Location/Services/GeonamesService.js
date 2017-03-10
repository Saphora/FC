var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=GeonamesService.js.map