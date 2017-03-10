var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var News;
        (function (News) {
            var Models;
            (function (Models) {
                var NewsVm = (function () {
                    function NewsVm(data) {
                        this.Title = data.Title;
                        this.Content = data.Content;
                        this.DisplayDate = data.DisplayDate;
                        this.GenreID = data.GenreID;
                        this.Type = data.Type;
                        this.Img = data.Img;
                        this.Link = "/#/News/" + data.UmbracoID + "/" + this.GenreID;
                        this.SortDate = data.SortDate;
                        this.UmbracoID = data.UmbracoID;
                    }
                    return NewsVm;
                }());
                Models.NewsVm = NewsVm;
            })(Models = News.Models || (News.Models = {}));
        })(News = Modules.News || (Modules.News = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=NewsVm.js.map