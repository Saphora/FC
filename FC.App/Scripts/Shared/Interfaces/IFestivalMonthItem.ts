module FC.Shared.Interfaces {
    import CM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IFestivalMonthItem extends INT.IBaseModel {
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: INT.IUCountry;
        City: string;
        Location: string;
        TicketPrice: string;
        DailyTicketPrice: string;
        Visitors: string;
        StartDate: string;
        EndDate: string;
        Genres: string;
        IsTopFestival: string;
        Stages: string;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SpotifyURL: string;
        DeezerURL: string;
        CultureEndDate: string;
        CultureStartDate: string;
        DayCount: string;
    }
}