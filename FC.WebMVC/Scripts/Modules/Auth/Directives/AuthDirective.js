var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth) {
            var Directives;
            (function (Directives) {
                var AuthDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function AuthDirective($route, $routeParams, $location, $http, $q, $compile) {
                        //public template = '';
                        //public templateUrl = '';
                        //public controller = FC.Modules.Media.Controllers.MediaModalController;
                        //public controllerAs = 'vm';
                        this.replace = true;
                        var vm = this;
                        vm.$http = $http;
                        vm.$q = $q;
                        vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);
                        AuthDirective.prototype.link = function (scope, element, attrs, $http, $q, $compile) {
                            vm._element = element;
                            vm._attrs = attrs;
                            ///todo validate roles...
                            var isForRoles = false;
                            var isNotForRoles = false;
                            var roles = [];
                            if (vm._attrs["forRoles"]) {
                                isForRoles = true;
                                isNotForRoles = false;
                                if (vm._attrs["forRoles"] == "ROOT") {
                                    roles = FC.Shared.Enum.Roles.GetAllRoot();
                                }
                                else if (vm._attrs["forRoles"] == "ADMIN") {
                                    roles = FC.Shared.Enum.Roles.GetAdmins();
                                }
                                else if (vm._attrs["forRoles"] == "PARTNER") {
                                    roles = FC.Shared.Enum.Roles.GetAllPartner();
                                }
                                else if (vm._attrs["forRoles"] == "ALL") {
                                    roles = FC.Shared.Enum.Roles.GetAll();
                                }
                                else {
                                    roles = vm._attrs['forRoles'].split(',');
                                }
                            }
                            if (vm._attrs["notForRoles"]) {
                                isNotForRoles = true;
                                isForRoles = false;
                                if (vm._attrs["notForRoles"] == "ROOT") {
                                    roles = FC.Shared.Enum.Roles.GetAllRoot();
                                }
                                else if (vm._attrs["notForRoles"] == "ADMIN") {
                                    roles = FC.Shared.Enum.Roles.GetAdmins();
                                }
                                else if (vm._attrs["notForRoles"] == "PARTNER") {
                                    roles = FC.Shared.Enum.Roles.GetAllPartner();
                                }
                                else if (vm._attrs["notForRoles"] == "ALL") {
                                    roles = FC.Shared.Enum.Roles.GetAll();
                                }
                                else {
                                    roles = vm._attrs['notForRoles'].split(',');
                                }
                            }
                            if (isForRoles == true && isNotForRoles == true) {
                                throw new Error("is-for-roles is combined with a not-for-roles which conflicts.");
                            }
                            else if (isForRoles) {
                                vm._element.hide();
                                if (CacheManager.Contains("Session")) {
                                    var session = CacheManager.Get("Session").data;
                                    if (session.User != null) {
                                        if (session.User.Roles != null) {
                                            var any = false;
                                            any = session.User.Roles.some(function (v, k) {
                                                return roles.some(function (v2, k2) {
                                                    if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                                        return true;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                });
                                            });
                                            if (any && any == true) {
                                                vm._element.show();
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Some elements are hidden because you are not permitted to view them.");
                                }
                            }
                            else if (isNotForRoles) {
                                if (CacheManager.Contains("Session")) {
                                    var session = CacheManager.Get("Session").data;
                                    if (session.User != null) {
                                        if (session.User.Roles != null) {
                                            var any = false;
                                            any = session.User.Roles.some(function (v, k) {
                                                return roles.some(function (v2, k2) {
                                                    if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                                        return true;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                });
                                            });
                                            if (any && any == true) {
                                                vm._element.hide();
                                            }
                                            else {
                                                vm._element.show();
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Elements were hidden because they are unecessary.");
                                }
                            }
                        };
                    }
                    AuthDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, $http, $q, $compile) {
                            return new AuthDirective($route, $routeParams, $location, $http, $q, $compile);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', '$http', '$q', '$compile'];
                        return directive;
                    };
                    return AuthDirective;
                }());
                Directives.AuthDirective = AuthDirective;
                Application.app.directive('forRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
                Application.app.directive('notForRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
            })(Directives = Auth.Directives || (Auth.Directives = {}));
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=AuthDirective.js.map