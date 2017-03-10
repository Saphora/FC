var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ServiceResponse = (function () {
                function ServiceResponse(r) {
                    this.Data = r.Data;
                    this.Message = r.Message;
                    this.StatusCode = r.StatusCode;
                    this.Params = r.Params;
                }
                return ServiceResponse;
            }());
            Models.ServiceResponse = ServiceResponse;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ServiceResponse.js.map