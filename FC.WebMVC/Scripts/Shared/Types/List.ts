module FC {
    export enum Operator {
        GreaterThen,
        SmallerThen,
        Larger,
        Smaller,
        Equality,
        Inequality,
        LargerEqual,
        SmallerEqual
    }

    export enum Logical {
        Or,
        And
    }

    export interface IWhere {
        Key: string;
        Value: string;

        /**
        *@Operator '!= / == / > / < / >= / <= '
        */
        Operator: string;
    }

    export interface IList<T> extends Array<T> {
        /**
         * Get the first element in list.
         */
        First(): T;

        /**
         * Get the last element in list.
         */
        Last(): T;

        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        Find(key: string, value: any): T;

        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        Contains(key: string, value: string): boolean;

        /**
         * Add item to list.
         * @param item
         */
        Add(item: T): void;

        /**
         * Add multiple to list.
         * @param items
         */
        AddRange(items: List<T>): void;

        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        RemoveRange(range: List<T>, keyName: string): List<T>;

        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */

        Remove(item: T, keyName: string): List<T>;

        /**
         * Remove null values when deleted from array.
         */
        Repair(): List<T>;

        //Where(exp: IWhere[]): IList<T>;
    }
    
    export class List<T> extends Array<T> implements Array<T>, IList<T> {
        

        /**
         * An array with extension methods.
         * @param data when data is not null, the passed array is transformed to a list.
         */
        constructor(data:T[]=null) {
            super();
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
        public First(): T {
            if (this[0]) {
                return this[0];
            } else {
                return null;
            }
        }

        /**
         * Get the last element in list.
         */
        public Last(): T {
            
            if (this[this.length-1]) {
                return this[this.length-1];
            } else {
                return null;
            }
        }

        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        public Find(key: string, value: any): T {
            var result = this.filter(function (v, i) {
                if (v[key] == value) {
                    return true;
                } else {
                    return false;
                }
            });
            return result[0];
        }

        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        public Contains(key:string, value:string): boolean {
            return this.some(function (v, index) {
                if (v[key].toLowerCase() == value.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            });
        }



        //public Where(exp: IWhere[]): IList<T> {
        //    var tmp = new List<T>();
        //    exp.forEach(function (r, i) {
        //    });
        //}

        /**
         * Add item to list.
         * @param item
         */
        public Add(item: T) {
            if (this.indexOf(item) == -1) {
                this.push(item);
            } else {
                console.log("Critical array error prevented.");
            }
        }

        /**
         * Add multiple to list.
         * @param items
         */
        public AddRange(items: List<T>) {
            var vm = this;
            items.forEach(function (v, k) {
                vm.push(v);
            });
        }

        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        public RemoveRange(range: List<T>, keyName: string): List<T> {
            var vm = this;
            var index = -1;
            var data: List<T> = vm;
            range.forEach(function (value, key) {
                var result = data.filter(function (v, i) {
                    return v[keyName] == value[keyName];
                });

                var index = vm.indexOf(result[0]);
                delete vm[index];
            });
            return vm.Repair();
        }

        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */

        public Remove(item: T, keyName: string): List<T> {
            var vm = this;
            var index = -1;
            var data: List<T> = vm;
            var result = data.filter(function (v, i) {
                return v[keyName] == item[keyName];
            });

            var index = vm.indexOf(result[0]);
            delete vm[index];
            return vm.Repair();
        }

        /**
         * Remove null values when deleted from array.
         */
        public Repair(): List<T> {
            var vm = this;
            var data = vm;
            var _vm = new List<T>();
            data.forEach(function (v, k) {
                if (v != null) {
                    _vm.push(v);
                }
            });
            data = null;
            return _vm;
        }
        
    }
}