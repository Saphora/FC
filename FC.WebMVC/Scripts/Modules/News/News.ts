///<reference path="../Core/FC.ts"/>
module FC.Modules.News {
    export class News {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/news", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
            this.$Application.AddRoute("/news/detail/:newsid", "/Scripts/Modules/News/Views/detail.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
            this.$Application.AddRoute("/news/delete/:newsid", "/Scripts/Modules/News/Views/delete.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
            this.$Application.AddRoute("/news/:page", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
            this.$Application.AddRoute("/news/:page/:year/:month", "/Scripts/Modules/News/Views/overview.html", "FC.Modules.News.Controllers.NewsOverviewController", "vm");
            this.$Application.AddRoute("/news/create/:step", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
            this.$Application.AddRoute("/news/edit/:newsid", "/Scripts/Modules/News/Views/create.html", "FC.Modules.News.Controllers.NewsCRUDController", "vm");
        }
    }
}
var NewsModule = new FC.Modules.News.News(angular.module('FC.Modules.News', ApplicationDependencies), Application);