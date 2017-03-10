var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                    GenreService.prototype.GetAllRoot = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllRoot');
                    };
                    GenreService.prototype.GetAllGenres = function () {
                        return this.Get('/Umbraco/API/Genre/GetAll');
                    };
                    GenreService.prototype.GetAllDefault = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllDefault');
                    };
                    GenreService.prototype.GetAllDefaultIds = function () {
                        return this.Get('/Umbraco/API/Genre/GetAllDefaultIds');
                    };
                    GenreService.prototype.Filter = function (filter) {
                        return this.Post('/Umbraco/API/Genre/Filter', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    GenreService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/Umbraco/API/Festival/GetById?&id=' + festivalId);
                    };
                    GenreService.prototype.Regenerate = function () {
                        this.Get('/Umbraco/API/Festival/Regenerate/');
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
