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
                var GenrePickerController = (function (_super) {
                    __extends(GenrePickerController, _super);
                    function GenrePickerController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = 'C0232ABF-7A60-46D2-942D-A2843B3D1AA0';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.URLRoot = $AppConfig.URLRoot;
                        //vm.Modal = $uibModal;
                        vm.$scope.MtModal = $mdDialog;
                        vm.SetGenreList();
                        vm.$scope.Save = this.Save;
                        if (!vm.$scope.SelectedGenres) {
                            vm.$scope.SelectedGenres = new Array();
                        }
                        vm.$scope.SelectedHidden = false;
                        vm.$scope.ToggleSelected = this.ToggleSelected;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        vm.$scope.DoSaveCreate = this.DoAddGenre;
                        vm.$scope.DoCreate = this.DoCreate;
                        vm.$scope.DoEdit = this.DoEdit;
                        vm.$scope.DoDelete = this.DoDelete;
                        vm.$scope.DoCancelCRUD = this.DoCancelCRUD;
                        vm.$scope.DoSaveEdit = this.DoSaveEditGenre;
                        vm.$scope.DoSaveDelete = this.DoSaveDeleteGenre;
                        vm.$scope.DoSaveForceDelete = this.DoSaveForceDeleteGenre;
                        vm.$scope.IsCreating = false;
                        vm.$scope.IsEditing = false;
                        vm.$scope.IsDeleting = false;
                        vm.$scope.GenreCreated = false;
                        vm.$scope.Activate = this.Activate;
                        vm.$scope.IsActive = this.IsActive;
                        vm.$scope.Close = this.Close;
                        vm.$scope.DoSearch = this.DoSearch;
                        vm.$scope.DoCancelSearch = this.DoCancelSearch;
                        if (vm.$scope.MemReg.Get("SelectedGenres")) {
                            vm.$scope.SelectedGenres = vm.$scope.MemReg.Get("SelectedGenres");
                        }
                        this.RecoverModel(this.$scope.model, this.$scope);
                        //vm.$scope.model = new FC.Shared.Models.UGenre();
                    }
                    GenrePickerController.prototype.DoSearch = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.SearchResult = $scope.SysGenres.filter(function (v) {
                            return v.Name.substr(0, $scope.SearchKey.length).toLowerCase() == $scope.SearchKey.toLowerCase();
                        });
                        if (!$scope.model) {
                            $scope.model = new FC.Shared.Models.UGenre();
                        }
                        $scope.model.Name = $scope.SearchKey;
                    };
                    GenrePickerController.prototype.DoCancelSearch = function ($scope) {
                        $scope.SearchKey = '';
                    };
                    GenrePickerController.prototype.Close = function ($scope) {
                        $scope.MtModal.hide();
                    };
                    GenrePickerController.prototype.ToggleSelected = function ($scope, state) {
                        var $scope = $scope.inst.$scope;
                        $scope.SelectedHidden = state;
                    };
                    GenrePickerController.prototype.DoCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        if ($scope.SearchKey) {
                            $scope.model.Name = $scope.SearchKey;
                        }
                        $scope.IsCreating = true;
                    };
                    GenrePickerController.prototype.DoEdit = function ($scope, genre) {
                        var $scope = $scope.inst.$scope;
                        $scope.model = genre;
                        $scope.IsEditing = true;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                    };
                    GenrePickerController.prototype.DoDelete = function ($scope, genre) {
                        var $scope = $scope.inst.$scope;
                        $scope.model = genre;
                        $scope.ServerMsg = null;
                        $scope.IsEditing = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                    };
                    GenrePickerController.prototype.DoSaveEditGenre = function ($scope) {
                        $scope.inst.GenreService.Update($scope.model).then(function (r) {
                            if (r.Data.EXISTS == true) {
                                $scope.IsEditing = true;
                                $scope.IsEdited = true;
                                $scope.ServerMsg = r.Message;
                            }
                            if (r.Data.SUCCESS == true) {
                                $scope.GenreModified = true;
                                $scope.ServerMsg = r.Message;
                                $scope.IsEditing = false;
                                $scope.IsEdited = true;
                            }
                            else {
                                $scope.GenreModified = false;
                                $scope.ServerMsg = r.Message;
                                $scope.IsEditing = true;
                                $scope.IsEdited = false;
                            }
                        });
                    };
                    GenrePickerController.prototype.DoSaveDeleteGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.Delete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                            }
                            else {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                            }
                        });
                    };
                    GenrePickerController.prototype.DoSaveForceDeleteGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.ForceDelete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                            }
                            else {
                                $scope.ServerMsg = r.Message;
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                            }
                        });
                    };
                    GenrePickerController.prototype.Filter = function () {
                        var vm = this;
                        if (vm.$scope.GenreSearchKey) {
                            vm.$scope.GenreSearchKey = vm.$scope.GenreSearchKey.charAt(0).toUpperCase() + vm.$scope.GenreSearchKey.slice(1);
                            vm.GenreService.Search(vm.$scope.GenreSearchKey).then(function (r) {
                                vm.$scope.SysGenres = r.Data;
                            });
                        }
                        else {
                            vm.SetGenreList();
                        }
                    };
                    GenrePickerController.prototype.Deactivate = function ($scope, genre, saveEvt, model) {
                        var index = 0;
                        $scope.SelectedGenres = model;
                        var tmp = $scope.SelectedGenres;
                        tmp.forEach(function (v, i) {
                            if (v == null || genre == null) {
                                delete $scope.SelectedGenres[index];
                            }
                            else if (v.GenreID == genre.GenreID) {
                                delete $scope.SelectedGenres[index];
                            }
                            index++;
                        });
                        $scope.SelectedGenres = $scope.inst.RepairArray($scope.SelectedGenres);
                        var evt = new CustomEvent(saveEvt, { "detail": $scope });
                        window.dispatchEvent(evt);
                    };
                    GenrePickerController.prototype.Activate = function ($scope, genre, formID, saveEvt) {
                        $scope = $scope.inst.$scope;
                        if (!$scope.SelectedGenres.some(function (v, i) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })) {
                            $scope.SelectedGenres.push(genre);
                        }
                        else {
                            var index = 0;
                            var tmp = $scope.SelectedGenres;
                            tmp.forEach(function (v, i) {
                                if (v.GenreID == genre.GenreID) {
                                    delete $scope.SelectedGenres[index];
                                }
                                index++;
                            });
                            $scope.SelectedGenres = $scope.inst.RepairArray($scope.SelectedGenres);
                        }
                        if (saveEvt) {
                            var evt = new CustomEvent(saveEvt, { "detail": $scope });
                            window.dispatchEvent(evt);
                        }
                    };
                    GenrePickerController.prototype.RegisterEvt = function (evt) {
                        var vm = this;
                        vm.$scope.MemReg.Register("ModalGenreSaveEvent", evt);
                    };
                    GenrePickerController.prototype.IsActive = function ($scope, genre) {
                        var vm = this;
                        var existing = $scope.SelectedGenres.filter(function (v, k) {
                            if (v.GenreID == genre.GenreID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        if (existing[0]) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    GenrePickerController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.GenreService.GetAllGenres().then(function (r) {
                            vm.$scope.SysGenres = r.Data;
                        });
                    };
                    GenrePickerController.prototype.DoAddGenre = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.GenreService.Create($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            $scope.inst.SetGenreData(true);
                            if (r.Data.EXISTS == true) {
                                $scope.IsCreated = false;
                                $scope.IsCreating = true;
                            }
                            if (r.Data.SUCCESS == true) {
                                $scope.IsCreated = true;
                                $scope.IsCreating = false;
                                $scope.FinishForm($scope);
                            }
                            else {
                                $scope.IsCreated = false;
                                $scope.IsCreating = false;
                            }
                        });
                    };
                    GenrePickerController.prototype.Cancel = function ($scope) {
                        var vm = this;
                        $scope.MtModal.cancel();
                    };
                    GenrePickerController.prototype.Save = function ($scope) {
                        $scope = $scope.inst.$scope;
                        var e = $scope.inst.MemReg.GetAny("ModalGenreSaveEvent");
                        var evt = new CustomEvent(e, { "detail": $scope });
                        window.dispatchEvent(evt);
                        $scope.$dismiss($scope.inst.Modal);
                        //todo dispose selected data...
                    };
                    //public ActiveGenreID: number;
                    GenrePickerController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                    ];
                    return GenrePickerController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenrePickerController = GenrePickerController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenrePickerController", FC.Modules.Genres.Controllers.GenrePickerController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=GenrePickerController.js.map