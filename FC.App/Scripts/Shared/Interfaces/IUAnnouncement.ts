module FC.Shared.Interfaces {
    export interface IUAnnouncement extends IBaseModel {
        Title: string;
        Date: string;      
        Image: string;       
        Genres: Array<FC.Shared.Models.UGenre>;
        AnnouncementID: string;
    }
}