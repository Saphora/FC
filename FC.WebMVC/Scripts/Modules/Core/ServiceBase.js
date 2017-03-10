var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var ServiceBase /*implements INT.IServiceBase<any>*/ = (function () {
            function ServiceBase /*implements INT.IServiceBase<any>*/($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                this.GetCompleted = new Object();
                this.Config = new FC.Core.AppConfig();
                this.Loading = FC.Shared.Util.LoadQueue.GetInstance();
            }
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Upload = function (url, files) {
                var _this = this;
                var vm = this;
                url = $AppConfig.URLRoot + url;
                this.Loading.Listen(url);
                var config = this.Config;
                var vm = this;
                var result;
                var svcMsg = new FC.Shared.Models.ServiceMessage(files);
                var formData = new FormData();
                var index = 0;
                svcMsg.Data.forEach(function (v, k) {
                    formData.append(v.name, v);
                    index++;
                });
                config.ServiceHeaders["Content-Type"] = undefined;
                config.ServiceHeaders["Process-Data"] = false;
                result = this.$http({
                    headers: config.ServiceHeaders,
                    url: url,
                    data: formData,
                    method: 'POST',
                    cache: false,
                }).then(function (response) { return _this.handlerResponded(url, response, {}); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Get = function (url, params) {
                var _this = this;
                var vm = this;
                this.Loading.Listen(url);
                var result;
                if (vm.GetCompleted[url] == null || vm.GetCompleted[url] == true) {
                    vm.GetCompleted[url] == false;
                    url = $AppConfig.URLRoot + url;
                    if (params && params.length > 0) {
                        result = this.$http.get(url, {
                            headers: $AppConfig.ServiceHeaders,
                            params: params
                        }).then(function (response) { return _this.handlerResponded(url, response, params); });
                        result.catch(function () {
                            vm.Loading.TriggerFailure(url);
                        });
                    }
                    else {
                        result = this.$http.get(url, {
                            headers: $AppConfig.ServiceHeaders
                        }).then(function (response) { return _this.handlerResponded(url, response, params); });
                        result.catch(function () {
                            vm.Loading.TriggerFailure(url);
                        });
                    }
                    return result;
                }
                else {
                    return result;
                }
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.GetRaw = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
                this.Loading.Listen(url);
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var vm = this;
                var result;
                result = this.$http.get(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.GetRawTyped = function (url, params, headers) {
                var _this = this;
                this.Loading.Listen(url);
                var hdrs = {};
                var prms = {};
                var vm = this;
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var result;
                result = this.$http.get(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.JSONP = function (url, params) {
                var _this = this;
                this.Loading.Listen(url);
                var result;
                var vm = this;
                url = $AppConfig.URLRoot + url;
                if (params && params.length > 0) {
                    result = this.$http.jsonp(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(url, response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(url, response, params); });
                }
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.RawJSONP = function (url, params, headers) {
                var _this = this;
                this.Loading.Listen(url);
                var hdrs = {};
                var prms = {};
                var vm = this;
                if (params) {
                    prms = params;
                }
                if (headers) {
                    hdrs = headers;
                }
                var result;
                result = this.$http.jsonp(url, {
                    headers: hdrs,
                    params: prms
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.PostRaw = function (url, params, headers) {
                var _this = this;
                this.Loading.Listen(url);
                var vm = this;
                var result;
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
                }).then(function (response) { return _this.handlerRespondedRaw(response, params); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.Post = function (url, svcMsg) {
                var _this = this;
                this.Loading.Listen(url);
                url = $AppConfig.URLRoot + url;
                var config = this.Config;
                var vm = this;
                var result;
                result = this.$http({
                    headers: config.ServiceHeaders,
                    url: url,
                    data: svcMsg,
                    method: 'POST'
                }).then(function (response) { return _this.handlerResponded(url, response, {}); });
                result.catch(function () {
                    vm.Loading.TriggerFailure(url);
                });
                return result;
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.handlerResponded = function (url, response, params) {
                var vm = this;
                vm.GetCompleted[url] = true;
                vm.Loading.TriggerComplete(url["ReplaceAll"]($AppConfig.URLRoot, "")["ReplaceAll"]('/', ''));
                if (params && params.length > 0) {
                    response.Params = params;
                }
                return new FC.Shared.Models.ServiceResponse(response.data);
            };
            ServiceBase /*implements INT.IServiceBase<any>*/.prototype.handlerRespondedRaw = function (response, params) {
                return response;
            };
            return ServiceBase /*implements INT.IServiceBase<any>*/;
        }());
        Core.ServiceBase /*implements INT.IServiceBase<any>*/ = ServiceBase /*implements INT.IServiceBase<any>*/;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ServiceBase.js.map