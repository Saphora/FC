///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates_1) {
            var Model;
            (function (Model) {
                var CM = FC.Core.CoreModel;
                var Rates = (function () {
                    function Rates(data) {
                        this.Base = data.Base || data["base"];
                        this.Date = data.Date || data["date"];
                        this.Rates = new CM.Dictionary(data.Rates || data["rates"]);
                    }
                    return Rates;
                }());
                Model.Rates = Rates;
            })(Model = Rates_1.Model || (Rates_1.Model = {}));
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=RatesModel.js.map