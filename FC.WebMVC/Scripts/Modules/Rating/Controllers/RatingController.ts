///<reference path="../../Core/FC.ts" />
///<reference path="../Rating.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Rating.Controllers {
    export class RatingController extends FC.Shared.Controllers.BaseController {
        public RatingSvc: FC.Modules.Rating.Services.RatingService;
        public Stars: string[];
        public $scope: any;
        static $inject = [
            "$http",
            "$q",
            "$scope",
            "$route",
            "$routeParams",
            "$location",
            "$mdDialog",
            "FC.Modules.Rating.Services.RatingService",
        ];
        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            RatingService: FC.Modules.Rating.Services.RatingService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            this.RatingSvc = RatingService;
            this.$scope = $scope;
            this.$scope.Rating = FC.Shared.ViewModels.RatingVm;
        }

        public GetRates(contentItemID: string, type: string) {
            var vm = this;
            this.RatingSvc.GetRate(contentItemID, type).then(function (r: FC.Shared.Interfaces.IServiceResponse<Shared.ViewModels.RatingVm>) {
                vm.$scope.Rating = r.Data;

            });
        }

        public Rate(contentItemID: string, type: string, index) {
            var vm = this;
            if (index <= 5) {
                this.RatingSvc.Rate(contentItemID, type, index).then(function () {
                    vm.GetRates(contentItemID, type);
                });
            }
        }
    }
    RatingModule.GetApplication().RegisterController("FC.Modules.Rating.Controllers.RatingController", FC.Modules.Rating.Controllers.RatingController);
}