var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UTheme = (function (_super) {
                __extends(UTheme, _super);
                function UTheme(t) {
                    _super.call(this, t);
                    this.Name = t.Name;
                    this.DefaultTextColor = t.DefaultTextColor;
                    this.LinkActiveColor = t.LinkActiveColor;
                    this.LinkHoverColor = t.LinkHoverColor;
                    this.LinkDefaultColor = t.LinkDefaultColor;
                    this.ThemeColor = t.ThemeColor;
                    this.ButtonDefaultColor = t.ButtonDefaultColor;
                    this.ButtonDefaultTextColor = t.ButtonDefaultTextColor;
                    this.ButtonDisabledColor = t.ButtonDisabledColor;
                    this.ButtonDisabledTextColor = t.ButtonDisabledTextColor;
                    this.ButtonHoverColor = t.ButtonHoverColor;
                    this.ButtonHoverTextColor = t.ButtonHoverTextColor;
                    this.ButtonActiveColor = t.ButtonActiveColor;
                    this.ButtonActiveTextColor = t.ButtonActiveTextColor;
                    this.BackgroundColor = t.BackgroundColor;
                    this.BackgroundImage = t.BackgroundImage;
                    this.DefaultHeartColor = t.DefaultHeartColor;
                    this.ActiveHeartColor = t.ActiveHeartColor;
                }
                return UTheme;
            }(Models.BaseModel));
            Models.UTheme = UTheme;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
