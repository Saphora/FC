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

        public WriteStorage(key: string, obj: any, ms?: number) {
            var currentDate = new Date();
            if (ms) {
                this.Expires = ms;
            }
            var expires = new Date().getTime() + this.Expires;
            var data = new Storage<any>();
            data.data = obj;
            data.expires = expires;
            try {
                var str = JSON.stringify(data);
                if (data.data) {
                    localStorage.setItem(key, str);
                    var event = new Event(key + "_Writed");
                    window.dispatchEvent(event);
                } else {
                    throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                }
            } catch (ex) {
                var event = new Event("StorageError");
                window.dispatchEvent(event);
            }
        }
        public Write<T>(key: string, obj: T, ms?: number) {
            var currentDate = new Date();
            if (ms) {
                this.Expires = ms;
            }
            var expires = new Date().getTime() + this.Expires;
            var data = new Storage<T>();
            data.data = obj;
            data.expires = expires;
            try {
                var str = JSON.stringify(data);
                if (data.data) {
                    localStorage.setItem(key, str);
                    var event = new Event(key + "_Writed");
                    window.dispatchEvent(event);
                } else {
                    throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                }
            } catch (ex) {
                var event = new Event("StorageError");
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
            try {
                var vm = this;
                var value = localStorage.getItem(key);
                var data: Storage<any> = null;
                if (value) {
                    data = JSON.parse(value);
                } else {
                    return null;
                }
                if (data && data.expires) {
                    if (data.expires > new Date().getTime()) {
                        if (successCallback) {
                            successCallback(data);
                        }
                        return data;
                    } else {
                        console.info('Data expired ' + key + ' from localstorage')
                        if (successCallback) {
                            successCallback(data);
                        }
                        if (expiredCallback) {
                            expiredCallback(data);
                        }
                        return data;
                    }
                } else {
                    return null;
                }
            } catch (ex) {
                throw ex;
            }
        }

        public Get<T>(key: string, successCallback?: Function, expiredCallback?: Function): Storage<T> {
            try {
                var vm = this;
                var value = localStorage.getItem(key);
                var data: Storage<T> = null;
                if (value) {
                    data = JSON.parse(value);
                } else {
                    return null;
                }
                if (data && data.expires) {
                    if (data.expires > new Date().getTime()) {
                        if (successCallback) {
                            successCallback(data);
                        }
                        return data;
                    } else {
                        console.info('Data expired ' + key + ' from localstorage')
                        if (successCallback) {
                            successCallback(data);
                        }
                        if (expiredCallback) {
                            expiredCallback(data);
                        }
                        return data;
                    }
                } else {
                    return null;
                }
            } catch (ex) {
                throw ex;
            }
        }
        
        public DeleteStorage(key) {
            localStorage.removeItem(key);
            var e = new CustomEvent(key + "_Deleted", { 'detail': key });
            window.dispatchEvent(e);
        }
        public ClearStorage() {
            localStorage.clear();
        }

        public Contains(key) {
            //if (cacheMode == CacheMode.LocalStorage) {
            if (localStorage[key]) {
                var value = localStorage[key];
                var data = null;
                if (value) {
                    var data = JSON.parse(value);
                }
                if (data && data.expires && data.expires > new Date().getTime()) {
                    return true;
                } else {
                    this.DeleteStorage(key);
                    return false;
                }
            } else {
                return false;
            }
            //}
        }
    }
}