module FC.Modules.Genres.Models {
    export interface IGenreOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UGenre> {
        ShowMoreURL: string;
        ShowMore: boolean;
        Genres: FC.Shared.Models.UGenre[];
    }
}