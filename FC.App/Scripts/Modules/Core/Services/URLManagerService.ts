///<reference path="../ServiceBase.ts" />
module FC.Core.Services {
    export class URLManagerService extends FC.Core.ServiceBase {
        private URLCollection: any;
        public Html5Mode = false;
        public UrlHash = "#";
        public $http: ng.IHttpService;
        public $q: any;
        public $sce: ng.ISCEService;
        static $inject = ['$http', '$q', '$sce'];
        constructor(http: ng.IHttpService, q: any, $sce: ng.ISCEService) 
        {
            super(http, q);
            this.$http = http;
            this.$sce = $sce;
            this.$q = q;
            this.URLCollection = {};
        }
        public GetList(): ng.IPromise<FC.Shared.Interfaces.IServiceResponse<any>> { return null; }

        public AddURL(scope: string, key: string, url: string): void {
            if (!IsNullOrEmpty(this.URLCollection) && !IsNullOrEmpty(this.URLCollection[scope]) && IsNullOrEmpty(this.URLCollection[scope][key])) {
                var index = this.URLCollection.length;
                this.URLCollection[scope][key] = url;
            } else {
                if (this.URLCollection) {
                    if (IsNullOrEmpty(this.URLCollection[scope])) {
                        this.URLCollection[scope] = {};
                        this.URLCollection[scope][key] = url;
                    } else if (IsNullOrEmpty(this.URLCollection[scope][key])) {
                        this.URLCollection[scope][key] = url;
                    }
                }
            }
        }

        public GetURL(scope: string, key: string, urlArgs: Array<string>): string {
            if (this.URLCollection[scope] && this.URLCollection[scope][key]) {
                var url = this.URLCollection[scope][key];
                $.each(urlArgs, function (k, v) {
                    url = url.replace('{' + k + '}', v);
                });
                if (this.Html5Mode == false) {
                    url = '/' + this.UrlHash + '/' + url;
                }
                return this.$sce.getTrustedResourceUrl(url);
            }
            return "";
        }
    }
    Application.RegisterService('FC.Core.Services.URLManagerService', FC.Core.Services.URLManagerService);
}