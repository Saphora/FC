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
            var UGenre = (function (_super) {
                __extends(UGenre, _super);
                function UGenre(g) {
                    _super.call(this, g);
                    this.Name = g.Name;
                    this.Thumbnail = g.Thumbnail;
                    this.Theme = g.Theme;
                    this.VisibleOnHome = g.VisibleOnHome;
                    this.Children = g.Children;
                    this.GenreID = g.GenreID;
                    this.ThemeID = g.ThemeID;
                    this.ParentID = g.ParentID;
                }
                return UGenre;
            }(Models.BaseModel));
            Models.UGenre = UGenre;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
