module INT.Core {
    export interface IFCModule {
        $Application: FC.Core.FCModule;
        //constructor(ngModule: any, app: IFCModule);
        GetApplication(): FC.Core.FCModule;
    }
}