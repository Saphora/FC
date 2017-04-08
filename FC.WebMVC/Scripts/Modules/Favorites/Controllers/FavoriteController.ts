///<reference path="../../Core/FC.ts"/>
///<reference path="../Favorites.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Favorites.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class FavoriteController extends FC.Shared.Controllers.BaseController {
        
        public $scope: VM.IFavoritePickerVM;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$routeParams',
            '$location',
            "$sce",
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog,
            $scope,
            $routeParams,
            $location,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$scope.SelectedArtists = new Array<FC.Shared.Models.UArtist>();
            vm.$scope.SelectedGenres = new Array<FC.Shared.Models.UGenre>();
            vm.$scope.SelectedLocations = new Array<FC.Shared.Models.Location>();
            vm.$scope.SelectedCountries = new Array<FC.Shared.Models.UCountry>();
            vm.$scope.SelectedFestivals = new Array<FC.Shared.Models.UFestival>();
            //vm.$scope.model = new FC.Shared.Models.UGenre();
        }

        public FavoriteActive(contentID:string): boolean {
            var vm = this;
            var result = new Array<any>();
            if (vm.$scope.SelectedArtists.filter(function (v, k) {
                return (v.ArtistID == contentID);
            }).length > 0) {
                return true;
            }
            if (vm.$scope.SelectedCountries.filter(function (v, k) {
                return (v.CountryID == contentID);
            }).length > 0) {
                return true;
            }
            if (vm.$scope.SelectedFestivals.filter(function (v, k) {
                return (v.FestivalID == contentID);
            }).length > 0) {
                return true;
            }
            if (vm.$scope.SelectedGenres.filter(function (v, k) {
                return (v.GenreID == contentID);
            }).length > 0) {
                return true;
            }
            return false;
        }

        public RegisterType(icType: FC.Shared.Enum.InternalContentType) {
            var vm = this;
            //debugger;
            vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                vm.handleToggleResponse(vm, icType, r.Data);
            });
        }


        private handleToggleResponse(vm: FavoriteController, icType: FC.Shared.Enum.InternalContentType, data: IList<MODELS.Favorite>) {
            switch (icType) {
                case FC.Shared.Enum.InternalContentType.Artist:
                    vm.$scope.SelectedArtists = new Array<MODELS.UArtist>();
                    data.forEach(function (v, k) {
                        if (v != null) {
                            if (v.Content) {
                                vm.$scope.SelectedArtists.push(v.Content as MODELS.UArtist);
                            }
                        }
                    });
                    break;
                case FC.Shared.Enum.InternalContentType.Festival:
                    vm.$scope.SelectedFestivals = new Array<MODELS.UFestival>();
                    data.forEach(function (v, k) {
                        if (v != null) {
                            if (v.Content) {
                                vm.$scope.SelectedFestivals.push(v.Content as MODELS.UFestival);
                            }
                        }
                    });
                    break;
                case FC.Shared.Enum.InternalContentType.Country:
                    vm.$scope.SelectedCountries = new Array<MODELS.UCountry>();
                    data.forEach(function (v, k) {
                        if (v != null) {
                            if (v.Content) {
                                vm.$scope.SelectedCountries.push(v.Content as MODELS.UCountry);
                            }
                        }
                    });
                    break;
                case FC.Shared.Enum.InternalContentType.Location:
                    vm.$scope.SelectedLocations = new Array<MODELS.Location>();
                    data.forEach(function (v, k) {
                        if (v != null) {
                            if (v.Content) {
                                vm.$scope.SelectedLocations.push(v.Content as MODELS.Location);
                            }
                        }
                    });
                    break;
                case FC.Shared.Enum.InternalContentType.Genre:
                    vm.$scope.SelectedGenres = new Array<MODELS.UGenre>();
                    data.forEach(function (v, k) {
                        if (v != null) {
                            if (v.Content) {
                                vm.$scope.SelectedGenres.push(v.Content as MODELS.UGenre);
                            }
                        }
                    });
                break;
            }
        }

        public ToggleFavorite(icType: FC.Shared.Enum.InternalContentType, contentID:string) {
            var vm = this;
            vm.FavoriteService.IsFavorite(CacheManager.GetCookieValue("UserID"),contentID).then(function (r) {
                if (r.Data == true) {
                    vm.FavoriteService.UnmarkFavorite(contentID).then(function (r) {
                        if (r.Data.SUCCESS == true) {
                            vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                                vm.handleToggleResponse(vm, icType, r.Data);
                            });
                        }
                    });
                }
                if (r.Data == false) {
                    vm.FavoriteService.MarkFavorite(contentID, icType).then(function (r) {
                        if (r.Data.SUCCESS == true) {
                            vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), icType).then(function (r) {
                                vm.handleToggleResponse(vm, icType, r.Data);
                            });
                        }
                    });
                }
            });
        }

        public search(icType:FC.Shared.Enum.InternalContentType) {
            var vm = this;
            if (icType == FC.Shared.Enum.InternalContentType.Genre) {
                this.GenreService.Search(this.$scope.SearchKey).then(function (r) {
                    vm.$scope.SearchResult = r.Data;
                });
            }
            if (icType == FC.Shared.Enum.InternalContentType.Location) {
                this.LocationService.Search(this.$scope.SearchKey).then(function (r) {
                    vm.$scope.SearchResult = r.Data;
                });
            }
            if (icType == FC.Shared.Enum.InternalContentType.Artist) {
                this.ArtistService.Search(this.$scope.SearchKey).then(function (r) {
                    vm.$scope.SearchResult = r.Data;
                });
            }
            if (icType == FC.Shared.Enum.InternalContentType.Country) {
                this.CountriesSvc.Search(this.$scope.SearchKey).then(function (r) {
                    vm.$scope.SearchResult = r.Data;
                });
            }
            if (icType == FC.Shared.Enum.InternalContentType.Festival) {
                //this.FestivalService.Search(this.$scope.SearchKey).then(function (r) {
                //    vm.$scope.SearchResult = r.Data;
                //});
            }
        }
    }
    FavoritesModule.GetApplication().RegisterController("FC.Modules.Favorites.Controllers.FavoriteController", FC.Modules.Favorites.Controllers.FavoriteController);
}