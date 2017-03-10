///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Loading.Controllers {
    export class LoadController extends FC.Shared.Controllers.BaseController {
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$mdDialog'
        ];
        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            LoadingModule.GetApplication().RegisterController("FC.Modules.Loading.Controllers.LoadController", FC.Modules.Loading.Controllers.LoadController);
        }
    }
}