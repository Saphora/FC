module FC.Modules.News.Models {
    export interface INewsCRUD extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews> {
        Date: Date;
        Overview: FC.Shared.Models.UNews[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}