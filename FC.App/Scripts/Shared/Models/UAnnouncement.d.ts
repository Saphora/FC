declare module FC.Shared.Models {
    class UAnnouncement extends BaseModel implements FC.Shared.Interfaces.IUAnnouncement {
        constructor(a: FC.Shared.Interfaces.IUAnnouncement);
        Title: string;
        Date: string;
        Image: string;
        Genres: Array<UGenre>;
    }
}
