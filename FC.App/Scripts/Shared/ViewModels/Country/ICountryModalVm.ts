module FC.Shared.ViewModels {
    export interface ICountryModalVm extends IFormVMBase<any> {
        ActiveCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ActiveCountryCount: number;
        HasCount: boolean;
        IsOpen: boolean;
        $dismiss: any;
    }
}