///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Artists.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class ArtistModalController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Artists.Controllers.ArtistModalController;
        public ShowTravelInfo = false;
        public GenreService: FC.Modules.Genres.Services.GenreService;
        public ArtistService: FC.Modules.Artists.Services.ArtistService;
        public URLManSvc: FC.Core.Services.URLManagerService;
        public BannerService: FC.Modules.Banners.Services.BannerService;
        public Modal: any;
        public ArtistModal: any;
        public $sce;
        public MediaPickerSaveEvent: string;
        public $scope: VM.IArtistModalScope
        public vm;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            "FC.Modules.Theming.Services.ThemingService",
            "FC.Core.Services.LocalizationService",
            "FC.Core.Services.URLManagerService",
            "$sce",
            "FC.Modules.Genres.Services.GenreService",
            "FC.Modules.Artists.Services.ArtistService",
            'local',
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog:angular.material.MDDialogService,
            $scope,
            $route,
            $routeParams,
            $location,
            ThemingService: FC.Modules.Theming.Services.ThemingService,
            LocalizationService: FC.Core.Services.LocalizationService,
            UrlManagerService: FC.Core.Services.URLManagerService,
            $sce,
            GenreService: FC.Modules.Genres.Services.GenreService,
            ArtistsService: FC.Modules.Artists.Services.ArtistService,
            local: any[]
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
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
                vm.$scope.SelectedArtists = vm.$scope.MemReg.Get<Array<Models.ArtistListVM>>("SelectedArtists");
            } else {
                vm.$scope.SelectedArtists = new Array<Models.ArtistListVM>();
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
        public Close($scope: VM.IArtistModalScope) {
            $scope.MtModal.hide();
        }
        private AddListeners($scope: VM.IArtistModalScope): void {

            $scope = $scope.inst.$scope;
            window.addEventListener("ArtistGenrePickerSaved", function (e) {
                $scope.model.Genres = e["detail"].SelectedGenres;
                $scope.SaveFieldState($scope, 'Genres', $scope.model.Genres);
            });
            window.addEventListener("ArtistLogoSaved", function (e) {
                $scope.model.Image = e["detail"].MediaID;
                if ($scope.MediaIsObsolete($scope.model.Image)) {
                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=true&Width=50&MediaID=' + $scope.model.Image;
                } else {
                    $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&IsObsolete=false&Width=50&MediaID=' + $scope.model.Image;
                }
                $scope.SaveFieldState($scope, 'Image', $scope.model.Image);
                //model.Image = ....

            });
        }

        public ToggleSelected($scope: VM.IArtistModalScope, state: boolean): void {
            var $scope = $scope.inst.$scope;
            $scope.SelectedHidden = state;

        }
        public SaveArtist($scope: VM.IArtistModalScope) {

            $scope = $scope.inst.$scope;
            $scope.inst.ArtistService.Create($scope.model).then(function (r) {
                $scope.ServerMsg = r.Message;
                if (r.Data.SUCCESS == true) {
                    $scope.IsCreated = true;
                    $scope.IsCreating = false;
                    $scope.FinishForm($scope);
                } else {
                    $scope.IsCreated = false;
                    $scope.IsCreating = true;
                }
            }).catch(function (r) {
                
                $scope.IsCreated = false;
                $scope.IsCreating = true;
            });
        }

        public DoSaveEdit($scope: VM.IArtistModalScope) {

            $scope = $scope.inst.$scope;
            $scope.inst.ArtistService.Update($scope.model).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.IsEdited = true;
                    $scope.IsEditing = false;
                } else {
                    $scope.IsEditing = true;
                    $scope.IsEdited = false;
                }
                $scope.ServerMsg = r.Message;
            });
        }

        public DoCreateArtist($scope:VM.IArtistModalScope) {
            $scope = $scope.inst.$scope;
            $scope.model = {} as MODELS.UArtist;
            $scope.IsCreated = false;
            $scope.IsCreating = true;
            $scope.ServerMsg = null;
        }

        public DoEditArtist($scope: VM.IArtistModalScope, artist: Models.ArtistListVM) {

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
                    } else {
                        $scope.ArtistImagePath = FC.Core.Environment.MediaURLRoot + '/?action=getimg&Width=150&IsObsolete=false&MediaID=' + $scope.model.Image;
                    }
                }
                $scope.RecoverModel($scope.model, $scope);
            });
        }

        public DoDeleteArtist($scope: VM.IArtistModalScope, artist: MODELS.UArtist) {
            var vm = this;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.ArtistService, $scope).then(function (r) {

            });
        }

        public DoSaveDelete($scope: VM.IArtistModalScope) {
            $scope = $scope.inst.$scope;
            $scope.inst.ArtistService.Delete($scope.model).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = true;
                    $scope.ServerMsg = r.Message;
                    $scope.inst.Filter($scope);
                } else {
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = false;
                    $scope.ServerMsg = r.Message;
                }
            });
        }

        public DoSaveForceDelete($scope: VM.IArtistModalScope) {
            $scope = $scope.inst.$scope;
            $scope.inst.ArtistService.ForceDelete($scope.model).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = true;
                    $scope.ServerMsg = r.Message;
                    $scope.inst.Filter($scope);
                } else {
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = false;
                    $scope.ServerMsg = r.Message;
                }
            });
        }

        public Filter(scope): void {
            var vm = this;
            if (scope.ArtistSearchKey) {
                scope.ArtistSearchKey = scope.ArtistSearchKey.charAt(0).toUpperCase() + scope.ArtistSearchKey.slice(1);
                vm.$scope.SysArtists = vm.$scope.SelectedArtists;
                vm.ArtistService.GetSorted(scope.ArtistSearchKey).then(function (r: INT.IServiceResponse<Models.ArtistListVM[]>) {
                    vm.$scope.SysArtists = r.Data;
                });
            } else {
                vm.SetArtistList();
            }
        }

        public Deactivate($scope: VM.IArtistModalScope, artist: Models.ArtistListVM, saveEvt: string, model: Array<Models.ArtistListVM>): void {
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
        }

        public Activate($scope: VM.IArtistModalScope, artist: Models.ArtistListVM): void {
            $scope = $scope.inst.$scope;
            if (!$scope.SelectedArtists.some(function (v, i) {
                if (v.ArtistID == artist.ArtistID) {
                    return true;
                } else {
                    return false;
                }
            })) {
                $scope.SelectedArtists.push(artist);
            } else {
                var index = 0;
                var tmp =$scope.SelectedArtists;
                
                tmp.forEach(function (v, i) {
                    if (v.ArtistID == artist.ArtistID) {
                        delete $scope.SelectedArtists[index];
                    }
                    index++;
                });
                $scope.SelectedArtists = $scope.inst.RepairArray($scope.SelectedArtists);
            }
        }

        public IsActive($scope: VM.IArtistModalScope, artist: Models.ArtistListVM): boolean{
            var vm = this;
            if ($scope.SelectedArtists) {
                var existing = $scope.SelectedArtists.filter(function (v, k) {
                    if (v.ArtistID == artist.ArtistID) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (existing[0]) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }

        public SetArtistList(): void {
            var vm = this;
            //this.ArtistService.GetPaged(50, 1).then(function (r: INT.IServiceResponse<Models.ArtistListVM[]>) {
            //    vm.$scope.SysArtists = r.Data;
            //});
        }

        public SaveModal($scope: VM.IArtistModalScope) {
            $scope = $scope.inst.$scope;
            var evt = new CustomEvent($scope.SaveEventName, { "detail": $scope });
            window.dispatchEvent(evt);
            if ($scope.$dismiss) {
                $scope.$dismiss($scope.inst.Modal);
            }
        }

        public Cancel($scope) {
            var vm = this;
            $scope.$dismiss(vm.Modal);
        }

        //public OpenArtistPicker($scope: VM.IArtistModalScope, size, evt, model:Array<Models.ArtistListVM>): void {
        //    var vm = this;
        //    if (model) {
        //        if (model.length > 0) {
        //            vm.$scope.MemReg.Register("SelectedArtists", model);
        //        }
        //    }
        //    vm.$scope.MemReg.Register("ArtistPickerSaveEvt", evt);
        //    var opts: ng.material.MDDialogOptions = {};
        //    opts.controllerAs = 'vm';
        //    opts.controller =  FC.Modules.Artists.Controllers.ArtistModalController;
        //    opts.templateUrl = '/Scripts/Modules/Artists/Views/artist-modal.html';
        //    opts.locals = { local: [$scope.MtModal, $scope] },
        //    opts.parent = document.body;
        //    opts.clickOutsideToClose = true;

        //    $scope.MtModal.show(opts).then(function (answer) {
        //        //$scope.status = 'You said the information was "' + answer + '".';
        //    }, function () {
        //        // $scope.status = 'You cancelled the dialog.';
        //    });
        //}




    }
    ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistModalController", FC.Modules.Artists.Controllers.ArtistModalController);
}