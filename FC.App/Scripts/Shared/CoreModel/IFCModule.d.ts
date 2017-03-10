declare module FC.Shared.Interfaces.Core {
    interface IFCModule {
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
    }
}
