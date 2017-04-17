///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Location.Controllers {
    import CM = FC.Core.CoreModel;
    import SCM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import CORE = FC.Core;
    export class LocationCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Location.Controllers.LocationCRUDController;
        public $scope: Models.ILocationCRUDVM;
        public Recovery: SCM.Recovery;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            "$sce",
            "$mdDialog"
        ];

        constructor(
            $http: ng.IHttpService,
            $q,
            $scope: Models.ILocationCRUDVM,
            
            $location: any,
            $sce,
            $mdDialog
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
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
            
            this.RecoverModel();
            this.AddValidation();

        }

        private removeCharacters(zipcode: string): string {
            return zipcode.replace(/[^0-9]+/g, "");
        }

        public AutoFill() {
            var vm = this;
            if (vm.$scope.model.CountryID && vm.$scope.model.ZIPCode && vm.$scope.model.City && vm.$scope.model.Address) {
                var countries: List<MODELS.UCountry> = new List<MODELS.UCountry>(vm.$scope.SysCountries);
                var country = countries.Find("CountryID", vm.$scope.model.CountryID);
                var countryCode = country.CultureIsoName.split('-')[1];
                vm.GeonamesService.Search(vm.removeCharacters(vm.$scope.model.ZIPCode), countryCode).then(function (r) {
                    if (r['data']['postalCodes']) {
                        var response: List<FC.Shared.Models.ZIPSearchResult> = new List<FC.Shared.Models.ZIPSearchResult>(r['data']['postalCodes']);
                        var first = response.First();
                        if (first) {
                            vm.$scope.model.Latitude = first.lat;
                            vm.$scope.model.Longitude = first.lng;
                            vm.$scope.model.City = first.placeName;
                            vm.$scope.MapsURL = vm.$scope.$sce.trustAsResourceUrl(
                                'https://www.google.com/maps/embed/v1/place?&zoom=16&key=AIzaSyAaqNdfzf3K2JVYb5hu9lvabVg8rXG6RiQ&q=' + country.Name + '+' + vm.$scope.model.City + '+' + vm.$scope.model.Address + '&maptype=roadmap'
                            );
                            vm.$scope.LatLongSet = true;
                            vm.$scope.MapsReady = true;
                        }
                    }
                });
            } else {
                vm.$scope.MapsReady = false;
            }
        }

        public AddValidation(): void {
            var vm = this;
            var rule = new CORE.Validation.ValidationRuleItem();
            rule.FieldName = "Website";
            rule.FieldLabel = "website";
            rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Website, false);

            var rule2 = new CORE.Validation.ValidationRuleItem();
            rule2.FieldName = "ZIPCode";
            rule2.FieldLabel = "zip code"
            rule2.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Zip, true);

            var rule3 = new CORE.Validation.ValidationRuleItem();
            rule3.FieldName = "Email";
            rule3.FieldLabel = "e-mail address";
            rule3.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Email, false);

            var rule4= new CORE.Validation.ValidationRuleItem();
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
        }
        public DoSaveCreate($scope: Models.ILocationCRUDVM): void {
            var vm = this;
            $scope = $scope.inst.$scope;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.LocationService, $scope);
        }

        public DoSaveEdit($scope: Models.ILocationCRUDVM): void {
            var vm = this;
            $scope = $scope.inst.$scope;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.LocationService, $scope);
        }

        public DoSaveDelete($scope: Models.ILocationCRUDVM): void {
            var vm = this;
            $scope = $scope.inst.$scope;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.LocationService, $scope);
        }

        public RecoverModel(): void {
            var vm = this;
            var r = super.RecoverModel<MODELS.Location>(vm.$scope.model, vm.$scope);
            vm.$scope.model = r;
        }
  
    }
    LocationModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationCRUDController", FC.Modules.Location.Controllers.LocationCRUDController);
}