///<reference path="../Services/ThemingService.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Directives;
            (function (Directives) {
                var BackImgDirective = (function () {
                    function BackImgDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        var vm = this;
                        BackImgDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            if (attrs["watch"]) {
                                scope.$watch(attrs["watch"], function (img) {
                                    var imgSrc = "";
                                    if (img) {
                                        imgSrc = img.toString();
                                        var url = $AppConfig.URLRoot + '/' + attrs["backimg"].replace("$0$", imgSrc);
                                        element.css({
                                            'background-image': 'url(' + url + ')',
                                            'background-size': 'cover'
                                        });
                                    }
                                });
                            }
                            else {
                                var url = $AppConfig.URLRoot + '/' + attrs["backimg"];
                                element.css({
                                    'background-image': 'url(' + url + ')',
                                    'background-size': 'cover'
                                });
                            }
                        };
                    }
                    BackImgDirective.prototype.color = function (color) {
                        return "#" + color;
                    };
                    BackImgDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new BackImgDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return BackImgDirective;
                }());
                Directives.BackImgDirective = BackImgDirective;
                Application.app.directive('backimg', FC.Modules.Theming.Directives.BackImgDirective.factory());
            })(Directives = Theming.Directives || (Theming.Directives = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
