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
    export class MenuController extends FC.Shared.Controllers.BaseController {

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$routeParams',
            '$location',
            '$mdDialog'
        ];
        public CacheManager: FC.Shared.Util.CacheManager;
        public $scope: FC.Shared.ViewModels.IMenuVM;
        constructor(
            $http,
            $q,
            $scope,
            $routeParams,
            $location,
            $mdDialog: angular.material.MDDialogService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            this.$scope = $scope;
            var vm = this;
            this.$scope.inst = this;
        }

        public ToggleMobile($scope: VM.IMenuVM) {
            if ($("#MenuMobile").hasClass('ctx-hidden')) {
                $("#MenuMobile").removeClass('ctx-hidden').addClass('ctx-visible');
                $("#MainOverlay").removeClass('ctx-hidden').addClass('ctx-visible');
            } else {
                $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            }
        }
    }
    MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
}