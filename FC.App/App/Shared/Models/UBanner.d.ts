declare module FC.Shared.Models {
    class UBanner extends BaseModel {
        Link: string;
        Format: string;
        ImageURL: string;
        HTML: string;
        Title: string;
        BannerFormat: FC.Shared.Enums.BannerFormat;
    }
}
