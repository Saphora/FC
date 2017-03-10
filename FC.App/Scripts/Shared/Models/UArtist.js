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
            var UArtist = (function (_super) {
                __extends(UArtist, _super);
                function UArtist(a) {
                    _super.call(this, a);
                    this.Name = a.Name;
                    this.Genres = a.Genres;
                    this.Website = a.Website;
                    this.Country = a.Country;
                    this.DeezerURL = a.DeezerURL;
                    this.FacebookURL = a.FacebookURL;
                    this.SoundcloudURL = a.SoundcloudURL;
                    this.YoutubeURL = a.YoutubeURL;
                    this.SpotifyURL = a.SpotifyURL;
                    this.InstagramURL = a.InstagramURL;
                    this.MyspaceURL = a.MyspaceURL;
                    this.Description = a.Description;
                    this.Image = a.Image;
                    this.Country = a.Country;
                    this.CountryID = a.CountryID;
                }
                return UArtist;
            }(Models.BaseModel));
            Models.UArtist = UArtist;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
