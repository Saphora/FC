module STD {

    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    import MSG = FC.Shared.ServiceMessages;
    import MODELS = FC.Shared.Models;
    import CM = FC.Shared.CoreModel;

    export interface IStdDatePicker extends VM.IFormVMBase<any> {
        inst: any;
        ID: string;
        Day: string;
        Month: string;
        Year: string;
        Hours: string;
        Minutes: string;
        Seconds: string;
        ChangeEvent: string;
        DoChange: Function;
        PrevYear: string;
        NextYear: string;
        CurrentYear: string;
        Days: string[];
        MODEL: any;
        ModelName: string;
        Label: string;
        CurrentValue: string;
        TimeVisible: boolean;
        DateVisible: boolean;
        DayVisible: boolean;
        IconVisible: boolean;
        Columns: string; 
        value: Date;
    }
    export interface IStdDatePickerValue {
        value;
    }

    export class DatePickerDirective implements ng.IDirective {

        public link: (scope: IStdDatePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        public AuthService: FC.Core.Services.AuthService;
        public $http: ng.IHttpService;
        public $q: ng.IQService;
        public $scope: IStdDatePicker;
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        //public template = '';

        public templateUrl = '/Scripts/modules/Core/views/StdDatePicker.html';
        public controller = Controllers.StdDatePickerController;
        //public controller = FC.Modules.Media.Controllers.MediaModalController;
        //public controllerAs = 'vm';
        public replace = true;
        public $compile: any;
        public require = ['ngModel'];
        public scope = {
            value: '=ngModel' 
        }
        public bindToController: IStdDatePicker;
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        public constructor($route, $routeParams, $location, $http: ng.IHttpService, $q: ng.IQService, $compile) {

            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
           
            DatePickerDirective.prototype.link = (scope: IStdDatePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => {
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
                } else {
                    scope.Columns = "col-xs-24";
                }

                if (attrs["timeVisible"]) {

                    scope.TimeVisible = (attrs["timeVisible"] == "true" ? true : false);
                    if (scope.TimeVisible == false) {
                        scope.Hours = "1";
                        scope.Minutes = "1";
                        scope.Seconds = "1";
                    }
                } else {
                    scope.TimeVisible = true;
                }
                if (attrs["dateVisible"]) {
                    scope.DateVisible = (attrs["dateVisible"] == "true" ? true : false);
                } else {
                    scope.DateVisible = true;
                }
                if (attrs["dayVisible"]) {
                    scope.DayVisible = (attrs["dayVisible"] == "true" ? true : false);
                    if (scope.DayVisible == false) {
                        scope.Day = "1";
                    }
                } else {
                    scope.DayVisible = true;
                }
              //  debugger;
            };
        }

        public static factory() {
            var directive = ($route, $routeParams, $location, $http, $q, $compile) => {
                return new DatePickerDirective($route, $routeParams, $location, $http, $q, $compile);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];

            return directive;
        }

    }
    Application.app.directive('stdDatePicker', STD.DatePickerDirective.factory());
}