declare module FC.Shared.Interfaces {
    interface IUBanner extends IBaseModel {
        Link: string;
        Format: string;
        ImageURL: string;
        HTML: string;
        Title: string;
        BannerFormat: FC.Shared.Enums.BannerFormat;
        Genres: Array<IUGenre>;
    }
}
