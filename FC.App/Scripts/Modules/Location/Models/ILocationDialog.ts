module FC.Modules.Location.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export interface ILocationDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        MtModal: ng.material.MDDialogService;
        GetLocations: Function;
        Locations: MODELS.Location[];
        SetCountry: Function;
        CountryName: string;
        PhoneCodes: any;
        PhoneCode: string;
        SelectedImagePath: string;
    }
}