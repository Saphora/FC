var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            (function (AuthMode) {
                AuthMode[AuthMode["FACEBOOK"] = 0] = "FACEBOOK";
                AuthMode[AuthMode["SPOTIFY"] = 1] = "SPOTIFY";
                AuthMode[AuthMode["DEEZER"] = 2] = "DEEZER";
                AuthMode[AuthMode["MYSPACE"] = 3] = "MYSPACE";
                AuthMode[AuthMode["TWITTER"] = 4] = "TWITTER";
                AuthMode[AuthMode["YOUTUBE"] = 5] = "YOUTUBE";
                AuthMode[AuthMode["GOOGLE"] = 6] = "GOOGLE";
                AuthMode[AuthMode["LOCAL"] = 7] = "LOCAL";
            })(Enum.AuthMode || (Enum.AuthMode = {}));
            var AuthMode = Enum.AuthMode;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=AuthMode.js.map