module FC.Core.CoreModel {
    export class KeyValuePair<TKey,TValue> {
        public Key: TKey;
        public Value: TValue;
        constructor(key?: TKey, value?: TValue) {
            if (key) {
                this.Key = key;
            }
            if (value) {
                this.Value = value;
            }
            return this;
        }
    }
    export class Dictionary<TKey, TValue> {

        public data: Array<KeyValuePair<TKey, TValue>>;
        public strData: {};

        constructor(dict?: any) {
            var vm = this;
            vm.data = new Array<KeyValuePair<TKey, TValue>>();
            if (dict) {
                $.each(dict, function (key, value) {
                    vm.Add(key, value, vm);
                });
            }
            return vm;
        }

        public GetAllKeys(): TKey[] {
            var result = [];
            $.each(this.data, function (k: TKey, v: TValue) {
                result.push(k);
            });
            return result;       
        }

        public Add(key: TKey, value: TValue, scope?: Dictionary<TKey, TValue>) {
            this.data.push(new KeyValuePair<TKey, TValue>(key, value));
        }

        public GetAll(): Array<KeyValuePair<TKey, TValue>> {
            return this.data;
        }

        public Delete(key: TKey, source?:Dictionary<TKey,TValue>) {
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
                var tmp = new Array<KeyValuePair<TKey, TValue>>();
                source.data.forEach(function (v, k) {
                    if (v != null) {
                        tmp.push(v);
                    }
                });
                vm.data = tmp;
                source.data = tmp;
            }
        }

        public ContainsKey(key: TKey, source?:Dictionary<TKey,TValue>): boolean {
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
        }

        public Get(k: TKey, source?: Dictionary<TKey, TValue>): TValue {
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
        }

        public GetAllArray(): any {
            var r = {};
            $.each(this.data, function (k, v) {
                r[v.Key.toString()] = v.Value;
            });
            return r;
        }

        public GetByValue(v: TValue): KeyValuePair<TKey, TValue> {
            var index = 0;
            var self = this;
            $.each(this.data, function (index, value) {
                if (value.Value == v) {
                    return self.data[index];
                }
                index++;
            });
            return null;
        }
    }
}