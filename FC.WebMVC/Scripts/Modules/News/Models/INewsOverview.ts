module FC.Modules.News.Models {
    export interface INewsOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews[]> {
        Date: Date;
        ShowMoreURL: string;
        ShowMore: boolean;
        Detail: FC.Shared.Models.UNews;
        ColData1: FC.Shared.Models.UNews[];
        ColData2: FC.Shared.Models.UNews[];
        ColData3: FC.Shared.Models.UNews[];
        IsMobile: boolean;
    }
}