module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UAnnouncement  implements INT.IUAnnouncement {
        constructor(a: INT.IUAnnouncement) {
            this.Title = a.Title;
            this.Date = a.Date;
            this.Image = a.Image;
            if (a.Genres != null) {
                this.Genres = a.Genres;
            } else {
                this.Genres = new Array<UGenre>();
            }
            this.AnnouncementID = a.AnnouncementID;
        }
        AnnouncementID: string;
        Title: string;
        Date: string;      
        Image: string;       
        Genres: Array<UGenre>;
    }
}