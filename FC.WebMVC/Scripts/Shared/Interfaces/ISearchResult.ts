module FC.Shared.Interfaces {
    export interface ISearchResult {
        UmbracoID: number;
        Name: string;
        Genres: Array<number>;
        Country: string;
        Image: string;
        Type: string;
        Location: string;
        Date: Date;
    }
}