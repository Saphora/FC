module FC.Modules.Calendar.Models {
    export interface ICalendarVM extends FC.Shared.ViewModels.IFormVMBase<any>{
        Festivals: Array<FC.Shared.ViewModels.IFestivalVM>;
        Filter: FC.Modules.Filtering.Models.FilterBarVM;
        ShowCancelSearch: boolean;
    }
}