var STD;
(function (STD) {
    var RolePickerDirective = (function () {
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        function RolePickerDirective($route, $routeParams, $location, $http, $q, $compile) {
            //public template = '';
            this.templateUrl = '/Scripts/modules/Core/views/RolePickerDirective.html';
            this.controller = STD.Controllers.RolePickerController;
            //public controller = FC.Modules.Media.Controllers.MediaModalController;
            this.controllerAs = 'vm';
            this.replace = true;
            this.require = ['ngModel'];
            this.scope = {
                value: '=ngModel'
            };
            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
            RolePickerDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                vm._element = element;
                vm._attrs = attrs;
                scope.ID = attrs["id"];
                scope.ModelName = attrs["ngModel"];
                scope.Label = attrs["stdLabel"];
            };
        }
        RolePickerDirective.factory = function () {
            var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                return new RolePickerDirective($route, $routeParams, $location, $http, $q, $compile);
            };
            directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
            return directive;
        };
        return RolePickerDirective;
    }());
    STD.RolePickerDirective = RolePickerDirective;
    Application.app.directive('rolePicker', STD.RolePickerDirective.factory());
})(STD || (STD = {}));
//# sourceMappingURL=RolePickerDirective.js.map