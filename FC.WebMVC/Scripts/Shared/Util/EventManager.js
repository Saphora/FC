var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            var FCEvent = (function () {
                function FCEvent() {
                }
                return FCEvent;
            }());
            Util.FCEvent = FCEvent;
            var EventManager = (function () {
                function EventManager(instKey) {
                    if (instKey) {
                        if (instKey != "DE46E36D-BC3D-4C59-9A86-6A17D37A8E88") {
                            console.warn("EventManager.constructor() Be aware that creating instances of singleton classes can be hard thing to debug:) ");
                        }
                        this.EventRegister = new Array();
                    }
                }
                EventManager.GetInstance = function () {
                    if (EventManager.inst == null) {
                        EventManager.inst = new EventManager("DE46E36D-BC3D-4C59-9A86-6A17D37A8E88");
                        return EventManager.inst;
                    }
                    else {
                        return EventManager.inst;
                    }
                };
                EventManager.prototype.RegisterEvt = function (key, evt) {
                    var existing = this.EventRegister.filter(function (v, k) {
                        if (v.RegisterKey == key) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })[0];
                    if (!existing) {
                        this.EventRegister.push(evt);
                    }
                    else {
                        console.log("Duplicate FCEvent entry detected. This can lead to invalid data");
                    }
                };
                EventManager.prototype.DispatchEvt = function (key) {
                    var vm = this;
                    var evt = this.EventRegister.filter(function (v, k) {
                        if (v.RegisterKey == key) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })[0];
                    if (evt) {
                        window.dispatchEvent(evt.Event);
                    }
                };
                return EventManager;
            }());
            Util.EventManager = EventManager;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=EventManager.js.map