///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Social;
        (function (Social_1) {
            var Social = (function () {
                function Social(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Social.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Social;
            }());
            Social_1.Social = Social;
        })(Social = Modules.Social || (Modules.Social = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var SocialModule = new FC.Modules.Social.Social(angular.module('FC.Modules.Social', ApplicationDependencies), Application);
//# sourceMappingURL=Social.js.map