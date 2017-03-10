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
                    this.$Application.AddRoute("/news/:newsId/:genre", "/Scripts/Modules/News/Views/news-detail.html", "FC.Modules.News.Controllers.NewsController", "NewsCtr");
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
