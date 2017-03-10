declare module FC.Shared.Interfaces {
    interface IUArtist extends IBaseModel {
        Name: string;
        Description: string;
        Country: IUCountry;
        Website: string;
        Genres: Array<IUGenre>;
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
