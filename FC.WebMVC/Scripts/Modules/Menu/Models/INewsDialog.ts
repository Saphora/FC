module FC.Modules.News.Models {
    export interface INewsDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews> {
        News: FC.Shared.Models.UNews[];
        PageNum: number;
    }
}