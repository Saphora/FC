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
                    function SearchController($uibModal, $http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc, SearchService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        _super.prototype.SetUserCountries.call(this);
                        this.initializeServices(SearchService);
                        this.initializeScope($scope, $uibModal);
                    }
                    SearchController.prototype.initializeServices = function (SearchSvc) {
                        this.SearchService = SearchSvc;
                    };
                    SearchController.prototype.initializeScope = function ($scope, $uibModal) {
                        this.$scope = $scope;
                        this.$uibModal = $uibModal;
                        this.$scope.DoSubmit = this.DoSubmit;
                        this.$scope.DoSearch = this.DoSearch;
                        this.$scope.SearchResult = new FC.Shared.ViewModels.SearchResult();
                        this.$scope.OpenModal = this.OpenModal;
                        //this.$scope.GenreData = GenreData;
                        //this.$scope.CountryData = CountryData;
                    };
                    SearchController.prototype.OpenModal = function (ctr) {
                        var modalInstance = ctr.$uibModal.open({
                            animation: true,
                            templateUrl: '/Scripts/Modules/Search/Views/searchresults.html',
                            controller: 'FC.Modules.Search.Controllers.SearchController',
                            controllerAs: 'vm',
                            size: 400,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    SearchController.prototype._ParseSearchResult = function (result, ctr) {
                        var $scope = ctr.$scope;
                        if (result.Festivals.length > 0) {
                            $scope.FestivalResultVisible = true;
                            $scope.SearchResult.Festivals = result.Festivals;
                            $scope.IsSearching = true;
                        }
                        if (result.Artists.length > 0) {
                            $scope.ArtistResultVisible = true;
                            $scope.SearchResult.Artists = result.Artists;
                            $scope.IsLoading = false;
                        }
                    };
                    SearchController.prototype.DoSubmit = function (ctr) {
                        ctr.OpenModal(ctr);
                    };
                    SearchController.prototype.DoSearch = function ($scope) {
                        var vm = $scope.$scope;
                        var ctr = $scope;
                        var SearchFilter = new FC.Shared.ServiceMessages.SearchFilter();
                        SearchFilter.ActiveCountries = ctr.ActiveCountryIDs;
                        SearchFilter.Keyword = vm.Keyword;
                        if (SearchFilter.Keyword.length > 2) {
                            vm.IsLoading = true;
                            vm.IsSearching = true;
                            ctr.SearchService.Search(SearchFilter).then(function (response) {
                                ctr._ParseSearchResult(response.Data, ctr);
                            });
                        }
                    };
                    SearchController.$inject = [
                        '$uibModal',
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        "FC.Modules.Search.Services.SearchService"
                    ];
                    return SearchController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SearchController = SearchController;
                SearchModule.GetApplication().RegisterController("FC.Modules.Search.Controllers.SearchController", FC.Modules.Search.Controllers.SearchController);
            })(Controllers = Search.Controllers || (Search.Controllers = {}));
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
