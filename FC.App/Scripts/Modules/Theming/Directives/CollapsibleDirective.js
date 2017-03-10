///<reference path="../Services/ThemingService.ts"/>
///<reference path="../../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var CollapsibleDirective = (function () {
                    function CollapsibleDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        CollapsibleDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            var htmltext;
                            debugger;
                            if (attrs["htmltext"]) {
                                htmltext = (attrs["htmltext"] == "true" ? true : false);
                            }
                            else {
                                htmltext = false;
                            }
                            scope.$watch(attrs["collapsible"], function (value, attrs) {
                                return attrs["collapsible"];
                            });
                        };
                    }
                    CollapsibleDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new Directives.BackImgDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return CollapsibleDirective;
                }());
                Directives.CollapsibleDirective = CollapsibleDirective;
                Application.app.directive('collapsible', FC.Modules.Theming.Directives.CollapsibleDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
