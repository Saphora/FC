declare module FC.Modules.Calendar {
    class Calendar {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
