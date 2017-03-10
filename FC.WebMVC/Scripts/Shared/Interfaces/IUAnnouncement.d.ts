declare module FC.Shared.Interfaces {
    interface IUAnnouncement extends IBaseModel {
        Title: string;
        Date: string;
        Image: string;
        Genres: Array<IUGenre>;
    }
}
