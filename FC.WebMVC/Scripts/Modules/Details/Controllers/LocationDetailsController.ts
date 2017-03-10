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
    export class LocationDetailsController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public $scope: VM.IDetailScope<FC.Shared.Models.Location>;
        
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
            "$sce",
            "FC.Modules.Genres.Services.GenreService",
            "FC.Modules.Artists.Services.ArtistService",
            "FC.Modules.Festival.Services.FestivalService",
            "FC.Modules.Calendar.Services.CalendarService",
            "FC.Modules.Location.Services.LocationService"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: FC.Shared.ViewModels.IDetailScope<FC.Shared.Models.Location>,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService,
            GenreService: FC.Modules.Genres.Services.GenreService,
            ArtistsService: FC.Modules.Artists.Services.ArtistService,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            CalendarService: FC.Modules.Calendar.Services.CalendarService,
            LocationService: FC.Modules.Location.Services.LocationService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            var vm = this;
            vm.FestivalService = FestivalService;
            vm.LocationService = LocationService;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '653ACEF0-92CE-47DC-9360-B0FED5200884';
            vm.$scope.inst = this;
            vm.$scope = $scope;
            //vm.$scope.DoDelete = this.DoDelete;
            //vm.$scope.DoSaveDelete = this.DoSaveDelete;

            vm.$scope.DoEdit = this.DoEdit;

            vm.$scope.DoSaveEdit = function () {
                vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.LocationService, vm.$scope).then(function (r) {
                  
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
            window.addEventListener("LocationThumbSaved", function (e) {
                vm.$scope.model.ThumbnailID = e["detail"];
                vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
                vm.LocationService.Update(vm.$scope.model).then(function (r) {
                    if (r.Data.SUCCESS == true) {
                        window.alert(r.Data.MSG);
                        
                    }
                }).catch(function (r) {
                    window.alert("There was error while saving your festival. Please try again later.");
                })
            });
        }

        public DoEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.Location>, ev) {
            var opts: ng.material.MDDialogOptions = {};
            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                if (r == true) {
                    switch (partialName) {
                        case "location-name":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "location":
                            opts.controller = FC.Modules.Location.Controllers.LocationDialogController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/create.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "location-thumbnail":
                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;

                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
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
                        //$scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        // $scope.status = 'You cancelled the dialog.';
                    });
                }
            });
        }
        
        //private setFestivalDetailData(detailID: string): void {
        //    var vm = this;
        //    vm.FestivalService.GetFestival(detailID).then(function (r) {
        //        vm.$scope.Festival = r.Data;
        //        vm.$scope.model = r.Data;
        //        var profileImgUrl = "/Resources/images/profile-header-default.jpg";
        //        if (r.Data.ProfileImage) {
        //            profileImgUrl = FC.Core.Environment.MediaURLRoot +"/?action=getimg&MediaID="+r.Data.ProfileImage.MediaID+"&IsObsolete=false&Width="+r.Data.ProfileImage.Width;
        //        }
        //        vm.$scope.ProfileHeaderImg = profileImgUrl;
        //        vm.$scope.IsLoading = false;
        //    });
        //}

        private setNewsDetailData(detailID: string):void {
            debugger;
        }

        private setArtistDetailData(detailID: string): void {
            debugger;
        }

        private setReportDetailData(detailID: string): void {
            debugger;
        }

        private setLocationDetailData(detailID: string): void {
            var vm = this;
            vm.LocationService.GetLocation(detailID).then(function (r) {
                vm.$scope.IsLoading = false;
                vm.$scope.Location = r.Data;
                vm.$scope.model = r.Data;
            });
        }
        public determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute) {
            if ($routeParams["festivalID"]) {
               // this.setFestivalDetailData($routeParams["festivalID"]);
            } else if ($routeParams["newsID"]) {
                this.setNewsDetailData($routeParams["newsID"]);
            } else if ($routeParams["artistID"]) {
                this.setArtistDetailData($routeParams["artistID"]);
            } else if ($routeParams["reportID"]) {
                this.setReportDetailData($routeParams["reportID"]);
            } else if ($routeParams["locationID"]) {
                this.setLocationDetailData($routeParams["locationID"]);
            } else {
                throw new Error("This action is not specified in the details controller");
            }
        }
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.LocationDetailsController", FC.Modules.Details.Controllers.LocationDetailsController);
}