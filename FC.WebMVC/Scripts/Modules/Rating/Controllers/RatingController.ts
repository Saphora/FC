///<reference path="../../Core/FC.ts" />
///<reference path="../Rating.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Rating.Controllers {
    export class RatingController extends FC.Shared.Controllers.BaseController {
        public RatingSvc: FC.Modules.Rating.Services.RatingService;
        public Stars: string[];
        public $scope: FC.Shared.ViewModels.RatingVm;
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
        }

        public SetFestival(festival: FC.Shared.ViewModels.IFestivalVM) {
            var vm = this;
            vm.$scope.Festival = festival;
        }
        public GetRates(contentItemID: string, type: string) {
            var vm = this;
            this.RatingSvc.GetRate(contentItemID, type).then(function (r: FC.Shared.Interfaces.IServiceResponse<Shared.ViewModels.RatingVm>) {
                vm.$scope.Festival.Rating = r.Data;
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