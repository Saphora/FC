///<reference path="../Core/FC.ts"/>
module FC.Modules.Calendar {
    export class Calendar {
        public $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
            this.$Application.AddRoute("/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
            this.$Application.AddRoute("/calendar", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
            this.$Application.AddRoute("/calendar/:year/:month", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
            this.$Application.AddRoute("/calendar/:year/:month:/:country", "/Scripts/Modules/Calendar/Views/calendar.html", "FC.Modules.Calendar.Controllers.CalendarController", "vm");
            this.$Application.AddRoute("/festival/@:festivalName", "/scripts/modules/details/detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
        }
    }
}
var CalendarModule = new FC.Modules.Calendar.Calendar(angular.module('FC.Modules.Calendar', ApplicationDependencies), Application);
