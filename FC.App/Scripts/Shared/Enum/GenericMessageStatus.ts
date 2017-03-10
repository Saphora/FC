module FC.Shared.Enum {
    export enum GenericMessageStatus {
        DBError = 100,
        SystemError = 200,
        GenericError = 300,
        AuthorizationError = 400,
        HTTPError = 500,
        UIError = 600,
        InvalidTestResult = 700,
        SensitiveDataError = 800,
        SecurityBreach = 900,
        Warning = 1000,
        Info = 2000,
        Message = 3000
    }
}