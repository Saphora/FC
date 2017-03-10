module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UCountry  implements INT.IUCountry {
        constructor(c?: INT.IUCountry) {
            if (c) {
                this.Name = c.Name;
                this.CultureIsoName = c.CultureIsoName;
                this.LanguageName = c.LanguageName;
                this.RegionInfo = c.RegionInfo;
            }
        }
        CountryID: string;
        Name: string;
        IsPopular: boolean;
        CultureIsoName: string;
        LanguageName: string;
        Currency: string;
        RegionInfo: Array<FC.Shared.CoreModel.RegionInfo>;
    }
}
