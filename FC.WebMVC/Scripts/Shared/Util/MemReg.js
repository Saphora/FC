var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            var MemReg = (function () {
                function MemReg(instKey) {
                    if (instKey) {
                        if (instKey != "6031F692-0493-4BFB-97D8-8239FAE89F7A") {
                            throw new Error("EventManager.constructor() Be aware that creating instances of singleton classes can be hard thing to debug:) ");
                        }
                        this.maxObjSize = 1024;
                        this.registry = {};
                    }
                }
                /**
                 * @param key
                 * @param value (Absolute max is 1Megabyte, please be carefull with usage, it stores values in memory for application wide usage).
                 */
                MemReg.prototype.Register = function (key, value) {
                    var vm = this;
                    //well it is not very reliable... but it is better than no checking at all.
                    //This will force the developer to not store very large values in memory.
                    if (value) {
                        if ((value.toString().length / 8) > vm.maxObjSize) {
                            console.error("MemReg.Register object size is to large to store in memory)");
                        }
                        else {
                            vm.registry[key] = value;
                        }
                    }
                    else {
                        console.debug("MemReg::Register value is undefined. key is '" + key + "'");
                    }
                };
                MemReg.prototype.Get = function (key) {
                    var vm = this;
                    if (vm.registry[key]) {
                        return vm.registry[key]; //this is only for typehinting...
                    }
                    else {
                        return null;
                    }
                };
                MemReg.prototype.GetAny = function (key) {
                    var vm = this;
                    return vm.registry[key]; //this is only for typehinting...
                };
                MemReg.GetInstance = function () {
                    if (MemReg.inst == null) {
                        MemReg.inst = new MemReg("6031F692-0493-4BFB-97D8-8239FAE89F7A");
                        return MemReg.inst;
                    }
                    else {
                        return MemReg.inst;
                    }
                };
                return MemReg;
            }());
            Util.MemReg = MemReg;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MemReg.js.map