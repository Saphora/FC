module FC.Modules.Menu.Models {
    export interface IMenuCRUD extends FC.Shared.ViewModels.IFormVMBase<any> {
        MenuSections: List<FC.Shared.Models.MenuSection>;
        MenuItems: List<FC.Shared.Models.MenuItem>;
        MenuItemModel: FC.Shared.Models.MenuItem;
        MenuSectionModel: FC.Shared.Models.MenuSection;
    }
}