var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/AppConfig.ts"/>
///<reference path="../Festival.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Controllers;
            (function (Controllers) {
                var FestivalCRUDController = (function (_super) {
                    __extends(FestivalCRUDController, _super);
                    function FestivalCRUDController($http, $q, $scope, $route, $routeParams, $location, $sce, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        vm.CheckAuth($scope);
                        this.$scope.inst = this;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.FormID = "C018E5F4-1C4F-42BB-8537-85FFA794B0F4";
                        this.$scope.SaveFieldState = this.SaveFieldState;
                        this.$scope.GetFieldState = this.GetFieldState;
                        this.$scope.GetMediaPickerFieldState = this.GetMediaPickerFieldState;
                        this.$scope.SaveFormState = this.SaveFormState;
                        this.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        this.$location = $location;
                        this.$scope.model = new FC.Shared.Models.UFestival();
                        this._InitGenres();
                        this.AddListeners(this.$scope);
                        this.$scope.$location = $location;
                        this.$scope.$routeParams = $routeParams;
                        if ($routeParams["step"]) {
                            this.$scope.WizardStep = $routeParams["step"];
                        }
                        else {
                            this.$scope.WizardStep = 1;
                        }
                        if ($routeParams["festivalID"]) {
                            vm.$scope.IsEditing = true;
                            vm.$scope.FestivalID = $routeParams["festivalID"];
                            vm.$scope.SaveFieldState($scope, "FestivalID", vm.$scope.FestivalID);
                            vm.$scope.IsCreating = false;
                            vm.$scope.model = null;
                        }
                        else {
                            vm.$scope.IsCreating = true;
                            vm.$scope.IsEditing = false;
                        }
                        //if (!this.AuthService.HasAuth()) {
                        //    $location.path('/login');
                        //}
                        var d = new Date();
                        this.$scope.MinDateStart = d;
                        this.$scope.MaxDateStart = new Date(d.getFullYear() + 2, 11, 31);
                        this.$scope.MaxDateEnd = new Date(d.getFullYear() + 2, 11, 31);
                        this.$scope.MinDateEnd = new Date(d.getFullYear() + 2, 11, 31);
                        this.$scope.DoChangeStartDate = this.DoChangeStartDate;
                        this.$scope.DoSaveCreate = this.DoSaveCreate;
                        this.$scope.DoSaveDelete = this.DoSaveDelete;
                        this.$scope.DoSaveEdit = this.DoSaveEdit;
                        this.RecoverModel();
                    }
                    FestivalCRUDController.prototype.DoChangeStartDate = function ($scope) {
                        this.$scope.MinDateEnd = $scope.model.StartDate;
                    };
                    FestivalCRUDController.prototype.DoSaveCreate = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.FestivalService.Create($scope.model).then(function (r) {
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
                        });
                    };
                    FestivalCRUDController.prototype.DoSaveEdit = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.FestivalService.Update($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            if (r.Data.SUCCESS == true) {
                                $scope.IsEdited = true;
                                $scope.IsEditing = false;
                                $scope.FinishForm($scope);
                            }
                            else {
                                $scope.IsEdited = false;
                                $scope.IsEditing = true;
                            }
                        });
                    };
                    FestivalCRUDController.prototype.DoSaveDelete = function ($scope) {
                        $scope = $scope.inst.$scope;
                        $scope.inst.FestivalService.Delete($scope.model).then(function (r) {
                            $scope.ServerMsg = r.Message;
                            if (r.Data.SUCCESS == true) {
                                $scope.IsDeleted = true;
                                $scope.IsDeleting = false;
                            }
                            else {
                                $scope.IsDeleted == false;
                                $scope.IsDeleting = true;
                            }
                        });
                    };
                    FestivalCRUDController.prototype.RecoverModel = function () {
                        var vm = this;
                        var r = _super.prototype.RecoverModel.call(this, vm.$scope.model, vm.$scope);
                        vm.$scope.model = r;
                        if (vm.$scope.IsEditing && !vm.$scope.model.Name) {
                            vm.FestivalService.GetFestival(vm.$scope.$routeParams["festivalID"]).then(function (r) {
                                if (vm.$scope.inst.MediaIsObsolete(vm.$scope.model.LogoID)) {
                                    vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=true&MediaID=' + vm.$scope.model.LogoID;
                                }
                                else {
                                    vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + vm.$scope.model.LogoID;
                                }
                                vm.$scope.model = r.Data;
                                vm.$scope.model.StartDate = new Date(r.Data.StartDate.toString());
                                vm.$scope.model.EndDate = new Date(r.Data.EndDate.toString());
                                vm.RestoreModel(vm.$scope);
                            });
                        }
                        if (vm.$scope.model && vm.$scope.model.StartDate && vm.$scope.model.EndDate) {
                            vm.$scope.model.StartDate = new Date(vm.$scope.model.toString());
                            vm.$scope.model.EndDate = new Date(vm.$scope.model.EndDate.toString());
                            if (vm.$scope.inst.MediaIsObsolete(vm.$scope.model.LogoID)) {
                                vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=true&MediaID=' + vm.$scope.model.LogoID;
                            }
                            else {
                                vm.$scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + vm.$scope.model.LogoID;
                            }
                        }
                    };
                    //public SaveFieldState($scope: FC.Shared.ViewModels.IFestivalCRUDVM, name: string, value: any): void {
                    //    FC.Shared.CoreModel.Recovery.Add($scope.FormID, name, value);
                    //}
                    //public GetFieldState($scope: FC.Shared.ViewModels.IFestivalCRUDVM, name: string): void {
                    //    if ($scope.model) {
                    //        $scope.model[name] = FC.Shared.CoreModel.Recovery.Get<string>($scope.FormID, name);
                    //    }
                    //}
                    FestivalCRUDController.prototype.GetMediaPickerFieldState = function ($scope, name) {
                        var v = FC.Shared.CoreModel.Recovery.Get($scope.FormID, name);
                        $scope.model[name] = v;
                        $scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&MediaID=' + v;
                    };
                    FestivalCRUDController.prototype.GetArtistPickerFieldState = function ($scope, name) {
                        var v = FC.Shared.CoreModel.Recovery.Get($scope.FormID, name);
                        // $scope.model[name] = v;
                    };
                    FestivalCRUDController.prototype.SaveFormState = function ($scope) {
                        FC.Shared.CoreModel.Recovery.SaveState($scope.FormID, $scope.$location.path());
                    };
                    FestivalCRUDController.prototype.AddListeners = function ($scope) {
                        $scope = $scope.inst.$scope;
                        window.addEventListener("FestivalLogoSaved", function (e) {
                            $scope.model.LogoID = e["detail"].MediaID;
                            if ($scope.inst.MediaIsObsolete($scope.model.LogoID)) {
                                $scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=true&MediaID=' + e["detail"].MediaID;
                            }
                            else {
                                $scope.FestivalLogoPath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + e["detail"].MediaID;
                            }
                            $scope.SaveFieldState($scope, 'Logo', $scope.model.LogoID);
                        });
                        window.addEventListener("ArtistPickerSaved", function (e) {
                            $scope.model.Artists = e["detail"].SelectedArtists;
                            $scope.SaveFieldState($scope, 'Artists', $scope.model.Artists);
                        });
                        window.addEventListener("GenrePickerSaved", function (e) {
                            $scope.model.Genres = e["detail"].SelectedGenres;
                            $scope.SaveFieldState($scope, 'Genres', $scope.model.Genres);
                        });
                    };
                    FestivalCRUDController.prototype._InitGenres = function () {
                        var vm = this;
                        if (this.CacheManager.Contains("sys-genres")) {
                            vm.$scope.SysGenres = this.CacheManager.GetStorage("sys-genres").data;
                        }
                        if (this.CacheManager.Contains("sys-countries")) {
                            vm.$scope.SysCountries = this.CacheManager.GetStorage("sys-countries").data;
                        }
                    };
                    //public ActiveGenreID: number;
                    FestivalCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                        "$mdDialog"
                    ];
                    return FestivalCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalCRUDController = FestivalCRUDController;
                FestivalModule.GetApplication().RegisterController("FC.Modules.Festival.Controllers.FestivalCRUDController", FC.Modules.Festival.Controllers.FestivalCRUDController);
            })(Controllers = Festival.Controllers || (Festival.Controllers = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FestivalCRUDController.js.map