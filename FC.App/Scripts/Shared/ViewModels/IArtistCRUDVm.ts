module FC.Shared.ViewModels {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IArtistCRUDVm extends FC.Shared.Interfaces.IBaseModel {
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<FC.Shared.Interfaces.IUGenre>;
        Image: string;
        FacebookURL: string;
        InstagramURL: string;
        SoundCloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MySpaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        ArtistID: string;
        CountryID: string;
        FlickrURL: string;

    }
}