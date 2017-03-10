module FC.Modules.Rating.Directives {
    export class RatingDirective {

        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        public template = 
        '<div class="rating" theme="rating">                '+
        '    <span class="count" theme="count">100K</span>  '+
        '    <i class="star active fa fa-star"></i>         '+
        '    <i class="star active fa fa-star"></i>         '+
        '    <i class="star active fa fa-star"></i>         '+
        '    <i class="star active fa fa-star"></i>         '+
        '    <i class="star active fa fa-star"></i>         '+
        '</div>                                             '
            //    < !--Example of star
            //Example of star- half
            //Example of star- half - empty(alias)
            //Example of star- half - full(alias)
            //Example of star- half - o
            //Example of star- o-- >
        public constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            RatingDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                vm._element = element;
                vm._attrs = attrs;
                attrs.$observe('for', function (festival: string) {
                    if (festival) {
                        //var f = new FC.Shared.Models.UFestival(jQuery.parseJSON(festival));
                        //debugger;
                    }
                });
            };
        }

        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new RatingDirective($route, $routeParams, $location, ThemingSvc);
            };

            directive['$inject'] = ['$route', '$routeParams', '$location', 'FC.Modules.Theming.Services.ThemingService'];

            return directive;
        }

    }
    Application.app.directive('rating', FC.Modules.Rating.Directives.RatingDirective.factory());
}