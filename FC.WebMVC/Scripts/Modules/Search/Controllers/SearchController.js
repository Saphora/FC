var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../Search.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search) {
            var Controllers;
            (function (Controllers) {
                var SearchController = (function (_super) {
                    __extends(SearchController, _super);
                    function SearchController($mdDialog, $http, $q, $scope, $routeParams, $location, SearchService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.SearchService = new FC.Modules.Search.Services.SearchService($http, $q);
                        this.initializeScope($scope);
                    }
                    SearchController.prototype.initializeScope = function ($scope) {
                        this.$scope = $scope;
                        this.$scope.DoSearch = this.DoSearch;
                        this.$scope.OpenModal = this.OpenModal;
                        //this.$scope.GenreData = GenreData;
                        //this.$scope.CountryData = CountryData;
                    };
                    SearchController.prototype.OpenModal = function (ctr) {
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
                    };
                    SearchController.prototype.DoSearch = function () {
                        var vm = this;
                        var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
                        SearchFilter.Keyword = vm.$scope.Keyword;
                        if (SearchFilter.Keyword.length > 2) {
                            vm.$scope.IsLoading = true;
                            vm.$scope.IsSearching = true;
                            vm.SearchService.Search(SearchFilter).then(function (response) {
                                if (response.Data) {
                                    var e = new CustomEvent("SearchComplete", { detail: response.Data });
                                    window.dispatchEvent(e);
                                }
                                else {
                                    var e = new CustomEvent("SearchCompleteNoResult", { detail: response.Data });
                                    window.dispatchEvent(e);
                                }
                            }).catch(function () {
                                window.dispatchEvent(new CustomEvent("SearchCompletedWithNoResults"));
                            });
                        }
                        else if (SearchFilter.Keyword == null || SearchFilter.Keyword == undefined) {
                            var e = new CustomEvent("SearchReset");
                            window.dispatchEvent(e);
                        }
                        else if (SearchFilter.Keyword.length == 0) {
                            var e = new CustomEvent("SearchReset");
                            window.dispatchEvent(e);
                        }
                    };
                    SearchController.$inject = [
                        '$mdDialog',
                        '$http',
                        '$q',
                        '$scope',
                        '$routeParams',
                        '$location'
                    ];
                    return SearchController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SearchController = SearchController;
                SearchModule.GetApplication().RegisterController("FC.Modules.Search.Controllers.SearchController", FC.Modules.Search.Controllers.SearchController);
            })(Controllers = Search.Controllers || (Search.Controllers = {}));
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=SearchController.js.map