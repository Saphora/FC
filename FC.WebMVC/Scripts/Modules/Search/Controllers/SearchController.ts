﻿///<reference path="../../Core/FC.ts" />
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
            this.SearchService = new FC.Modules.Search.Services.SearchService($http, $q);
            this.initializeScope($scope);
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

        public DoSearch() {
            var vm = this;
            var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
            SearchFilter.Keyword = vm.$scope.Keyword;
            if (SearchFilter.Keyword.length > 2) {
                vm.$scope.IsLoading = true;
                vm.$scope.IsSearching = true;
                vm.SearchService.Search(SearchFilter).then(function (response: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
                    if (response.Data) {
                        var e = new CustomEvent("SearchComplete", { detail: response.Data });
                        window.dispatchEvent(e);
                    } else {
                        var e = new CustomEvent("SearchCompleteNoResult", { detail: response.Data });
                        window.dispatchEvent(e);
                    }
                }).catch(function () {
                    window.dispatchEvent(new CustomEvent("SearchCompletedWithNoResults"));
                });
            } else if (SearchFilter.Keyword == null || SearchFilter.Keyword == undefined)
            {
                var e = new CustomEvent("SearchReset");
                window.dispatchEvent(e);

            }
            else if (SearchFilter.Keyword.length == 0)
            {
                var e = new CustomEvent("SearchReset");
                window.dispatchEvent(e);
            }
        }
    }
    SearchModule.GetApplication().RegisterController("FC.Modules.Search.Controllers.SearchController", FC.Modules.Search.Controllers.SearchController);
}