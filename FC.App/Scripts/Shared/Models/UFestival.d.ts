declare module FC.Shared.Models {
    class UFestival extends BaseModel implements FC.Shared.Interfaces.IUFestival {
        constructor(f: FC.Shared.Interfaces.IUFestival);
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: UCountry;
        City: string;
        Location: string;
        TicketPrice: Number;
        DailyTicketPrice: Number;
        Visitors: Number;
        StartDate: Date;
        EndDate: Date;
        CampingAvailable: string;
        Genres: Array<UGenre>;
        IsTopFestival: boolean;
        Description: string;
        Artists: Array<UArtist>;
        Address: string;
        ZIPCode: string;
        Website: string;
        Stages: Number;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        BusInfo: string;
        TrainInfo: string;
        AirPlaneInfo: string;
        CarInfo: string;
        BikeInfo: string;
        TaxiInfo: string;
        CultureStartDate: string;
        CultureEndDate: string;
        CalcPrice: string;
        CalcDailyPrice: string;
        FriendlyStartDate: SimpleDateTime;
        FriendlyEndDate: SimpleDateTime;
    }
}
