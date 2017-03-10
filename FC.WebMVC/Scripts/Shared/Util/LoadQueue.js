var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Util;
        (function (Util) {
            var QueueMsg = (function () {
                function QueueMsg() {
                }
                return QueueMsg;
            }());
            Util.QueueMsg = QueueMsg;
            var LoadQueue = (function () {
                function LoadQueue() {
                    this.queue = new Array();
                }
                LoadQueue.GetInstance = function () {
                    String.prototype['ReplaceAll'] = function (search, replacement) {
                        var target = this;
                        return target.split(search).join(replacement);
                    };
                    if (LoadQueue.lqinst == null) {
                        LoadQueue.lqinst = new LoadQueue();
                    }
                    return LoadQueue.lqinst;
                };
                LoadQueue.prototype.TriggerComplete = function (key) {
                    key = key["ReplaceAll"]('/', '');
                    var e = new CustomEvent(key + "Complete");
                    window.dispatchEvent(e);
                };
                LoadQueue.prototype.TriggerFailure = function (key) {
                    key = key["ReplaceAll"]('/', '');
                    var e = new CustomEvent(key + "Failure");
                    window.dispatchEvent(e);
                };
                LoadQueue.prototype.Listen = function (key) {
                    key = key["ReplaceAll"]('/', '');
                    var qm = new QueueMsg();
                    var vm = LoadQueue.GetInstance();
                    qm.completed = false;
                    qm.key = key;
                    var any = false;
                    any = vm.queue.some(function (v, k) {
                        return v.key == key;
                    });
                    if (any) {
                        console.info("KEY EXISTS: " + key);
                    }
                    else {
                        vm.queue.push(qm);
                        window.addEventListener(key + "Complete", function () {
                            var msg = vm.queue.filter(function (v, i) {
                                if (v.key == key) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })[0];
                            if (msg) {
                                var i = vm.queue.indexOf(msg);
                                msg.completed = true;
                                vm.queue[i] = msg;
                                var totalLength = vm.queue.length;
                                var completedLength = vm.queue.filter(function (v, i) {
                                    return v.completed;
                                }).length;
                                if (totalLength == completedLength) {
                                    var e = new CustomEvent("FCDataLoadingComplete", { 'detail': vm.queue });
                                    vm.queue = new Array();
                                    window.dispatchEvent(e);
                                }
                            }
                        });
                        window.addEventListener(key + "Failure", function () {
                            var msg = vm.queue.filter(function (v, i) {
                                if (v.key == key) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })[0];
                            if (msg) {
                                var i = vm.queue.indexOf(msg);
                                msg.completed = true;
                                msg.failed = true;
                                vm.queue[i] = msg;
                                var totalLength = vm.queue.length;
                                var completedLength = vm.queue.filter(function (v, i) {
                                    return (v.completed || v.failed);
                                }).length;
                                if (totalLength == completedLength) {
                                    var e = new CustomEvent("FCDataLoadingComplete", { 'detail': vm.queue });
                                    vm.queue = new Array();
                                    window.dispatchEvent(e);
                                }
                            }
                        });
                    }
                };
                return LoadQueue;
            }());
            Util.LoadQueue = LoadQueue;
        })(Util = Shared.Util || (Shared.Util = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=LoadQueue.js.map