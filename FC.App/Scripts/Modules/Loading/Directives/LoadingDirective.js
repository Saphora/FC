var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Loading;
        (function (Loading) {
            var Directives;
            (function (Directives) {
                function LoadingDirective() {
                    return {
                        controller: FC.Modules.Loading.Controllers.LoadController,
                        controllerAs: "vm",
                        templateUrl: "/Scripts/Modules/Loading/Views/loading-default.html",
                        replace: true
                    };
                }
                Directives.LoadingDirective = LoadingDirective;
                Application.app.directive('preload', FC.Modules.Loading.Directives.LoadingDirective);
            })(Directives = Loading.Directives || (Loading.Directives = {}));
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
