var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location) {
            var Controllers;
            (function (Controllers) {
                var LocationDialogController = (function (_super) {
                    __extends(LocationDialogController, _super);
                    function LocationDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.FormID = '940BD72D-88E3-4201-98D6-042919BD918C';
                        vm.$scope.$location = $location;
                        vm.$scope.DoSaveEdit = this.DoSaveEdit;
                        vm.$scope = $scope;
                        vm.$scope.GetLocations = this.GetLocations;
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.$scope.IsLoading = false;
                        vm.$scope.IsCreating = false;
                        vm.$scope.IsEditing = false;
                        vm.$scope.IsDeleting = false;
                        vm.$scope.SetCountry = this.SetCountry;
                        vm.$scope.DoSave = this.DoSave;
                        vm.$scope.PhoneCodes = PhoneCodes;
                        vm.$scope.SelectedImagePath = FC.Core.Environment.MediaURLRoot;
                        vm.AddLocationThumbSavedListener(vm.$scope);
                        vm.AddProfileImageSavedListener(vm.$scope);
                        vm.RecoverModel(vm.$scope.model, $scope);
                        window.addEventListener("FCDataLoadingComplete", function (e) {
                            vm.$scope.inst.$scope.IsLoading = false;
                        });
                    }
                    LocationDialogController.prototype.SetCountry = function ($scope, countryID) {
                        $scope = $scope.inst.$scope;
                        var country = $scope.SysCountries.filter(function (v, i) {
                            return v.CountryID == countryID;
                        });
                        if (country[0]) {
                            $scope.model.Country = country[0];
                            var index = country[0].CultureIsoName.split("-")[1];
                            $scope.PhoneCode = PhoneCodes[index];
                        }
                    };
                    LocationDialogController.prototype.AddLocationThumbSavedListener = function ($scope) {
                        window.addEventListener("LocationThumbSaved", function (e) {
                            $scope.model.ThumbnailID = e["detail"];
                        });
                    };
                    LocationDialogController.prototype.AddProfileImageSavedListener = function ($scope) {
                        window.addEventListener("ProfileImageSaved", function (e) {
                            $scope.model.ProfileImageID = e["detail"];
                        });
                    };
                    LocationDialogController.prototype.DoEdit = function ($scope, model) {
                        $scope = $scope.inst.$scope;
                        $scope.DoCancelCRUD($scope);
                        $scope.IsEditing = true;
                        $scope.model = model;
                        $scope.inst.LocationService.GetLocation($scope.model.LocationID).then(function (r) {
                            $scope.model = r.Data;
                        });
                    };
                    LocationDialogController.prototype.DoCreate = function ($scope, countryID) {
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                        $scope.model = new FC.Shared.Models.Location();
                        $scope.model.CountryID = countryID;
                        $scope.SetCountry($scope, countryID);
                    };
                    LocationDialogController.prototype.DoSaveCreate = function ($scope) {
                        var vm = this;
                        $scope.IsCreating = false;
                        vm.FinishForm(vm.$scope);
                        $scope.inst.LocationService.Create($scope.model).then(function (r) {
                            $scope.IsCreated = r.Data.SUCCESS;
                        });
                    };
                    LocationDialogController.prototype.GetLocations = function ($scope, countryID) {
                        var vm = this;
                        $scope.inst.LocationService.GetByCountry(countryID).then(function (r) {
                            $scope.Locations = r.Data;
                        });
                    };
                    LocationDialogController.prototype.DoSaveEdit = function ($scope) {
                        var vm = this;
                        $scope.inst.LocationService.Update($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            $scope.IsSuccess = r.Data.SUCCESS;
                            $scope.DoCancelCRUD($scope);
                        });
                    };
                    LocationDialogController.prototype.DoSave = function ($scope) {
                        window.dispatchEvent(new CustomEvent("LocationSaveEvent", { 'detail': $scope.model }));
                    };
                    LocationDialogController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return LocationDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationDialogController = LocationDialogController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationDialogController", FC.Modules.Location.Controllers.LocationDialogController);
            })(Controllers = Location.Controllers || (Location.Controllers = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=LocationDialogController.js.map