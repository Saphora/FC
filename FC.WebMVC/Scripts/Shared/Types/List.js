var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    (function (Operator) {
        Operator[Operator["GreaterThen"] = 0] = "GreaterThen";
        Operator[Operator["SmallerThen"] = 1] = "SmallerThen";
        Operator[Operator["Larger"] = 2] = "Larger";
        Operator[Operator["Smaller"] = 3] = "Smaller";
        Operator[Operator["Equality"] = 4] = "Equality";
        Operator[Operator["Inequality"] = 5] = "Inequality";
        Operator[Operator["LargerEqual"] = 6] = "LargerEqual";
        Operator[Operator["SmallerEqual"] = 7] = "SmallerEqual";
    })(FC.Operator || (FC.Operator = {}));
    var Operator = FC.Operator;
    (function (Logical) {
        Logical[Logical["Or"] = 0] = "Or";
        Logical[Logical["And"] = 1] = "And";
    })(FC.Logical || (FC.Logical = {}));
    var Logical = FC.Logical;
    var List = (function (_super) {
        __extends(List, _super);
        /**
         * An array with extension methods.
         * @param data when data is not null, the passed array is transformed to a list.
         */
        function List(data) {
            if (data === void 0) { data = null; }
            _super.call(this);
            if (data != null) {
                var vm = this;
                data.forEach(function (v, k) {
                    vm.push(v);
                });
            }
        }
        /**
         * Get the first element in list.
         */
        List.prototype.First = function () {
            if (this[0]) {
                return this[0];
            }
            else {
                return null;
            }
        };
        /**
         * Get the last element in list.
         */
        List.prototype.Last = function () {
            if (this[this.length - 1]) {
                return this[this.length - 1];
            }
            else {
                return null;
            }
        };
        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        List.prototype.Find = function (key, value) {
            var result = this.filter(function (v, i) {
                if (v[key] == value) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return result[0];
        };
        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        List.prototype.Contains = function (key, value) {
            return this.some(function (v, index) {
                if (v[key].toLowerCase() == value.toLowerCase()) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        //public Where(exp: IWhere[]): IList<T> {
        //    var tmp = new List<T>();
        //    exp.forEach(function (r, i) {
        //    });
        //}
        /**
         * Add item to list.
         * @param item
         */
        List.prototype.Add = function (item) {
            if (this.indexOf(item) == -1) {
                this.push(item);
            }
            else {
                console.log("Critical array error prevented.");
            }
        };
        /**
         * Add multiple to list.
         * @param items
         */
        List.prototype.AddRange = function (items) {
            var vm = this;
            items.forEach(function (v, k) {
                vm.push(v);
            });
        };
        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        List.prototype.RemoveRange = function (range, keyName) {
            var vm = this;
            var index = -1;
            var data = vm;
            range.forEach(function (value, key) {
                var result = data.filter(function (v, i) {
                    return v[keyName] == value[keyName];
                });
                var index = vm.indexOf(result[0]);
                delete vm[index];
            });
            return vm.Repair();
        };
        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        List.prototype.Remove = function (item, keyName) {
            var vm = this;
            var index = -1;
            var data = vm;
            var result = data.filter(function (v, i) {
                return v[keyName] == item[keyName];
            });
            var index = vm.indexOf(result[0]);
            delete vm[index];
            return vm.Repair();
        };
        /**
         * Remove null values when deleted from array.
         */
        List.prototype.Repair = function () {
            var vm = this;
            var data = vm;
            var _vm = new List();
            data.forEach(function (v, k) {
                if (v != null) {
                    _vm.push(v);
                }
            });
            data = null;
            return _vm;
        };
        return List;
    }(Array));
    FC.List = List;
})(FC || (FC = {}));
//# sourceMappingURL=List.js.map