module FC.Shared.Util {
    
    export class QueueMsg {
        public key: string;
        public completed: boolean;
        public failed: boolean;
    }
    export class LoadQueue {
        public queue = new Array<QueueMsg>();
        public static lqinst: LoadQueue;

        public static GetInstance() {
            String.prototype['ReplaceAll'] = function (search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };
            if (LoadQueue.lqinst == null) {
                LoadQueue.lqinst = new LoadQueue();
            }
            return LoadQueue.lqinst;
        }

        public TriggerComplete(key: string) {
            key = key["ReplaceAll"]('/', '');
            var e = new CustomEvent(key+"Complete");
            window.dispatchEvent(e);
        }

        public TriggerFailure(key: string) {
            key = key["ReplaceAll"]('/', '');
            var e = new CustomEvent(key+"Failure");
            window.dispatchEvent(e);
        }

        public Listen(key: string): void {
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
            } else {
                vm.queue.push(qm);

                window.addEventListener(key + "Complete", function () {
                    var msg: QueueMsg = vm.queue.filter(function (v, i) {
                        if (v.key == key) {
                            return true;
                        } else {
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
                            vm.queue = new Array<QueueMsg>();
                            window.dispatchEvent(e);
                        }
                    }
                });


                window.addEventListener(key + "Failure", function () {
                    var msg: QueueMsg = vm.queue.filter(function (v, i) {
                        if (v.key == key) {
                            return true;
                        } else {
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
                            vm.queue = new Array<QueueMsg>();
                            window.dispatchEvent(e);
                        }
                    }
                });
            }
        }
    }
}