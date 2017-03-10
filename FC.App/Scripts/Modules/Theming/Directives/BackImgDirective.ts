///<reference path="../Services/ThemingService.ts"/>
module FC.Modules.Theming.Directives {
    export class BackImgDirective {
        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        public color(color: string): string {
            return "#" + color;
        }
        constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            BackImgDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                vm._element = element;
                vm._attrs = attrs;
                if (attrs["watch"]) {
                    scope.$watch(attrs["watch"], function (img) {
                        var imgSrc = "";
                        if (img) {
                            imgSrc = img.toString();
                            element.css({
                                'background-image': 'url(' + url + ')',
                                'background-position': '50% 50%'
                            });
                        }
                    });
                } else {
                    var url = attrs["backimg"];
                    element.css({
                        'background-image': 'url(' + url + ')',
                        'background-position': '50% 50%'
                    });
                }
            };
        }



        

        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new BackImgDirective($route, $routeParams, $location, ThemingSvc);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];

            return directive;
        }
    }
    Application.app.directive('backimg', FC.Modules.Theming.Directives.BackImgDirective.factory());
}