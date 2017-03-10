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
        (function (News) {
            var Services;
            (function (Services) {
                var NewsService = (function (_super) {
                    __extends(NewsService, _super);
                    function NewsService(http, q) {
                        _super.call(this, http, q);
                    }
                    NewsService.prototype.GetNews = function (genreId) {
                        return this.Get('/Umbraco/API/News/GetNews/?&genreId=' + genreId);
                    };
                    NewsService.prototype.GetNewsById = function (newsId) {
                        return this.Get('/Umbraco/API/News/GetById/?&newsId=' + newsId);
                    };
                    NewsService.prototype.GetFilteredNews = function (genres) {
                        var filter = new FC.Shared.Models.NewsFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = []; //prepare for future usage..
                        return this.Post('/Umbraco/API/News/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    NewsService.$inject = ['$http', '$q'];
                    return NewsService;
                }(FC.Core.ServiceBase));
                Services.NewsService = NewsService;
                NewsModule.GetApplication().app.service('FC.Modules.News.Services.NewsService', FC.Modules.News.Services.NewsService);
            })(Services = News.Services || (News.Services = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
