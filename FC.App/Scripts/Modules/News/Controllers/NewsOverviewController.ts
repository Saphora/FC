///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.News.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class NewsOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Artists.Controllers.ArtistDetailController;
        public ShowTravelInfo = false;
        public GenreService: FC.Modules.Genres.Services.GenreService;
        public ArtistService: FC.Modules.Artists.Services.ArtistService;

        public URLManSvc: FC.Core.Services.URLManagerService;
        public BannerService: FC.Modules.Banners.Services.BannerService;
        public $sce;
        public $scope: Models.INewsOverview;
        public vm;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$mdDialog',
            "$sce",
        ];

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
            var vm = this;
            vm.$scope = $scope;
            vm.$scope.$sce = $sce;
            vm.$scope.META.PageTitle = "News";
            vm.$scope.META.PageDesc = "News overview";
            vm.$scope.META.PageIMG = "";
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.$location = $location;
            if ($routeParams["month"] && $routeParams["year"]) {
                vm.$scope.Date = new Date($routeParams["year"], parseInt($routeParams["month"])-1);
            }
            vm.$scope.IsLoading = true;
            this.setData();
            this.setDetailData();

            window.addEventListener('DateChanged', function (e) {
                vm.DateChanged(e)
                
                vm.setData();
            });
        }
        
        public DateChanged(options: CustomEventInit) {
            var vm = this;
            var value = new Date(options.detail);
            this.$scope.Date = value;
            this.$scope.ActiveYear = value.getFullYear();
            this.$scope.ActiveMonth = value.getMonth() + 1;
            this.$scope.PageNum = 1;
            this.$scope.$location.url("/news?page=" + this.GetPageNum() + "&year=" +this.$scope.ActiveYear + "&month=" + this.$scope.ActiveMonth);
        }

        public setDetailData(): void {
            var vm = this;
            if (vm.$routeParams["newsid"]) {
                vm.NewsService.GetNewsById(vm.$routeParams["newsid"]).then(function(r) {
                    vm.$scope.Detail = r.Data;
                })
            }
        }
        public DoDelete() {
            var vm = this;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.NewsService, vm.$scope);
        }

        public setData(): void {
            var vm = this;
            vm.NewsService.GetPaged(vm.$scope.PageNum, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r) {
                vm.$scope.model = r.Data; 
                var p = vm.GetPageNum() + 1;
                vm.NewsService.GetPagedCount(p, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/news?page=" + (p) + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString()+"#bottom";
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/news?page=" + vm.GetPageNum() + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                    }
                });
            });
        }

    }
    NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsOverviewController", FC.Modules.News.Controllers.NewsOverviewController);
}