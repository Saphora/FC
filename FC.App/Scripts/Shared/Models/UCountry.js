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
            var UCountry = (function (_super) {
                __extends(UCountry, _super);
                function UCountry(c) {
                    _super.call(this, c);
                    if (c) {
                        this.Name = c.Name;
                        this.CultureIsoName = c.CultureIsoName;
                        this.LanguageName = c.LanguageName;
                        this.RegionInfo = c.RegionInfo;
                    }
                }
                return UCountry;
            }(Models.BaseModel));
            Models.UCountry = UCountry;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
