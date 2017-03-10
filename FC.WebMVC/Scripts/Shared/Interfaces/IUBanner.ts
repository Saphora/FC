module FC.Shared.Interfaces {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IUBanner extends IBaseModel {
        Link: string;
        ImageURL: string;
        HTML: string;
        Title: string;
        CustomerID: string;
        BannerID: string;
        Customer: FC.Shared.Models.UCustomer;
        Visibility: INT.IUVisibility;
        StartDate: Date;
        EndDate: Date;
        Genres: Array<FC.Shared.Models.UGenre>;
    }
}