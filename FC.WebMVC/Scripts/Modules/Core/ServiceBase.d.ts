declare module FC.Core {
    class ServiceBase {
        private _svc;
        private _q;
        constructor($http: ng.IHttpService, $q: any);
        protected Get(url: string, params?: any): ng.IPromise<any>;
        protected Post(url: string, params?: any): ng.IPromise<any>;
        protected handlerResponded(response: any, params?: any): any;
    }
}
