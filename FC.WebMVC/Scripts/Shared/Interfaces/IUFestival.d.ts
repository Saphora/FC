declare module FC.Shared.Interfaces {
    interface IUFestival extends IBaseModel {
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: IUCountry;
        City: string;
        Location: string;
        TicketPrice: Number;
        DailyTicketPrice: Number;
        Visitors: Number;
        StartDate: Date;
        EndDate: Date;
        CampingAvailable: string;
        Genres: Array<IUGenre>;
        IsTopFestival: boolean;
        Description: string;
        Artists: Array<IUArtist>;
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
        FriendlyStartDate: ISimpleDateTime;
        FriendlyEndDate: ISimpleDateTime;
    }
}
