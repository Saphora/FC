///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News_1) {
            var News = (function () {
                function News(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/news", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/detail/:newsid", "/Scripts/Modules/News/Views/detail.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/delete/:newsid", "/Scripts/Modules/News/Views/delete.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
                    this.$Application.AddRoute("/news/:page", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/:page/:year/:month", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
                    this.$Application.AddRoute("/news/create/:step", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
                    this.$Application.AddRoute("/news/edit/:newsid", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
                }
                News.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return News;
            }());
            News_1.News = News;
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var NewsModule = new FC.Modules.News.News(angular.module('FC.Modules.News', ApplicationDependencies), Application);
//# sourceMappingURL=News.js.map