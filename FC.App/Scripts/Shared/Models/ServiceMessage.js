var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var ServiceMessage = (function () {
                function ServiceMessage(data) {
                    this.Data = data;
                    this.Headers = $AppConfig.ServiceHeaders;
                }
                return ServiceMessage;
            }());
            Models.ServiceMessage = ServiceMessage;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
