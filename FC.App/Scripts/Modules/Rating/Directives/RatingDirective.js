var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Directives;
            (function (Directives) {
                var RatingDirective = (function () {
                    //    < !--Example of star
                    //Example of star- half
                    //Example of star- half - empty(alias)
                    //Example of star- half - full(alias)
                    //Example of star- half - o
                    //Example of star- o-- >
                    function RatingDirective($route, $routeParams, $location, ThemingSvc) {
                        this.scope = {};
                        this.template = '<div class="rating" theme="rating">                ' +
                            '    <span class="count" theme="count">100K</span>  ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '    <i class="star active fa fa-star"></i>         ' +
                            '</div>                                             ';
                        var vm = this;
                        RatingDirective.prototype.link = function (scope, element, attrs) {
                            vm._element = element;
                            vm._attrs = attrs;
                            attrs.$observe('for', function (festival) {
                                if (festival) {
                                    var f = new FC.Shared.Models.UFestival(jQuery.parseJSON(festival));
                                }
                            });
                        };
                    }
                    RatingDirective.factory = function () {
                        var directive = function ($route, $routeParams, $location, ThemingSvc) {
                            return new RatingDirective($route, $routeParams, $location, ThemingSvc);
                        };
                        directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];
                        return directive;
                    };
                    return RatingDirective;
                }());
                Directives.RatingDirective = RatingDirective;
                Application.app.directive('rating', FC.Modules.Rating.Directives.RatingDirective.factory());
            })(Directives = Rating.Directives || (Rating.Directives = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
