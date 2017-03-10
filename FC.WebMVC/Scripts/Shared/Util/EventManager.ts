
module FC.Shared.Util {
    export class FCEvent {
        public RegisterKey: string;
        public Event: CustomEvent;
    }
    export class EventManager {


        private static inst: EventManager;

        constructor(instKey?: string) {
            if (instKey) {
                if (instKey != "DE46E36D-BC3D-4C59-9A86-6A17D37A8E88") {
                    console.warn("EventManager.constructor() Be aware that creating instances of singleton classes can be hard thing to debug:) ");
                }
                this.EventRegister = new Array<FCEvent>();
            }
        }

        public static GetInstance(): EventManager {
            if (EventManager.inst == null) {
                EventManager.inst = new EventManager("DE46E36D-BC3D-4C59-9A86-6A17D37A8E88");
                return EventManager.inst;
            } else {
                return EventManager.inst;
            }
        }
        public EventRegister: Array<FCEvent>;

        public RegisterEvt(key:string, evt: FCEvent) {
            var existing = this.EventRegister.filter(function (v, k) {
                if (v.RegisterKey == key) {
                    return true;
                } else {
                    return false;
                }
            })[0];

            if (!existing) {
                this.EventRegister.push(evt);
            } else {
                console.log("Duplicate FCEvent entry detected. This can lead to invalid data");
            }
        }

        public DispatchEvt(key: string) {
            var vm = this;
            var evt = this.EventRegister.filter(function (v, k) {
                if (v.RegisterKey == key) {
                    return true;
                } else {
                    return false;
                }
            })[0];
            if (evt) {
                window.dispatchEvent(evt.Event);
            }
        }
    }
}