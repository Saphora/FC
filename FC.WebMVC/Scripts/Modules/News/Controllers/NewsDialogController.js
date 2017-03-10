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
                var SCTRL = FC.Shared.Controllers;
                var NewsDialogController = (function (_super) {
                    __extends(NewsDialogController, _super);
                    function NewsDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.NewsService = new FC.Modules.News.Services.NewsService($http, $q);
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = 'B6317654-30F4-4091-B0BE-E2E3568178D0';
                        vm.$scope.inst = this;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope = $scope;
                        vm.$scope.PageNum = 0;
                        vm.$scope.DoSaveEdit = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveDelete = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Delete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveForceDelete = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.ForceDelete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoSaveCreate = function ($scope) {
                            vm.DoSaveCRUD(SCTRL.ActionType.Create, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                                vm.$scope.IsLoading = false;
                            });
                        };
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoDelete = this.DoDelete;
                        //vm.determineDetailType($routeParams, $route);
                        //vm.LogoSaveListener();
                        vm.RegisterModel(vm.$scope);
                    }
                    NewsDialogController.prototype.ShowMore = function ($scope) {
                        $scope.PageNum++;
                    };
                    NewsDialogController.prototype.RegisterModel = function ($scope) {
                        $scope.News = new Array();
                        var m = (new Date().getMonth() + 1).toString();
                        var y = (new Date().getFullYear()).toString();
                        this.NewsService.GetPaged(0, m, y).then(function (r) {
                            $scope.News = r.Data;
                        });
                    };
                    NewsDialogController.prototype.DoCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                    };
                    NewsDialogController.prototype.DoEdit = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsEditing = true;
                    };
                    NewsDialogController.prototype.DoDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.IsDeleting = true;
                    };
                    NewsDialogController.prototype.Close = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.MtModal.hide();
                    };
                    NewsDialogController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService"
                    ];
                    return NewsDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsDialogController = NewsDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsDialogController", FC.Modules.News.Controllers.NewsDialogController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsDialogController.js.map