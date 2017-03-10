module FC.Shared.ViewModels {
    export interface IGenreFilterVM extends IFormVMBase<Modules.Filtering.Models.FilterBarVM> {
        //ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SelectedGenres: FC.Shared.Models.UGenre[];
        Selected: string;
        SelectedGenreIds: string;
        SysGenres: FC.Shared.Models.UGenre[];
        IsGenresLoading: boolean;
        ToggleGenre: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
    }
}