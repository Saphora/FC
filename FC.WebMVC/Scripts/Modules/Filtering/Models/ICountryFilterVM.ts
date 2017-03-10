module FC.Modules.Filtering.Models {
    export interface ICountryFilterVM extends FC.Shared.ViewModels.IFormVMBase<Modules.Filtering.Models.FilterBarVM> {
        //ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SelectedCountries: FC.Shared.Models.UCountry[];
        Selected: string;
        SysCountries: FC.Shared.Models.UCountry[];
        IsCountriesLoading: boolean;
        ToggleCountry: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
    }
}