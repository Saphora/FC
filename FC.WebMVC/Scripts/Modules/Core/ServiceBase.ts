module FC.Core {

    import CM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export abstract class ServiceBase /*implements INT.IServiceBase<any>*/ {
        //public Loading: FC.Shared.Util.LoadQueue;
        protected $http: ng.IHttpService;
        protected $q: ng.IQService;
        protected CacheManager: FC.Shared.Util.CacheManager;
        protected GetCompleted: any;
        protected Config: FC.Core.AppConfig;
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.$http = $http;
            this.$q = $q;
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.GetCompleted = new Object();
            this.Config = new FC.Core.AppConfig();
           // this.Loading = FC.Shared.Util.LoadQueue.GetInstance();
        }

        //public Create<T>(model: T) {

        //}
        //public Delete<T>(model: T) {

        //}
        //public Update<T>(model: T) {

        //}
        //public ForceDelete<T>(model: T) {

        //}

        public SetCookie(name: string, value: string, expires: Date) {
            document.cookie = name + "=" + value + "; expires=" + expires.toUTCString() + ";path=/";
        }

        public DeleteCookie(name: string) {
            document.cookie = name + "=; expires=1970/1/1/ 12:00:00;path=/";
        }

        public abstract GetList(): ng.IPromise<INT.IServiceResponse<IList<any>>>;

        protected Upload<T>(url: string, files: Array<File>): ng.IPromise<INT.IServiceResponse<T>> {
            var vm = this;
            url = $AppConfig.URLRoot + url;
            //this.Loading.Listen(url);
            var config = this.Config;
            var vm = this;
            var result: ng.IPromise<INT.IServiceResponse<T>>;
            var svcMsg = new FC.Shared.Models.ServiceMessage<Array<File>>(files);
            var formData = new FormData();
            var index = 0;
            svcMsg.Data.forEach(function (v, k) {
                formData.append(v.name,v);
                index++;
            });
            $AppConfig.ServiceHeaders["Content-Type"] = undefined;
            $AppConfig.ServiceHeaders["Process-Data"] = false;
            $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
            result = this.$http({
                headers: $AppConfig.ServiceHeaders,
                url: url,
                data: formData,
                method: 'POST',
                cache: false,
            }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded<T>(url, response, {}));
            result.then(function (r) {
                if (r.ResponseToken) {
                    vm.SetCookie("Token", r.ResponseToken, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDay(), new Date().getHours() + 6, new Date().getMinutes()));
                }
            });
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });

            return result;

        }

        protected Get<T>(url: string, params?: any): ng.IPromise<INT.IServiceResponse<T>> {
            var vm = this;
            //this.Loading.Listen(url);
            var result: ng.IPromise<INT.IServiceResponse<T>>;
            if (vm.GetCompleted[url] == null || vm.GetCompleted[url] == true) {
                vm.GetCompleted[url] == false;
                url = $AppConfig.URLRoot + url;
                $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                if (params && params.length > 0) {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded(url, response, params));
                    result.catch(function () {
                       // vm.Loading.TriggerFailure(url);
                    });
                } else {
                    $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded(url, response, params));
                    result.catch(function () {
                        //vm.Loading.TriggerFailure(url);
                    });
                }
                return result;
            } else {
                return result;
            }
        }

        protected GetRaw(url: string, params?: any, headers?: any): ng.IPromise<any> {
            var hdrs = {};
            var prms = {};
            //this.Loading.Listen(url);
            if (params) {
                prms = params;
            }
            if (headers) {
                hdrs = headers;
            }
            var vm = this;
            var result: ng.IPromise<any>;
            result = this.$http.get(url, {
                headers: hdrs,
                params: prms
            }).then((response: any): ng.IPromise<any> => this.handlerRespondedRaw(response, params));
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            return result;
        }

        protected GetRawTyped<T>(url: string, params?: any, headers?: any): ng.IPromise<T> {
            //this.Loading.Listen(url);
            var hdrs = {};
            var prms = {};
            var vm = this;
            if (params) {
                prms = params;
            }
            if (headers) {
                hdrs = headers;
            }
            var result: ng.IPromise<any>;
            result = this.$http.get(url, {
                headers: hdrs,
                params: prms
            }).then((response: any): ng.IPromise<any> => this.handlerRespondedRaw(response, params));
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            return result;
        }

        protected JSONP<T>(url: string, params?: any): ng.IPromise<INT.IServiceResponse<T>> {
            //this.Loading.Listen(url);
            var result: ng.IPromise<INT.IServiceResponse<T>>;
            var vm = this;
            url = $AppConfig.URLRoot + url;
            $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
            if (params && params.length > 0) {
                result = this.$http.jsonp(url, {
                    headers: $AppConfig.ServiceHeaders,
                    params: params
                }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded(url, response, params));
            } else {
                result = this.$http.get(url, {
                    headers: $AppConfig.ServiceHeaders
                }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded(url, response, params));
            }
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            return result;
        }
        protected RawJSONP(url: string, params?: any, headers?: any): ng.IPromise<any> {
            //this.Loading.Listen(url);
            var hdrs = {};
            var prms = {};
            var vm = this;
            if (params) {
                prms = params;
            }
            if (headers) {
                hdrs = headers;
            }
            var result: ng.IPromise<any>;
            result = this.$http.jsonp(url, {
                headers: hdrs,
                params: prms
            }).then((response: any): ng.IPromise<any> => this.handlerRespondedRaw(response, params));
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            return result;
        }

        protected PostRaw<T>(url: string, params?: any, headers?: any): ng.IPromise<T> {
            //this.Loading.Listen(url);
            var vm = this;
            var result: ng.IPromise<any>;
            var hdrs = {};
            var prms = {};
            if (params) {
                prms = params;
            }
            if (headers) {
                hdrs = headers;
            }
            result = this.$http.post(url, {
                headers: hdrs,
                params: prms
            }).then((response: any): ng.IPromise<T> => this.handlerRespondedRaw(response, params)); 
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            return result;
        }

        protected Post<T, T2>(url: string, svcMsg: FC.Shared.Models.ServiceMessage<T2>): ng.IPromise<INT.IServiceResponse<T>> {
            //this.Loading.Listen(url);
            url = $AppConfig.URLRoot + url;
            var config = this.Config;
            var vm = this;
            var result: ng.IPromise<INT.IServiceResponse<T>>;
            $AppConfig.ServiceHeaders.Token = FC.Shared.Util.CacheManager.GetInstance().GetCookieValue("Token");
            result = this.$http({
                headers: $AppConfig.ServiceHeaders,
                url: url,
                data: svcMsg,
                method: 'POST'
            }).then((response: INT.IServiceResponse<T>): ng.IPromise<INT.IServiceResponse<T>> => this.handlerResponded<T>(url, response, {}));
            result.catch(function () {
                //vm.Loading.TriggerFailure(url);
            });
            
            return result;
        }

        protected handlerResponded<T>(url: string, response: any, params?: any): any {
            var vm = this;
            vm.GetCompleted[url] = true;
            //vm.Loading.TriggerComplete(url["ReplaceAll"]($AppConfig.URLRoot, "")["ReplaceAll"]('/', ''));
            if (params && params.length > 0) {
                response.Params = params;
            }
            if (response) {
                if (response.data) {
                    if (response.data.ResponseToken) {
                        vm.SetCookie("Token", response.data.ResponseToken, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDay(), new Date().getHours() + 6, new Date().getMinutes()));
                    }
                }
            }
            return new FC.Shared.Models.ServiceResponse<T>(response.data);
        }
        protected handlerRespondedRaw(response: any, params?: any): any {
            return response;
        }
    }
}