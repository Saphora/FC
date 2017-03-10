///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar_1) {
            var Calendar = (function () {
                function Calendar(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month:/:country", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/festival/@:festivalName", "/scripts/modules/details/detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                }
                Calendar.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Calendar;
            }());
            Calendar_1.Calendar = Calendar;
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var CalendarModule = new FC.Modules.Calendar.Calendar(angular.module('FC.Modules.Calendar', ApplicationDependencies), Application);
//# sourceMappingURL=Calendar.js.map