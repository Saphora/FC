var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Controllers;
            (function (Controllers) {
                var NewsOverviewController = (function (_super) {
                    __extends(NewsOverviewController, _super);
                    function NewsOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
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
                            vm.$scope.Date = new Date($routeParams["year"], parseInt($routeParams["month"]) - 1);
                        }
                        vm.$scope.IsLoading = true;
                        this.setData();
                        this.setDetailData();
                        window.addEventListener('DateChanged', function (e) {
                            vm.DateChanged(e);
                            vm.setData();
                        });
                    }
                    NewsOverviewController.prototype.DateChanged = function (options) {
                        var vm = this;
                        var value = new Date(options.detail);
                        this.$scope.Date = value;
                        this.$scope.ActiveYear = value.getFullYear();
                        this.$scope.ActiveMonth = value.getMonth() + 1;
                        this.$scope.PageNum = 1;
                        this.$scope.$location.url("/news?page=" + this.GetPageNum() + "&year=" + this.$scope.ActiveYear + "&month=" + this.$scope.ActiveMonth);
                    };
                    NewsOverviewController.prototype.setDetailData = function () {
                        var vm = this;
                        if (vm.$routeParams["newsid"]) {
                            vm.NewsService.GetNewsById(vm.$routeParams["newsid"]).then(function (r) {
                                vm.$scope.Detail = r.Data;
                            });
                        }
                    };
                    NewsOverviewController.prototype.DoDelete = function () {
                        var vm = this;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                    };
                    NewsOverviewController.prototype.setData = function () {
                        var vm = this;
                        var index = 0;
                        vm.NewsService.GetPaged(vm.$scope.PageNum, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r) {
                            vm.$scope.model = r.Data;
                            vm.SplitToColData(3, r.Data);
                            var p = vm.GetPageNum() + 1;
                            vm.NewsService.GetPagedCount(p, vm.$scope.ActiveMonth.toString(), vm.$scope.ActiveYear.toString()).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/news?page=" + (p) + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/news?page=" + vm.GetPageNum() + "&month=" + vm.$scope.ActiveMonth.toString() + "&year=" + vm.$scope.ActiveYear.toString() + "#bottom";
                                }
                            });
                            index++;
                        });
                    };
                    //public ActiveGenreID: number;
                    NewsOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce",
                    ];
                    return NewsOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsOverviewController = NewsOverviewController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsOverviewController", FC.Modules.News.Controllers.NewsOverviewController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsOverviewController.js.map