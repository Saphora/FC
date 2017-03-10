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
                var NewsCRUDController = (function (_super) {
                    __extends(NewsCRUDController, _super);
                    function NewsCRUDController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setData();
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.$sce = $sce;
                        vm.$scope.$location = $location;
                        vm.$scope.Date = new Date();
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.FormID = 'A96CA9E2-D76B-4443-A35B-F9D54EADC2E0';
                        vm.$scope.IsCreating = true;
                        vm.RecoverModel(vm.$scope.model, $scope);
                        vm.$scope.model = vm.$scope.RecoverModel(vm.$scope.model, vm.$scope);
                        if (vm.$scope.model == null) {
                            vm.$scope.model = new FC.Shared.Models.UNews();
                        }
                        vm.$scope.model.SourceName = "Festival Calendar";
                        vm.$scope.model.SourceURL = "http://www.festival-calendar.com";
                        window.addEventListener('DateChanged', this.DateChanged);
                        window.addEventListener('NewsImageSaved', function (e) {
                            vm.$scope.model.ThumbnailID = e.detail;
                        });
                        window.addEventListener("MODAL_CLOSE_SUCCESS", function (r) {
                            vm.$scope.$location.path('/news/');
                        });
                    }
                    NewsCRUDController.prototype.DoSave = function (action) {
                        var vm = this;
                        if (action == "c") {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                        }
                        if (action == "e") {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.NewsService, vm.$scope);
                        }
                        vm.FinishForm(vm.$scope);
                    };
                    NewsCRUDController.prototype.NewsImageSaved = function (e) {
                        this.$scope.model.ThumbnailID = e.detail;
                    };
                    NewsCRUDController.prototype.DateChanged = function (e) {
                        var vm = this;
                        var value = new Date(e.detail);
                        this.$scope.Date = value;
                    };
                    NewsCRUDController.prototype.setData = function () {
                        var vm = this;
                        if (vm.$routeParams['newsid']) {
                            vm.NewsService.GetNewsById(vm.$routeParams['newsid']).then(function (r) {
                                vm.$scope.model = r.Data;
                            });
                        }
                        else {
                            vm.$scope.model = new FC.Shared.Models.UNews();
                        }
                    };
                    //public ActiveGenreID: number;
                    NewsCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce"
                    ];
                    return NewsCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.NewsCRUDController = NewsCRUDController;
                NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsCRUDController", FC.Modules.News.Controllers.NewsCRUDController);
            })(Controllers = News.Controllers || (News.Controllers = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsCRUDController.js.map