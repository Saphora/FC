module FC.Shared.ViewModels {
    import MOD = FC.Shared.Models;
    export interface IFestivalCRUDVM extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UFestival> {
        inst: FC.Modules.Festival.Controllers.FestivalCRUDController;
        MediaURLRoot: string;
        formID: string;
        FestivalID: string;
        FestivalLogoPath: string;
        SysArtists: Array<MOD.UArtist>;
        SysGenres: Array<MOD.UGenre>;
        SysCountries: Array<MOD.UCountry>;
        MediaPickerSaveEvt: string;
        HasAuth: boolean;
        StartYear: string;
        StartMonth: string;
        StartDay: string;
        EndYear: string;
        EndMonth: string;
        EndDay: string;
        SelectedStartMonthDays: string[];
        SelectedEndMonthDays: string[];
        WizardStep: number;
        GetMediaPickerFieldState: Function;
        GetArtistPickerFieldState: Function;
        Recovery: FC.Shared.CoreModel.Recovery;
        GetDaysInMonthStart: Function;
        GetDaysInMonthEnd: Function;
        DoStartDateBlur: Function;
        DoEndDateBlur: Function;
        startDateStr: string;
        endDateStr: string;
        MinDateStart: Date;
        MaxDateStart: Date;
        MaxDateEnd: Date;
        MinDateEnd: Date;
        DoChangeStartDate: Function;
        DoEndDateChange: Function;

    }
}