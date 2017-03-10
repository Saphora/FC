var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Directives;
        (function (Directives) {
            var ViewTitleDirective = (function () {
                function ViewTitleDirective() {
                    this.restrict = 'E';
                }
                ViewTitleDirective.prototype.link = function ($scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head title').text(text);
                };
                return ViewTitleDirective;
            }());
            var ViewDescriptionDirective = (function () {
                function ViewDescriptionDirective() {
                    this.restrict = 'E';
                }
                ViewDescriptionDirective.prototype.link = function (scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head meta[name=description]').attr("content", text);
                };
                return ViewDescriptionDirective;
            }());
            var ViewKeysDirective = (function () {
                function ViewKeysDirective() {
                    this.restrict = 'E';
                }
                ViewKeysDirective.prototype.link = function (scope, element) {
                    var text = element.text();
                    element.remove();
                    $('html head meta[name=keys]').attr("content", text);
                };
                return ViewKeysDirective;
            }());
            Application.app.directive('viewTitle', function () { return new ViewTitleDirective(); });
            Application.app.directive('viewDescription', function () { return new ViewDescriptionDirective(); });
            Application.app.directive('viewKeys', function () { return new ViewKeysDirective(); });
        })(Directives = Core.Directives || (Core.Directives = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ViewTitleDirective.js.map