module FC.Shared.Interfaces {
    export interface INewsVm {
        Title: string;
        Content: string;
        DisplayDate: string;
        GenreID: string;
        Type: string;
        Img: string;
        Link: string;
        SortDate: Date;
        UmbracoID: number;
    }
}