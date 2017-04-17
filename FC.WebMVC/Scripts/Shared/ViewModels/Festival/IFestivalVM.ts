module FC.Shared.ViewModels {
    export interface IFestivalVM {
        City: string;
        Country: FC.Shared.Models.UCountry;
        DateExplosion: FC.Shared.ViewModels.DateVM;
        StartDateExplosion: FC.Shared.ViewModels.DateVM;
        EndDateExplosion: FC.Shared.ViewModels.DateVM;
        Location: string;
        FestivalID: string; 
        DateString: string;
        Daycount: string;
        Genres    :Array<FC.Shared.Models.UGenre>;
        IMG: string; 
        Name: string;
        GenreCount: string;
        URL: string;
        MediaObsolete: boolean;
        SpotifyURL: string; 
        Visitors: string;
        IsTopFestival: string;
        FacebookUR: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        CountryName: string;
        OrderDate: number;
        Rating: FC.Shared.ViewModels.RatingVm;
    }
}