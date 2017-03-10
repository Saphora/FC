declare module FC.Shared.Models {
    class IUBanner extends BaseModel implements FC.Shared.Interfaces.IUBanner {
        constructor(b: FC.Shared.Interfaces.IUBanner);
        Link: string;
        Format: string;
        ImageURL: string;
        HTML: string;
        Title: string;
        BannerFormat: FC.Shared.Enums.BannerFormat;
        Genres: Array<UGenre>;
    }
}
