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
                var _OldGenreFilterController = (function (_super) {
                    __extends(_OldGenreFilterController, _super);
                    function _OldGenreFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.SetGenreList();
                        vm.$scope.ToggleGenre = this.ToggleGenre;
                        if (vm.$scope.MemReg.Get("ActiveGenres")) {
                            vm.$scope.inst.$scope.SelectedGenres = vm.$scope.MemReg.Get("ActiveGenres");
                        }
                        else {
                            vm.$scope.SelectedGenres = new Array();
                            if (CacheManager.Contains("ActiveGenres")) {
                                vm.$scope.inst.$scope.SelectedGenres = CacheManager.Get("ActiveGenres").data;
                            }
                        }
                        vm.$scope.IsActive = this.IsActive;
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                    }
                    _OldGenreFilterController.prototype.IsActive = function (genre) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveGenres")) {
                            var activated = CacheManager.Get("ActiveGenres").data;
                            var isactive = activated.some(function (g, i) {
                                return g.GenreID == genre.GenreID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    _OldGenreFilterController.prototype.ToggleGenre = function ($scope, genre) {
                        $scope = $scope.inst.$scope;
                        var any = false;
                        var modified = false;
                        any = $scope.SelectedGenres.some(function (v, i) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        if (any == false) {
                            $scope.SelectedGenres.push(genre);
                            modified = true;
                        }
                        else {
                            var index = $scope.SelectedGenres.indexOf(genre);
                            if (index > -1) {
                                delete $scope.SelectedGenres[index];
                                $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
                                modified = true;
                            }
                        }
                        if (modified) {
                            CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
                            modified = false;
                        }
                    };
                    _OldGenreFilterController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                        });
                    };
                    _OldGenreFilterController.prototype.Save = function ($scope) {
                        var vm = this;
                        vm.Close($scope);
                        //vm.$scope.IsLoading = true;
                    };
                    _OldGenreFilterController.prototype.Close = function ($scope) {
                        $("#GenreFilterControl").removeClass("ctx-visible").addClass("ctx-hidden");
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                    };
                    _OldGenreFilterController.prototype.Reset = function ($scope) {
                        CacheManager.DeleteStorage("ActiveGenres");
                        $scope.Close();
                    };
                    //public ActiveGenreID: number;
                    _OldGenreFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return _OldGenreFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers._OldGenreFilterController = _OldGenreFilterController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers._OldGenreFilterController", FC.Modules.Genres.Controllers._OldGenreFilterController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=_GenreFilterController.js.map