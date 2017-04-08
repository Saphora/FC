module FC.Shared.Interfaces {
    export interface IServiceResponse<T> {
        Data: T;
        Message: string;
        StatusCode: number;
        Params: Array<string>;
        RequestToken: string; //this is sended in
        ResponseToken: string; //this is from server.
        State: FC.Shared.ViewModels.RepositoryState;
    }
}