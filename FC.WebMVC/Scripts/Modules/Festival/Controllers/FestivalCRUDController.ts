///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
///<reference path="../Festival.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Festival.Controllers {
    import CM = FC.Core.CoreModel;
    import SCM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class FestivalCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Festival.Controllers.FestivalCRUDController;
        public $scope: FC.Shared.ViewModels.IFestivalCRUDVM;
        public Recovery: SCM.Recovery;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$routeParams',
            '$location',
            "$sce",
            "$mdDialog" 
        ];

        constructor(
            $http: ng.IHttpService,
            $q,
            $scope: FC.Shared.ViewModels.IFestivalCRUDVM,
            $routeParams,
            $location: any,
            $sce,
            $mdDialog: ng.material.MDDialogService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            this.$scope = $scope;
            this.$scope.inst = this;
            this.$scope.SaveFormState = this.SaveFormState;
            this.$location = $location;
            this.$scope.model = new FC.Shared.Models.UFestival();
            this.$scope.MtModal = $mdDialog;
            this.$scope.Token = CacheManager.GetCookieValue("Token");

            window.addEventListener("LogoImageSaved", function (e: CustomEventInit) {
                vm.$scope.model.LogoID = e.detail;
                vm.$scope.MtModal.hide();
                vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + "/" + vm.$scope.model.LogoID;
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, $scope);
            });

            window.addEventListener("HeaderImageSaved", function (e: CustomEventInit) {
                vm.$scope.model.ProfileImageID = e.detail;
                vm.$scope.MtModal.hide();
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, $scope);
                ///vm.$scope["ProfileHeaderPath"]= FC.Core.Environment.MediaURLRoot + "/" + vm.$scope.model.LogoID;
            });
        }
        public RegisterID(id: string) {
            this.$scope.model.FestivalID = id;
        }
        public GetSelectedLogo(): string {
            var vm = this;
            window.addEventListener("ModalMediaSaveEvent", function (e:CustomEventInit) {
                vm.$scope.model.LogoID = e.detail
            });
            return vm.$scope.model.LogoID;
        }
        
        public OpenLogoModal(dirID: string, validationWidth: number, validationHeight: number, isThumbnail: boolean = false): void {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
            //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);

            if (vm.$scope.MtModal) {
                vm.$scope.MtModal.hide();
            }
            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
            opts.controllerAs = 'vm';
            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
            opts.locals = { local: [vm.$scope.MtModal, "LogoImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
            opts.clickOutsideToClose = true;
            vm.$scope.MtModal.show(opts);
        }

        public OpenHeaderImageModal(dirID: string, validationWidth: number, validationHeight: number, isThumbnail: boolean = false): void {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
            //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);

            if (vm.$scope.MtModal) {
                vm.$scope.MtModal.hide();
            }
            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
            opts.controllerAs = 'vm';
            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
            opts.locals = { local: [vm.$scope.MtModal, "HeaderImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
             opts.clickOutsideToClose = true;
            vm.$scope.MtModal.show(opts);
        }
    }
    FestivalModule.GetApplication().RegisterController("FC.Modules.Festival.Controllers.FestivalCRUDController", FC.Modules.Festival.Controllers.FestivalCRUDController);
}