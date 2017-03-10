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
                    this.$Application.AddRoute("/", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:country", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month/:country", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
                    this.$Application.AddRoute("/calendar/:year/:month/:country/:genre", "/Scripts/Modules/Calendar/Views/calendar-month-columns.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
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
