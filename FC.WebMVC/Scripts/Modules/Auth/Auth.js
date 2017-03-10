///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Auth;
        (function (Auth_1) {
            var Auth = (function () {
                function Auth(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/logout/:ref", "/Scripts/Modules/Auth/Views/logout.html", "FC.Modules.Auth.Controllers.AuthController", "vm");
                }
                Auth.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Auth;
            }());
            Auth_1.Auth = Auth;
        })(Auth = Modules.Auth || (Modules.Auth = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var AuthModule = new FC.Modules.Auth.Auth(angular.module('FC.Modules.Auth', ApplicationDependencies), Application);
//# sourceMappingURL=Auth.js.map