module FC.Modules.Loading.Directives {
    export function LoadingDirective(): ng.IDirective {
        return {
            controller: FC.Modules.Loading.Controllers.LoadController,
            controllerAs: "vm",
            templateUrl: "/Scripts/Modules/Loading/Views/loading-default.html",
            replace: true
        }

    }
    Application.app.directive('preload', FC.Modules.Loading.Directives.LoadingDirective);
}