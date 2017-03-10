module FC.Shared.Models {
import CM = FC.Core.CoreModel;
import INT = FC.Shared.Interfaces;
import MODELS = FC.Shared.Models;
import MODULES = FC.Modules;
    export class UBanner  implements INT.IUBanner {
        constructor(b: INT.IUBanner) {
            this.Title = b.Title;
            this.ImageURL = b.ImageURL;
            this.HTML = b.HTML;
            this.Link = b.Link;
            this.Visibility = b.Visibility as UVisibility;
            this.StartDate = b.StartDate;
            this.EndDate = b.EndDate;
            this.CustomerID = b.CustomerID;
            this.BannerID = b.BannerID;
            this.Customer = b.Customer;
            if (b.Genres != null) {
                this.Genres = b.Genres;
            }
            else {
                this.Genres = new Array<UGenre>();
            }
        }
        Customer: FC.Shared.Models.UCustomer;
        BannerID: string;
        Link: string;
        Visibility: FC.Shared.Models.UVisibility;
        ImageURL: string;
        HTML: string;
        Title: string;
        CustomerID: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        BannerTitleVisible: boolean;
        StartDate: Date;
        EndDate: Date;
    }
}