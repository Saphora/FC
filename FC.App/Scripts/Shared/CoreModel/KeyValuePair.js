var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var CoreModel;
        (function (CoreModel) {
            var KeyValuePair = (function () {
                function KeyValuePair(key, value) {
                    if (key) {
                        this.Key = key;
                    }
                    if (value) {
                        this.Value = value;
                    }
                    return this;
                }
                return KeyValuePair;
            }());
            CoreModel.KeyValuePair = KeyValuePair;
            var Dictionary = (function () {
                function Dictionary(dict) {
                    var vm = this;
                    vm.data = new Array();
                    $.each(dict, function (key, value) {
                        vm.Add(key, value, vm);
                    });
                    return vm;
                }
                Dictionary.prototype.GetAllKeys = function () {
                    var result = [];
                    $.each(this.data, function (k, v) {
                        result.push(k);
                    });
                    return result;
                };
                Dictionary.prototype.Add = function (key, value, scope) {
                    scope.data.push(new KeyValuePair(key, value));
                };
                Dictionary.prototype.GetAll = function () {
                    return this.data;
                };
                Dictionary.prototype.Get = function (k) {
                    $.each(this.data, function (index, value) {
                        if (value.Key == k) {
                            debugger;
                            return value.Value;
                        }
                    });
                    return null;
                };
                Dictionary.prototype.GetAllArray = function () {
                    var r = {};
                    $.each(this.data, function (k, v) {
                        r[v.Key.toString()] = v.Value;
                    });
                    return r;
                };
                Dictionary.prototype.GetByValue = function (v) {
                    var index = 0;
                    var self = this;
                    $.each(this.data, function (index, value) {
                        if (value.Value == v) {
                            return self.data[index];
                        }
                        index++;
                    });
                    return null;
                };
                return Dictionary;
            }());
            CoreModel.Dictionary = Dictionary;
        })(CoreModel = Core.CoreModel || (Core.CoreModel = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
