var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            (function (GenericMessageStatus) {
                GenericMessageStatus[GenericMessageStatus["DBError"] = 100] = "DBError";
                GenericMessageStatus[GenericMessageStatus["SystemError"] = 200] = "SystemError";
                GenericMessageStatus[GenericMessageStatus["GenericError"] = 300] = "GenericError";
                GenericMessageStatus[GenericMessageStatus["AuthorizationError"] = 400] = "AuthorizationError";
                GenericMessageStatus[GenericMessageStatus["HTTPError"] = 500] = "HTTPError";
                GenericMessageStatus[GenericMessageStatus["UIError"] = 600] = "UIError";
                GenericMessageStatus[GenericMessageStatus["InvalidTestResult"] = 700] = "InvalidTestResult";
                GenericMessageStatus[GenericMessageStatus["SensitiveDataError"] = 800] = "SensitiveDataError";
                GenericMessageStatus[GenericMessageStatus["SecurityBreach"] = 900] = "SecurityBreach";
                GenericMessageStatus[GenericMessageStatus["Warning"] = 1000] = "Warning";
                GenericMessageStatus[GenericMessageStatus["Info"] = 2000] = "Info";
                GenericMessageStatus[GenericMessageStatus["Message"] = 3000] = "Message";
            })(Enum.GenericMessageStatus || (Enum.GenericMessageStatus = {}));
            var GenericMessageStatus = Enum.GenericMessageStatus;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=GenericMessageStatus.js.map