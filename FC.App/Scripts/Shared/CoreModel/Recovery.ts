///<reference path="../Util/CacheManager.ts"/>
module FC.Shared.CoreModel {
    export class FormDirty {
        public FormID: string;
        public FormName: string;
        public FormLocation: string;
    }
    export class Recovery {
        private static inst: Recovery;
        private static MemReg: FC.Shared.Util.MemReg;

        public Register: FC.Core.CoreModel.Dictionary<string, FC.Core.CoreModel.Dictionary<string, string>>;
        public constructor() {
        }

        public static RepairArray<T>(arr: Array<T>): Array<T> {
            var result = new Array<T>();
            arr.forEach(function (v, t) {
                if (v) {
                    result.push(v);
                }
            });
            return result;
        }

        public static RecoverModel<T>(formID: string, model: T): T {
            var data : FC.Shared.Util.Storage<FC.Core.CoreModel.Dictionary<string,string>> = CacheManager.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID);
            if (data) {
                if (data.data) {
                    var m: T = new Object() as T;
                    data.data.data.forEach(function (v, k) {
                        m[v.Key] = v.Value;
                    });
                }
            } else {
                return null;
            }
            return m;
        }

        public static Add(formID: string, fieldName: string, value: string) {
            if (this.MemReg == null) {
                this.MemReg = FC.Shared.Util.MemReg.GetInstance();
            }
            var dict: FC.Core.CoreModel.Dictionary<string, string> = null;
            dict = this.MemReg.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID);

            if (dict == null || dict === undefined) {
                if (CacheManager.Contains(formID)) {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                    dict.data = CacheManager.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID).data.data;
                } else {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                }
            }

            if (dict == null) {
                dict = new FC.Core.CoreModel.Dictionary<string, string>();
            }
            if (dict.ContainsKey(fieldName)) {
                dict.Delete(fieldName);
            }

            dict.Add(fieldName, value);
            this.MemReg.Register(formID, dict);
        }

        //Set localstorage form dirty id. this is required for notify about editing the current form.
        public static WriteFormDirty(formID: string, location: string, formName: string): void {
            var dirty = new FormDirty();
            dirty.FormID = formID;
            dirty.FormLocation = location;
            dirty.FormName = formName;
            CacheManager.WriteStorage("DirtyForm-" + formID, dirty, 999999999999);
            this.DetectDirty();
        }

        public static DetectDirty() {
            var dirtyForms: FormDirty[] = new Array<FormDirty>();
            var i = 0;
            while(i<=localStorage.length-1) {
                var key = localStorage.key(i);
                if (key.indexOf("DirtyForm-") != -1) {
                    dirtyForms.push(localStorage[key]);
                }
                i++;
            }
            if (dirtyForms.length > 0) {
                console.info("DIRTY FORM ITEM SET");
            }
            CacheManager.WriteStorage("MSG_FORM_DIRTY", dirtyForms,99999999999);
        }

        public static ClearFormDirty(formID: string): void {
            var vm = this; //?
            var dirtyForms: FormDirty[] = CacheManager.Get<FormDirty[]>("MSG_FORM_DIRTY").data;
            var newDirty: FormDirty[];
            if (dirtyForms) {
                dirtyForms.forEach(function (v, k) {
                    if (formID) {
                        if (v.FormID == formID) {
                            delete dirtyForms[k]
                            newDirty = vm.RepairArray<FormDirty>(dirtyForms);
                            console.info("FORM " + formID + " CLEARED FROM STORAGE");
                        }
                    }
                });
            }
            if (newDirty.length == 0) {
                CacheManager.DeleteStorage("MSG_FORM_DIRTY");
            } else {
                CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
            }
            this.DetectDirty();
        }

        public static ClearAllDirty(): void {
            var vm = this; //?
            var dirtyForms: FormDirty[] = CacheManager.Get<FormDirty[]>("MSG_FORM_DIRTY").data;
            var newDirty: FormDirty[];
            if (dirtyForms) {
                dirtyForms.forEach(function (v, k) {
                    delete dirtyForms[k]
                    newDirty = vm.RepairArray<FormDirty>(dirtyForms);
                });
            } else {
                CacheManager.DeleteStorage("MSG_FORM_DIRTY");
            }
            if (newDirty.length == 0) {
                CacheManager.DeleteStorage("MSG_FORM_DIRTY");
            } else {
                CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
            }
            this.DetectDirty();
        }

        public static Get<T>(formID: string, fieldName: string): string {
            if (this.MemReg == null) {
                this.MemReg = FC.Shared.Util.MemReg.GetInstance();
            }
            var dict: FC.Core.CoreModel.Dictionary<string, string> = null;
            dict = this.MemReg.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID);

            if (dict == null || dict === undefined) {
                if (CacheManager.Contains(formID)) {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                    dict.data = CacheManager.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID).data.data;
                } else {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                }
            }
            if (dict.ContainsKey(fieldName)) {
                var result = dict.Get(fieldName);
                return result;
            } else {
                return "";
            }
        }

        public static SaveState(formID:string, locationPath:string) {
            var cm = FC.Shared.Util.CacheManager.GetInstance();
            if (this.MemReg == null) {
                this.MemReg = FC.Shared.Util.MemReg.GetInstance();
            }
            var dict = this.MemReg.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID);

            if (dict == null || dict === undefined) {

                if (CacheManager.Contains(formID)) {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                    dict.data = CacheManager.Get<FC.Core.CoreModel.Dictionary<string, string>>(formID).data.data;
                } else {
                    dict = new FC.Core.CoreModel.Dictionary<string, string>();
                }
            }
            cm.WriteStorage(formID, dict, 1000000000);
        }

        public static FinishForm(formID: string) {
            var cm = FC.Shared.Util.CacheManager.GetInstance();
            cm.DeleteStorage(formID);
            //this.ClearFormDirty(formID);
        }
    }
}