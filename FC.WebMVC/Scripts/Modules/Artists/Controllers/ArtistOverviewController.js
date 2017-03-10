var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistOverviewController = (function (_super) {
                    __extends(ArtistOverviewController, _super);
                    function ArtistOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setArtists();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("SAVE_SUCCESS", function (r) {
                            vm.setArtists();
                        });
                        window.addEventListener("ArtistLogoSaved", function (e) {
                            vm.$scope.model.LogoID = e['detail'];
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.ArtistService, $scope);
                            vm.setArtists();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    ArtistOverviewController.prototype.DoEdit = function (partialName, $scope, model) {
                        var vm = this;
                        var opts = {};
                        vm.ArtistService.GetByID(model.ArtistID).then(function (r) {
                            vm.$scope.model = r.Data;
                            $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                                if (r == true) {
                                    switch (partialName) {
                                        case "artist-name":
                                            opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                                            opts.parent = document.body;
                                            opts.clickOutsideToClose = true;
                                            $scope.MtModal.show(opts).then(function (answer) {
                                            }, function () {
                                                ;
                                            });
                                            break;
                                        case "logo":
                                            opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                                            opts.controllerAs = 'vm';
                                            opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                                            opts.parent = document.body;
                                            opts.locals = { local: [$scope.MtModal, "ArtistLogoSaved", vm.$scope.model.MediaDirectoryID] };
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
                                    opts.clickOutsideToClose = true;
                                    $scope.MtModal.show(opts).then(function (answer) {
                                    }, function () {
                                    });
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.ArtistService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Artists = r.Data;
                            vm.ArtistService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.setArtists = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.ArtistService.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.Artists = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.ArtistService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    ArtistOverviewController.prototype.DoDelete = function (artist) {
                        var vm = this;
                        vm.$scope.model = artist;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.ArtistService, vm.$scope);
                    };
                    //public ActiveGenreID: number;
                    ArtistOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return ArtistOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistOverviewController = ArtistOverviewController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistOverviewController", FC.Modules.Artists.Controllers.ArtistOverviewController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistOverviewController.js.map