module FC.Modules.Details.Models {
    export interface IFestivalNameDialog extends FC.Shared.ViewModels.IFormVMBase<any> {
        MtModal: ng.material.MDDialogService;
        DoSaveEditName: Function
    }
}