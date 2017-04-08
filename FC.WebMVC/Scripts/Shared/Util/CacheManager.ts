module FC.Shared.Util {
    export enum CacheMode {
        Cookie = 1,
        LocalStorage = 2,
        Server = 3
    }
    export class Storage<T> {
        public expires: number;
        public data: T;
    }
    export interface SuccessCallback<T> {
        (storage: Storage<T>): void;
    }
    export class CacheManager {
        public $scope: ng.IScope;
        public HasErrors:boolean;
        public Errors: Array<string>;
        public Expires: number;
        private static __inst: CacheManager;

        constructor(instKey?: string) {
            if (instKey == CacheManager.GetInstKey()) {
                var vm = this;
                vm.HasErrors = false;
                vm.Errors = new Array<string>();
                vm.Expires = 60000;
            } else {
                throw new Error("Use CacheManager.GetInstance() for instantiating this class, or get the instance key by CacheManager.GetInstKey() first..");
            }
        }

        public GetCookieValue(key: string):string {
            var vm = this;
            var cookies = document.cookie.split(";");
            var c = cookies.filter(function (v, i) {
                var kvp = v.split('=');
                var k = kvp[0];
                var v = kvp[1];
                return k.trim() == key.trim();
            });
            var val = "";
            if (c != null) {
                if (c.length > 0) {
                    if (c[0].split('=').length > 0) {
                        val = c[0].split('=')[1];
                    }
                }
            }
            if (val == "") {
                return null;
            } else {
                return val;
            }
        }


        public SetCookieValue(key: string, value:string, expires:Date=null): void {
            var vm = this;
            var cookies = document.cookie.split(";");
            if (!expires) {
                expires = new Date();
                expires.setDate(expires.getDate() + 1);
            }
            document.cookie = key + "=" + value + ";expires=" + expires.toUTCString()+";path=/";
        }

        public static GetInstKey(): string {
            return "132B862D62FE41F0B1865F43BF574BAC";
        }
        public static GetInstance(): FC.Shared.Util.CacheManager {
            if (CacheManager.__inst == null) {
                CacheManager.__inst = new CacheManager("132B862D62FE41F0B1865F43BF574BAC");   
            }
            return CacheManager.__inst;
        }

        public StripNullElements(arr: Array<any>): Array<any>
        {
            var result = new Array<any>();
            arr.forEach(function (value: any, index: any) {
                if (value) {
                    result.push(value);
                }
            });
            return result;
        }

        public WriteStorage(key: string, obj: any, ms?:number) {
            var vm = this;
            var str = "";
            try {
                if (typeof (obj) == "string") {
                    str = obj
                } else {
                    str = JSON.stringify(obj);
                }
                vm.SetCookieValue(key, str);
                var event = new CustomEvent(key + "_Writed");
                window.dispatchEvent(event);
                var event2 = new CustomEvent("StorageWrited", { detail: key });
                window.dispatchEvent(event2);
            } catch (ex) {
                var event = new CustomEvent("StorageError");
                window.dispatchEvent(event);
            }
        }

        /**
         * @param storageKey the localstorage identifier key.
         * @param key  the key of the object
         * @param value the value to match against.
         * @param successCallback when data is not expired and the storage containst
         * @param dataEmptyCallback when the data is empty
         * @param expiredCallback when cache is expired... not really usefull at the moment.
         */
        public GetByValue(storageKey: string, key: string, value: string, successCallback: Function, dataEmptyCallback?: Function, expiredCallback?: Function) {
            var storage = new Array<any>();
            storage = this.GetStorage(storageKey, function (response: any) {
                var data = response.data as Array<any>;
                data.forEach(function (obj: any, index: number) {
                    if (obj[key] == value) {
                        var object = obj;

                        if (object) {
                            if (successCallback) {
                                successCallback(object);
                            } else {
                                return object;
                            }
                        } else {
                            if (dataEmptyCallback) {
                                dataEmptyCallback();
                            } else {
                                return null;
                            }
                        }

                    }
                });
            }, expiredCallback).data;
        }

        public GetByValueContains(storageKey: string, key: string, value: string, successCallback: Function, dataEmptyCallback?: Function, expiredCallback?: Function) {
            var storage = new Array<any>();
            storage = this.GetStorage(storageKey, function (response: any) {
                var data = response.data as Array<any>;
                data.forEach(function (obj: any, index: number) {
                    if (obj[key]) {
                        if (obj[key].toString().indexOf(value) > -1) {
                            var object = obj;

                            if (object) {
                                if (successCallback) {
                                    successCallback(object);
                                } else {
                                    return object;
                                }
                            } else {
                                if (dataEmptyCallback) {
                                    dataEmptyCallback();
                                } else {
                                    return null;
                                }
                            }
                        }
                    }
                });
            }, expiredCallback).data;
        }


        public GetStorage(key: string, successCallback?: Function, expiredCallback?: Function): Storage<any> {
            var vm = this;
            var data: Storage<any> =  this.Get<any>(key);
            if (successCallback && data) {
                successCallback(data);
            }
            if (expiredCallback) {
                if (data) {
                    expiredCallback(data);
                } else {
                    expiredCallback();
                }
            }
            return data;        
        }

        public Get<T>(key: string, successCallback?: SuccessCallback<T>, expiredCallback?: Function): Storage<T> {
            var data: T|string;
            var result: Storage<T> = new Storage<T>();
            if (this.GetCookieValue(key)) {
                try {
                    data = JSON.parse(this.GetCookieValue(key)) as T;
                } catch(e) {
                    data = this.GetCookieValue(key);
                }
            }
            if (data) {
                result.data = data as T;
                result.expires = 99999999999;
                return result;
            } else {
                return null;
            }
            //try {
            //    var vm = this;
            //    var value = localStorage.getItem(key);
            //    var data: Storage<T> = null;
            //    if (value) {
            //        data = JSON.parse(value);
            //    } else {
            //        return null;
            //    }
            //    if (data && data.expires) {
            //        if (data.expires > new Date().getTime()) {
            //            if (successCallback) {
            //                successCallback(data);
            //            }
            //            return data;
            //        } else {
            //            console.info('Data expired ' + key + ' from localstorage')
            //            if (successCallback) {
            //                successCallback(data);
            //            }
            //            if (expiredCallback) {
            //                expiredCallback(data);
            //            }
            //            return data;
            //        }
            //    } else {
            //        return null;
            //    }
            //} catch (ex) {
            //    throw ex;
            //}
        }
        
        public DeleteStorage(key) {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                if (name.trim() == key.trim()) {
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
            var e = new CustomEvent(key + "_Deleted", { 'detail': key });
            window.dispatchEvent(e);
        }
        public ClearStorage() {
            console.info("Clear storage is not longer supported since migrated to cookies.");
        }

        public Contains(key):boolean {
            if (this.GetCookieValue(key)) {
                return true;
            } else {
                return false;
            }
        }
    }
}