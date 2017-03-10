var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
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
                var CORE = FC.Core;
                var LocationCRUDController = (function (_super) {
                    __extends(LocationCRUDController, _super);
                    function LocationCRUDController($http, $q, $scope, $route, $routeParams, $location, $sce, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        vm.CheckAuth($scope);
                        this.$scope.inst = this;
                        this.$scope.$sce = $sce;
                        this.$scope.MtModal = $mdDialog;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.FormID = "89A2B8B1-6087-407C-BBAB-DC4961F927D0";
                        this.$scope.SaveFieldState = this.SaveFieldState;
                        this.$scope.GetFieldState = this.GetFieldState;
                        this.$scope.SaveFormState = this.SaveFormState;
                        this.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        this.$location = $location;
                        this.$scope.model = new FC.Shared.Models.Location();
                        this.$scope.$location = $location;
                        this.$scope.$routeParams = $routeParams;
                        if ($routeParams["step"]) {
                            this.$scope.WizardStep = $routeParams["step"];
                        }
                        else {
                            this.$scope.WizardStep = 1;
                        }
                        if ($routeParams["LocationID"]) {
                            vm.FinishForm(vm.$scope);
                            vm.$scope.IsEditing = true;
                            vm.$scope.LocationID = $routeParams["LocationID"];
                            vm.$scope.SaveFieldState($scope, "LocationID", vm.$scope.LocationID);
                            vm.$scope.IsCreating = false;
                            vm.$scope.IsLoading = true;
                            vm.LocationService.GetLocation($routeParams["LocationID"]).then(function (r) {
                                vm.$scope.model = r.Data;
                                vm.$scope.IsLoading = false;
                                vm.$scope.MapsReady = true;
                                vm.$scope.MapsURL = vm.$scope.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?&zoom=16&key=AIzaSyAaqNdfzf3K2JVYb5hu9lvabVg8rXG6RiQ&q=' + r.Data.Country.Name + '+' + r.Data.City + '+' + r.Data.Address + '&maptype=roadmap');
                            });
                        }
                        else {
                            vm.$scope.IsLoading = false;
                            vm.$scope.IsCreating = true;
                            vm.$scope.IsEditing = false;
                        }
                        this.RecoverModel();
                        this.AddValidation();
                    }
                    LocationCRUDController.prototype.removeCharacters = function (zipcode) {
                        return zipcode.replace(/[^0-9]+/g, "");
                    };
                    LocationCRUDController.prototype.AutoFill = function () {
                        var vm = this;
                        if (vm.$scope.model.CountryID && vm.$scope.model.ZIPCode && vm.$scope.model.City && vm.$scope.model.Address) {
                            var countries = new FC.List(vm.$scope.SysCountries);
                            var country = countries.Find("CountryID", vm.$scope.model.CountryID);
                            var countryCode = country.CultureIsoName.split('-')[1];
                            vm.GeonamesService.Search(vm.removeCharacters(vm.$scope.model.ZIPCode), countryCode).then(function (r) {
                                if (r['data']['postalCodes']) {
                                    var response = new FC.List(r['data']['postalCodes']);
                                    var first = response.First();
                                    if (first) {
                                        vm.$scope.model.Latitude = first.lat;
                                        vm.$scope.model.Longitude = first.lng;
                                        vm.$scope.model.City = first.placeName;
                                        vm.$scope.MapsURL = vm.$scope.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?&zoom=16&key=AIzaSyAaqNdfzf3K2JVYb5hu9lvabVg8rXG6RiQ&q=' + country.Name + '+' + vm.$scope.model.City + '+' + vm.$scope.model.Address + '&maptype=roadmap');
                                        vm.$scope.LatLongSet = true;
                                        vm.$scope.MapsReady = true;
                                    }
                                }
                            });
                        }
                        else {
                            vm.$scope.MapsReady = false;
                        }
                    };
                    LocationCRUDController.prototype.AddValidation = function () {
                        var vm = this;
                        var rule = new CORE.Validation.ValidationRuleItem();
                        rule.FieldName = "Website";
                        rule.FieldLabel = "website";
                        rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Website, false);
                        var rule2 = new CORE.Validation.ValidationRuleItem();
                        rule2.FieldName = "ZIPCode";
                        rule2.FieldLabel = "zip code";
                        rule2.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Zip, true);
                        var rule3 = new CORE.Validation.ValidationRuleItem();
                        rule3.FieldName = "Email";
                        rule3.FieldLabel = "e-mail address";
                        rule3.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Email, false);
                        var rule4 = new CORE.Validation.ValidationRuleItem();
                        rule4.FieldName = "LocationName";
                        rule4.FieldLabel = "name";
                        rule4.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        var rule5 = new CORE.Validation.ValidationRuleItem();
                        rule5.FieldName = "Phone";
                        rule5.FieldLabel = "phone";
                        rule5.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Phone, false);
                        var rule6 = new CORE.Validation.ValidationRuleItem();
                        rule6.FieldName = "City";
                        rule6.FieldLabel = "city";
                        rule6.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        var rule7 = new CORE.Validation.ValidationRuleItem();
                        rule7.FieldName = "Address";
                        rule7.FieldLabel = "address";
                        rule7.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Name, true);
                        this.AddValidationRule(rule);
                        this.AddValidationRule(rule2);
                        this.AddValidationRule(rule3);
                        this.AddValidationRule(rule4);
                        this.AddValidationRule(rule5);
                        this.AddValidationRule(rule6);
                        this.AddValidationRule(rule7);
                    };
                    LocationCRUDController.prototype.DoSaveCreate = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.DoSaveEdit = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.DoSaveDelete = function ($scope) {
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.LocationService, $scope);
                    };
                    LocationCRUDController.prototype.RecoverModel = function () {
                        var vm = this;
                        var r = _super.prototype.RecoverModel.call(this, vm.$scope.model, vm.$scope);
                        vm.$scope.model = r;
                    };
                    //public ActiveGenreID: number;
                    LocationCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "$mdDialog"
                    ];
                    return LocationCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationCRUDController = LocationCRUDController;
                LocationModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationCRUDController", FC.Modules.Location.Controllers.LocationCRUDController);
            })(Controllers = Location.Controllers || (Location.Controllers = {}));
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=LocationCRUDController.js.map