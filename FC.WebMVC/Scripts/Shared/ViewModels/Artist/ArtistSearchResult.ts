module FC.Shared.ViewModels {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class ArtistSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Type: string;
        Date: Date;
        Location: string;
    }
}