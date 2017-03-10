///<reference path="../Services/ThemingService.ts"/>
module FC.Modules.Theming.Directives {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class ThemingDirective {
        public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {};
        private _element: ng.IAugmentedJQuery;
        private _attrs: ng.IAttributes;
        private CacheManager: FC.Shared.Util.CacheManager;
        public color(color: string): string {
            return "#" + color;
        }
        constructor($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) {
            var vm = this;
            vm.CacheManager = FC.Shared.Util.CacheManager.GetInstance();

            var ActiveTheme = null;

            ThemingDirective.prototype.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                if (vm.CacheManager.Contains("active-theme")) {
                    var ActiveTheme = vm.CacheManager.GetStorage("active-theme").data;
                    vm._element = element;
                    vm._attrs = attrs;
                    if (ActiveTheme) {
                        vm.setThemeStyles(vm._attrs, vm._element, ActiveTheme, vm);
                    } else {
                        ThemingSvc.GetActiveTheme().then(function (r: INT.IServiceResponse<INT.IUTheme>) {
                            vm.CacheManager.WriteStorage("active-theme", r.Data, 1000 * 60 * 60 * 24 * 7);
                            ActiveTheme = r.Data;
                            vm.setThemeStyles(vm._attrs, vm._element, ActiveTheme, vm);
                        });
                    }
                } 
            }
        }
        private setThemeStyles(attrs, element, ActiveTheme,vm) {
            $.each(attrs["theme"].split(','), function (key, themeProperty) {
                themeProperty = themeProperty.replace(' ', "").toLowerCase();
                switch (themeProperty) {
                    case "theme-font-border":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ThemeColor),
                            'color': vm.color(ActiveTheme.ThemeColor),
                            'border': '1px solid ' + vm.color(ActiveTheme.DefaultTextColor)
                        });
                        break;
                    case "rating":
                        element.css({
                            'border': '1px solid ' + vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "border-themecolor":
                        element.css({
                            'border': '1px solid ' + vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "text-themecolor":
                        element.css({
                            'color': vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "text-default":
                        element.css({
                            'color': vm.color(ActiveTheme.DefaultTextColor)
                        });
                        break;
                    case "theme-bg-color":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "background":
                        if (attrs["for"]) {
                            var e = $(attrs["for"]);
                            var url = FC.Core.Environment.MediaURLRoot + '/';

                            var width = $AppConfig.Client.ScreenWidth;
                            var height = $AppConfig.Client.ScreenHeight;
                            url += "?action=getimg&MediaID="+ActiveTheme.BackgroundImage;
                            if (height > width) {
                                url += "&height=" + height;
                            } else if (height == width) {
                                url += "&width=" + width + "&height=" + height;
                            } else {
                                url += "&width=" + width;
                            }
                            var isObsolete = false;
                            if (parseInt(ActiveTheme.BackgroundImage)) {
                                url += "&IsObsolete=true";
                            }
                            e.css({
                                'background-image': 'url(' + url + ')',
                                'background-repeat': 'no-repeat',
                                'background-color': vm.color(ActiveTheme.BackgroundColor)
                            });
                        }
                        break;
                    case "button":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ThemeColor),
                            'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                        });
                        break;
                    case "button-disabled":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ButtonDisabledColor),
                            'color': vm.color(ActiveTheme.ButtonDisabledTextColor)
                        });
                        break;
                    case "button-hover":
                        element.on('mouseover', function () {
                            element.css({
                                'background-color': vm.color(ActiveTheme.ButtonHoverColor),
                                'color': vm.color(ActiveTheme.ButtonHoverTextColor)
                            });
                        }).on('mouseout', function () {
                            element.css({
                                'background-color': vm.color(ActiveTheme.ThemeColor),
                                'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                            });
                        });
                        break;
                    case "button-active":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ButtonActiveColor),
                            'color': vm.color(ActiveTheme.ButtonActiveTextColor)
                        });
                        break;
                    case "revert-header":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ButtonDefaultTextColor),
                            'color': vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "revert-button":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ButtonDefaultTextColor),
                            'color': vm.color(ActiveTheme.ThemeColor)
                        });
                        break;
                    case "header":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ThemeColor),
                            'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                        });
                        break;
                    case "link-active":
                        element.css({
                            'color': vm.color(ActiveTheme.LinkActiveColor)
                        });
                        break;
                    case "link-heart-active":
                        element.css({
                            'color': vm.color(ActiveTheme.ActiveHeartColor)
                        });
                        break;
                    case "link-heart-inactive":
                        element.css({
                            'color': vm.color(ActiveTheme.DefaultHeartColor) // vm.color(ActiveTheme.LinkActiveColor)
                        });
                        break;
                    case "count":
                        element.css({
                            'background-color': vm.color(ActiveTheme.ThemeColor),
                            'color': vm.color(ActiveTheme.ButtonDefaultTextColor)
                        });
                        break;

                    case "link":
                        element.css({
                            'color': vm.color(ActiveTheme.DefaultTextColor),

                        });


                        break;
                    case "list-item":
                        var cls = element.attr('class');
                        var r = $(element.parent()[0]);
                        //var p = r.find('.ListItem').last();
                        element.css({
                            'border-bottom': '2px solid ' + vm.color(ActiveTheme.ThemeColor)
                        });
                        //p.css({
                        //    'border-bottom': '0'
                        //});
                        break;
                }
            });
        }
        public static factory() {
            var directive = ($route, $routeParams, $location, ThemingSvc: FC.Modules.Theming.Services.ThemingService) => {
                return new ThemingDirective($route, $routeParams, $location, ThemingSvc);
            };
            directive['$inject'] = ['$route', '$routeParams', '$location','FC.Modules.Theming.Services.ThemingService'];
            return directive;
        }
    }
    Application.app.directive('theme', FC.Modules.Theming.Directives.ThemingDirective.factory());
}