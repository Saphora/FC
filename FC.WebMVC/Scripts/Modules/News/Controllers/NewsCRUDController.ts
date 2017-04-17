///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.News.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class NewsCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.News.Controllers.NewsCRUDController;
        public $scope: Models.INewsCRUD;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            '$mdDialog',
            "$sce"
        ];

        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
            this.setData();
            
            var vm = this;
            vm.$scope = $scope;
            vm.$scope.$sce = $sce;
            vm.$scope.$location = $location;
            vm.$scope.Date = new Date();
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.FormID = 'A96CA9E2-D76B-4443-A35B-F9D54EADC2E0';
            vm.$scope.IsCreating = true;
            vm.RecoverModel(vm.$scope.model, $scope);

            vm.$scope.model = vm.$scope.RecoverModel(vm.$scope.model, vm.$scope);
            if (vm.$scope.model == null) {
                vm.$scope.model = new FC.Shared.Models.UNews();
            }
            vm.$scope.model.SourceName = "Festival Calendar";
            vm.$scope.model.SourceURL = "http://www.festival-calendar.com";
            window.addEventListener('DateChanged', this.DateChanged);
            window.addEventListener('NewsImageSaved', function (e:CustomEventInit) {
                vm.$scope.model.ThumbnailID = e.detail;
            });
            window.addEventListener("MODAL_CLOSE_SUCCESS", function (r) {
                vm.$scope.$location.path('/news/');
            });
        }

        public DoSave(action: string) {
            var vm = this;
            if (action == "c") {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.NewsService, vm.$scope);
            }
            if (action == "e") {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.NewsService, vm.$scope);
            }

            vm.FinishForm(vm.$scope);
        }


        
        public NewsImageSaved(e: CustomEventInit) {
            this.$scope.model.ThumbnailID = e.detail;
        }
        

        public DateChanged(e: CustomEventInit) {
            var vm = this;
            var value = new Date(e.detail);
            this.$scope.Date = value;

        }

        public setData(): void {
            var vm = this;
            if (vm.$routeParams['newsid']) {

                vm.NewsService.GetNewsById(vm.$routeParams['newsid']).then(function (r) {
                    vm.$scope.model = r.Data;
                });
            } else {
                vm.$scope.model = new FC.Shared.Models.UNews();
            }
        }

    }
    NewsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsCRUDController", FC.Modules.News.Controllers.NewsCRUDController);
}