module FC.Shared.ViewModels {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class FestivalSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        City: string;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Date: Date;
        CultureStartDate: string;
        Type: string;
        Location: string;
    }
}