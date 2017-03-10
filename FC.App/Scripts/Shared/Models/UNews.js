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
            var UNews = (function (_super) {
                __extends(UNews, _super);
                function UNews(news) {
                    _super.call(this, news);
                    this.Date = news.Date;
                    this.Genres = news.Genres;
                    this.Img = news.Img;
                    this.Title = news.Title;
                    this.Text = news.Text;
                    this.DisplayDate = news.DisplayDate;
                }
                return UNews;
            }(Models.BaseModel));
            Models.UNews = UNews;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
