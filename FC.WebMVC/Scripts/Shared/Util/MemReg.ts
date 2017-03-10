module FC.Shared.Util {
    
    export class MemReg {
        private static inst: MemReg;
        private registry: Object;
        private maxObjSize: number;
        constructor(instKey?: string) {
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
        public Register(key: string, value:any) {
            var vm = this;
            //well it is not very reliable... but it is better than no checking at all.
            //This will force the developer to not store very large values in memory.
            if (value) {
                if ((value.toString().length / 8) > vm.maxObjSize) {
                    console.error("MemReg.Register object size is to large to store in memory)");
                } else {
                    vm.registry[key] = value;
                }
            } else {
                console.debug("MemReg::Register value is undefined. key is '" + key + "'");
            }
        }

        public Get<T>(key): T {
            var vm = this;
            if (vm.registry[key]) {
                return vm.registry[key] as T; //this is only for typehinting...
            } else {
                return null;
            }
        }

        public GetAny(key): any {
            var vm = this;
            return vm.registry[key]; //this is only for typehinting...
        }

        public static GetInstance(): MemReg {
            if (MemReg.inst == null) {
                MemReg.inst = new MemReg("6031F692-0493-4BFB-97D8-8239FAE89F7A");
                return MemReg.inst;
            } else {
                return MemReg.inst;
            }
        }
    }
}