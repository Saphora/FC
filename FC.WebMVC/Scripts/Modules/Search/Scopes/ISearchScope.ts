module FC.Shared.Scopes {
    export interface ISearchScope extends FC.Shared.ViewModels.IFormVMBase<any> {
        DoSearch: Function;
        DoSubmit: Function;
        OpenModal: Function;
        Completed: boolean;
        Keyword: string;
        URLRoot: string;
        ActiveCountries: Array<number>;
        //SearchResult: FC.Shared.ViewModels.SearchResult;
        ArtistResultVisible: boolean;
        FestivalResultVisible: boolean;
        NewsResultVisible: boolean;
        GenreResultVisible: boolean;
        IsSearching: boolean;
        IsLoading: boolean;
        GenreData: any;
        CountryData: any;
        IsFestivalsLoading: boolean;
        IsGenresLoading: boolean;
        IsArtistsLoading: boolean;

    }
}