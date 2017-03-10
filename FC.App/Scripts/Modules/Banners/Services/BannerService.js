var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
