declare module FC.Shared.Models {
    class UNews extends BaseModel {
        Title: string;
        Date: Date;
        Text: string;
        Img: string;
        Genres: Array<UGenre>;
        Type: string;
        DisplayDate: string;
    }
}
