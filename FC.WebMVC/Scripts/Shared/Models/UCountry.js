var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UCountry = (function () {
                function UCountry(c) {
                    if (c) {
                        this.Name = c.Name;
                        this.CultureIsoName = c.CultureIsoName;
                        this.LanguageName = c.LanguageName;
                        this.RegionInfo = c.RegionInfo;
                    }
                }
                return UCountry;
            }());
            Models.UCountry = UCountry;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=UCountry.js.map