var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            (function (CacheMode) {
                CacheMode[CacheMode["Cookie"] = 1] = "Cookie";
                CacheMode[CacheMode["LocalStorage"] = 2] = "LocalStorage";
                CacheMode[CacheMode["Server"] = 3] = "Server";
            })(Util.CacheMode || (Util.CacheMode = {}));
            var CacheMode = Util.CacheMode;
            var Storage = (function () {
                function Storage() {
                }
                return Storage;
            }());
            Util.Storage = Storage;
            var CacheManager = (function () {
                function CacheManager(instKey) {
                    if (instKey == CacheManager.GetInstKey()) {
                        var vm = this;
                        vm.HasErrors = false;
                        vm.Errors = new Array();
                        vm.Expires = 60000;
                    }
                    else {
                        throw new Error("Use CacheManager.GetInstance() for instantiating this class, or get the instance key by CacheManager.GetInstKey() first..");
                    }
                }
                CacheManager.GetInstKey = function () {
                    return "132B862D62FE41F0B1865F43BF574BAC";
                };
                CacheManager.GetInstance = function () {
                    if (CacheManager.__inst == null) {
                        CacheManager.__inst = new CacheManager("132B862D62FE41F0B1865F43BF574BAC");
                    }
                    return CacheManager.__inst;
                };
                CacheManager.prototype.StripNullElements = function (arr) {
                    var result = new Array();
                    arr.forEach(function (value, index) {
                        if (value) {
                            result.push(value);
                        }
                    });
                    return result;
                };
                CacheManager.prototype.WriteStorage = function (key, obj, ms) {
                    var currentDate = new Date();
                    if (ms) {
                        this.Expires = ms;
                    }
                    var expires = new Date().getTime() + this.Expires;
                    var data = new Storage();
                    data.data = obj;
                    data.expires = expires;
                    try {
                        var str = JSON.stringify(data);
                        if (data.data != null && data.data != undefined) {
                            localStorage.setItem(key, str);
                            var event = new CustomEvent(key + "_Writed");
                            window.dispatchEvent(event);
                        }
                        else {
                            throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                        }
                    }
                    catch (ex) {
                        var event = new CustomEvent("StorageError");
                        window.dispatchEvent(event);
                    }
                };
                CacheManager.prototype.Write = function (key, obj, ms) {
                    var currentDate = new Date();
                    if (ms) {
                        this.Expires = ms;
                    }
                    var expires = new Date().getTime() + this.Expires;
                    var data = new Storage();
                    data.data = obj;
                    data.expires = expires;
                    try {
                        var str = JSON.stringify(data);
                        if (data.data != null && data.data != undefined) {
                            localStorage.setItem(key, str);
                            var event = new CustomEvent(key + "_Writed");
                            window.dispatchEvent(event);
                        }
                        else {
                            throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                        }
                    }
                    catch (ex) {
                        var event = new CustomEvent("StorageError");
                        window.dispatchEvent(event);
                    }
                };
                /**
                 * @param storageKey the localstorage identifier key.
                 * @param key  the key of the object
                 * @param value the value to match against.
                 * @param successCallback when data is not expired and the storage containst
                 * @param dataEmptyCallback when the data is empty
                 * @param expiredCallback when cache is expired... not really usefull at the moment.
                 */
                CacheManager.prototype.GetByValue = function (storageKey, key, value, successCallback, dataEmptyCallback, expiredCallback) {
                    var storage = new Array();
                    storage = this.GetStorage(storageKey, function (response) {
                        var data = response.data;
                        data.forEach(function (obj, index) {
                            if (obj[key] == value) {
                                var object = obj;
                                if (object) {
                                    if (successCallback) {
                                        successCallback(object);
                                    }
                                    else {
                                        return object;
                                    }
                                }
                                else {
                                    if (dataEmptyCallback) {
                                        dataEmptyCallback();
                                    }
                                    else {
                                        return null;
                                    }
                                }
                            }
                        });
                    }, expiredCallback).data;
                };
                CacheManager.prototype.GetByValueContains = function (storageKey, key, value, successCallback, dataEmptyCallback, expiredCallback) {
                    var storage = new Array();
                    storage = this.GetStorage(storageKey, function (response) {
                        var data = response.data;
                        data.forEach(function (obj, index) {
                            if (obj[key]) {
                                if (obj[key].toString().indexOf(value) > -1) {
                                    var object = obj;
                                    if (object) {
                                        if (successCallback) {
                                            successCallback(object);
                                        }
                                        else {
                                            return object;
                                        }
                                    }
                                    else {
                                        if (dataEmptyCallback) {
                                            dataEmptyCallback();
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                }
                            }
                        });
                    }, expiredCallback).data;
                };
                CacheManager.prototype.GetStorage = function (key, successCallback, expiredCallback) {
                    try {
                        var vm = this;
                        var value = localStorage.getItem(key);
                        var data = null;
                        if (value) {
                            data = JSON.parse(value);
                        }
                        else {
                            return null;
                        }
                        if (data && data.expires) {
                            if (data.expires > new Date().getTime()) {
                                if (successCallback) {
                                    successCallback(data);
                                }
                                return data;
                            }
                            else {
                                console.info('Data expired ' + key + ' from localstorage');
                                if (successCallback) {
                                    successCallback(data);
                                }
                                if (expiredCallback) {
                                    expiredCallback(data);
                                }
                                return data;
                            }
                        }
                        else {
                            return null;
                        }
                    }
                    catch (ex) {
                        throw ex;
                    }
                };
                CacheManager.prototype.Get = function (key, successCallback, expiredCallback) {
                    try {
                        var vm = this;
                        var value = localStorage.getItem(key);
                        var data = null;
                        if (value) {
                            data = JSON.parse(value);
                        }
                        else {
                            return null;
                        }
                        if (data && data.expires) {
                            if (data.expires > new Date().getTime()) {
                                if (successCallback) {
                                    successCallback(data);
                                }
                                return data;
                            }
                            else {
                                console.info('Data expired ' + key + ' from localstorage');
                                if (successCallback) {
                                    successCallback(data);
                                }
                                if (expiredCallback) {
                                    expiredCallback(data);
                                }
                                return data;
                            }
                        }
                        else {
                            return null;
                        }
                    }
                    catch (ex) {
                        throw ex;
                    }
                };
                CacheManager.prototype.DeleteStorage = function (key) {
                    localStorage.removeItem(key);
                    var e = new CustomEvent(key + "_Deleted", { 'detail': key });
                    window.dispatchEvent(e);
                };
                CacheManager.prototype.ClearStorage = function () {
                    localStorage.clear();
                };
                CacheManager.prototype.Contains = function (key) {
                    //if (cacheMode == CacheMode.LocalStorage) {
                    if (localStorage[key]) {
                        var value = localStorage[key];
                        var data = null;
                        if (value) {
                            var data = JSON.parse(value);
                        }
                        if (data && data.expires && data.expires > new Date().getTime()) {
                            return true;
                        }
                        else {
                            this.DeleteStorage(key);
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                    //}
                };
                return CacheManager;
            }());
            Util.CacheManager = CacheManager;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CacheManager.js.map