var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NLocation = (function () {
                function NLocation(data) {
                    this.place_id = data.place_id || data["place_id"];
                    this.licence = data.licence || data["licence"];
                    this.osm_type = data.osm_type || data["osm_type"];
                    this.osm_id = data.osm_id || data["osm_id"];
                    this.lat = data.lat || data["lat"];
                    this.lon = data.lon || data["lon"];
                    this.display_name = data.display_name || data["display_name"];
                    this.address = data.address || data["address"];
                    this.boundingbox = data.boundingbox || data["boundingbox"];
                }
                return NLocation;
            }());
            Models.NLocation = NLocation;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
