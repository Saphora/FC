module FC.Modules.Details.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export interface IFestivalDetailDialog extends FC.Shared.ViewModels.IFormVMBase<any> {
        StartTime: string;
        EndTime: string;
    }
}