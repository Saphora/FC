///<reference path="../../Core/ServiceBase.ts" />
module FC.Modules.News.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class NewsService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UNews>>> {
            return this.Get<IList<MODELS.UNews>>('/API/News/GetList');
        }

        GetNews(genreId: number): ng.IPromise<INT.IServiceResponse<Array<INT.IContentDetail>>> {
            return this.Get('/API/News/GetNews/?&genreId=' + genreId);
        }
        GetNewsById(newsId: string): ng.IPromise<INT.IServiceResponse<MODELS.UNews>> {
            return this.Get('/API/News/GetById/?&id=' + newsId);
        }

        GetPaged(page: number = 1, month: string, year: string): ng.IPromise<INT.IServiceResponse<MODELS.UNews[]>> {
            return this.Get('/API/News/GetPaged?&page=' + page + '&month=' + month + '&year=' + year);
        }

        GetPagedCount(page: number = 1, month: string, year: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/News/GetPagedCount?&page=' + page + '&month=' + month + '&year=' + year);
        }

        GetFilteredNews(genres: Array<string>): ng.IPromise<INT.IServiceResponse<Array<INT.IContentDetail>>> {
            var filter = new FC.Shared.Models.NewsFilter();
            filter.GenreIDs= genres;
            filter.CountryIDs = []; //prepare for future usage..
            return this.Post<Array<INT.IContentDetail>, FC.Shared.Models.NewsFilter>('/API/News/GetFiltered', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.NewsFilter>(filter));
        }

        public Create(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Post<VM.RepositoryState, MODELS.UNews>('/API/News/Create', new FC.Shared.Models.ServiceMessage<MODELS.UNews>(News));
        }

        public Update(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Post<VM.RepositoryState, MODELS.UNews>('/API/News/Update', new FC.Shared.Models.ServiceMessage<MODELS.UNews>(News));
        }

        public Delete(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Post<VM.RepositoryState, MODELS.UNews>('/API/News/Delete', new FC.Shared.Models.ServiceMessage<MODELS.UNews>(News));
        }
        public ForceDelete(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Post<VM.RepositoryState, MODELS.UNews>('/API/News/ForceDelete', new FC.Shared.Models.ServiceMessage<MODELS.UNews>(News));
        }


    }
    NewsModule.GetApplication().app.service('FC.Modules.News.Services.NewsService', FC.Modules.News.Services.NewsService)
}