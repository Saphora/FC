module FC.Shared.ViewModels {
    export interface IGenreFilterVM extends IFormVMBase<any> {
        //ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SelectedGenres: FC.Shared.Models.UGenre[];
        SysGenres: FC.Shared.Models.UGenre[];
        IsGenresLoading: boolean;
        ToggleGenre: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
    }
}