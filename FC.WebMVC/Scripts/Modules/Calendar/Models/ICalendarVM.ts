module FC.Modules.Calendar.Models {
    export interface ICalendarVM extends FC.Shared.ViewModels.IFormVMBase<any>{
        Festivals: Array<FC.Shared.Models.FestivalListItem>;
        Filter: FC.Modules.Filtering.Models.FilterBarVM;
        ShowCancelSearch: boolean;
        API: FC.Modules.Festival.Services.FestivalService;
    }
}