module STD.Models {
    export interface IRolePickerDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Role> {
        ActiveRoles: FC.IList<FC.Shared.Models.Role>;
        Activated: FC.Shared.Models.Role;
        SysRoles: FC.IList<FC.Shared.Models.Role>;
    }
}