///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Artists.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENUM = FC.Shared.Enum;

    export class ArtistOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Artists.Controllers.ArtistOverviewController;
        public $scope: Models.IArtistOverview;
        //public ActiveGenreID: number;
        static $inject = [
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

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            NewsService: FC.Modules.News.Services.NewsService,
            RatesService: FC.Modules.Rates.Services.RatesService,
            $sce,
            GenreService: FC.Modules.Genres.Services.GenreService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
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
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.ArtistService, $scope);
                vm.setArtists();
            });
            this.SetUserFavorites();
            vm.$scope.$watch('UserFavorites', function (favs) {
                if (favs) {
                    vm.$scope.IsLoading = false;
                }
            });
        }

        public DoEdit(partialName: string, $scope: Models.IArtistOverview, model: FC.Shared.Models.UArtist) {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
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
                            //case "artist-thumbnail":
                            //    opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            //    opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            //    opts.parent = document.body;
                            //    opts.targetEvent = ev;
                            //    opts.clickOutsideToClose = true;

                            //    $scope.MtModal.show(opts).then(function (answer) {
                            //    }, function () {
                            //    });
                            //    break;
                            //case "artist-social":
                            //    opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            //    opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            //    opts.parent = document.body;
                            //    opts.targetEvent = ev;
                            //    opts.clickOutsideToClose = true;

                            //    $scope.MtModal.show(opts).then(function (answer) {
                            //    }, function () {
                            //    });
                            //    break;
                            //case "artist-genres":
                            //    opts.controller = FC.Modules.Details.Controllers.LocationDetailsController;
                            //    opts.templateUrl = '/Scripts/modules/details/views/dialogs/location/location-name.html';
                            //    opts.parent = document.body;
                            //    opts.targetEvent = ev;
                            //    opts.clickOutsideToClose = true;

                            //    $scope.MtModal.show(opts).then(function (answer) {
                            //    }, function () {
                            //    });
                            //    break;
                        }
                    } else {
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
        }


        public DoSort(sortIndex: string) {
            var vm = this;
            if (sortIndex == "") {
                sortIndex = "0-9";
            }
            if (sortIndex != vm.$scope.MemReg.Get<string>("sortIndex")) {
                vm.SetPageNum(1);
            }
            vm.$scope.MemReg.Register("sortIndex", sortIndex);
            vm.ArtistService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                var p = vm.GetPageNum() + 1;
                vm.$scope.Artists = r.Data;
                vm.ArtistService.GetPagedCount(p,sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/artists?page=" + (p) + "&sortIndex="+sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public setArtists(): void {
            var vm = this;
            var p = 1;
            if (vm.$scope.$routeParams["page"]) {
                p = parseInt(vm.$scope.$routeParams["page"]);
            }
            var sortIndex = "";
            if (vm.$scope.$routeParams["sortIndex"]) {
                sortIndex = vm.$scope.$routeParams["sortIndex"];
            } else {
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
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/artists?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public DoDelete(artist: FC.Shared.Models.UArtist) {
            var vm = this;
            vm.$scope.model = artist;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.ArtistService, vm.$scope);
        }
    }
    ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistOverviewController", FC.Modules.Artists.Controllers.ArtistOverviewController);
}