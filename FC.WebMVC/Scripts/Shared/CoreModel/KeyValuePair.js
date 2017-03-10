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
                    if (dict) {
                        $.each(dict, function (key, value) {
                            vm.Add(key, value, vm);
                        });
                    }
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
                    this.data.push(new KeyValuePair(key, value));
                };
                Dictionary.prototype.GetAll = function () {
                    return this.data;
                };
                Dictionary.prototype.Delete = function (key, source) {
                    var vm = this;
                    var success = false;
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    source.data.forEach(function (kvp, index) {
                        if (kvp.Key == key) {
                            delete vm.data[index];
                            success = true;
                        }
                    });
                    if (success) {
                        var tmp = new Array();
                        source.data.forEach(function (v, k) {
                            if (v != null) {
                                tmp.push(v);
                            }
                        });
                        vm.data = tmp;
                        source.data = tmp;
                    }
                };
                Dictionary.prototype.ContainsKey = function (key, source) {
                    var vm = this;
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    var result = false;
                    return source.data.some(function (v, k) {
                        if (v.Key == key) {
                            return true;
                        }
                        return false;
                    });
                };
                Dictionary.prototype.Get = function (k, source) {
                    if (!source) {
                        source = this;
                    }
                    this.data = source.data;
                    var result = null;
                    source.data.forEach(function (value, index) {
                        if (value.Key == k) {
                            result = value.Value;
                        }
                    });
                    return result;
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
//# sourceMappingURL=KeyValuePair.js.map