///<reference path="../../Core/FC.ts" />
///<reference path="../Search.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Search.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class SearchController extends FC.Shared.Controllers.BaseController {
        public $scope: FC.Shared.Scopes.ISearchScope;
        public SearchService: FC.Modules.Search.Services.SearchService;
        public CacheManager: FC.Shared.Util.CacheManager;
        static $inject = [
            '$mdDialog',
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location'
        ];
        constructor(
            $mdDialog,
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            SearchService: FC.Modules.Search.Services.SearchService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.initializeServices(SearchService);
            this.initializeScope($scope);
        }
        public initializeServices(SearchSvc: FC.Modules.Search.Services.SearchService) {
            this.SearchService = SearchSvc;
        }

        public initializeScope($scope) {
            this.$scope = $scope;
            this.$scope.DoSearch = this.DoSearch;
            this.$scope.OpenModal = this.OpenModal;
            //this.$scope.GenreData = GenreData;
            //this.$scope.CountryData = CountryData;
            
        }

        private OpenModal(ctr: SearchController): void {
            //var modalInstance = ctr.$uibModal.open({
            //    animation:true,
            //    templateUrl: '/Scripts/Modules/Search/Views/searchresults.html',
            //    controller: 'FC.Modules.Search.Controllers.SearchController',
            //    controllerAs: 'vm',
            //    size: 400,
            //    resolve: {
            //        items: function () {
            //            return null;
            //        }
            //    }
            //});
        }

        public DoSearch($scope: FC.Modules.Search.Controllers.SearchController) {
            var evt = new Event("Searching");
            window.dispatchEvent(evt);
            var vm = $scope.$scope;
            var ctr = $scope;
            ctr.CacheManager.DeleteStorage("search-result");
            var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
            SearchFilter.ActiveCountries = ctr.ActiveCountryIDs;
            SearchFilter.Keyword = vm.Keyword;
            if (SearchFilter.Keyword.length > 2) {
                vm.IsLoading = true;
                vm.IsSearching = true;
                ctr.SearchService.Search(SearchFilter).then(function (response: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
                    if (response.Data) {
                        if (response.Data.length > 0) {
                            ctr.CacheManager.WriteStorage("search-result", response.Data, 99999999999);
                            window.dispatchEvent(new Event("SearchCompletedWithResults"));
                        } else {
                            window.dispatchEvent(new Event("SearchCompletedWithNoResults"));
                        }
                    }
                }).catch(function () {
                    window.dispatchEvent(new Event("SearchCompletedWithNoResults"));
                });
            }
        }
    }
    SearchModule.GetApplication().RegisterController("FC.Modules.Search.Controllers.SearchController", FC.Modules.Search.Controllers.SearchController);
}