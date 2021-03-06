﻿module FC.Shared.Interfaces {
    export interface IUFestival extends IBaseModel {
        FestivalID: string;
        CountryID: string;
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: IUCountry;
        City: string;
        Location: string;
        TicketPrice: number;
        DailyTicketPrice: number;
        Visitors: string;
        StartDate: Date;
        EndDate: Date;
        CampingAvailable: string;
        Genres: Array<number>;
        IsTopFestival: boolean;
        Description: string;
        Artists: Array<number>;
        Address: string;
        ZIPCode: string;
        Website: string;
        Stages: number;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        DeezerURL: string;
        MySpaceURL: string;
        SoundCloudURL: string;
        AftermovieYoutubeURL: string;
        CultureStartDate: string;
        CultureEndDate: string;
        CalcPrice: string;
        CalcDailyPrice: string;
        FriendlyStartDate: ISimpleDateTime;
        FriendlyEndDate: ISimpleDateTime;
        IsSoldOut: string;
        Rating: string;
        SafeLocation: string;
        AlbumID: string;
        Album: FC.Shared.Models.MediaDirectory;
        Social: Array<FC.Shared.Models.SocialProfile>;
        Thumbnail: FC.Shared.Models.Media;
        ThumbnailID: string;
        Tickets: Array<FC.Shared.Models.FestivalTicket>;
    }  
}
