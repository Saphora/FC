//?q=77.251.172.231
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />

module FC.Core.Services {
    var vm;
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import SM = FC.Shared.ServiceMessages;
    export class AuthService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
            var vm = this;
            this.$q = q;
        }
        public static Token = "";
        public static SessionID = "";
        public static UserID = "";
        public static IsAuthorized = false;
        public static IsAuthenticated = false;
        public static Session: MODELS.AppUserSession;
        public static User: MODELS.ApplicationUser;

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("AuthService.GetList() is not implemented.");
        }

        public HasAuth(roles: string[]): ng.IPromise<boolean> {
            var vm = this;
            var sid: FC.Shared.Util.Storage<string>;
            var uid: FC.Shared.Util.Storage<string>;
            var token: FC.Shared.Util.Storage<string>;
            var session: FC.Shared.Util.Storage<MODELS.AppUserSession>;
            if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID") && CacheManager.Contains("Token") && CacheManager.Contains("Session")) {
                sid = CacheManager.Get<string>("SessionID");
                uid = CacheManager.Get<string>("UserID");
                token = CacheManager.Get<string>("Token");
                session = CacheManager.Get<MODELS.AppUserSession>("Session");
                if (AuthService.Token == null) {
                    AuthService.Token = token.data;
                }
                if (AuthService.Session == null) {
                    AuthService.Session = session.data;
                }
                if (AuthService.SessionID == null) {
                    AuthService.SessionID = sid.data;
                }
                if (AuthService.UserID == null) {
                    AuthService.UserID = uid.data;
                }
            }
            var LastChecked = CacheManager.Get<Date>("LastAuthChecked");
            if (LastChecked == null) {
                CacheManager.WriteStorage("LastAuthChecked", new Date(), 1000*60*10);
                if (!sid || !uid || !token) {
                    AuthService.IsAuthenticated = false;
                    AuthService.IsAuthorized = false;
                    return this.$q.resolve<boolean>(false);
                }
            }
            else if (LastChecked.expires <= new Date().getTime()) {
                console.log("SERVER AUTHENTICATION CHECKUP ROUTINE");

                CacheManager.WriteStorage("LastAuthChecked", new Date(),1000*60*10);
                var sm = new FC.Shared.ServiceMessages.IsAuthMsg();
                if (!sid || !uid || !token) {
                    AuthService.IsAuthenticated = false;
                    AuthService.IsAuthorized = false;
                    return vm.$q.resolve<boolean>(false);
                }
                sm.SessionID = sid.data;
                sm.Token = token.data;
                if (roles) {
                    sm.Roles = roles;
                }
                
                return this.IsAuth(sm).then(function (r) {
                    AuthService.Session = r.Data;
                    AuthService.Token = r.Data.Token;
                    AuthService.UserID = r.Data.UserID;
                    AuthService.User = AuthService.Session.User;
                    AuthService.IsAuthenticated = r.Data.Authenticated;
                    AuthService.IsAuthorized = r.Data.Authorized;

                    if (r.Data.Authenticated == true && r.Data.Authorized == true) {
                        CacheManager.WriteStorage("SessionID", r.Data.SessionID, parseInt(r.Data.Expires));
                        CacheManager.WriteStorage("Token", r.Data.Token, parseInt(r.Data.Expires));
                        CacheManager.WriteStorage("Session", r.Data, parseInt(r.Data.Expires));
                        CacheManager.WriteStorage("UserID", r.Data.UserID, parseInt(r.Data.Expires));
                        return vm.$q.resolve(true);
                    } else {
                        CacheManager.DeleteStorage("SessionID");
                        CacheManager.DeleteStorage("UserID");
                        CacheManager.DeleteStorage("Token");
                        CacheManager.DeleteStorage("Session");
                        return vm.$q.resolve(false);
                    }
                });
            } else if (LastChecked.expires > new Date().getTime()) {
                if (sid == null || uid == null || token == null) {
                    AuthService.IsAuthenticated = false;
                    AuthService.IsAuthorized = false;
                    return vm.$q.resolve<boolean>(false);
                } else {
                    if (AuthService.Session.User) {
                        if (AuthService.Session.User.Roles) {
                            var UserRoles = AuthService.Session.User.Roles;
                            var any = UserRoles.some(function (v, i) {
                                return roles.some(function (value, key) {
                                    return (v.Name == value);
                                })
                            });
                            if (any && any == true) {
                                AuthService.IsAuthenticated = true;
                                AuthService.IsAuthorized = true;
                                return vm.$q.resolve<boolean>(true);
                            } else {
                                AuthService.IsAuthenticated = false;
                                AuthService.IsAuthorized = false;
                                CacheManager.DeleteStorage("SessionID");
                                CacheManager.DeleteStorage("Session");
                                CacheManager.DeleteStorage("UserID");
                                CacheManager.DeleteStorage("Token");
                                return vm.$q.resolve<boolean>(false);
                            }
                        }
                    }
                    AuthService.IsAuthenticated = false;
                    AuthService.IsAuthorized = false;
                    CacheManager.DeleteStorage("SessionID");
                    CacheManager.DeleteStorage("Session");
                    CacheManager.DeleteStorage("UserID");
                    CacheManager.DeleteStorage("Token");
                    return vm.$q.resolve<boolean>(false);
                }
            }
            else {
                throw new Error("Unexpected authorization situation detected.");
            }
        }

        public IsAuth(model: SM.IsAuthMsg): ng.IPromise<INT.IServiceResponse<MODELS.AppUserSession>> {
            var result = this.Post<MODELS.AppUserSession, SM.IsAuthMsg>(
                '/API/Auth/HasAuth',
                new FC.Shared.Models.ServiceMessage<SM.IsAuthMsg>(model)
            );
            return result;
        }

        public Login(model: SM.LoginMsg): ng.IPromise<INT.IServiceResponse<MODELS.AppUserSession>> {
            var result = this.Post<MODELS.AppUserSession, SM.LoginMsg>(
                '/API/Auth/Login',
                new FC.Shared.Models.ServiceMessage<SM.LoginMsg>(model)
            );
            if (result) {
                result.then(function (r) {
                    CacheManager.WriteStorage("UserID", r.Data.UserID, new Date(r.Data.Expires).getTime());
                    CacheManager.WriteStorage("Session", r.Data, new Date(r.Data.Expires).getTime());
                    CacheManager.WriteStorage("SessionID", r.Data.SessionID, new Date(r.Data.Expires).getTime());
                    CacheManager.WriteStorage("Token", r.Data.Token, new Date(r.Data.Expires).getTime());
                });
            }
            return result;
        }

        public Logout(model: SM.LogoutMsg): ng.IPromise<INT.IServiceResponse<boolean>> {
            var result = this.Post<boolean, SM.LogoutMsg>(
                '/API/Auth/Logout',
                new FC.Shared.Models.ServiceMessage<SM.LogoutMsg>(model)
            );
            if (result) {
                result.then(function (r) {
                    if (CacheManager.Contains("UserID") && CacheManager.Contains("SessionID") && CacheManager.Contains("Token") && CacheManager.Contains("Session")) {
                        CacheManager.DeleteStorage("UserID");
                        CacheManager.DeleteStorage("SessionID");
                        CacheManager.DeleteStorage("Session");
                        CacheManager.DeleteStorage("Token");
                    }
                });
            }
            return result;
        }
    }
    Application.app.service('FC.Core.Services.AuthService', FC.Core.Services.AuthService)
}
