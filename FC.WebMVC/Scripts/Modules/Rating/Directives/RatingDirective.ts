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
        public constructor( $location) {
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
            var directive = ( $location) => {
                return new RatingDirective( $location);
            };

            directive['$inject'] = [ '$location'];

            return directive;
        }

    }
    Application.app.directive('rating', FC.Modules.Rating.Directives.RatingDirective.factory());
}