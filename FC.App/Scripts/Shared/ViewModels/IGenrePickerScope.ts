module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    export interface IGenrePickerScope extends IFormVMBase<FC.Shared.Models.UGenre> {
        inst: FC.Modules.Genres.Controllers.GenrePickerController;
        model: FC.Shared.Models.UGenre;
        GenreSearchKey: string;
        SysGenres: Models.UGenre[];
        RootGenres: Models.UGenre[];
        SelectedGenres: Models.UGenre[];
        URLRoot: string;
        ArtistImagePath: string;
        Image: string;
        $dismiss: any;
        GenreCreated: boolean;
        GenreModified: boolean;
        GenreDeleted: boolean;
        SearchResult: Models.UGenre[];
        SearchKey: string;
        DoSearch: Function;
        DoCancelSearch: Function;
        Save: Function;
        Activate: Function;
        IsActive: Function;
        ToggleSelected: Function;
        Close: Function;
        SelectedHidden: boolean;
    }
}