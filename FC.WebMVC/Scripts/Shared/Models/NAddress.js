var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var NAddress = (function () {
                function NAddress(data) {
                    this.house_number = data.house_number || data["house_number"];
                    this.road = data.road || data["road"];
                    this.suburb = data.suburb || data["suburb"];
                    this.city = data.city || data["city"];
                    this.county = data.county || data["county"];
                    this.state = data.state || data["state"];
                    this.postcode = data.postcode || data["postcode"];
                    this.country = data.country || data["country"];
                    this.country_code = data.country_code || data["country_code"];
                }
                return NAddress;
            }());
            Models.NAddress = NAddress;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
