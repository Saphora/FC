module FC.Modules.Filtering.Models {
    export interface IFilterBarVM extends FC.Shared.ViewModels.IFormVMBase<any> {
        Year: string;
        Month: number;
        DateString: string; //readonly
        Genres: FC.Shared.Models.UGenre[];
        Countries: FC.Shared.Models.UCountry[];
        CurrentYear: number;
        NextYear: number;
        PrevYear: number;
        FormURL: string;
    }

    export class FilterBarVM {
        Year: string;
        Month: number;
        DateString: number; //readonly
        Genres: FC.Shared.Models.UGenre[];
        Countries: FC.Shared.Models.UCountry[];
        CurrentYear: number;
        NextYear: number;
        PrevYear: number;
        FormURL: string;
    }
}