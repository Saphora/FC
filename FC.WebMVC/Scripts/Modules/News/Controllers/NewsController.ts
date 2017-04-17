///<reference path="../../Core/FC.ts" />
///<reference path="../News.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Models/UNews.ts"/>
module FC.Modules.News.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class NewsController extends FC.Shared.Controllers.BaseController {
        public ActiveNewsID: number;
        public NewsItem: INT.IUNews;
        private NewsSvc: FC.Modules.News.Services.NewsService;
        public GenreService: FC.Modules.Genres.Services.GenreService;
        public $scope: FC.Shared.ViewModels.INewsVM;
        public UserGenres: Array<string>;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            '$mdDialog',
            "FC.Modules.News.Services.NewsService"
        ];
        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog,
            NewsSvc: FC.Modules.News.Services.NewsService
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            this.$scope.inst = this;
            this.$scope = $scope;
            this.NewsSvc = NewsSvc;
            this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
            this._Init();

        }
        private _Init() {
            var vm = this;
            this.UserGenres = new Array<string>();

            if (this.CacheManager.Contains("user-genres")) {
                this.UserGenres = this.CacheManager.GetStorage("user-genres").data;
            }

            vm.NewsSvc.GetFilteredNews(vm.UserGenres).then(
                function (cd: INT.IServiceResponse<Array<Shared.Interfaces.IContentDetail>>) {
                    //vm.$scope.News = cd.Data;
                }
            );
        }
    }
    
    NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsController", FC.Modules.News.Controllers.NewsController);
}