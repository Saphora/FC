var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News_1) {
            var Services;
            (function (Services) {
                var NewsService = (function (_super) {
                    __extends(NewsService, _super);
                    function NewsService(http, q) {
                        _super.call(this, http, q);
                    }
                    NewsService.prototype.GetList = function () {
                        return this.Get('/API/News/GetList');
                    };
                    NewsService.prototype.GetNews = function (genreId) {
                        return this.Get('/API/News/GetNews/?&genreId=' + genreId);
                    };
                    NewsService.prototype.GetNewsById = function (newsId) {
                        return this.Get('/API/News/GetById/?&id=' + newsId);
                    };
                    NewsService.prototype.GetPaged = function (page, month, year) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/News/GetPaged?&page=' + page + '&month=' + month + '&year=' + year);
                    };
                    NewsService.prototype.GetPagedCount = function (page, month, year) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/News/GetPagedCount?&page=' + page + '&month=' + month + '&year=' + year);
                    };
                    NewsService.prototype.GetFilteredNews = function (genres) {
                        var filter = new FC.Shared.Models.NewsFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = []; //prepare for future usage..
                        return this.Post('/API/News/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    NewsService.prototype.Create = function (News) {
                        return this.Post('/API/News/Create', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.Update = function (News) {
                        return this.Post('/API/News/Update', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.Delete = function (News) {
                        return this.Post('/API/News/Delete', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.prototype.ForceDelete = function (News) {
                        return this.Post('/API/News/ForceDelete', new FC.Shared.Models.ServiceMessage(News));
                    };
                    NewsService.$inject = ['$http', '$q'];
                    return NewsService;
                }(FC.Core.ServiceBase));
                Services.NewsService = NewsService;
                NewsModule.GetApplication().app.service('FC.Modules.News.Services.NewsService', FC.Modules.News.Services.NewsService);
            })(Services = News_1.Services || (News_1.Services = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsService.js.map