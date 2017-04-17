///<reference path="../../Core/FC.ts"/>
///<reference path="../News.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.News.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import SCTRL = FC.Shared.Controllers;
    export class NewsDialogController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.News.Controllers.NewsDialogController;
        public $scope: Models.INewsDialog;
        public NewsService: FC.Modules.News.Services.NewsService;

        static $inject = [
            '$http',
            '$q',
            '$uibModal',
            '$scope',
            '$mdDialog',
            
            '$location',
            "$sce",
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: Models.INewsDialog,
            $mdDialog: angular.material.MDDialogService,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            var vm = this;
            vm.NewsService = new FC.Modules.News.Services.NewsService($http, $q);
            vm.$scope.$location = $location;
            vm.$scope.FormID = 'B6317654-30F4-4091-B0BE-E2E3568178D0';
            vm.$scope.inst = this;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope = $scope;
            vm.$scope.PageNum = 0;

            vm.$scope.DoSaveEdit = function ($scope: Models.INewsDialog) {
                vm.DoSaveCRUD(SCTRL.ActionType.Update, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                    vm.$scope.IsLoading = false;
                });
            }
            vm.$scope.DoSaveDelete = function ($scope: Models.INewsDialog) {
                vm.DoSaveCRUD(SCTRL.ActionType.Delete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                    vm.$scope.IsLoading = false;
                });
            }
            vm.$scope.DoSaveForceDelete = function ($scope: Models.INewsDialog) {
                vm.DoSaveCRUD(SCTRL.ActionType.ForceDelete, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                    vm.$scope.IsLoading = false;
                });
            }
            vm.$scope.DoSaveCreate = function ($scope: Models.INewsDialog) {
                vm.DoSaveCRUD(SCTRL.ActionType.Create, SCTRL.ServiceType.NewsService, $scope).then(function (r) {
                    vm.$scope.IsLoading = false;
                });
            }

            vm.$scope.DoCreate = this.DoCreate;
            vm.$scope.DoEdit = this.DoEdit;
            vm.$scope.DoDelete = this.DoDelete;
            //vm.determineDetailType( $route);
            //vm.LogoSaveListener();
            vm.RegisterModel(vm.$scope);

        }

        public ShowMore($scope:Models.INewsDialog) {
            $scope.PageNum++;
        }

        public RegisterModel($scope: Models.INewsDialog): void {

            $scope.News = new Array<FC.Shared.Models.UNews>();
            var m = (new Date().getMonth() + 1).toString();
            var y = (new Date().getFullYear()).toString();
            this.NewsService.GetPaged(0, m, y).then(function (r) {
                $scope.News = r.Data;
            });

        }

        public DoCreate($scope: Models.INewsDialog): void {
            $scope = $scope.inst.$scope;
            $scope.IsCreating = true;
        }

        public DoEdit($scope: Models.INewsDialog): void {
            $scope = $scope.inst.$scope;
            $scope.IsEditing = true;
        }

        public DoDelete($scope: Models.INewsDialog): void {
            $scope = $scope.inst.$scope;
            $scope.IsDeleting = true;
        }


        public Close($scope: Models.INewsDialog) {
            $scope = $scope.inst.$scope;
            $scope.MtModal.hide();
        }

        //public LocationSaveListener() {
        //    var vm = this;
        //    vm.$scope.IsLoading = true;
        //    window.addEventListener("LocationSaveEvent", function (e) {
        //        vm.$scope.model.FestivalLocationID = e["detail"].LocationID;
        //        vm.FestivalService.Update(vm.$scope.model).then(function (r) {
        //            vm.FestivalService.GetFestival(vm.$scope.model.FestivalID).then(function (r2) {
        //                vm.$scope.MtModal.hide();
        //                vm.$scope.IsLoading = false;
        //            });
        //        });
        //    });
        //}

        //public LogoSaveListener() {
        //    var vm = this;
        //    window.addEventListener("LocationThumbSaved", function (e) {
        //        vm.$scope.model.ThumbnailID = e["detail"];
        //        vm.$scope.model.ZIPCode = vm.$scope.model.ZIPCode.substr(0, 7).replace(' ', '');
        //        vm.LocationService.Update(vm.$scope.model).then(function (r) {
        //            if (r.Data.SUCCESS == true) {
        //                window.alert(r.Data.MSG);

        //            }
        //        }).catch(function (r) {
        //            window.alert("There was error while saving your news item. Please try again later.");
        //        })
        //    });
        //}

        //private setFestivalDetailData(detailID: string): void {
        //    var vm = this;
        //    vm.FestivalService.GetFestival(detailID).then(function (r) {
        //        vm.$scope.Festival = r.Data;
        //        vm.$scope.model = r.Data;
        //        var profileImgUrl = "/Resources/images/profile-header-default.jpg";
        //        if (r.Data.ProfileImage) {
        //            profileImgUrl = FC.Core.Environment.MediaURLRoot +"/?action=getimg&MediaID="+r.Data.ProfileImage.MediaID+"&IsObsolete=false&Width="+r.Data.ProfileImage.Width;
        //        }
        //        vm.$scope.ProfileHeaderImg = profileImgUrl;
        //        vm.$scope.IsLoading = false;
        //    });
        //}


        //private setNews(detailID: string): void {
        //    var vm = this;
        //    vm.LocationService.GetLocation(detailID).then(function (r) {
        //        vm.$scope.IsLoading = false;
        //        vm.$scope.Location = r.Data;
        //        vm.$scope.model = r.Data;
        //    });
        //}
        //public determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute) {
        //    if ($routeParams["festivalID"]) {
        //        // this.setFestivalDetailData($routeParams["festivalID"]);
        //    } else if ($routeParams["newsID"]) {
        //        this.setNewsDetailData($routeParams["newsID"]);
        //    } else if ($routeParams["artistID"]) {
        //        this.setArtistDetailData($routeParams["artistID"]);
        //    } else if ($routeParams["reportID"]) {
        //        this.setReportDetailData($routeParams["reportID"]);
        //    } else if ($routeParams["locationID"]) {
        //        this.setLocationDetailData($routeParams["locationID"]);
        //    } else {
        //        throw new Error("This action is not specified in the details controller");
        //    }
        //}
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.News.Controllers.NewsDialogController", FC.Modules.News.Controllers.NewsDialogController);
}