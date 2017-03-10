declare module FC.Shared.Models {
    class UserLocalization implements FC.Shared.Interfaces.IUserLocalization {
        constructor(UL: FC.Shared.Interfaces.IUserLocalization);
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
    }
}
