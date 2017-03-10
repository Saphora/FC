var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UBanner = (function (_super) {
                __extends(UBanner, _super);
                function UBanner(b) {
                    _super.call(this, b);
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
            }(Models.BaseModel));
            Models.UBanner = UBanner;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
