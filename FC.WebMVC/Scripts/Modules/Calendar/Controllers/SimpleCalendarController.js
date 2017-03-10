var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Calendar.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Controllers;
            (function (Controllers) {
                var SimpleCalendarController = (function (_super) {
                    __extends(SimpleCalendarController, _super);
                    function SimpleCalendarController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var vm = this;
                        vm.$scope = $scope;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.IsLoading = false;
                        this.init();
                        this.addFilterChangeListener();
                        this.handleSearch();
                        this.$scope.ShowCancelSearch = false;
                    }
                    SimpleCalendarController.prototype.ClearFilters = function () {
                        CacheManager.ClearStorage();
                        var e = new CustomEvent("ClearFilter");
                        window.dispatchEvent(e);
                        this.init();
                    };
                    SimpleCalendarController.prototype.handleSearch = function () {
                        var vm = this;
                        window.addEventListener("SearchReset", function (e) {
                            var festivals = e.detail;
                            vm.init();
                        });
                        window.addEventListener("SearchComplete", function (e) {
                            var festivals = e.detail;
                            vm.$scope.Festivals = festivals;
                            vm.$scope.ShowCancelSearch = true;
                        });
                        window.addEventListener("SearchCompleteNoResult", function (e) {
                            var festivals = e.detail;
                            vm.$scope.Festivals = [];
                            vm.$scope.ShowCancelSearch = true;
                        });
                    };
                    SimpleCalendarController.prototype.init = function () {
                        var vm = this;
                        var genres = new Array();
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        var countries = new Array();
                        try {
                            CacheManager.Get("Filter_Month", function (storage) {
                                month = storage.data;
                                if (!month) {
                                    month = new Date().getMonth() + 1;
                                }
                            });
                            vm.CacheManager.Get("Filter_Year", function (storage) {
                                year = storage.data;
                                if (!year) {
                                    year = new Date().getFullYear();
                                }
                            });
                            vm.CacheManager.Get("ActiveGenres", function (storage) {
                                genres = storage.data;
                            });
                            vm.CacheManager.Get("ActiveCountries", function (storage) {
                                countries = storage.data;
                            });
                        }
                        catch (e) {
                            year = new Date().getFullYear();
                            month = new Date().getMonth() + 1;
                            genres = new Array();
                            countries = new Array();
                        }
                        vm.$scope.IsLoading = true;
                        vm.CalendarService.GetFilteredFestivals(month, year, genres, countries).then(function (r) {
                            vm.$scope.Festivals = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    };
                    SimpleCalendarController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    vm.$scope.IsLoading = true;
                                    var d = e.detail;
                                    var genres = new Array();
                                    var month = new Date().getMonth() + 1;
                                    var year = new Date().getFullYear();
                                    CacheManager.Get("Filter_Month", function (storage) {
                                        month = storage.data;
                                    });
                                    vm.CacheManager.Get("Filter_Year", function (storage) {
                                        year = storage.data;
                                    });
                                    vm.CacheManager.Get("ActiveGenres", function (storage) {
                                        genres = storage.data;
                                    });
                                    vm.CalendarService.GetFilteredFestivals(month, year, genres, null).then(function (r) {
                                        vm.$scope.Festivals = r.Data;
                                        vm.$scope.IsLoading = false;
                                    });
                                }
                            }
                        });
                    };
                    SimpleCalendarController.prototype.initCalendar = function () {
                    };
                    //public ActiveGenreID: number;
                    SimpleCalendarController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return SimpleCalendarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.SimpleCalendarController = SimpleCalendarController;
                CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.SimpleCalendarController", FC.Modules.Calendar.Controllers.SimpleCalendarController);
            })(Controllers = Calendar.Controllers || (Calendar.Controllers = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
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
//# sourceMappingURL=SimpleCalendarController.js.map