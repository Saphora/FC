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
            "$location",
            "$mdDialog",
            "FC.Modules.Rating.Services.RatingService",
        ];
        constructor(
            $http,
            $q,
            $scope,
            $location,
            $mdDialog,
            RatingService: FC.Modules.Rating.Services.RatingService
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
            this.RatingSvc = RatingService;
            this.$scope = $scope;
        }

        
        public SetRating(model: FC.Shared.ViewModels.RatingVm):void {
            this.$scope = model;
        }

        public GetRates(contentItemID: string, typeName: string) {
            var vm = this;
            this.RatingSvc.GetRate(contentItemID, typeName).then(function (r: FC.Shared.Interfaces.IServiceResponse<Shared.ViewModels.RatingVm>) {
                vm.$scope = r.Data;
            });
        }

        public Rate(contentItemID: string, typeName: string, index) {
            var vm = this;
            if (index <= 5) {
                this.RatingSvc.Rate(contentItemID, typeName, index).then(function () {
                    vm.GetRates(contentItemID, typeName);
                });
            }
        }

    }
    RatingModule.GetApplication().RegisterController("FC.Modules.Rating.Controllers.RatingController", FC.Modules.Rating.Controllers.RatingController);
}