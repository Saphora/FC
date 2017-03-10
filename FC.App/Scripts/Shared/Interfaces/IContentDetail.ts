module FC.Shared.Interfaces {
    export interface IContentDetail {
        Thumbnail: string;
        ContentType: string;
        MetaKeys: string;
        MetaDescription: string;
        Genres: Array<number>;
        Author: string;
        Title: string;
        OrderDate: number;
        DisplayDate: string;
        ShortText: string;
        DetailText: string;
        Link: string;
        ShowReadMore: boolean;
        SortOrder: number;
        Rating: string;
    }
}