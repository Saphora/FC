///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Filtering.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;

    export class FilterController extends FC.Shared.Controllers.BaseController {
        private CalendarSvc: FC.Modules.Calendar.Services.CalendarService;
        public CalendarMonths: Array<string>;
        public CalendarYears: Array<number>;
        public CountryData: Array<INT.IUCountry>;
        public CountryID: number;
        private UrlManager: FC.Core.Services.URLManagerService;
        public ActiveYear: number;
        public ActiveMonth: number;
        public CacheManager: FC.Shared.Util.CacheManager;
        public ActiveMonthName: string;
        public ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        public SysGenres: INT.IUGenre[];
        public Modal: any;
        public ShowMore: number;
        public $scope: FC.Shared.ViewModels.IGenreModalVm;
      
        public months = ["January", "February", "April", "March", "May", "June", "July", "August", "September", "October", "November", "December"];
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            '$mdDialog'
        ];
        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog
        ) {
            super($http, $q, $scope, $location,  $mdDialog)
            var vm = this;
            this.$scope = $scope;
            this.$scope.Controller = this;
            this.Modal = $mdDialog;
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.$scope.ActiveGenres = new CM.Dictionary<string, FC.Shared.Models.UGenre>();

            vm.$scope.IsGenresLoading = true;
            if (vm.CacheManager.Contains("sys-genres")) {
                vm.CacheManager.GetStorage("sys-genres", function (response) {
                    vm.$scope.SysGenres = response.data;
                    vm.$scope.IsGenresLoading = false;
                });
            }
            this.$scope.IsActive = this.IsActive;
            vm.$scope.ToggleState = this.ToggleState;
        }

        public IsActive(genre: FC.Shared.Models.UGenre, scope: FC.Shared.ViewModels.IGenreModalVm)
        {
            if (scope)
            {
                if (scope.ActiveGenres == null) {
                    scope.ActiveGenres = new FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>();
                }
                if (scope.ActiveGenres.data.length == 0) {
                    if (scope.Controller.CacheManager.Contains('ActiveGenres')) {
                        scope.Controller.CacheManager.GetStorage('ActiveGenres', function (response) {
                 
                            scope.ActiveGenres.data = response.data.data as FC.Core.CoreModel.KeyValuePair<string, FC.Shared.Models.UGenre>[];
                        });
                    }
                }
            }
            return scope.ActiveGenres.ContainsKey(genre.GenreID);
        }
        

        public ToggleState(genre: FC.Shared.Models.UGenre, scope: FC.Shared.ViewModels.IGenreModalVm)
        {
            if (scope.ActiveGenres.ContainsKey(genre.GenreID)) {
                scope.ActiveGenres.Delete(genre.GenreID);
            } else {
                scope.ActiveGenres.Add(genre.GenreID, genre);
            }
            scope.Controller.CacheManager.WriteStorage('ActiveGenres', scope.ActiveGenres);
        }
        
        public OpenModal(size): void {
            var modalInstance = this.Modal.open({
                animation: this.$scope.animationsEnabled,
                templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                controller: 'FC.Modules.Menu.Controllers.MenuController',
                controllerAs: 'vm',
                size: 'fullsize',
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });
        }
    }
    FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterController", FC.Modules.Filtering.Controllers.FilterController);
}