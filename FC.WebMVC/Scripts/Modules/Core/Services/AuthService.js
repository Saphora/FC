//?q=77.251.172.231
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var vm;
            var AuthService = (function (_super) {
                __extends(AuthService, _super);
                function AuthService(http, q) {
                    _super.call(this, http, q);
                    var vm = this;
                    this.$q = q;
                }
                AuthService.prototype.GetList = function () {
                    throw new Error("AuthService.GetList() is not implemented.");
                };
                AuthService.prototype.HasAuth = function (roles) {
                    var vm = this;
                    var sid;
                    var uid;
                    var token;
                    var session;
                    if (CacheManager.Contains("SessionID") && CacheManager.Contains("UserID") && CacheManager.Contains("Token") && CacheManager.Contains("Session")) {
                        sid = CacheManager.Get("SessionID");
                        uid = CacheManager.Get("UserID");
                        token = CacheManager.Get("Token");
                        session = CacheManager.Get("Session");
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
                    var LastChecked = CacheManager.Get("LastAuthChecked");
                    if (LastChecked == null) {
                        CacheManager.WriteStorage("LastAuthChecked", new Date(), 1000 * 60 * 10);
                        if (!sid || !uid || !token) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return this.$q.resolve(false);
                        }
                    }
                    else if (LastChecked.expires <= new Date().getTime()) {
                        console.log("SERVER AUTHENTICATION CHECKUP ROUTINE");
                        CacheManager.WriteStorage("LastAuthChecked", new Date(), 1000 * 60 * 10);
                        var sm = new FC.Shared.ServiceMessages.IsAuthMsg();
                        if (!sid || !uid || !token) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return vm.$q.resolve(false);
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
                            }
                            else {
                                CacheManager.DeleteStorage("SessionID");
                                CacheManager.DeleteStorage("UserID");
                                CacheManager.DeleteStorage("Token");
                                CacheManager.DeleteStorage("Session");
                                return vm.$q.resolve(false);
                            }
                        });
                    }
                    else if (LastChecked.expires > new Date().getTime()) {
                        if (sid == null || uid == null || token == null) {
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            return vm.$q.resolve(false);
                        }
                        else {
                            if (AuthService.Session.User) {
                                if (AuthService.Session.User.Roles) {
                                    var UserRoles = AuthService.Session.User.Roles;
                                    var any = UserRoles.some(function (v, i) {
                                        return roles.some(function (value, key) {
                                            return (v.Name == value);
                                        });
                                    });
                                    if (any && any == true) {
                                        AuthService.IsAuthenticated = true;
                                        AuthService.IsAuthorized = true;
                                        return vm.$q.resolve(true);
                                    }
                                    else {
                                        AuthService.IsAuthenticated = false;
                                        AuthService.IsAuthorized = false;
                                        CacheManager.DeleteStorage("SessionID");
                                        CacheManager.DeleteStorage("Session");
                                        CacheManager.DeleteStorage("UserID");
                                        CacheManager.DeleteStorage("Token");
                                        return vm.$q.resolve(false);
                                    }
                                }
                            }
                            AuthService.IsAuthenticated = false;
                            AuthService.IsAuthorized = false;
                            CacheManager.DeleteStorage("SessionID");
                            CacheManager.DeleteStorage("Session");
                            CacheManager.DeleteStorage("UserID");
                            CacheManager.DeleteStorage("Token");
                            return vm.$q.resolve(false);
                        }
                    }
                    else {
                        throw new Error("Unexpected authorization situation detected.");
                    }
                };
                AuthService.prototype.IsAuth = function (model) {
                    var result = this.Post('/API/Auth/HasAuth', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                AuthService.prototype.Login = function (model) {
                    var result = this.Post('/API/Auth/Login', new FC.Shared.Models.ServiceMessage(model));
                    if (result) {
                        result.then(function (r) {
                            CacheManager.WriteStorage("UserID", r.Data.UserID, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("Session", r.Data, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("SessionID", r.Data.SessionID, new Date(r.Data.Expires).getTime());
                            CacheManager.WriteStorage("Token", r.Data.Token, new Date(r.Data.Expires).getTime());
                        });
                    }
                    return result;
                };
                AuthService.prototype.Logout = function (model) {
                    var result = this.Post('/API/Auth/Logout', new FC.Shared.Models.ServiceMessage(model));
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
                };
                AuthService.$inject = ['$http', '$q'];
                AuthService.Token = "";
                AuthService.SessionID = "";
                AuthService.UserID = "";
                AuthService.IsAuthorized = false;
                AuthService.IsAuthenticated = false;
                return AuthService;
            }(FC.Core.ServiceBase));
            Services.AuthService = AuthService;
            Application.app.service('FC.Core.Services.AuthService', FC.Core.Services.AuthService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=AuthService.js.map