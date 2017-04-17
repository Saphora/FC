module FC.Modules.Auth.Directives {

    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    import MSG = FC.Shared.ServiceMessages;
    import MODELS = FC.Shared.Models;
    import CM = FC.Shared.CoreModel;
   
    export interface AuthDirectiveScope extends VM.IFormVMBase<any> {
        inst: any;
        directories: INT.IMediaDirectory[];
        children: INT.IMediaDirectory[];
        Activate: Function;
        subChildHtml: string;
        ActiveDir: INT.IMediaDirectory;

    }
    export class AuthDirective {

        public link: (scope: AuthDirectiveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        public AuthService: FC.Core.Services.AuthService;
        public $http: ng.IHttpService;
        public $q: ng.IQService;
        public $scope: AuthDirectiveScope;
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        //public template = '';
        //public templateUrl = '';
        //public controller = FC.Modules.Media.Controllers.MediaModalController;
        //public controllerAs = 'vm';
        public replace = true;
        public $compile: any;
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        public constructor( $location, $http: ng.IHttpService, $q: ng.IQService, $compile) {

            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.AuthService = new FC.Core.Services.AuthService(vm.$http, vm.$q);

            AuthDirective.prototype.link = (scope: AuthDirectiveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => {
                vm._element = element;
                vm._attrs = attrs;
                ///todo validate roles...
                var isForRoles: boolean = false;
                var isNotForRoles: boolean = false;
                var roles: Array<string> = [];
                if (vm._attrs["forRoles"]) {
                    isForRoles = true;
                    isNotForRoles = false;
                    if (vm._attrs["forRoles"] == "ROOT") {
                        roles = FC.Shared.Enum.Roles.GetAllRoot();
                    } else if (vm._attrs["forRoles"] == "ADMIN") {
                        roles = FC.Shared.Enum.Roles.GetAdmins();
                    } else if (vm._attrs["forRoles"] == "PARTNER") {
                        roles = FC.Shared.Enum.Roles.GetAllPartner();
                    } else if (vm._attrs["forRoles"] == "ALL") {
                        roles = FC.Shared.Enum.Roles.GetAll();
                    } else {
                        roles = vm._attrs['forRoles'].split(',');
                    }

                }
                if (vm._attrs["notForRoles"]) {
                    isNotForRoles = true;
                    isForRoles = false;
                    if (vm._attrs["notForRoles"] == "ROOT") {
                        roles = FC.Shared.Enum.Roles.GetAllRoot();
                    } else if (vm._attrs["notForRoles"] == "ADMIN") {
                        roles = FC.Shared.Enum.Roles.GetAdmins();
                    } else if (vm._attrs["notForRoles"] == "PARTNER") {
                        roles = FC.Shared.Enum.Roles.GetAllPartner();
                    } else if (vm._attrs["notForRoles"] == "ALL") {
                        roles = FC.Shared.Enum.Roles.GetAll();
                    } else {
                        roles = vm._attrs['notForRoles'].split(',');
                    }
                }
                if (isForRoles == true && isNotForRoles == true) {
                    throw new Error("is-for-roles is combined with a not-for-roles which conflicts.");
                } else if (isForRoles) {
                    vm._element.hide();
                    if (CacheManager.Contains("Session")) {
                        var session: MODELS.AppUserSession = CacheManager.Get<MODELS.AppUserSession>("Session").data;
                        if (session.User != null) {
                            if (session.User.Roles != null) {
                                var any = false;
                                any = session.User.Roles.some(function (v, k) {
                                    return roles.some(function (v2, k2) {
                                        if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                });
                                if (any && any == true) {
                                    vm._element.show();
                                }
                            }
                        }
                    } else {
                        console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Some elements are hidden because you are not permitted to view them.");
                    }
                } else if (isNotForRoles) {
                    if (CacheManager.Contains("Session")) {
                        var session: MODELS.AppUserSession = CacheManager.Get<MODELS.AppUserSession>("Session").data;
                        if (session.User != null) {
                            if (session.User.Roles != null) {
                                var any = false;
                                any = session.User.Roles.some(function (v, k) {
                                    return roles.some(function (v2, k2) {
                                        if (v2.trim().toLowerCase() == v.Name.trim().toLocaleLowerCase()) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                });
                                if (any && any == true) {
                                    vm._element.hide();
                                } else {
                                    vm._element.show();
                                }
                            }
                        }
                    } else {
                        console.log("FestivalCalendar[" + FC.Shared.Enum.GenericMessageStatus.AuthorizationError + "] - Elements were hidden because they are unecessary.");
                    }
                }
            };
        }

        public static factory() {
            var directive = ( $location, $http, $q, $compile) => {
                return new AuthDirective( $location, $http, $q, $compile);
            };

            directive['$inject'] = [  '$location', '$http', '$q', '$compile'];

            return directive;
        }

    }
    Application.app.directive('forRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
    Application.app.directive('notForRoles', FC.Modules.Auth.Directives.AuthDirective.factory());
}