var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Validation;
        (function (Validation) {
            var Validator = (function () {
                function Validator() {
                }
                Validator.prototype.Validate = function (value, rule, required) {
                    if (required === void 0) { required = false; }
                    var v = new FC.Core.Validation.Validation(rule, required);
                    if (value == null && required == false) {
                        return true;
                    }
                    else {
                        var tmp = new Array();
                        if (typeof (value) == typeof (Array)) {
                            tmp = value;
                            if (tmp.length == 0) {
                                return false;
                            }
                        }
                        else {
                            if ((value == null || value == "") && required == true) {
                                return false;
                            }
                            else if (required == true && value) {
                                var str = value;
                                if (str.length > v.MaxLength) {
                                    return false;
                                }
                                if (str.match(v.Regex)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (required == false && value) {
                                var str = value;
                                if (str.length > v.MaxLength) {
                                    return false;
                                }
                                if (str.match(v.Regex)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                };
                return Validator;
            }());
            Validation.Validator = Validator;
        })(Validation = Core.Validation || (Core.Validation = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=Validator.js.map