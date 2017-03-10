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
                var SC = FC.Shared.Controllers;
                var DetailsController = (function (_super) {
                    __extends(DetailsController, _super);
                    function DetailsController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                    DetailsController.prototype.Close = function ($scope, $parent) {
                        $scope.MtModal.hide();
                    };
                    DetailsController.prototype.ListenRefresh = function () {
                        var vm = this;
                        window.addEventListener("REFRESH", function () {
                            vm.setFestivalDetailData(vm.$scope.$routeParams["festivalID"]);
                        });
                    };
                    DetailsController.prototype.LocationSaveListener = function () {
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("LocationSaveEvent", function (e) {
                            vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.LogoSaveListener = function () {
                        var vm = this;
                        window.addEventListener("FestivalLogoSaved", function (e) {
                            vm.$scope.model.LogoID = e["detail"];
                            vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.ArtistSaveListener = function () {
                        var vm = this;
                        window.addEventListener("ArtistsSaved", function (e) {
                            var selected = e["detail"]["SelectedArtists"];
                            var result = new Array();
                            selected.forEach(function (v, i) {
                                var artist = new FC.Shared.Models.UArtist();
                                artist.ArtistID = v.ArtistID;
                                result.push(artist);
                            });
                            vm.$scope.model.Artists = result;
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        });
                    };
                    DetailsController.prototype.DoStartEdit = function (partialName, $scope, ev) {
                        var opts = {};
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
                                            $scope.model.SocialProfiles = new Array();
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
                            }
                            else {
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
                    };
                    DetailsController.prototype.setFestivalDetailData = function (detailID) {
                        var vm = this;
                        vm.FestivalService.GetFestival(detailID).then(function (r) {
                            vm.$scope.model = r.Data;
                            vm.$scope.Festival = r.Data;
                            vm.$scope.Location = r.Data.FestivalLocation;
                            var m = new SC.META();
                            m.PageDesc = r.Data.Description;
                            m.PageTitle = r.Data.Name;
                            m.PageIMG = vm.$scope.MediaURLRoot + "/" + r.Data.LogoID + ".img?&thumb=true";
                            m.PageKeys = r.Data.Name + "," + r.Data.FestivalLocation.LocationName + "," + r.Data.FestivalLocation.Country.Name + "," + r.Data.FestivalLocation.City + "," + r.Data.StartDate;
                            vm.SetMETA(m, null);
                            vm.$scope.model = r.Data;
                            var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                            if (r.Data.ProfileImage) {
                                profileImgUrl = FC.Core.Environment.MediaURLRoot + "/?action=getimg&MediaID=" + r.Data.ProfileImage.MediaID + "&IsObsolete=false&Width=" + r.Data.ProfileImage.Width;
                            }
                            vm.$scope.ProfileHeaderImg = profileImgUrl;
                            vm.$scope.IsLoading = false;
                        });
                    };
                    DetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.LocationService.GetLocation(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Location = r.Data;
                        });
                    };
                    DetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["festivalID"]) {
                            this.setFestivalDetailData($routeParams["festivalID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    DetailsController.$inject = [
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
                    return DetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.DetailsController = DetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.DetailsController", FC.Modules.Details.Controllers.DetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=DetailsController.js.map