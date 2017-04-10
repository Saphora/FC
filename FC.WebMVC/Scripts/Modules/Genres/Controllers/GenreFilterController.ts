///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Genres.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class GenreFilterController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Genres.Controllers.GenreFilterController;
        public $scope: VM.IGenreFilterVM;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            "$sce",
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog: angular.material.MDDialogService,
            $scope,
            $route,
            $routeParams,
            $location,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            var vm = this;
            vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
            vm.$scope.inst = vm;
            vm.$scope.$routeParams = $routeParams;
            vm.$scope.$location = $location;
            vm.$scope = $scope;
            vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
            vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
            vm.$scope.Save = this.Save;
            vm.$scope.Close = this.Close;
            vm.$scope.Reset = this.Reset;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.SelectedGenreIds = "";
            vm.$scope.IsActive = this.IsActive;

            var userID = CacheManager.GetCookieValue("UserID");
            if (CacheManager.Contains("ActiveGenres")) {
                vm.$scope.SelectedGenres = CacheManager.Get<List<MODELS.UGenre>>("ActiveGenres").data;
                if (vm.$scope.SelectedGenres.length == 1) {
                    vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE SELECTED";
                } else {
                    vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRES SELECTED";
                }
            }
            if (userID) {
                vm.FavoriteService.GetUserFavorites(userID, Shared.Enum.InternalContentType.Genre).then(function (r) {
                    r.Data.forEach(function (v, k) {
                        if (v.Content) {
                            var any = vm.$scope.SelectedGenres.some(function (genre, k) {
                                return genre.GenreID == v.ContentID
                            });
                            if (any == false) {
                                vm.$scope.SelectedGenres.push(v.Content as MODELS.UGenre);
                            }
                        }
                    });
                    CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 1000 * 60 * 60 * 5);
                });
            }
            if (vm.$scope.SelectedGenres) {
                if (vm.$scope.SelectedGenres.length == 0) {
                    vm.$scope.Selected = "SELECT GENRES";
                }
            } else {
                vm.$scope.Selected = "SELECT GENRES";
            }
            
            vm.SetGenreList();
            

            //this.RecoverModel(this.$scope.model, this.$scope);
            vm.$scope.IsLoading = false;

            vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
            vm.addFilterChangeListener();
            window.addEventListener('ClearFilter', function () {
                vm.$scope.Selected = "SELECT GENRES";
                vm.$scope.SelectedGenres = new Array<FC.Shared.Models.UGenre>();
                CacheManager.DeleteStorage('ActiveGenres');
            });
        }

        private addFilterChangeListener(): void {
            var vm = this;
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        if (d.Genres) {
                            vm.$scope.Selected = d.Genres.length + " GENRE(S) SELECTED";
                            d.Genres.forEach(function (g, i) {
                                vm.$scope.SelectedGenreIds += g.GenreID + ',';
                            });
                            vm.$scope.SelectedGenres = d.Genres;
                            if (vm.$scope.SelectedGenres.length == 1) {
                                vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE SELECTED";
                            } else {
                                vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRES SELECTED";
                            }

                            if (vm.$scope.SelectedGenres.length == 0) {
                                vm.$scope.Selected = "SELECT GENRES";
                            }
                            vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
                        }
                    }
                }
            });
        }

        public ShowFilter($scope: VM.IGenreFilterVM) {

            var vm = this;
            vm.$scope = $scope;
            var $scope = vm.$scope;
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Genres.Controllers.GenreFilterController;
            opts.controllerAs = 'vm';
            opts.templateUrl = '/Scripts/modules/genres/views/genre-filter.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public IsActive(genre: FC.Shared.Models.UGenre): boolean {
            var vm = this;
            if (CacheManager.Contains("ActiveGenres")) {
                var activated = CacheManager.Get<FC.Shared.Models.UGenre[]>("ActiveGenres").data;
                var isactive = activated.some(function (g, i) {
                    return g.GenreID == genre.GenreID;
                });
                return isactive;
            } else {
                return false;
            }
        }
        
        public ToggleGenre(genre: MODELS.UGenre): void {
            var vm = this;
            if (!this.IsActive(genre)) {
                
                vm.$scope.SelectedGenres.push(genre);
                CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 1000 * 60 * 60 * 5);
                

            } else {
                var tmp = new Array<MODELS.UGenre>();

                vm.$scope.SelectedGenres.forEach(function (v, i) {
                    if (v.GenreID != genre.GenreID) {
                        tmp.push(v);
                    }
                });
                vm.$scope.SelectedGenres = tmp;
                
                CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 1000*60*60*5);
            }
            vm.$scope.SelectedGenres.forEach(function (v, i) {
                vm.$scope.SelectedGenreIds += v.GenreID + ",";
            });
            if (vm.$scope.SelectedGenres) {
                if (vm.$scope.SelectedGenres.length == 0) {
                    vm.$scope.Selected = "SELECT GENRES";
                } else {
                    vm.$scope.Selected = vm.$scope.SelectedGenres.length + " GENRE(S) SELECTED";
                }
            }
            vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
            vm.$scope.model.Genres = vm.$scope.SelectedGenres;
            this.Save();
        }

        public SetGenreList(): void {
            var vm = this;
            vm.GenreService.GetAllGenres().then(function (r: INT.IServiceResponse<MODELS.UGenre[]>) {
                vm.$scope.SysGenres = r.Data;
                if (CacheManager.Contains("ActiveGenres")) {
                    vm.$scope.SelectedGenres = CacheManager.GetStorage("ActiveGenres").data;
                } else {
                    vm.$scope.SelectedGenres = new Array<MODELS.UGenre>();
                }
            });
        }

        public Save(): void {
            var vm = this;
            //vm.$scope.Selected = vm.$scope.SelectedGenres.length + " SELECTED";
            vm.Close();
            var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
            //vm.$scope.IsLoading = true;
        }

        public Close(): void {
            this.$scope.MtModal.hide();
        }

        public Reset(): void {
            CacheManager.DeleteStorage("ActiveGenres");
        }

    }
    GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFilterController", FC.Modules.Genres.Controllers.GenreFilterController);
}

            //$scope = $scope.inst.$scope;
            //var any = false;
            //var modified = false;
            //any = $scope.SelectedGenres.some(function (v, i) {
            //    if (v.GenreID == genre.GenreID) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //});
            //if (any == false) {
            //    $scope.SelectedGenres.push(genre);
            //    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
            //    modified = true;
            //} else {

            //    var index = -1;
            //    if ($scope.SelectedGenres.some(function (v, i) {
            //        if (v.GenreID == genre.GenreID) {
            //            return true;
            //        } else {
            //            index++;
            //            return false;
            //        }
            //    })) {
            //        delete $scope.SelectedGenres[index];
            //        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
            //        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
            //        modified = false;
            //    }
            //}
