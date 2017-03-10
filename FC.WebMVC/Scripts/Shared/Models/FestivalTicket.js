var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var FestivalTicket = (function () {
                function FestivalTicket(currencyBase) {
                    this.IsAllinclusive = false;
                    this.IsCombiDeal = false;
                    this.IsDiscount = false;
                    this.CurrencyBase = FC.Shared.Enum.CurrencyBase.EUR;
                }
                return FestivalTicket;
            }());
            Models.FestivalTicket = FestivalTicket;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FestivalTicket.js.map