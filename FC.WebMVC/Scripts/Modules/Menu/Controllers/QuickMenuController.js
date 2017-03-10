var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../Menu.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var QuickMenuController = (function (_super) {
                    __extends(QuickMenuController, _super);
                    function QuickMenuController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        var vm = this;
                        this.$scope.inst = this;
                        this.QuickMenuService = new Menu.Services.QuickMenuService($http, $q);
                    }
                    QuickMenuController.prototype.HandleMIClick = function (clickStr) {
                        var vm = this;
                        clickStr = clickStr.replace('$event.preventDefault();', '');
                        clickStr = clickStr.replace('vm.', '');
                        clickStr = clickStr.replace('()', '');
                        clickStr = clickStr.replace(';', '');
                        vm[clickStr]();
                    };
                    QuickMenuController.prototype.init = function (pageKey) {
                        var vm = this;
                        vm.QuickMenuService.GetMenu(pageKey).then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                        });
                    };
                    QuickMenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return QuickMenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.QuickMenuController = QuickMenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.QuickMenuController", FC.Modules.Menu.Controllers.QuickMenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=QuickMenuController.js.map