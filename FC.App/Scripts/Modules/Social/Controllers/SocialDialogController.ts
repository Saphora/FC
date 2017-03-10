///<reference path="../../Core/FC.ts"/>
///<reference path="../Social.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/Validation/Validation.ts"/>



module FC.Modules.Social.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import CORE = FC.Core;
    export class SocialDialogController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public SocialService: FC.Modules.Social.Services.SocialService;

        public URLManSvc: FC.Core.Services.URLManagerService;
        public $sce;
        public $scope: Models.ISocialDialog;
        public $genericID: string;
        public $contentType: FC.Shared.Enum.SocialMediaBindable;
        public vm;

        static $inject = [
            '$http',
            '$q',
            '$uibModal',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
            'profiles',
            'genericId',
            'contentType',
            "FC.Core.Services.URLManagerService",
            "$sce",
            "FC.Modules.Social.Services.SocialService"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $uibModal,
            $scope,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $profiles: FC.Shared.Models.SocialProfile[],
            $genericId: string,
            $contentType: FC.Shared.Enum.SocialMediaBindable,
            UrlManagerService: FC.Core.Services.URLManagerService,
            $sce: ng.ISCEService,
            $socialService: FC.Modules.Social.Services.SocialService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope.$location = $location;
            vm.$scope.SocialProfiles = $profiles;
            vm.$scope.FormID = "415F7EA0-2A5B-48A0-B52B-C3EF5DE2A97D";
            vm.$scope = $scope;
            vm.$scope.IsCreating = false;
            vm.$genericID = $genericId;
            vm.$contentType = $contentType;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.SocialProfiles = $profiles;
            var v: FC.Shared.Util.Validator = FC.Shared.Util.Validator.GetInstance();
            vm.SocialService = $socialService;
            vm.$scope.DoSaveEdit = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.SocialService, vm.$scope);
            }
            vm.$scope.DoSaveCreate = function () {
                vm.$scope.model.GenericID = vm.$genericID;
                vm.$scope.model.ContentType = vm.$contentType;
                //@arg "CreateModel" overrides the default $scope["model"] because services requires a service message instead of DbEntity.
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.SocialService, vm.$scope);
            }
            vm.$scope.DoSaveDelete = function () {
                vm.$scope.model = arguments[0];
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.SocialService, vm.$scope);
            }
            vm.$scope.DoSaveForceDelete = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.ForceDelete, Shared.Controllers.ServiceType.SocialService, vm.$scope);
            }
            this.setData();
        }
        public listen(): void {
            var vm = this;
            window.addEventListener("REFRESH", function () {
                vm.setData();
            });
        }

        public SetRule(): void {
            var vm = this;
            var rule = new CORE.Validation.ValidationRuleItem();
            switch (vm.$scope.model.ProfileTypeID.toUpperCase()) {
                case "F090893B-A2F5-479A-A1C7-6221EED54DC0":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.InstagramURL);
                    break;
                case "33105BA5-0A40-4C70-852C-BF5F89A662C4":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.LinkedInURL);
                    break;
                case "C1036074-3FA5-4ACD-9CF5-8CFF8DB1337E":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.PinterestURL);
                    break;
                case "B7C6367D-3DF7-491E-98BA-F51E1D70B41B":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.GoogleURL);
                    break;
                case "0336CDB3-5CAC-4F6D-90F0-1B1378EA3990":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.SpotifyURL);
                    break;
                case "26C9840B-4496-457D-BFAF-1832C28EF291":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.DeezerURL);
                    break;
                case "67E9D8C7-7266-41A1-9275-3239FA25D04B":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.YoutubeURL);
                    break;
                case "D80118C6-4BEE-41DC-8F87-6E9BAE13DA49":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.MySpaceURL);
                    break;
                case "8A5C85BC-A5C2-4EE2-B1AF-985B183B2C92":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.FacebookURL);
                    break;
                case "06BA2AEA-8059-4E0E-AAA5-DA28CCE9988F":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.SoundcloudURL);
                    break;
                case "26FE0A26-7D52-440C-B0A8-31615D508A87":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.TwitterURL);
                    break;
                case "0E8AE414-BF77-464A-8DCE-2983AB9F6E59":
                    rule.Rule = new CORE.Validation.Validation(CORE.Validation.ValidationRule.Website);
                    break;
                default:
                    rule.Rule = new CORE.Validation.Validation(FC.Core.Validation.ValidationRule.Any);
                break;
            }
            rule.FieldName = "URL";
            this.AddValidationRule(rule);
        }

        public DoCreate(step:number) {
            var vm = this;
            vm.$scope.IsCreating = true;
            vm.$scope.model = new FC.Shared.Models.SocialProfile();
            vm.$scope.model.GenericID = vm.$scope.GenericID;
            vm.$scope.model.ContentType = vm.$scope.ContentType;
            debugger;
            this.$scope.WizardCreateStep = step;
        }

        private setData(): void {
            var vm = this;
            vm.SocialService.GetAllTypes().then(function (r) {
                var sysProfileTypes = new List<FC.Shared.Models.SocialProfileType>(r.Data);
                var currentProfileTypes = new List<FC.Shared.Models.SocialProfileType>();
                vm.$scope.SocialProfiles.forEach(function (value, index) {
                    currentProfileTypes.push(value.ProfileType);
                });
                vm.$scope.ProfileTypes = sysProfileTypes.RemoveRange(currentProfileTypes, "SocialProfileTypeID");
            });
        }
    }
    SocialModule.GetApplication().RegisterController("FC.Modules.Social.Controllers.SocialDialogController", FC.Modules.Social.Controllers.SocialDialogController);
}