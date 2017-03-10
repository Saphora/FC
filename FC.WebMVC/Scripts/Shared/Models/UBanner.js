var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UBanner = (function () {
                function UBanner(b) {
                    this.Title = b.Title;
                    this.ImageURL = b.ImageURL;
                    this.HTML = b.HTML;
                    this.Link = b.Link;
                    this.Visibility = b.Visibility;
                    this.StartDate = b.StartDate;
                    this.EndDate = b.EndDate;
                    this.CustomerID = b.CustomerID;
                    this.BannerID = b.BannerID;
                    this.Customer = b.Customer;
                    if (b.Genres != null) {
                        this.Genres = b.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                }
                return UBanner;
            }());
            Models.UBanner = UBanner;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=UBanner.js.map