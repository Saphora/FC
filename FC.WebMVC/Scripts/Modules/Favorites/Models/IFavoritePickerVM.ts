module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    export interface IFavoritePickerVM extends IFormVMBase<any> {
        SysGenres: Models.UGenre[];
        SelectedGenres: Models.UGenre[];
        SearchKey: string;
        SysArtists: Models.UArtist[];
        SelectedArtists: Models.UArtist[];
        SysLocations: Models.Location[];
        SelectedLocations: Models.Location[];
        SysFestivals: Models.UFestival[];
        SelectedFestivals: Models.UFestival[];
        SysCountries: Models.UCountry[];
        SelectedCountries: Models.UCountry[];
        SearchResult: any;
    }
}