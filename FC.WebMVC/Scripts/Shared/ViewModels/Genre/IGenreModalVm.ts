module FC.Shared.ViewModels {
    export interface IGenreModalVm extends IFormVMBase<any> {
        ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SysGenres: FC.Shared.Models.UGenre[];
        IsGenresLoading: boolean;
        animationsEnabled: boolean;
        ToggleState: Function;
        SaveState: Function;
        IsActive: Function;
        Controller: FC.Modules.Filtering.Controllers.FilterController;
    }
}