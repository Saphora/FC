declare module FC.Modules.Calendar.Controllers {
    class CalendarController {
        static $inject: string[];
        constructor($scope: any, $route: any, CalendarService: FC.Modules.Calendar.Services.CalendarService);
    }
}
