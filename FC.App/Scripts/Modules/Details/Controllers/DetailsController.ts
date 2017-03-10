///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Details.Controllers {
    import SC = FC.Shared.Controllers;
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class DetailsController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public $scope: VM.IDetailScope<FC.Shared.Models.UFestival>;
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
            $scope,
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
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.DoStartEdit = this.DoStartEdit;
            vm.$scope.$routeParams = $routeParams;
            vm.determineDetailType($routeParams, $route);
            vm.ArtistSaveListener();
            vm.LogoSaveListener();
            vm.LocationSaveListener();
            vm.ListenRefresh();
        }

        public Close($scope: VM.IDetailScope<FC.Shared.Models.UFestival>, $parent: VM.IDetailScope<FC.Shared.Models.UFestival>) {
            $scope.MtModal.hide();
        }

        public ListenRefresh() {
            var vm = this;
            window.addEventListener("REFRESH", function () {
                
                vm.setFestivalDetailData(vm.$scope.$routeParams["festivalID"]);
            });
        }

        public LocationSaveListener() {
            var vm = this;
            vm.$scope.IsLoading = true;
            window.addEventListener("LocationSaveEvent", function (e) {
                vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            });
        }

        public LogoSaveListener() {
            var vm = this;
            window.addEventListener("FestivalLogoSaved", function (e) {
                vm.$scope.model.LogoID = e["detail"];
                vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            });
        }
        public ArtistSaveListener() {
            var vm = this;
            window.addEventListener("ArtistsSaved", function (e) {
                var selected: FC.Modules.Artists.Models.ArtistListVM[] = e["detail"]["SelectedArtists"];
                var result = new Array<FC.Shared.Models.UArtist>();
                selected.forEach(function (v, i) {
                    var artist = new FC.Shared.Models.UArtist();
                    artist.ArtistID = v.ArtistID;
                    result.push(artist);
                });
                vm.$scope.model.Artists = result;
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                
            });
        }

        public DoStartEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.UFestival>, ev) {
            var opts: ng.material.MDDialogOptions = {};
            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                if (r == true) {
                    switch (partialName) {
                        case "festival-name":
                            opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/festival/festival-name.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "festival-logo":
                            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                            opts.controllerAs = 'vm';
                            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                            opts.parent = document.body;
                            opts.locals = { local: [$scope.MtModal, "FestivalLogoSaved", $scope.model.MediaDirectoryID] },
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "festival-date":
                            opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/festival/festival-date.html';
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
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/select.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "festival-artists":
                            opts.controller = FC.Modules.Artists.Controllers.ArtistModalController;
                            opts.controllerAs = 'vm';
                            opts.templateUrl = '/Scripts/modules/artists/views/artist-modal.html';
                            opts.parent = document.body;
                            opts.locals = { local: [$scope.MtModal, "ArtistsSaved"] },
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "headlines":
                            opts.controller = FC.Modules.News.Controllers.NewsDialogController;
                            opts.templateUrl = '/Scripts/modules/news/views/news-dialog.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                            $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                            $scope.MtModal.show(opts).then(function (answer) {
                                //$scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                // $scope.status = 'You cancelled the dialog.';
                            });
                            break;
                        case "social":
                            opts.controller = FC.Modules.Social.Controllers.SocialDialogController;
                            if (!$scope.model.SocialProfiles) {
                                $scope.model.SocialProfiles = new Array<FC.Shared.Models.SocialProfile>();
                            }
                            opts.controllerAs = 'vm';
                            opts.locals = { profiles: $scope.model.SocialProfiles, genericId: $scope.model.FestivalID, contentType: FC.Shared.Enum.SocialMediaBindable.Festival };
                            opts.templateUrl = '/Scripts/modules/Social/views/social-dialog.html';
                            opts.parent = document.body;
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
                    //$scope.model.EndDate = new Date($scope.model.EndDate.toString());
                    //$scope.model.StartDate = new Date($scope.model.StartDate.toString());
                    $scope.MtModal.show(opts).then(function (answer) {
                        //$scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        // $scope.status = 'You cancelled the dialog.';
                    });
                }
            });
        }

        private setFestivalDetailData(detailID: string): void {
            var vm = this;
            vm.FestivalService.GetFestival(detailID).then(function (r) {
                vm.$scope.model = r.Data;
                vm.$scope.Festival = r.Data;
                vm.$scope.Location = r.Data.FestivalLocation;
                var m: SC.META = new SC.META();
                m.PageDesc = r.Data.Description;
                m.PageTitle = r.Data.Name;
                m.PageIMG = vm.$scope.MediaURLRoot + "/" + r.Data.LogoID + ".img?&thumb=true";
                m.PageKeys = r.Data.Name + "," + r.Data.FestivalLocation.LocationName + "," + r.Data.FestivalLocation.Country.Name + "," + r.Data.FestivalLocation.City + "," + r.Data.StartDate;
                vm.SetMETA(m, null);
                vm.$scope.model = r.Data;
                var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                if (r.Data.ProfileImage) {
                    profileImgUrl = FC.Core.Environment.MediaURLRoot +"/?action=getimg&MediaID="+r.Data.ProfileImage.MediaID+"&IsObsolete=false&Width="+r.Data.ProfileImage.Width;
                }
                vm.$scope.ProfileHeaderImg = profileImgUrl;
                vm.$scope.IsLoading = false;
            });
        }


        private setLocationDetailData(detailID: string): void {
            var vm = this;
            vm.LocationService.GetLocation(detailID).then(function (r) {
                vm.$scope.IsLoading = false;
                vm.$scope.Location = r.Data;
            });
        }
        public determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute) {
            if ($routeParams["festivalID"]) {
                this.setFestivalDetailData($routeParams["festivalID"]);
            } else {
                throw new Error("This action is not specified in the details controller");
            }
        }
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.DetailsController", FC.Modules.Details.Controllers.DetailsController);
}