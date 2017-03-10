var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NewsFilter = (function () {
                function NewsFilter() {
                    this.GenreIDs = new Array();
                    this.CountryIDs = new Array();
                }
                return NewsFilter;
            }());
            Models.NewsFilter = NewsFilter;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
