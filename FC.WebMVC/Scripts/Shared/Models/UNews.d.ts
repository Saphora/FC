declare module FC.Shared.Models {
    class UNews extends BaseModel implements FC.Shared.Interfaces.IUNews {
        constructor(news: FC.Shared.Interfaces.IUNews);
        Title: string;
        Date: Date;
        Text: string;
        Img: string;
        Genres: Array<UGenre>;
        Type: string;
        DisplayDate: string;
    }
}
