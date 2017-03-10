declare module FC.Shared.Interfaces {
    interface IUNews extends IBaseModel {
        Title: string;
        Date: Date;
        Text: string;
        Img: string;
        Genres: Array<IUGenre>;
        Type: string;
        DisplayDate: string;
    }
}
