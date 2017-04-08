///<reference path="../../Core/ServiceBase.ts" />
module FC.Modules.Favorites.Services {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class FavoriteService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Favorite>>> {
            return this.Get<IList<MODELS.Favorite>>('/API/Favorite/GetList');
        }

        public MarkFavorite(contentID: string, contentType: FC.Shared.Enum.InternalContentType): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Get('/API/Favorite/Mark/?&contentID=' + contentID + '&type=' + contentType);
        }

        public GetUserFavorites(userID: string, icType: FC.Shared.Enum.InternalContentType): ng.IPromise<INT.IServiceResponse<IList<FC.Shared.Models.Favorite>>> {
            return this.Get('/API/Favorite/GetUserFavorites?&userID=' + userID + '&icType=' + icType);
        }

        public GetUserFavoritesCount(userID: string, icType: FC.Shared.Enum.InternalContentType): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Favorite/GetUserFavoritesCount?&userID=' + userID + '&icType=' + icType);
        }

        public IsFavorite(userID:string, contentID: string): ng.IPromise<INT.IServiceResponse<boolean>> {
            return this.Get('/API/Favorite/IsFavorite/?&userID='+userID+'&contentID=' + contentID);
        }

        public UnmarkFavorite(contentID: string): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            return this.Get('/API/Favorite/Unmark/?&contentID=' + contentID);
        }
    }
    FavoritesModule.GetApplication().app.service('FC.Modules.Favorites.Services.FavoriteService', FC.Modules.Favorites.Services.FavoriteService)
}