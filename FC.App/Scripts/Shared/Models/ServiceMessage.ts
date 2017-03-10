module FC.Shared.Models {
    export class ServiceMessage<T> {
        public constructor(data: T) {
            this.Data = data;
            this.Headers = $AppConfig.ServiceHeaders;
        }
        public Data: T;
        public Headers: SystemHeaders;
    }
}