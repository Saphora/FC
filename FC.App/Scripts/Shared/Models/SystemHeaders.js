var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var SystemHeaders = (function () {
                function SystemHeaders(headers) {
                    if (headers) {
                        if (headers.UserDateTime) {
                            this.UserDateTime = headers.UserDateTime;
                        }
                        if (headers.Culture) {
                            this.Culture = headers.Culture;
                        }
                        if (headers.Accept) {
                            this.Accept = headers.Accept;
                        }
                        if (headers.ContentType) {
                            this.ContentType = headers.ContentType;
                        }
                        if (headers.Token) {
                            this.Token = headers.Token;
                        }
                    }
                }
                return SystemHeaders;
            }());
            Models.SystemHeaders = SystemHeaders;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
