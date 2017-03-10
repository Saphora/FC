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
            var GenreService = (function (_super) {
                __extends(GenreService, _super);
                function GenreService(http, q) {
                    _super.call(this, http, q);
                }
                GenreService.prototype.GetAllGenres = function () {
                    var result = new Array();
                    $.each(SortedGenreData, function (genreId, value) {
                        result.push(value);
                    });
                    return result;
                };
                GenreService.prototype.Regenerate = function () {
                    this.Get('/Umbraco/API/Festival/Regenerate/');
                };
                GenreService.$inject = ['$http', '$q'];
                return GenreService;
            }(FC.Core.ServiceBase));
            Services.GenreService = GenreService;
            Application.app.service('FC.Core.Services.GenreService', FC.Core.Services.GenreService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=GenreService.js.map