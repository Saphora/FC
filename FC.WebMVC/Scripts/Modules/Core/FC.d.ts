declare module FC.Core {
    class FCModule {
        name: string;
        modules: Array<string>;
        app: ng.IModule;
        constructor(name: string, modules: Array<string>);
        RegisterController(controllerName: string, controller: Function): void;
        RegisterService(serviceName: string, service: Function): void;
        RegisterModule(moduleName: string, module: any): void;
        GetModule(name: string): any;
        AddRoute(urlFormat: string, tplName: string, controllerName: string, controllerAlias: any): void;
    }
}
declare var ApplicationDependencies: string[];
declare var Application: FC.Core.FCModule;
declare var IndexModule: FC.Modules.Index.Index;
declare var LoadingModule: FC.Modules.Loading.Loading;
declare var CalendarModule: FC.Modules.Calendar.Calendar;
declare var FestivalModule: FC.Modules.Festival.Festival;
