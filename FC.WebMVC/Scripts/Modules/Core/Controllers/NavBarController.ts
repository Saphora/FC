///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Core.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class NavBarController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Core.Controllers.NavBarController;
        public $scope: STD.Models.INavBarVM;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            '$location',
            '$routeParams',
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: STD.Models.INavBarVM,
            $mdDialog: angular.material.MDDialogService,
            $location: ng.ILocationService,
            $routeParams,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            if (CacheManager.GetCookieValue("UserID")) {
                vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), Shared.Enum.InternalContentType.All).then(function (r) {
                    var genres = r.Data.filter(function (k, v) {
                        return k.ContentType == Shared.Enum.InternalContentType.Genre;
                    });
                    var artists = r.Data.filter(function (k, v) {
                        return k.ContentType == Shared.Enum.InternalContentType.Artist;
                    });
                    var countries = r.Data.filter(function (k, v) {
                        return k.ContentType == Shared.Enum.InternalContentType.Country;
                    });
                    var locations = r.Data.filter(function (k, v) {
                        return k.ContentType == Shared.Enum.InternalContentType.Location;
                    });
                    vm.$scope.CountryCount = countries.length;
                    vm.$scope.ArtistCount = artists.length;
                    vm.$scope.LocationCount = locations.length;
                    vm.$scope.GenreCount = genres.length;
                });
            }
        }
    }
    Application.RegisterController("FC.Core.Controllers.NavBarController", FC.Core.Controllers.NavBarController);
}