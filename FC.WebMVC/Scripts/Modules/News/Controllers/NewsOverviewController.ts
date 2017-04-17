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
            
            '$location',
            '$mdDialog',
            "$sce",
        ];

        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog,
            $sce
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
            var vm = this;
            vm.$scope = $scope;
            vm.$scope.IsMobile = IsMobile();
            debugger;
            vm.$scope.$sce = $sce;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.$location = $location;
            vm.$scope.IsLoading = true;
            vm.$scope.ActiveMonth = new Date().getMonth();
            vm.$scope.ActiveYear = new Date().getFullYear();
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
        }
        public DoDelete() {
            var vm = this;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.NewsService, vm.$scope);
        }

        public setData(): void {
            var vm = this;
            var index = 0;
            vm.NewsService.GetPaged(vm.$scope.PageNum, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r) {
                vm.$scope.model = r.Data; 
                vm.SplitToColData(3, r.Data);
                var p = vm.GetPageNum() + 1;
                vm.$scope.IsLoading = false;
                vm.NewsService.GetPagedCount(p, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r2) {
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/news?page=" + (p) + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/news?page=" + vm.GetPageNum() + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                    }
                });
                index++;
            });
        }

    }
    NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsOverviewController", FC.Modules.News.Controllers.NewsOverviewController);
}