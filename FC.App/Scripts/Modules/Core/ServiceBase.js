var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var ServiceBase = (function () {
            function ServiceBase($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            }
            ServiceBase.prototype.Get = function (url, params) {
                var _this = this;
                var result;
                url = $AppConfig.URLRoot + url;
                if (params && params.length > 0) {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                return result;
            };
            ServiceBase.prototype.GetRaw = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
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
                return result;
            };
            ServiceBase.prototype.JSONP = function (url, params) {
                var _this = this;
                var result;
                url = $AppConfig.URLRoot + url;
                if (params && params.length > 0) {
                    result = this.$http.jsonp(url, {
                        headers: $AppConfig.ServiceHeaders,
                        params: params
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                else {
                    result = this.$http.get(url, {
                        headers: $AppConfig.ServiceHeaders
                    }).then(function (response) { return _this.handlerResponded(response, params); });
                }
                return result;
            };
            ServiceBase.prototype.RawJSONP = function (url, params, headers) {
                var _this = this;
                var hdrs = {};
                var prms = {};
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
                return result;
            };
            ServiceBase.prototype.PostRaw = function (url, params, headers) {
                var _this = this;
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
                return result;
            };
            ServiceBase.prototype.Post = function (url, svcMsg) {
                var _this = this;
                url = $AppConfig.URLRoot + url;
                var result;
                result = this.$http.post(url, svcMsg).then(function (response) { return _this.handlerResponded(response, {}); });
                return result;
            };
            ServiceBase.prototype.handlerResponded = function (response, params) {
                if (params && params.length > 0) {
                    response.Params = params;
                }
                return new FC.Shared.Models.ServiceResponse(response.data);
            };
            ServiceBase.prototype.handlerRespondedRaw = function (response, params) {
                return response;
            };
            return ServiceBase;
        }());
        Core.ServiceBase = ServiceBase;
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
