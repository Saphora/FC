var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Search;
        (function (Search) {
            var Services;
            (function (Services) {
                var SearchService = (function (_super) {
                    __extends(SearchService, _super);
                    function SearchService(http, q) {
                        _super.call(this, http, q);
                    }
                    SearchService.prototype.GetList = function () {
                        throw new Error("SearchService GetList is not available");
                    };
                    SearchService.prototype.Search = function (filter) {
                        return this.Post('/API/Search/Search', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    SearchService.$inject = ['$http', '$q'];
                    return SearchService;
                }(FC.Core.ServiceBase));
                Services.SearchService = SearchService;
            })(Services = Search.Services || (Search.Services = {}));
        })(Search = Modules.Search || (Modules.Search = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
SearchModule.GetApplication().app.service('FC.Modules.Search.Services.SearchService', FC.Modules.Search.Services.SearchService);
//# sourceMappingURL=SearchService.js.map