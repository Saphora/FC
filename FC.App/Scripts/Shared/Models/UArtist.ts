
module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UArtist  {
        constructor() {
        }
        ProfileImageID: string;
        ProfileImage: Media;
        Thumbnail: Media;
        ThumbnailID: string;
        ArtistID: string;
        CountryID: string;
        LogoID: string;
        Logo: Media;
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<UGenre>;
        Social: Array<SocialProfile>;
        Album: MediaDirectory;
        MediaDirectoryID: string;
        ShortText: string;
        Image: string;
        FacebookURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SoundcloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MyspaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        SoundCloudURL: string;
        MySpaceURL: string;
        
    }
}