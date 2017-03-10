///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Details.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import SCTRL = FC.Shared.Controllers;
    export class ArtistDetailsController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public $scope: VM.IDetailScope<FC.Shared.Models.UArtist>;

        static $inject = [
            '$http',
            '$q',
            '$uibModal',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $uibModal,
            $scope: FC.Shared.ViewModels.IDetailScope<FC.Shared.Models.UArtist>,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            var vm = this;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '2F97BF92-A295-4D5C-A47C-67A274801DD0';
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            //vm.$scope.DoDelete = this.DoDelete;
            //vm.$scope.DoSaveDelete = this.DoSaveDelete;

            vm.$scope.DoEdit = this.DoEdit;

            vm.$scope.DoSaveEdit = function () {
                vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.ArtistService, vm.$scope).then(function (r) {

                });
            }

            //vm.$scope.DoCreate = this.DoCreate;
            //vm.$scope.DoSaveCreate = this.DoSaveCreate;

            vm.determineDetailType($routeParams, $route);
            vm.LogoSaveListener();

        }

        public Close($scope: VM.IDetailScope<FC.Shared.Models.Location>, $parent: VM.IDetailScope<FC.Shared.Models.Location>) {
            $scope.MtModal.hide();
        }

        //public LocationSaveListener() {
        //    var vm = this;
        //    vm.$scope.IsLoading = true;
        //    window.addEventListener("LocationSaveEvent", function (e) {
        //        vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
        //        vm.FestivalService.Update(vm.$scope.model).then(function (r) {
        //            vm.FestivalService.GetFestival(vm.$scope.model.FestivalID).then(function (r2) {
        //                vm.$scope.MtModal.hide();
        //                vm.$scope.IsLoading = false;
        //            });
        //        });
        //    });
        //}

        public LogoSaveListener() {
            var vm = this;
            window.addEventListener("LogoImageSaved", function (e) {
                vm.$scope.model.LogoID = e["detail"];
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.ArtistService, vm.$scope);
            });
        }

        public DoEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.UArtist>,ev) {
            var opts: ng.material.MDDialogOptions = {};
            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                if (r == true) {
                    switch (partialName) {
                        case "artist-name":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                            }, function () {;
                            });
                            break;
                        case "logo":
                            debugger;
                            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                            opts.controllerAs = 'vm';
                            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                            opts.parent = document.body;
                            opts.locals = { local: [$scope.MtModal, "LogoImageSaved", $scope.model.MediaDirectoryID] },
                                opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "artist-thumbnail":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                            }, function () {
                            });
                            break;
                        case "artist-social":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                            }, function () {
                            });
                            break;
                        case "artist-genres":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                            }, function () {
                            });
                            break;
                    }
                } else {
                    window.addEventListener("AUTH_SUCCESS", function () {
                        $scope.MtModal.hide();
                    });
                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                    opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                    opts.parent = document.body;
                    opts.targetEvent = ev;
                    opts.clickOutsideToClose = true;
                    $scope.MtModal.show(opts).then(function (answer) {
                    }, function () {
                    });
                }
            });
        }

        private setArtistDetailData(detailID: string): void {
            var vm = this;
            vm.ArtistService.GetByID(detailID).then(function (r) {
                vm.$scope.Artist = r.Data;
                vm.$scope.model = r.Data;
            });
        }

        private setLocationDetailData(detailID: string): void {
            var vm = this;
            vm.ArtistService.GetByID(detailID).then(function (r) {
                vm.$scope.IsLoading = false;
                vm.$scope.Artist = r.Data;
                vm.$scope.model = r.Data;
            });
        }
        public determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute) {
            if ($routeParams["artistID"]) {
                this.setArtistDetailData($routeParams["artistID"]);
            } else {
                throw new Error("This action is not specified in the details controller");
            }
        }
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.ArtistDetailsController", FC.Modules.Details.Controllers.ArtistDetailsController);
}