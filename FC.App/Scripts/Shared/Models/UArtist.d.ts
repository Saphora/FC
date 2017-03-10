declare module FC.Shared.Models {
    class UArtist extends BaseModel implements FC.Shared.Interfaces.IUArtist {
        constructor(a: FC.Shared.Interfaces.IUArtist);
        Name: string;
        Description: string;
        Country: UCountry;
        Website: string;
        Genres: Array<UGenre>;
        Image: string;
        FacebookURL: string;
        InstagramURL: string;
        SoundcloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MyspaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
    }
}
