module STD {

    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    import MSG = FC.Shared.ServiceMessages;
    import MODELS = FC.Shared.Models;
    import CM = FC.Shared.CoreModel;

    export interface IRolePicker extends VM.IFormVMBase<any> {
        inst: any;
        ID: string;
        value: FC.List<FC.Shared.Models.Role>;
        ModelName: string;
        Label: string;
    }

    export class RolePickerDirective implements ng.IDirective {

        public link: (scope: IRolePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        public AuthService: FC.Core.Services.AuthService;
        public $http: ng.IHttpService;
        public $q: ng.IQService;
        public $scope: IRolePicker;
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        //public template = '';

        public templateUrl = '/Scripts/modules/Core/views/RolePickerDirective.html';
        public controller = Controllers.RolePickerController;
        //public controller = FC.Modules.Media.Controllers.MediaModalController;
        public controllerAs = 'vm';
        public replace = true;
        public $compile: any;
        public require = ['ngModel'];
        public scope = {
            value: '=ngModel' 
        }
        public bindToController: IRolePicker;
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        public constructor( $location, $http: ng.IHttpService, $q: ng.IQService, $compile) {

            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
           
            RolePickerDirective.prototype.link = (scope: IRolePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => {
                vm._element = element;
                vm._attrs = attrs;
                scope.ID = attrs["id"];
                scope.ModelName = attrs["ngModel"];
                scope.Label = attrs["stdLabel"];
            };
        }

        public static factory() {
            var directive = ( $location, $http, $q, $compile) => {
                return new RolePickerDirective( $location, $http, $q, $compile);
            };

            directive['$inject'] = [ '$location', '$http', '$q', '$compile'];

            return directive;
        }

    }
    Application.app.directive('rolePicker', STD.RolePickerDirective.factory());
}