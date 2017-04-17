module FC.Modules.Media.Directives {

    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    import MSG = FC.Shared.ServiceMessages;
    import MD = FC.Shared.Models;
    import CM = FC.Shared.CoreModel;
    export class Crumb {
        public DirectoryID: string;
        public DirName: string;
        public Parent: Crumb;
        public Level: number;
    }
    export interface IMBScope extends ng.IScope {    
        _INST: any;
        directories: INT.IMediaDirectory[];
        children: INT.IMediaDirectory[];
        Activate: Function;
        subChildHtml: string;
        ActiveDir: INT.IMediaDirectory;
    
    }
    export class MediaBrowserDirective {

        public link: (scope: IMBScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        public MediaSvc: FC.Modules.Media.Services.MediaService;
        public $http: ng.IHttpService;
        public $q: ng.IQService;
        public $scope: IMBScope;
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        public template = '';        
        public templateUrl = '/Scripts/Modules/Media/Views/media-browser.html';  
        public controller = FC.Modules.Media.Controllers.MediaModalController;
        public controllerAs = 'vm';
        public replace = true;             
        public crumbPath: Crumb[];      
        public $compile: any;
        //    < !--Example of star
        //Example of star- half
        //Example of star- half - empty(alias)
        //Example of star- half - full(alias)
        //Example of star- half - o
        //Example of star- o-- >
        public constructor( $location, $http: ng.IHttpService, $q: ng.IQService, $compile) {

            var vm = this;
            vm.$http = $http;
            vm.$q = $q;
            vm.MediaSvc = new FC.Modules.Media.Services.MediaService(vm.$http, vm.$q);

            MediaBrowserDirective.prototype.link = (scope: IMBScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => {
                vm._element = element;
                vm._attrs = attrs;
            };
        }

        public static factory() {
            var directive = ( $location, $http, $q, $compile) => {
                return new MediaBrowserDirective( $location, $http, $q, $compile);
            };

            directive['$inject'] = [ '$location', '$http','$q','$compile'];

            return directive;
        }

    }
    Application.app.directive('filebrowser', FC.Modules.Media.Directives.MediaBrowserDirective.factory());
}