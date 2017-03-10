module FC.Core.Directives {
    class ViewTitleDirective implements ng.IDirective {
        restrict = 'E';
        link($scope, element: JQuery) {
            var text = element.text();
            element.remove();
            $('html head title').text(text);
        }
    }

    class ViewDescriptionDirective implements ng.IDirective {
        restrict = 'E';
        link(scope, element) {
            var text = element.text();
            element.remove();
            $('html head meta[name=description]').attr("content", text);
        }
    }

    class ViewKeysDirective implements ng.IDirective {
        restrict = 'E';
        link(scope, element) {
            var text = element.text();
            element.remove();
            $('html head meta[name=keys]').attr("content", text);
        }
    }
    
    Application.app.directive('viewTitle', () => new ViewTitleDirective());
    Application.app.directive('viewDescription', () => new ViewDescriptionDirective());
    Application.app.directive('viewKeys', () => new ViewKeysDirective());
}