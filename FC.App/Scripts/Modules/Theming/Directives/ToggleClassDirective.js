var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var ToggleClassDirective = (function () {
                    function ToggleClassDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        ToggleClassDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            element.bind('click', function () {
                                element.toggleClass(attrs['toggleclass']);
                            });
                        };
                    }
                    ToggleClassDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new ToggleClassDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return ToggleClassDirective;
                }());
                Directives.ToggleClassDirective = ToggleClassDirective;
                Application.app.directive('toggleclass', FC.Modules.Theming.Directives.ToggleClassDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
