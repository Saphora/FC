var STD;
(function (STD) {
    var DatePickerDirective = (function () {
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        function DatePickerDirective($route, $routeParams, $location, $http, $q, $compile) {
            //public template = '';
            this.templateUrl = '/Scripts/modules/Core/views/StdDatePicker.html';
            this.controller = STD.Controllers.StdDatePickerController;
            //public controller = FC.Modules.Media.Controllers.MediaModalController;
            //public controllerAs = 'vm';
            this.replace = true;
            this.require = ['ngModel'];
            this.scope = {
                value: '=ngModel'
            };
            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
            DatePickerDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                vm._element = element;
                vm._attrs = attrs;
                scope.ID = attrs["id"];
                scope.ModelName = attrs["ngModel"];
                scope.Label = attrs["stdLabel"];
                scope.IconVisible = (attrs["iconVisible"] == "true" ? true : false);
                if (attrs["change"]) {
                    scope.ChangeEvent = attrs["change"];
                }
                if (attrs["columns"]) {
                    scope.Columns = attrs["columns"];
                }
                else {
                    scope.Columns = "col-xs-24";
                }
                if (attrs["timeVisible"]) {
                    scope.TimeVisible = (attrs["timeVisible"] == "true" ? true : false);
                    if (scope.TimeVisible == false) {
                        scope.Hours = "1";
                        scope.Minutes = "1";
                        scope.Seconds = "1";
                    }
                }
                else {
                    scope.TimeVisible = true;
                }
                if (attrs["dateVisible"]) {
                    scope.DateVisible = (attrs["dateVisible"] == "true" ? true : false);
                }
                else {
                    scope.DateVisible = true;
                }
                if (attrs["dayVisible"]) {
                    scope.DayVisible = (attrs["dayVisible"] == "true" ? true : false);
                    if (scope.DayVisible == false) {
                        scope.Day = "1";
                    }
                }
                else {
                    scope.DayVisible = true;
                }
                //  debugger;
            };
        }
        DatePickerDirective.factory = function () {
            var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                return new DatePickerDirective($route, $routeParams, $location, $http, $q, $compile);
            };
            directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
            return directive;
        };
        return DatePickerDirective;
    }());
    STD.DatePickerDirective = DatePickerDirective;
    Application.app.directive('stdDatePicker', STD.DatePickerDirective.factory());
})(STD || (STD = {}));
//# sourceMappingURL=StdDatePickerDirective.js.map