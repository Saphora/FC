var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../ServiceBase.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var URLManagerService = (function (_super) {
                __extends(URLManagerService, _super);
                function URLManagerService(http, q, $sce) {
                    _super.call(this, http, q);
                    this.Html5Mode = false;
                    this.UrlHash = "#";
                    this.$http = http;
                    this.$sce = $sce;
                    this.$q = q;
                    this.URLCollection = {};
                }
                URLManagerService.prototype.AddURL = function (scope, key, url) {
                    if (!Core.IsNullOrEmpty(this.URLCollection) && !Core.IsNullOrEmpty(this.URLCollection[scope]) && Core.IsNullOrEmpty(this.URLCollection[scope][key])) {
                        var index = this.URLCollection.length;
                        this.URLCollection[scope][key] = url;
                    }
                    else {
                        if (this.URLCollection) {
                            if (Core.IsNullOrEmpty(this.URLCollection[scope])) {
                                this.URLCollection[scope] = {};
                                this.URLCollection[scope][key] = url;
                            }
                            else if (Core.IsNullOrEmpty(this.URLCollection[scope][key])) {
                                this.URLCollection[scope][key] = url;
                            }
                        }
                    }
                };
                URLManagerService.prototype.GetURL = function (scope, key, urlArgs) {
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
                };
                URLManagerService.$inject = ['$http', '$q', '$sce'];
                return URLManagerService;
            }(FC.Core.ServiceBase));
            Services.URLManagerService = URLManagerService;
            Application.RegisterService('FC.Core.Services.URLManagerService', FC.Core.Services.URLManagerService);
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
