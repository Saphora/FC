module FC.Core.Validation {

    export class Validator {
        public v: FC.Core.Validation.Validation;
        public Validate(value: any, rule: FC.Core.Validation.ValidationRule, required:boolean=false) {
            var v = new FC.Core.Validation.Validation(rule, required);
            if (value == null && required == false) {
                return true;
            } else {
                var tmp: Array<any> = new Array<any>();
                if (typeof (value) == typeof (Array)) {
                    tmp = value as Array<any>;
                    if (tmp.length == 0) {
                        return false;
                    }
                } else {
                    if ((value == null || value == "") && required == true) {
                        return false;
                    } else if (required == true && value) {
                        var str: string = value;
                        if (str.length > v.MaxLength) {
                            return false;
                        }
                        if (str.match(v.Regex)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (required == false && value) {
                        var str: string = value;
                        if (str.length > v.MaxLength) {
                            return false;
                        }
                        if (str.match(v.Regex)) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                }
            }
        }
    }
}