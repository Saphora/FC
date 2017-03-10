module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UserLocalization implements INT.IUserLocalization {
        constructor(UL: INT.IUserLocalization) {
            this.ISOCurrencySymbol = UL.ISOCurrencySymbol;
            this.NegativeSign = UL.NegativeSign;
            this.PositiveSign = UL.PositiveSign;
            this.TimeSeparator = UL.TimeSeparator;
            this.CurrencyNativeName = UL.CurrencyNativeName;
            this.RegionEnglishName = UL.RegionEnglishName;
            this.RegionName = UL.RegionName;
            this.CultureIsoName = UL.CultureIsoName;
            this.CultureCountryName = UL.CultureCountryName;
            this.CultureMoneySign = UL.CultureMoneySign;
            this.CultureDateSeparator = UL.CultureDateSeparator;
            this.CultureCurrencySeparator = UL.CultureCurrencySeparator;
            this.CurrencyCultureDecimalDigits = UL.CurrencyCultureDecimalDigits;
            this.NumberDecimalDigits = UL.NumberDecimalDigits;
            this.NumberDecimalSeparator = UL.NumberDecimalSeparator;
            this.TwoLetterCountryName = UL.TwoLetterCountryName;
            this.ThreeLetterCountryName = UL.ThreeLetterCountryName;
        }
        ISOCurrencySymbol: string;
        NegativeSign: string;
        PositiveSign: string;
        TimeSeparator: string;
        CurrencyNativeName: string;
        RegionEnglishName: string;
        RegionName: string;
        CultureIsoName: string;
        CultureCountryName: string;
        CultureMoneySign: string;
        CultureDateSeparator: string;
        CultureCurrencySeparator: string;
        CurrencyCultureDecimalDigits: Number;
        NumberDecimalDigits: Number;
        NumberDecimalSeparator: string;
        TwoLetterCountryName: string;
        ThreeLetterCountryName: string;
    }
}
