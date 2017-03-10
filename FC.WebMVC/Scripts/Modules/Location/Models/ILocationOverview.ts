module FC.Modules.Location.Models {
    export interface ILocationOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        Locations: FC.Shared.Models.Location[];
        LocationID: string;
        Key: string;
        CountrySortID: string;
        SearchKey: string;
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}