module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    export interface ICreate {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    export interface IDelete {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    export interface IForceDelete {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    export interface IUpdate {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    export interface IServiceBase<T> {
        Create: ICreate;
        Delete: IDelete
        Update: IUpdate
        ForceDelete: IForceDelete;
    }
}