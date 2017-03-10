module FC.Shared.Interfaces {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IUArtist extends IBaseModel {
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        Image: string;
        FacebookURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SoundCloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MySpaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        ArtistID: string;
        CountryID: string;
        Album: FC.Shared.Models.MediaDirectory;
        AlbumID: string;
        Social: Array<FC.Shared.Models.SocialProfile>;
    }
}