module FC.Modules.Location.Models {
    export interface ILocationCRUDVM extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        WizardStep: number;
        LocationID: string;
        LatLongSet: boolean;
        MapsURL: string;
        MapsReady: boolean;
    }
}