///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Genres.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class GenrePickerController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Genres.Controllers.GenrePickerController;
        public $scope: VM.IGenrePickerScope;

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
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog,
            $scope,
            $route,
            $routeParams,
            $location,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
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
                vm.$scope.SelectedGenres = new Array<MODELS.UGenre>();
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
                vm.$scope.SelectedGenres = vm.$scope.MemReg.Get<Array<MODELS.UGenre>>("SelectedGenres");
            }

           
            this.RecoverModel(this.$scope.model, this.$scope);
            //vm.$scope.model = new FC.Shared.Models.UGenre();
        }

        public DoSearch($scope: VM.IGenrePickerScope): void {
            $scope = $scope.inst.$scope;
            $scope.SearchResult = $scope.SysGenres.filter(function (v) {
                return v.Name.substr(0, $scope.SearchKey.length).toLowerCase() == $scope.SearchKey.toLowerCase();
            });
            if (!$scope.model) {
                $scope.model = new FC.Shared.Models.UGenre();
            }
            $scope.model.Name = $scope.SearchKey;
        }
        public DoCancelSearch($scope: VM.IGenrePickerScope): void {
            $scope.SearchKey = '';
        }

        public Close($scope: VM.IGenrePickerScope) {
            $scope.MtModal.hide();
        }
        public ToggleSelected($scope: VM.IGenrePickerScope, state: boolean): void {
            var $scope =$scope.inst.$scope;
            $scope.SelectedHidden = state;
        }

        public DoCreate($scope: VM.IGenrePickerScope):void {
            $scope = $scope.inst.$scope;
            $scope.model = {} as MODELS.UGenre;
            if ($scope.SearchKey) {
                $scope.model.Name = $scope.SearchKey;
            }
            $scope.IsCreating = true;
        }

        public DoEdit($scope: VM.IGenrePickerScope, genre: MODELS.UGenre) {
            var $scope = $scope.inst.$scope;
            $scope.model = genre;
            $scope.IsEditing = true;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
        }

        public DoDelete($scope: VM.IGenrePickerScope, genre: MODELS.UGenre) {
            var $scope = $scope.inst.$scope;
            $scope.model = genre;
            $scope.ServerMsg = null;
            $scope.IsEditing = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = true;
        }

        public DoSaveEditGenre($scope: VM.IGenrePickerScope) {
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
                } else {
                    $scope.GenreModified = false
                    $scope.ServerMsg = r.Message;
                    $scope.IsEditing = true;
                    $scope.IsEdited = false;
                }
            });
        }

        public DoSaveDeleteGenre($scope: VM.IGenrePickerScope) {
            $scope = $scope.inst.$scope;
            $scope.inst.GenreService.Delete($scope.model).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.ServerMsg = r.Message;
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = true;
                } else {
                    $scope.ServerMsg = r.Message;
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = false;
                }
            });
        }

        public DoSaveForceDeleteGenre($scope: VM.IGenrePickerScope) {
            $scope = $scope.inst.$scope;
            $scope.inst.GenreService.ForceDelete($scope.model).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.ServerMsg = r.Message;
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = true;
                } else {
                    $scope.ServerMsg = r.Message;
                    $scope.IsDeleting = false;
                    $scope.IsDeleted = false;
                }
            });
        }

        public Filter(): void {
            var vm = this;
            if (vm.$scope.GenreSearchKey) {
                vm.$scope.GenreSearchKey = vm.$scope.GenreSearchKey.charAt(0).toUpperCase() + vm.$scope.GenreSearchKey.slice(1);
                vm.GenreService.Search(vm.$scope.GenreSearchKey).then(function (r: INT.IServiceResponse<MODELS.UGenre[]>) {
                    vm.$scope.SysGenres = r.Data;
                });
            } else {
                vm.SetGenreList();
            }
        }

        public Deactivate($scope: VM.IGenrePickerScope, genre: INT.IUGenre, saveEvt: string, model: Array<MODELS.UGenre>): void {
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
        }

        public Activate($scope: VM.IGenrePickerScope, genre: MODELS.UGenre, formID: string, saveEvt?:string): void {
            $scope = $scope.inst.$scope;
            if (!$scope.SelectedGenres.some(function (v, i) {
                if (v.GenreID == genre.GenreID) {
                    return true;
                } else {
                    return false;
                }
            })) {
                $scope.SelectedGenres.push(genre);
            } else {
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
        }

        public RegisterEvt(evt: string): void {
            var vm = this;
            vm.$scope.MemReg.Register("ModalGenreSaveEvent", evt);
        }

        public IsActive($scope: VM.IGenrePickerScope, genre: INT.IUGenre): boolean {
            var vm = this;

            var existing = $scope.SelectedGenres.filter(function (v, k) {

                if (v.GenreID == genre.GenreID) {
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

        public SetGenreList(): void {
            var vm = this;
            vm.GenreService.GetAllGenres().then(function (r: INT.IServiceResponse<MODELS.UGenre[]>) {
                vm.$scope.SysGenres = r.Data;
            });
        }

        public DoAddGenre($scope: VM.IGenrePickerScope) {
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
                } else {
                    $scope.IsCreated = false;
                    $scope.IsCreating = false;
                }
            });
        }

        public Cancel($scope:VM.IFormVMBase<MODELS.UGenre>) {
            var vm = this;
            $scope.MtModal.cancel();
        }

        public Save($scope: VM.IFormVMBase<MODELS.UGenre>): void {
            $scope = $scope.inst.$scope;
            var e = $scope.inst.MemReg.GetAny("ModalGenreSaveEvent");
            var evt = new CustomEvent(e, { "detail": $scope });
            window.dispatchEvent(evt);
            $scope.$dismiss($scope.inst.Modal);
            //todo dispose selected data...
        }

        //public OpenGenrePicker($scope: VM.IFormVMBase<MODELS.UGenre>, size, ModalSaveEvent, genres: FC.Shared.Interfaces.IUGenre[]): void {
        //    if (genres) {
        //        if (genres.length > 0) {
        //            $scope.MemReg.Register("SelectedGenres", genres);
        //        }
        //    }
        //    var vm = this;
        //    vm.RegisterEvt(ModalSaveEvent);
        //    var opts: ng.material.MDDialogOptions = {};
        //    opts.controller = FC.Modules.Genres.Controllers.GenrePickerController;
        //    opts.templateUrl = '/Scripts/Modules/Genres/Views/genre-picker-modal.html';
        //    opts.parent = document.body;
        //    opts.clickOutsideToClose = true;

        //    $scope.MtModal.show(opts).then(function (answer) {
        //        //$scope.status = 'You said the information was "' + answer + '".';
        //    }, function () {
        //        // $scope.status = 'You cancelled the dialog.';
        //    });
           
        //    //vm.SetDirectories();
        //}
    }
    GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenrePickerController", FC.Modules.Genres.Controllers.GenrePickerController);
}