module FC.Modules.Theming.Directives {
    export class SelectModalDirective {
        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        //public template = '<div> replaced by directive </div>';
        //public tempalteUrl = "/path/to/htmlview.html";
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        public constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            SelectModalDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                vm._element = element;
                vm._attrs = attrs;
                element.bind('click', function () {
                    //element.toggleClass(attrs['toggleclass']);
                    debugger;
                });
            };
        }
        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new SelectModalDirective($route, $routeParams, $location, ThemingSvc);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];

            return directive;
        }
    }
    Application.app.directive('selectmodal', FC.Modules.Theming.Directives.SelectModalDirective.factory());
}