module FC.Shared.ViewModels {
    export interface IAuthVM extends IFormVMBase<any> {
        inst: FC.Modules.Auth.Controllers.AuthController;
        HasAuth: boolean;
        LoginFormVM: ServiceMessages.LoginMsg;
        SubmitLoginForm: Function;
        RegisterFormVM: ServiceMessages.RegisterMsg;
        SubmitRegisterForm: Function;
        StartLogout: Function;
        initialize: Function;
    }
}