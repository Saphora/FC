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
        (function (Location_1) {
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
            })(Services = Location_1.Services || (Location_1.Services = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
LocationModule.GetApplication().app.service('FC.Modules.Location.Services.LocationService', FC.Modules.Location.Services.LocationService);
//# sourceMappingURL=LocationService.js.map