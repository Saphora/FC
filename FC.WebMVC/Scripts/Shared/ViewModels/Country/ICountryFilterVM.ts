module FC.Shared.ViewModels {
    export interface ICountryFilterVm extends IFormVMBase<any> {
        //ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SelectedCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ToggleCountry: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
        Selected: string;
    }
}