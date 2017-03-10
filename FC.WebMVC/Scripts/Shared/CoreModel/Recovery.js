///<reference path="../Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var CoreModel;
        (function (CoreModel) {
            var FormDirty = (function () {
                function FormDirty() {
                }
                return FormDirty;
            }());
            CoreModel.FormDirty = FormDirty;
            var Recovery = (function () {
                function Recovery() {
                }
                Recovery.RepairArray = function (arr) {
                    var result = new Array();
                    arr.forEach(function (v, t) {
                        if (v) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                Recovery.RecoverModel = function (formID, model) {
                    var data = CacheManager.Get(formID);
                    if (data) {
                        if (data.data) {
                            var m = new Object();
                            data.data.data.forEach(function (v, k) {
                                m[v.Key] = v.Value;
                            });
                        }
                    }
                    else {
                        return null;
                    }
                    return m;
                };
                Recovery.Add = function (formID, fieldName, value) {
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = null;
                    dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    if (dict == null) {
                        dict = new FC.Core.CoreModel.Dictionary();
                    }
                    if (dict.ContainsKey(fieldName)) {
                        dict.Delete(fieldName);
                    }
                    dict.Add(fieldName, value);
                    this.MemReg.Register(formID, dict);
                };
                //Set localstorage form dirty id. this is required for notify about editing the current form.
                Recovery.WriteFormDirty = function (formID, location, formName) {
                    var dirty = new FormDirty();
                    dirty.FormID = formID;
                    dirty.FormLocation = location;
                    dirty.FormName = formName;
                    CacheManager.WriteStorage("DirtyForm-" + formID, dirty, 999999999999);
                    this.DetectDirty();
                };
                Recovery.DetectDirty = function () {
                    var dirtyForms = new Array();
                    var i = 0;
                    while (i <= localStorage.length - 1) {
                        var key = localStorage.key(i);
                        if (key.indexOf("DirtyForm-") != -1) {
                            dirtyForms.push(localStorage[key]);
                        }
                        i++;
                    }
                    if (dirtyForms.length > 0) {
                        console.info("DIRTY FORM ITEM SET");
                    }
                    CacheManager.WriteStorage("MSG_FORM_DIRTY", dirtyForms, 99999999999);
                };
                Recovery.ClearFormDirty = function (formID) {
                    var vm = this; //?
                    var dirtyForms = CacheManager.Get("MSG_FORM_DIRTY").data;
                    var newDirty;
                    if (dirtyForms) {
                        dirtyForms.forEach(function (v, k) {
                            if (formID) {
                                if (v.FormID == formID) {
                                    delete dirtyForms[k];
                                    newDirty = vm.RepairArray(dirtyForms);
                                    console.info("FORM " + formID + " CLEARED FROM STORAGE");
                                }
                            }
                        });
                    }
                    if (newDirty.length == 0) {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    else {
                        CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
                    }
                    this.DetectDirty();
                };
                Recovery.ClearAllDirty = function () {
                    var vm = this; //?
                    var dirtyForms = CacheManager.Get("MSG_FORM_DIRTY").data;
                    var newDirty;
                    if (dirtyForms) {
                        dirtyForms.forEach(function (v, k) {
                            delete dirtyForms[k];
                            newDirty = vm.RepairArray(dirtyForms);
                        });
                    }
                    else {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    if (newDirty.length == 0) {
                        CacheManager.DeleteStorage("MSG_FORM_DIRTY");
                    }
                    else {
                        CacheManager.WriteStorage("MSG_FORM_DIRTY", newDirty, 9999999999999);
                    }
                    this.DetectDirty();
                };
                Recovery.Get = function (formID, fieldName) {
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = null;
                    dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    if (dict.ContainsKey(fieldName)) {
                        var result = dict.Get(fieldName);
                        return result;
                    }
                    else {
                        return "";
                    }
                };
                Recovery.SaveState = function (formID, locationPath) {
                    var cm = FC.Shared.Util.CacheManager.GetInstance();
                    if (this.MemReg == null) {
                        this.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    }
                    var dict = this.MemReg.Get(formID);
                    if (dict == null || dict === undefined) {
                        if (CacheManager.Contains(formID)) {
                            dict = new FC.Core.CoreModel.Dictionary();
                            dict.data = CacheManager.Get(formID).data.data;
                        }
                        else {
                            dict = new FC.Core.CoreModel.Dictionary();
                        }
                    }
                    cm.WriteStorage(formID, dict, 1000000000);
                };
                Recovery.FinishForm = function (formID) {
                    var cm = FC.Shared.Util.CacheManager.GetInstance();
                    cm.DeleteStorage(formID);
                    //this.ClearFormDirty(formID);
                };
                return Recovery;
            }());
            CoreModel.Recovery = Recovery;
        })(CoreModel = Shared.CoreModel || (Shared.CoreModel = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=Recovery.js.map