///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search_1) {
            var Search = (function () {
                function Search(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Search.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Search;
            }());
            Search_1.Search = Search;
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var SearchModule = new FC.Modules.Search.Search(angular.module('FC.Modules.Search', ApplicationDependencies), Application);
