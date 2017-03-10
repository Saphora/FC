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
        }
        public Data: T;
        public Message: string;
        public StatusCode: number;
        public Params: Array<string>;
    }
}