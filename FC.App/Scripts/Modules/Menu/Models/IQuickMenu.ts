module FC.Modules.Menu.Models {
    export interface IQuickMenu extends FC.Shared.ViewModels.IFormVMBase<any> {
        PageKey: string;
        MenuSections: FC.Shared.Models.MenuSection[];
    }
}