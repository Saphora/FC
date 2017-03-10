///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media_1) {
            var Media = (function () {
                function Media(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/media/embed-upload", "/Scripts/Modules/Media/Views/file-upload.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
                    this.$Application.AddRoute("/media/browsefiles/:isxhr", "/Scripts/Modules/Media/Views/files.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
                }
                Media.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Media;
            }());
            Media_1.Media = Media;
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var MediaModule = new FC.Modules.Media.Media(angular.module('FC.Modules.Media', ApplicationDependencies), Application);
//# sourceMappingURL=Media.js.map