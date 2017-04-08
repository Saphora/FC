var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenreFormController = (function (_super) {
                    __extends(GenreFormController, _super);
                    function GenreFormController($http, $q, $mdDialog, $scope, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
                        this.RecoverModel(this.$scope.model, this.$scope);
                        //vm.$scope.model = new FC.Shared.Models.UGenre();
                    }
                    GenreFormController.prototype.search = function () {
                        var vm = this;
                        this.genreSvc.Search(this.$scope.SearchKey).then(function (r) {
                            vm.$scope.SearchResult = r.Data;
                        });
                        debugger;
                    };
                    //public ActiveGenreID: number;
                    GenreFormController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return GenreFormController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreFormController = GenreFormController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFormController", FC.Modules.Genres.Controllers.GenreFormController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=GenreFormController.js.map