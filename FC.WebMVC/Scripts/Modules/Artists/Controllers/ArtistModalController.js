var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistModalController = (function (_super) {
                    __extends(ArtistModalController, _super);
                    function ArtistModalController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce, GenreService, ArtistsService, local) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.SaveEventName = local[1];
                        vm.$scope.inst = this;
                        vm.ArtistService = ArtistsService;
                        vm.$scope.inst = vm;
                        vm.$scope.FormID = "5A60475F-E220-493F-99BC-88C7AC937AF3";
                        vm.$scope.DoSaveCreate = this.SaveArtist;
                        vm.$scope.SaveModal = this.SaveModal;
                        vm.$scope.$location = $location;
                        vm.$scope.URLRoot = FC.Core.Environment.MediaURLRoot;
                        //vm.Modal = $uibModal;
                        vm.$scope.MtModal = $mdDialog;
                        vm.SetArtistList();
                        if (vm.$scope.MemReg.Get("SelectedArtists")) {
                            vm.$scope.SelectedArtists = vm.$scope.MemReg.Get("SelectedArtists");
                        }
                        else {
                            vm.$scope.SelectedArtists = new Array();
                        }
                        this.$scope.ServerMsg = null;
                        this.$scope.ArtistCreated = false;
                        this.$scope.DoCreate = this.DoCreateArtist;
                        this.$scope.DoEdit = this.DoEditArtist;
                        this.$scope.DoDelete = this.DoDeleteArtist;
                        this.$scope.DoSaveDelete = this.DoSaveDelete;
                        this.$scope.DoSaveForceDelete = this.DoSaveForceDelete;
                        this.$scope.DoCancelCRUD = this.DoCancelCRUD;
                        this.$scope.IsActive = this.IsActive;
                        this.$scope.DoSaveCreate = this.SaveArtist;
                        this.$scope.DoSaveEdit = this.DoSaveEdit;
                        this.$scope.SelectedHidden = false;
                        this.$scope.ToggleSelected = this.ToggleSelected;
                        this.$scope.model = new FC.Shared.Models.UArtist();
                        this.AddListeners(this.$scope);
                        this.$scope.Close = this.Close;
                        this.RecoverModel(this.$scope.model, this.$scope);
                    }
                    ArtistModalController.prototype.Close = function ($scope) {
                        $scope.MtModal.hide();
                    };
                    ArtistModalController.prototype.AddListeners = function ($scope) {
                        $scope = $scope.inst.$scope;
                        window.addEventListener("ArtistGenrePickerSaved", function (e) {
                            $scope.model.Genres = e["detail"].SelectedGenres;
                            $scope.SaveFieldState($scope, 'Genres', $scope.model.Genres);
                        });
                        window.addEventListener("ArtistLogoSaved", function (e) {
                            $scope.model.Image = e["detail"].MediaID;
                            if ($scope.MediaIsObsolete($scope.model.Image)) {
                                $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=true&Width=50&MediaID=' + $scope.model.Image;
                            }
                            else {
                                $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=false&Width=50&MediaID=' + $scope.model.Image;
                            }
                            $scope.SaveFieldState($scope, 'Image', $scope.model.Image);
                            //model.Image = ....
                        });
                    };
                    ArtistModalController.prototype.ToggleSelected = function ($scope, state) {
                        var $scope = $scope.inst.$scope;
                        $scope.SelectedHidden = state;
                    };
                    ArtistModalController.prototype.SaveArtist = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Create($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            if (r.Data.SUCCESS == true) {
                                $scope.IsCreated = true;
                                $scope.IsCreating = false;
                                $scope.FinishForm($scope);
                            }
                            else {
                                $scope.IsCreated = false;
                                $scope.IsCreating = true;
                            }
                        }).catch(function (r) {
                            $scope.IsCreated = false;
                            $scope.IsCreating = true;
                        });
                    };
                    ArtistModalController.prototype.DoSaveEdit = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Update($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsEdited = true;
                                $scope.IsEditing = false;
                            }
                            else {
                                $scope.IsEditing = true;
                                $scope.IsEdited = false;
                            }
                            $scope.ServerMsg = r.Message;
                        });
                    };
                    ArtistModalController.prototype.DoCreateArtist = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        $scope.IsCreated = false;
                        $scope.IsCreating = true;
                        $scope.ServerMsg = null;
                    };
                    ArtistModalController.prototype.DoEditArtist = function ($scope, artist) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.GetByID(artist.ArtistID).then(function (r) {
                            $scope = $scope.inst.$scope;
                            $scope.model = r.Data;
                            $scope.ServerMsg = null;
                            $scope.IsCreating = false;
                            $scope.IsDeleting = false;
                            $scope.IsEditing = true;
                            if ($scope.model) {
                                if ($scope.inst.MediaIsObsolete($scope.model.Image)) {
                                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=true&MediaID=' + $scope.model.Image;
                                }
                                else {
                                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + $scope.model.Image;
                                }
                            }
                            $scope.RecoverModel($scope.model, $scope);
                        });
                    };
                    ArtistModalController.prototype.DoDeleteArtist = function ($scope, artist) {
                        var vm = this;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.ArtistService, $scope).then(function (r) {
                        });
                    };
                    ArtistModalController.prototype.DoSaveDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.Delete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                                $scope.ServerMsg = r.Message;
                                $scope.inst.Filter($scope);
                            }
                            else {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                                $scope.ServerMsg = r.Message;
                            }
                        });
                    };
                    ArtistModalController.prototype.DoSaveForceDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.ArtistService.ForceDelete($scope.model).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted = true;
                                $scope.ServerMsg = r.Message;
                                $scope.inst.Filter($scope);
                            }
                            else {
                                $scope.IsDeleting = false;
                                $scope.IsDeleted == false;
                                $scope.ServerMsg = r.Message;
                            }
                        });
                    };
                    ArtistModalController.prototype.Filter = function (scope) {
                        var vm = this;
                        if (scope.ArtistSearchKey) {
                            scope.ArtistSearchKey = scope.ArtistSearchKey.charAt(0).toUpperCase() + scope.ArtistSearchKey.slice(1);
                            vm.$scope.SysArtists = vm.$scope.SelectedArtists;
                            vm.ArtistService.GetSorted(scope.ArtistSearchKey).then(function (r) {
                                vm.$scope.SysArtists = r.Data;
                            });
                        }
                        else {
                            vm.SetArtistList();
                        }
                    };
                    ArtistModalController.prototype.Deactivate = function ($scope, artist, saveEvt, model) {
                        var index = 0;
                        $scope.SelectedArtists = model;
                        var tmp = $scope.SelectedArtists;
                        tmp.forEach(function (v, i) {
                            if (v.ArtistID == artist.ArtistID) {
                                delete $scope.SelectedArtists[index];
                            }
                            index++;
                        });
                        $scope.SelectedArtists = $scope.inst.RepairArray($scope.SelectedArtists);
                        var evt = new CustomEvent(saveEvt, { "detail": $scope });
                        window.dispatchEvent(evt);
                    };
                    ArtistModalController.prototype.Activate = function ($scope, artist) {
                        $scope = $scope.inst.$scope;
                        if (!$scope.SelectedArtists.some(function (v, i) {
                            if (v.ArtistID == artist.ArtistID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })) {
                            $scope.SelectedArtists.push(artist);
                        }
                        else {
                            var index = 0;
                            var tmp = $scope.SelectedArtists;
                            tmp.forEach(function (v, i) {
                                if (v.ArtistID == artist.ArtistID) {
                                    delete $scope.SelectedArtists[index];
                                }
                                index++;
                            });
                            $scope.SelectedArtists = $scope.inst.RepairArray($scope.SelectedArtists);
                        }
                    };
                    ArtistModalController.prototype.IsActive = function ($scope, artist) {
                        var vm = this;
                        if ($scope.SelectedArtists) {
                            var existing = $scope.SelectedArtists.filter(function (v, k) {
                                if (v.ArtistID == artist.ArtistID) {
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
                        }
                        return false;
                    };
                    ArtistModalController.prototype.SetArtistList = function () {
                        var vm = this;
                        //this.ArtistService.GetPaged(50, 1).then(function (r: INT.IServiceResponse<Models.ArtistListVM[]>) {
                        //    vm.$scope.SysArtists = r.Data;
                        //});
                    };
                    ArtistModalController.prototype.SaveModal = function ($scope) {
                        $scope = $scope.inst.$scope;
                        var evt = new CustomEvent($scope.SaveEventName, { "detail": $scope });
                        window.dispatchEvent(evt);
                        if ($scope.$dismiss) {
                            $scope.$dismiss($scope.inst.Modal);
                        }
                    };
                    ArtistModalController.prototype.Cancel = function ($scope) {
                        var vm = this;
                        $scope.$dismiss(vm.Modal);
                    };
                    //public ActiveGenreID: number;
                    ArtistModalController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        'local',
                    ];
                    return ArtistModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistModalController = ArtistModalController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistModalController", FC.Modules.Artists.Controllers.ArtistModalController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistModalController.js.map