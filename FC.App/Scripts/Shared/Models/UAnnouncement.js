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
            var UAnnouncement = (function (_super) {
                __extends(UAnnouncement, _super);
                function UAnnouncement(a) {
                    _super.call(this, a);
                    this.Title = a.Title;
                    this.Date = a.Date;
                    this.Image = a.Image;
                    if (a.Genres != null) {
                        this.Genres = a.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                    this.AnnouncementID = a.AnnouncementID;
                }
                return UAnnouncement;
            }(Models.BaseModel));
            Models.UAnnouncement = UAnnouncement;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
