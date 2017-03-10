module FC.Shared.ViewModels {
    export interface ICalendarVm extends IFormVMBase<any>
    {
        MediaURLRoot: string;
        Festivals: FC.Shared.ViewModels.IFestivalVM[];
        ActiveGenres: FC.Shared.Models.UGenre[];
        SysGenres: FC.Shared.Models.UGenre[];
        ActiveCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ActiveMonth: number;
        /*
        This property ActiveMonthNum is obsolete, use ActiveMonth instead.
        */
        ActiveMonthNum: number;
        ActiveYear: number;
        Banners: FC.Shared.Models.UBanner[];
        IsFestivalsLoading: boolean;
        SearchNoResults: boolean;
        Searching: boolean;
        HasSearchResults: boolean;
        BaseIsLoading: boolean;

        //Obsolete properties;
        Festivals_COL1: FC.Shared.Models.UFestival[];
        Festivals_COL2: FC.Shared.Models.UFestival[];
        Col1Banner: FC.Shared.Models.UBanner;
        Col2Banner: FC.Shared.Models.UBanner;
        Col2BannerKey: number;
        Col1BannerKey: number;
    }
}