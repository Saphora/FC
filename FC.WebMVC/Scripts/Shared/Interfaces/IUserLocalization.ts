module FC.Shared.Interfaces {
    export interface IUserLocalization {
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
        ThreeLetterCountryName:string;
    }
}
