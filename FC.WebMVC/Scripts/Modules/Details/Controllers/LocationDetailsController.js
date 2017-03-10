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
                var SCTRL = FC.Shared.Controllers;
                var LocationDetailsController = (function (_super) {
                    __extends(LocationDetailsController, _super);
                    function LocationDetailsController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                        };
                        //vm.$scope.DoCreate = this.DoCreate;
                        //vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.determineDetailType($routeParams, $route);
                        vm.LogoSaveListener();
                    }
                    LocationDetailsController.prototype.Close = function ($scope, $parent) {
                        $scope.MtModal.hide();
                    };
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
                    LocationDetailsController.prototype.LogoSaveListener = function () {
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
                            });
                        });
                    };
                    LocationDetailsController.prototype.DoEdit = function (partialName, $scope, ev) {
                        var opts = {};
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
                                $scope.MtModal.show(opts).then(function (answer) {
                                    //$scope.status = 'You said the information was "' + answer + '".';
                                }, function () {
                                    // $scope.status = 'You cancelled the dialog.';
                                });
                            }
                        });
                    };
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
                    LocationDetailsController.prototype.setNewsDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setArtistDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setReportDetailData = function (detailID) {
                        debugger;
                    };
                    LocationDetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.LocationService.GetLocation(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Location = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    LocationDetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["festivalID"]) {
                        }
                        else if ($routeParams["newsID"]) {
                            this.setNewsDetailData($routeParams["newsID"]);
                        }
                        else if ($routeParams["artistID"]) {
                            this.setArtistDetailData($routeParams["artistID"]);
                        }
                        else if ($routeParams["reportID"]) {
                            this.setReportDetailData($routeParams["reportID"]);
                        }
                        else if ($routeParams["locationID"]) {
                            this.setLocationDetailData($routeParams["locationID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    LocationDetailsController.$inject = [
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
                    return LocationDetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LocationDetailsController = LocationDetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.LocationDetailsController", FC.Modules.Details.Controllers.LocationDetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=LocationDetailsController.js.map