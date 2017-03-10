var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details) {
            var Controllers;
            (function (Controllers) {
                var FestivalDetailDialogController = (function (_super) {
                    __extends(FestivalDetailDialogController, _super);
                    function FestivalDetailDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '953ACE20-92CE-47DC-9360-B0F9D5200884';
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        this.setFestivalDetailData($routeParams["festivalID"]);
                        var v = FC.Shared.Util.Validator.GetInstance();
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveCreate = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveForceDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.ForceDelete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                    }
                    FestivalDetailDialogController.prototype.setFestivalDetailData = function (detailID) {
                        var vm = this;
                        vm.FestivalService.GetFestival(detailID).then(function (r) {
                            var $scope = vm.$scope;
                            $scope.model = new FC.Shared.Models.UFestival();
                            $scope.model = r.Data;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                            if (r.Data.ProfileImage) {
                                profileImgUrl = FC.Core.Environment.MediaURLRoot + "/?action=getimg&MediaID=" + r.Data.ProfileImage.MediaID + "&IsObsolete=false&Width=" + r.Data.ProfileImage.Width;
                            }
                            $scope.IsLoading = false;
                        });
                    };
                    FestivalDetailDialogController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return FestivalDetailDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalDetailDialogController = FestivalDetailDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.FestivalDetailDialogController", FC.Modules.Details.Controllers.FestivalDetailDialogController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FestivalDetailDialogController.js.map