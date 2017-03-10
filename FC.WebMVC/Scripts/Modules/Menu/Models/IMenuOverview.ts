module FC.Modules.Menu.Models {
    export interface IMenuOverview extends FC.Shared.ViewModels.IFormVMBase<any> {
        MenuSections: List<FC.Shared.Models.MenuSection>;
        MenuItems: FC.Shared.Models.MenuItem[];
        Roles: FC.Shared.Models.Role[];
        ShowMoreURL: string;
        ShowMore: boolean;

    }
}