module FC.Shared.Interfaces {
    export interface IFestivalFilter {
        GenreIDs: Array<string>;
        CountryIDs: Array<string>;
        FestivalID: string;
        MonthNum: number;
        YearNum: number;
    }
}