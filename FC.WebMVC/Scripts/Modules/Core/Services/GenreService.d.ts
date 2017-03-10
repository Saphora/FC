declare module FC.Core.Services {
    class GenreService extends FC.Core.ServiceBase {
        static $inject: string[];
        private $q;
        private $http;
        constructor(http: ng.IHttpService, q: any);
        GetAllGenres(): ng.IPromise<any>;
        GetGenre(genreId: number): ng.IPromise<any>;
    }
}
