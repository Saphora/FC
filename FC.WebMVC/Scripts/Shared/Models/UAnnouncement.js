var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UAnnouncement = (function () {
                function UAnnouncement(a) {
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
            }());
            Models.UAnnouncement = UAnnouncement;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=UAnnouncement.js.map