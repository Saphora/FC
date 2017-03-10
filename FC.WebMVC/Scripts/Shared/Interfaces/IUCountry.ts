module FC.Shared.Interfaces {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IUCountry extends IBaseModel {
        Name: string;
        IsPopular: boolean;
        CultureIsoName: string;
        LanguageName: string;
        Currency: string;
        RegionInfo: Array<INT.IRegionInfo>;
        CountryID: string;

    }
}
