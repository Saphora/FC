module FC.Modules.Theming.Directives {
    export class ToggleClassDirective {
        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        public constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            ToggleClassDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                vm._element = element;
                vm._attrs = attrs;
                element.bind('click', function () {
                    element.toggleClass(attrs['toggleclass']);
                    
                });
            };
        }
        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new ToggleClassDirective($route, $routeParams, $location, ThemingSvc);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];

            return directive;
        }
    }
    Application.app.directive('toggleclass', FC.Modules.Theming.Directives.ToggleClassDirective.factory());
}