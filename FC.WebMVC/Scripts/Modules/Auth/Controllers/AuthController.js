///<reference path="../../Core/FC.ts"/>
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/Services/AuthService.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth) {
            var Controllers;
            (function (Controllers) {
                var AuthController = (function (_super) {
                    __extends(AuthController, _super);
                    function AuthController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, AuthService, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                        this.$routeParams = $routeParams;
                        var vm = this;
                        if (window.location.href.indexOf("logout") > -1) {
                            if (this.$routeParams['ref']) {
                                var model = new FC.Shared.ServiceMessages.LogoutMsg();
                                if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                                    model.SessionID = CacheManager.Get("SessionID").data;
                                    model.UserID = CacheManager.Get("UserID").data;
                                    CacheManager.DeleteStorage('UserID');
                                    CacheManager.DeleteStorage('SessionID');
                                    CacheManager.DeleteStorage('Session');
                                    CacheManager.DeleteStorage('Token');
                                    $scope.inst.AuthSvc.Logout(model).then(function (r) {
                                        var url = atob(vm.$routeParams['ref']);
                                        vm.$location.path(url);
                                    });
                                }
                                else {
                                    var url = atob(vm.$routeParams['ref']);
                                    vm.$location.path(url);
                                }
                            }
                            else {
                                throw new Error("Cannot logout without ref argument");
                            }
                        }
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                    }
                    AuthController.prototype.initialize = function ($scope) {
                        var vm = this;
                        vm.AuthSvc.HasAuth(FC.Shared.Enum.Roles.GetAll()).then(function (r) {
                            vm.$scope.HasAuth = r;
                        });
                    };
                    AuthController.prototype.StartLogout = function ($scope) {
                        var vm = this;
                        if (this.$routeParams['ref']) {
                            var model = new FC.Shared.ServiceMessages.LogoutMsg();
                            if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID")) {
                                model.SessionID = CacheManager.Get("SessionID").data;
                                model.UserID = CacheManager.Get("UserID").data;
                                CacheManager.DeleteStorage('UserID');
                                CacheManager.DeleteStorage('SessionID');
                                CacheManager.DeleteStorage('Session');
                                CacheManager.DeleteStorage('Token');
                                $scope.inst.AuthSvc.Logout(model).then(function (r) {
                                    var url = atob(vm.$routeParams['ref']);
                                    vm.$location.path(url);
                                });
                            }
                            else {
                                var url = atob(vm.$routeParams['ref']);
                                vm.$location.path(url);
                            }
                        }
                        else {
                            throw new Error("Cannot logout without ref argument");
                        }
                    };
                    AuthController.prototype.SubmitLoginForm = function ($scope) {
                        var inst = $scope.inst;
                        var $scope = $scope.inst.$scope;
                        $scope.inst.AuthSvc.Login($scope.LoginFormVM).then(function (r) {
                            if (r.Data != null) {
                                if (r.Data.Authenticated == true) {
                                    var rp = inst.$routeParams;
                                    inst.$location.path(rp.ref);
                                    window.dispatchEvent(new CustomEvent("AUTH_SUCCESS"));
                                }
                                else {
                                    $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                                }
                            }
                            else {
                                $scope.ServerMsg = "There is something wrong with your credentials. Please try again.";
                            }
                        });
                    };
                    AuthController.prototype.SubmitRegisterForm = function ($scope) {
                    };
                    //public ActiveGenreID: number;
                    AuthController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "FC.Core.Services.AuthService",
                        "$sce",
                    ];
                    return AuthController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.AuthController = AuthController;
                AuthModule.GetApplication().RegisterController("FC.Modules.Auth.Controllers.AuthController", FC.Modules.Auth.Controllers.AuthController);
            })(Controllers = Auth.Controllers || (Auth.Controllers = {}));
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=AuthController.js.map