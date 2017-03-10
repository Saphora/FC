module FC.Shared.ViewModels {
    export interface IMenuVM extends FC.Shared.ViewModels.IFormVMBase<any> {        
        ToggleMobile: Function;
        ToggleGenreFilter: Function;
        ToggleCountryFilter: Function;
        CloseMenu: Function;
        GenreCount: number;
        CountryCount: number;
        ArtistCount: number;
        FestivalCount: number;
        OpenLoginModal: Function;
        OpenMyProfileModal: Function;
    }
}