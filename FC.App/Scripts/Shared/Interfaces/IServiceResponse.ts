module FC.Shared.Interfaces {
    export interface IServiceResponse<T> {
        Data: T;
        Message: string;
        StatusCode: number;
        Params: Array<string>;
    }
}