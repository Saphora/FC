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
                var ArtistDetailsController = (function (_super) {
                    __extends(ArtistDetailsController, _super);
                    function ArtistDetailsController($http, $q, $uibModal, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                        };
                        //vm.$scope.DoCreate = this.DoCreate;
                        //vm.$scope.DoSaveCreate = this.DoSaveCreate;
                        vm.determineDetailType($routeParams, $route);
                        vm.LogoSaveListener();
                    }
                    ArtistDetailsController.prototype.Close = function ($scope, $parent) {
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
                    ArtistDetailsController.prototype.LogoSaveListener = function () {
                        var vm = this;
                        window.addEventListener("LogoImageSaved", function (e) {
                            vm.$scope.model.LogoID = e["detail"];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.ArtistService, vm.$scope);
                        });
                    };
                    ArtistDetailsController.prototype.DoEdit = function (partialName, $scope, ev) {
                        var opts = {};
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
                                        }, function () {
                                            ;
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
                                }, function () {
                                });
                            }
                        });
                    };
                    ArtistDetailsController.prototype.setArtistDetailData = function (detailID) {
                        var vm = this;
                        vm.ArtistService.GetByID(detailID).then(function (r) {
                            vm.$scope.Artist = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    ArtistDetailsController.prototype.setLocationDetailData = function (detailID) {
                        var vm = this;
                        vm.ArtistService.GetByID(detailID).then(function (r) {
                            vm.$scope.IsLoading = false;
                            vm.$scope.Artist = r.Data;
                            vm.$scope.model = r.Data;
                        });
                    };
                    ArtistDetailsController.prototype.determineDetailType = function ($routeParams, $route) {
                        if ($routeParams["artistID"]) {
                            this.setArtistDetailData($routeParams["artistID"]);
                        }
                        else {
                            throw new Error("This action is not specified in the details controller");
                        }
                    };
                    ArtistDetailsController.$inject = [
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
                    return ArtistDetailsController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDetailsController = ArtistDetailsController;
                DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.ArtistDetailsController", FC.Modules.Details.Controllers.ArtistDetailsController);
            })(Controllers = Details.Controllers || (Details.Controllers = {}));
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistDetailsController.js.map