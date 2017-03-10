/// <reference path="../../Core/FC.d.ts" />
declare module FC.Modules.Festival.Controllers {
    class FestivalDetailController {
        static $inject: string[];
        constructor($scope: any, $route: any, FestivalService: FC.Modules.Festival.Services.FestivalService);
    }
}
