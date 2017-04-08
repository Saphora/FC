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
                var GenreFilterController = (function (_super) {
                    __extends(GenreFilterController, _super);
                    function GenreFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
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
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.SelectedGenreIds = "";
                        vm.SetGenreList();
                        //if (vm.$scope.MemReg.Get("ActiveGenres")) {
                        //    vm.$scope.inst.$scope.SelectedGenres = vm.$scope.MemReg.Get<Array<MODELS.UGenre>>("ActiveGenres");
                        //} else {
                        //    vm.$scope.SelectedGenres = new Array<MODELS.UGenre>();
                        //    if (CacheManager.Contains("ActiveGenres")) {
                        //        vm.$scope.inst.$scope.SelectedGenres = CacheManager.Get<Array<MODELS.UGenre>>("ActiveGenres").data;
                        //    }
                        //}
                        vm.$scope.IsActive = this.IsActive;
                        vm.$scope.Selected = "0 SELECTED";
                        if (vm.$scope.SelectedGenres != null) {
                            vm.$scope.Selected = this.$scope.SelectedGenres.length + " SELECTED";
                        }
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                        vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
                        vm.addFilterChangeListener();
                        window.addEventListener('ClearFilter', function () {
                            vm.$scope.Selected = "0 SELECTED";
                            vm.$scope.SelectedGenres = new Array();
                            CacheManager.DeleteStorage('ActiveGenres');
                        });
                    }
                    GenreFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Genres) {
                                        vm.$scope.Selected = d.Genres.length + " SELECTED";
                                        d.Genres.forEach(function (g, i) {
                                            vm.$scope.SelectedGenreIds += g.GenreID + ',';
                                        });
                                        vm.$scope.SelectedGenres = d.Genres;
                                        vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
                                    }
                                }
                            }
                        });
                    };
                    GenreFilterController.prototype.ShowFilter = function ($scope) {
                        var vm = this;
                        vm.$scope = $scope;
                        var $scope = vm.$scope;
                        var opts = {};
                        opts.controller = FC.Modules.Genres.Controllers.GenreFilterController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/genres/views/genre-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    GenreFilterController.prototype.IsActive = function (genre) {
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
                    GenreFilterController.prototype.ToggleGenre = function (genre) {
                        var vm = this;
                        if (!this.IsActive(genre)) {
                            vm.$scope.SelectedGenres.push(genre);
                            CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 999999999999999);
                        }
                        else {
                            var tmp = new Array();
                            vm.$scope.SelectedGenres.forEach(function (v, i) {
                                if (v.GenreID != genre.GenreID) {
                                    tmp.push(v);
                                }
                            });
                            vm.$scope.SelectedGenres = tmp;
                            vm.$scope.Selected = tmp.length + " SELECTED";
                            CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedGenres, 999999999999999);
                        }
                        vm.$scope.SelectedGenres.forEach(function (v, i) {
                            vm.$scope.SelectedGenreIds += v.GenreID + ",";
                        });
                        vm.$scope.Selected = vm.$scope.SelectedGenres.length + " SELECTED";
                        vm.$scope.SelectedGenreIds = vm.$scope.SelectedGenreIds.substr(0, vm.$scope.SelectedGenreIds.length - 1);
                        vm.$scope.model.Genres = vm.$scope.SelectedGenres;
                    };
                    GenreFilterController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                        });
                    };
                    GenreFilterController.prototype.Save = function () {
                        var vm = this;
                        //vm.$scope.Selected = vm.$scope.SelectedGenres.length + " SELECTED";
                        vm.Close();
                        var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
                        //vm.$scope.IsLoading = true;
                    };
                    GenreFilterController.prototype.Close = function () {
                        this.$scope.MtModal.hide();
                    };
                    GenreFilterController.prototype.Reset = function () {
                        CacheManager.DeleteStorage("ActiveGenres");
                    };
                    //public ActiveGenreID: number;
                    GenreFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return GenreFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreFilterController = GenreFilterController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreFilterController", FC.Modules.Genres.Controllers.GenreFilterController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedGenres.some(function (v, i) {
//    if (v.GenreID == genre.GenreID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedGenres.push(genre);
//    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedGenres.some(function (v, i) {
//        if (v.GenreID == genre.GenreID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedGenres[index];
//        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
//        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
//        modified = false;
//    }
//}
//# sourceMappingURL=GenreFilterController.js.map