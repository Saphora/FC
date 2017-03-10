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
                    GenreService.prototype.GetList = function () {
                        return this.Get('/API/Genre/GetList');
                    };
                    GenreService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Genre/GetPaged?size=' + size + '&page=' + page);
                    };
                    GenreService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Genre/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    GenreService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Genre/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    GenreService.prototype.Search = function (key) {
                        return this.Get('/API/Genre/Search?name=' + key);
                    };
                    GenreService.prototype.GetByID = function (id) {
                        return this.Get('/API/Genre/GetByID?id=' + id);
                    };
                    GenreService.prototype.GetAllRoot = function () {
                        return this.Get('/API/Genre/GetAllRoot');
                    };
                    GenreService.prototype.GetAllGenres = function () {
                        return this.Get('/API/Genre/GetAll');
                    };
                    GenreService.prototype.GetAllChildGenres = function () {
                        return this.Get('/API/Genre/GetAllChildren');
                    };
                    GenreService.prototype.GetAllDefault = function () {
                        return this.Get('/API/Genre/GetAllDefault');
                    };
                    GenreService.prototype.GetAllDefaultIds = function () {
                        return this.Get('/API/Genre/GetAllDefaultIds');
                    };
                    GenreService.prototype.Filter = function (filter) {
                        return this.Post('/API/Genre/Filter', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    GenreService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/API/Festival/GetById?&id=' + festivalId);
                    };
                    GenreService.prototype.Regenerate = function () {
                        //regenerate genre cache
                        this.Get('/API/Festival/Regenerate/');
                    };
                    GenreService.prototype.Create = function (genre) {
                        return this.Post('/API/Genre/Create', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.Update = function (genre) {
                        return this.Post('/API/Genre/Update', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.Delete = function (genre) {
                        return this.Post('/API/Genre/Delete', new FC.Shared.Models.ServiceMessage(genre));
                    };
                    GenreService.prototype.ForceDelete = function (genre) {
                        return this.Post('/API/Genre/ForceDelete', new FC.Shared.Models.ServiceMessage(genre));
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
//# sourceMappingURL=GenreService.js.map