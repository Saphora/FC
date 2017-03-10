var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Favorites;
        (function (Favorites) {
            var Services;
            (function (Services) {
                var FavoriteService = (function (_super) {
                    __extends(FavoriteService, _super);
                    function FavoriteService(http, q) {
                        _super.call(this, http, q);
                    }
                    FavoriteService.prototype.GetList = function () {
                        return this.Get('/API/Favorite/GetList');
                    };
                    FavoriteService.prototype.MarkFavorite = function (contentID, contentType) {
                        return this.Get('/API/Favorite/Mark/?&contentID=' + contentID + '&type=' + contentType);
                    };
                    FavoriteService.prototype.GetUserFavorites = function () {
                        return this.Get('/API/Favorite/GetUserFavorites');
                    };
                    FavoriteService.prototype.IsFavorite = function (contentID) {
                        return this.Get('/API/Favorite/IsFavorite/?&contentID=' + contentID);
                    };
                    FavoriteService.prototype.UnmarkFavorite = function (contentID) {
                        return this.Get('/API/Favorite/Unmark/?&contentID=' + contentID);
                    };
                    FavoriteService.$inject = ['$http', '$q'];
                    return FavoriteService;
                }(FC.Core.ServiceBase));
                Services.FavoriteService = FavoriteService;
                FavoritesModule.GetApplication().app.service('FC.Modules.Favorites.Services.FavoriteService', FC.Modules.Favorites.Services.FavoriteService);
            })(Services = Favorites.Services || (Favorites.Services = {}));
        })(Favorites = Modules.Favorites || (Modules.Favorites = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FavoriteService.js.map