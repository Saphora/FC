var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var BaseModel = (function () {
                function BaseModel(Child) {
                    if (Child && Child.IsoName) {
                        this.IsoName = Child.IsoName;
                    }
                    if (Child && Child.Localization) {
                        this.Localization = Child.Localization;
                    }
                    if (Child && Child.UmbracoID) {
                        this.UmbracoID = Child.UmbracoID;
                    }
                }
                return BaseModel;
            }());
            Models.BaseModel = BaseModel;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
