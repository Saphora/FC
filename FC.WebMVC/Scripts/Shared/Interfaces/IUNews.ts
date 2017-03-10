module FC.Shared.Interfaces {
    export interface IUNews extends IBaseModel {
        Title: string;
        Date: Date;
        Text: string;
        Img: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        Type: string;
        DisplayDate: string;
        NewsID: string;
        Album: FC.Shared.Models.MediaDirectory;
        AlbumID: string;
    }
}
