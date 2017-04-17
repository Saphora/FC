///<reference path="../../Core/FC.ts"/>
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/Services/AuthService.ts"/>

module FC.Modules.Auth.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import SVC = FC.Core.Services.AuthService;
    export class AuthController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Auth.Controllers.AuthController;
        public CacheManager: FC.Shared.Util.CacheManager;
        public AuthSvc: FC.Core.Services.AuthService;
        public $scope: FC.Shared.ViewModels.IAuthVM;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            '$mdDialog',
            "FC.Core.Services.AuthService",
            "$sce",
        ];

        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog,
            AuthService: FC.Core.Services.AuthService,
            $sce
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            this.$location = $location;
            $scope.SubmitLoginForm = this.SubmitLoginForm;
            $scope.SubmitRegisterForm = this.SubmitRegisterForm;
            $scope.LoginFormVM = new FC.Shared.ServiceMessages.LoginMsg();
            $scope.RegisterFormVM = new FC.Shared.ServiceMessages.RegisterMsg();
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.AuthSvc = AuthService;
            this.$scope.inst = this;
            this.$scope = $scope;
            this.$scope.StartLogout = this.StartLogout;
            
            var vm = this;
            if (window.location.href.indexOf("logout") > -1) {
                if (this.$routeParams['ref']) {
                    var model = new FC.Shared.ServiceMessages.LogoutMsg();
                    if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                        model.SessionID = CacheManager.Get<string>("SessionID").data;
                        model.UserID = CacheManager.Get<string>("UserID").data;
                        CacheManager.DeleteStorage('UserID');
                        CacheManager.DeleteStorage('SessionID');
                        CacheManager.DeleteStorage('Session');
                        CacheManager.DeleteStorage('Token');
                        $scope.inst.AuthSvc.Logout(model).then(function (r) {
                            var url = atob(vm.$routeParams['ref']);
                            vm.$location.path(url);
                        });
                    } else {
                        var url = atob(vm.$routeParams['ref']);
                        vm.$location.path(url);
                    }
                } else {
                    throw new Error("Cannot logout without ref argument");
                }
            }
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
        }
        public initialize($scope: FC.Shared.ViewModels.IAuthVM) {
            var vm = this;
            vm.AuthSvc.HasAuth(FC.Shared.Enum.Roles.GetAll()).then(function (r) {
                vm.$scope.HasAuth = r;
            });
            
        }
        public StartLogout($scope: FC.Shared.ViewModels.IAuthVM) {
            var vm = this;
            if (this.$routeParams['ref']) {
                var model = new FC.Shared.ServiceMessages.LogoutMsg();
                if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                    model.SessionID = CacheManager.Get<string>("SessionID").data;
                    model.UserID = CacheManager.Get<string>("UserID").data;
                    CacheManager.DeleteStorage('UserID');
                    CacheManager.DeleteStorage('SessionID');
                    CacheManager.DeleteStorage('Session');
                    CacheManager.DeleteStorage('Token');
                    $scope.inst.AuthSvc.Logout(model).then(function (r) {
                        var url = atob(vm.$routeParams['ref']);
                        vm.$location.path(url);
                    });
                } else {
                    var url = atob(vm.$routeParams['ref']);
                    vm.$location.path(url);
                }
            } else {
                throw new Error("Cannot logout without ref argument");
            }
            
        }
        public SubmitLoginForm($scope: FC.Shared.ViewModels.IAuthVM): void {
            var inst = $scope.inst;
            var $scope = $scope.inst.$scope;
            $scope.inst.AuthSvc.Login($scope.LoginFormVM).then(function (r: INT.IServiceResponse<MODELS.AppUserSession>) {
                if (r.Data != null) {
                    if (r.Data.Authenticated == true) {
                        var rp = inst.$routeParams;
                        inst.$location.path(rp.ref);
                        window.dispatchEvent(new CustomEvent("AUTH_SUCCESS"));
                    } else {
                        $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                    }
                } else {
                    $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                }
            });
        }

        public SubmitRegisterForm($scope): void {

        }

    }
    AuthModule.GetApplication().RegisterController("FC.Modules.Auth.Controllers.AuthController", FC.Modules.Auth.Controllers.AuthController);
}