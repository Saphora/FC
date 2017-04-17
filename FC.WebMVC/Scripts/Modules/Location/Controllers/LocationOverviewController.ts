///<reference path="../../Core/FC.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Location.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENUM = FC.Shared.Enum;

    export class LocationOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Location.Controllers.LocationOverviewController;
        public $scope: Models.ILocationOverview;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
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
            
            $location,
            $mdDialog,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            NewsService: FC.Modules.News.Services.NewsService,
            RatesService: FC.Modules.Rates.Services.RatesService,
            $sce,
            GenreService: FC.Modules.Genres.Services.GenreService
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            this.$scope = $scope;
            
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
            this.setLocations();
            this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
            this.$scope.MtModal = $mdDialog;
            var vm = this;
            vm.$scope.IsLoading = true;
            window.addEventListener("SAVE_SUCCESS", function (r) {
                vm.setLocations();
            });
            window.addEventListener("ProfileImageIDSaved", function (e) {
                vm.$scope.model.ProfileImageID = e['detail'];
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.LocationService, $scope);
                vm.setLocations();
            });
            this.SetUserFavorites();
            vm.$scope.$watch('UserFavorites', function (favs) {
                if (favs) {
                    vm.$scope.IsLoading = false;
                }
            });
        }

        public DoEdit(partialName: string, $scope: Models.ILocationOverview, model: FC.Shared.Models.Location) {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
            vm.LocationService.GetLocation(model.LocationID).then(function (r) {
                vm.$scope.model = r.Data;

                $scope.inst.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                    if (r == true) {
                        switch (partialName) {
                            case "name":
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
                                opts.locals = { local: [$scope.MtModal, "ProfileImageIDSaved", vm.$scope.model.MediaDirectoryID] };
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

            var sortID = "";
            if (vm.$scope.CountrySortID) {
                sortID = vm.$scope.CountrySortID;
            }
            vm.LocationService.GetSorted(sortID,sortIndex, vm.GetPageNum()).then(function (r) {
                var p = vm.GetPageNum() + 1;
                vm.$scope.Locations = r.Data;
                vm.LocationService.GetPagedCount(sortID, p,sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/Locations?page=" + (p) + "&sortIndex="+sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Locations?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public setLocations(): void {
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
            vm.LocationService.GetSorted("", sortIndex, p).then(function (r) {
                vm.$scope.Locations = r.Data;
                var p = vm.GetPageNum() + 1;
                vm.LocationService.GetPagedCount("",p, sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/Locations?page=" + (p) + "&sortIndex=" + sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Locations?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public DoDelete(Location: FC.Shared.Models.Location) {
            var vm = this;
            vm.$scope.model = Location;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.LocationService, vm.$scope);
        }
    }
    LocationModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationOverviewController", FC.Modules.Location.Controllers.LocationOverviewController);
}