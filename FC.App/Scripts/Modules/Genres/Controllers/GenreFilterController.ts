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
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog,
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
            
            vm.SetGenreList();
            vm.$scope.ToggleGenre = this.ToggleGenre
            if (vm.$scope.MemReg.Get("ActiveGenres")) {
                vm.$scope.inst.$scope.SelectedGenres = vm.$scope.MemReg.Get<Array<MODELS.UGenre>>("ActiveGenres");
            } else {
                vm.$scope.SelectedGenres = new Array<MODELS.UGenre>();
                if (CacheManager.Contains("ActiveGenres")) {
                    vm.$scope.inst.$scope.SelectedGenres = CacheManager.Get<Array<MODELS.UGenre>>("ActiveGenres").data;
                }
            }
            vm.$scope.IsActive = this.IsActive;
            
            //this.RecoverModel(this.$scope.model, this.$scope);
            vm.$scope.IsLoading = false;
        }

        public IsActive(genre: FC.Shared.Models.UGenre) {
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
        
        public ToggleGenre($scope: VM.IGenreFilterVM, genre: MODELS.UGenre): void {
            $scope = $scope.inst.$scope;
            var any = false;
            var modified = false;
            any = $scope.SelectedGenres.some(function (v, i) {
                if (v.GenreID == genre.GenreID) {
                    return true;
                } else {
                    return false;
                }
            });
            if (any == false) {
                $scope.SelectedGenres.push(genre);
                modified = true;
            } else {
                var index = $scope.SelectedGenres.indexOf(genre);
                if (index > -1) {
                    delete $scope.SelectedGenres[index];
                    $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
                    modified = true;
                }
            }
            if (modified) {
                CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
                modified = false;
            }
        }

        public SetGenreList(): void {
            var vm = this;
            vm.GenreService.GetAllGenres().then(function (r: INT.IServiceResponse<MODELS.UGenre[]>) {
                vm.$scope.SysGenres = r.Data;
            });
        }

        public Save($scope: VM.IGenreFilterVM): void {
            var vm = this;
            vm.Close($scope);
            //vm.$scope.IsLoading = true;
        }

        public Close($scope: VM.IGenreFilterVM): void {
            $("#GenreFilterControl").removeClass("ctx-visible").addClass("ctx-hidden");
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
        }

        public Reset($scope: VM.IGenreFilterVM): void {
            CacheManager.DeleteStorage("ActiveGenres");
            $scope.Close();
        }

    }
    GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFilterController", FC.Modules.Genres.Controllers.GenreFilterController);
}