module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class ServiceResponse<T> {
        constructor(r: INT.IServiceResponse<T>) {
            
            this.Data = r.Data;
            this.Message = r.Message;
            this.StatusCode = r.StatusCode;
            this.Params = r.Params;
            this.State = r.State;
            this.RequestToken = r.RequestToken;
            this.ResponseToken = r.ResponseToken;

        }
        public Data: T;
        public State: FC.Shared.ViewModels.RepositoryState;
        public Message: string;
        public StatusCode: number;
        public Params: Array<string>;
        public ResponseToken: string;
        public RequestToken: string;
    }
}