var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Directives;
            (function (Directives) {
                var Crumb = (function () {
                    function Crumb() {
                    }
                    return Crumb;
                }());
                Directives.Crumb = Crumb;
                var MediaBrowserDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function MediaBrowserDirective($route, $routeParams, $location, $http, $q, $compile) {
                        this.template = '';
                        this.templateUrl = '/Scripts/Modules/Media/Views/media-browser.html';
                        this.controller = FC.Modules.Media.Controllers.MediaModalController;
                        this.controllerAs = 'vm';
                        this.replace = true;
                        var vm = this;
                        vm.$http = $http;
                        vm.$q = $q;
                        vm.MediaSvc = new FC.Modules.Media.Services.MediaService(vm.$http, vm.$q);
                        MediaBrowserDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                            vm._element = element;
                            vm._attrs = attrs;
                        };
                    }
                    MediaBrowserDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                            return new MediaBrowserDirective($route, $routeParams, $location, $http, $q, $compile);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
                        return directive;
                    };
                    return MediaBrowserDirective;
                }());
                Directives.MediaBrowserDirective = MediaBrowserDirective;
                Application.app.directive('filebrowser', FC.Modules.Media.Directives.MediaBrowserDirective.factory());
            })(Directives = Media.Directives || (Media.Directives = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FolderBrowserDirective.js.map