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
                    var data = {
                        expires: expires,
                        data: obj
                    };
                    try {
                        var str = JSON.stringify(data);
                        if (data.data) {
                            localStorage.setItem(key, str);
                            console.log(localStorage);
                            var event = new Event(key + "_Writed");
                            window.dispatchEvent(event);
                        }
                        else {
                            throw new Error("Cannot set empty data objects to localstorage, data must contain data!");
                        }
                    }
                    catch (ex) {
                        alert(ex);
                    }
                };
                CacheManager.prototype.GetStorage = function (key, successCallback, expiredCallback) {
                    try {
                        var vm = this;
                        console.log(localStorage);
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
                                this.DeleteStorage(key);
                                if (expiredCallback) {
                                    expiredCallback();
                                }
                                return null;
                            }
                        }
                        else {
                            return null;
                        }
                    }
                    catch (ex) {
                        alert("Get storage exception thrown: " + ex);
                        return null;
                    }
                };
                CacheManager.prototype.DeleteStorage = function (key) {
                    localStorage.removeItem(key);
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
