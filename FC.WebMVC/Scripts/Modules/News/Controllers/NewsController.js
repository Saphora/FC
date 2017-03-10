var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../News.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Models/UNews.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var NewsController = (function (_super) {
                    __extends(NewsController, _super);
                    function NewsController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, NewsSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope.inst = this;
                        this.$scope = $scope;
                        this.NewsSvc = NewsSvc;
                        this.ActiveNewsID = $routeParams["newsId"];
                        this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                        this._Init();
                    }
                    NewsController.prototype._Init = function () {
                        var vm = this;
                        this.UserGenres = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.UserGenres = this.CacheManager.GetStorage("user-genres").data;
                        }
                        vm.NewsSvc.GetFilteredNews(vm.UserGenres).then(function (cd) {
                            //vm.$scope.News = cd.Data;
                        });
                    };
                    NewsController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "FC.Modules.News.Services.NewsService"
                    ];
                    return NewsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsController = NewsController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsController", FC.Modules.News.Controllers.NewsController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsController.js.map