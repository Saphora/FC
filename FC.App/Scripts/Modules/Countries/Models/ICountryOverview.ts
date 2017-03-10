module FC.Modules.Countries.Models {
    export interface ICountryOverview extends FC.Shared.ViewModels.IFormVMBase<any> {
        Countries: FC.Shared.Models.UCountry[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}