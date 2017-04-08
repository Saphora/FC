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

    export class GenreFormController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Genres.Controllers.GenrePickerController;
        public $scope: VM.IGenrePickerScope;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$routeParams',
            '$location',
            "$sce",
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog,
            $scope,
            $routeParams,
            $location,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            this.RecoverModel(this.$scope.model, this.$scope);
            
            //vm.$scope.model = new FC.Shared.Models.UGenre();
        }

        public GenreActive(genre: MODELS.UGenre):boolean {
            var vm = this;
            var result = vm.$scope.SelectedGenres.filter(function (v, k) {
                return v.GenreID == genre.GenreID;
            });
            if (result.length == 1) {
                return true;
            } else {
                return false;
            }
        }

        public RegisterID(festivalID: string) {
            var vm = this;
            vm.GenreService.GetByFestivalID(festivalID).then(function (r) {
                vm.$scope.SelectedGenres = r.Data as List<MODELS.UGenre>;
            });
        }

        public DoSelectGenre(festivalID: string, genreID: string) {
            var vm = this;

            this.FestivalService.ToggleGenre(festivalID, genreID).then(function (r) {
                vm.$scope.SelectedGenres = r.Data.Data as List<MODELS.UGenre>;
            });
        }

        public search() {
            var vm = this;
            this.GenreService.Search(this.$scope.SearchKey).then(function (r) {
                vm.$scope.SearchResult = r.Data;
            });
        }
    }
    GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFormController", FC.Modules.Genres.Controllers.GenreFormController);
}