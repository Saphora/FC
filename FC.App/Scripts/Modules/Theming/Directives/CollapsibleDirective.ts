///<reference path="../Services/ThemingService.ts"/>
///<reference path="../../Core/FC.ts"/>
module FC.Modules.Theming.Directives {
    export class CollapsibleDirective {
        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;

        constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            CollapsibleDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                vm._element = element;
                vm._attrs = attrs;
                var htmltext;
                debugger;
                if (attrs["htmltext"]) {
                    htmltext = (attrs["htmltext"]== "true" ? true : false);
                } else {
                    htmltext = false;
                }
                scope.$watch(attrs["collapsible"], function (value, attrs) {
                    
                    return attrs["collapsible"];
                });
            }
        }

        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new BackImgDirective($route, $routeParams, $location, ThemingSvc);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];

            return directive;
        }
    }
    Application.app.directive('collapsible', FC.Modules.Theming.Directives.CollapsibleDirective.factory());
}