var FC;
(function (FC_1) {
    var FC = (function () {
        function FC() {
            angular.module('FC', [
                'ngRoute',
                'ngSanitize',
                'ui.bootstrap',
                'FC.Main',
                'FC.Calendar',
                'FC.Tiles',
                'FC.FlexSelect',
                'FC.Reel',
                'FC.Festival',
                'FC.News'
            ]);
        }
        return FC;
    }());
    FC_1.FC = FC;
})(FC || (FC = {}));
