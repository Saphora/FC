///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../Menu.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Menu.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class QuickMenuController extends FC.Shared.Controllers.BaseController {

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$mdDialog'
        ];
        public CacheManager: FC.Shared.Util.CacheManager;
        public $scope: Models.IQuickMenu;
        public QuickMenuService: Services.QuickMenuService
        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog: angular.material.MDDialogService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            this.$scope = $scope;
            var vm = this;
            this.$scope.inst = this;
            this.QuickMenuService = new Services.QuickMenuService($http, $q);
        }
        public HandleMIClick(clickStr: string): void {
            var vm = this;
            clickStr = clickStr.replace('$event.preventDefault();', '');
            clickStr = clickStr.replace('vm.', '');
            clickStr = clickStr.replace('()','');
            clickStr = clickStr.replace(';','');
            vm[clickStr]();
        }
        public init(pageKey:string) {
            var vm = this;
            vm.QuickMenuService.GetMenu(pageKey).then(function (r) {
                vm.$scope.MenuSections = r.Data;
            });
        }
    }
    MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.QuickMenuController", FC.Modules.Menu.Controllers.QuickMenuController);
}