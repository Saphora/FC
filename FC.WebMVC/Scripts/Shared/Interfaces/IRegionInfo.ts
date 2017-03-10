module FC.Shared.Interfaces {
    export interface IRegionInfo {
        CurrencyEnglishName: string;
        CurrencyNativeName: string;
        
        CurrencySymbol: string;
        
        DisplayName: string;
        EnglishName: string;
        GeoId: number;
        IsMetric: boolean;
        ISOCurrencySymbol: string;
        
        Name: string;
        
        NativeName: string;
        
        ThreeLetterISORegionName: string;
        ThreeLetterWindowsRegionName: string;
        
        TwoLetterISORegionName: string;
    }
}