var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=LocalizationService.js.map