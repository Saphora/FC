///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Media.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Media.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import ENV = FC.Core.Environment;
    import VM = FC.Shared.ViewModels;
    export class MediaModalController extends FC.Shared.Controllers.BaseController {
        private MediaSvc: FC.Modules.Media.Services.MediaService;
        private EventManager: FC.Shared.Util.EventManager;
        private MemReg: FC.Shared.Util.MemReg;
        public Modal: any;
        public MediaModal: any;
        public ShowMore: number;
        public $scope: FC.Shared.ViewModels.IMediaModalScope;
        public Crumb: Array<INT.IMediaDirectory>;
        public MediaPickerSaveEvt: string;
        private $sce: any;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$uibModal',
            '$mdDialog',
            'FC.Modules.Media.Services.MediaService',
            '$sce',
            'local',
        ];
        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $uibModal,
            $mdDialog,
            MediaSvc: FC.Modules.Media.Services.MediaService,
            $sce: any,
            $local: any
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$sce = $sce;
            
            vm.$sce.whiteListR
            vm.EventManager = FC.Shared.Util.EventManager.GetInstance();
            vm.MemReg = FC.Shared.Util.MemReg.GetInstance();
            this.MediaSvc = MediaSvc;
            this.$scope = $scope as FC.Shared.ViewModels.IMediaModalScope;
            this.$scope.$local = $local;
            this.Modal = $uibModal;
            this.Crumb = new Array<INT.IMediaDirectory>();

            vm.$scope.Crumb = this.Crumb;
            vm.$scope.RegisterEvt = vm.RegisterEvt;
            vm.$scope.MemReg = this.MemReg;
            vm.$scope.Activate = vm.Activate;

            vm.$scope.inst = this;
            vm.$scope.ActiveDir = null;
            if ($local[2]) {
                vm.$scope.DirectoryID = $local[2];
            } else {
                throw new Error("No directory id is defined.");
            }
            vm.$scope.DoEditMediaDir = this.DoEditMediaDir;
            vm.$scope.DoSaveEditMediaDir = this.DoSaveEditMediaDir;
            vm.$scope.DoDeleteMediaDir = this.DoDeleteMediaDir;
            vm.$scope.DoDeleteMediaItem = this.DoDeleteMediaItem;
            vm.$scope.DoCreateMediaItem = this.DoCreateMediaItem;
            vm.$scope.DoCreateMediaDir = this.DoCreateMediaDir;
            vm.$scope.DoSaveCreateMediaDir = this.DoSaveCreateMediaDir;
            vm.$scope.DoSaveCreate = this.DoSaveCreate;
            vm.$scope.DoSaveDeleteMediaDir = this.DoSaveDeleteMediaDir;
            vm.$scope.DoSaveDelete = this.DoSaveDelete;
            vm.$scope.DoCancelCRUD = this.DoCancelCRUD;
            vm.$scope.GoBack = this.GoBack;
            vm.$scope.DoCreate = this.DoCreate;
            vm.$scope.IsMediaDirCreating = false;
            vm.$scope.IsCreating = false;
            vm.$scope.IsDeleting = false;
            vm.$scope.IsMediaDirEditing = false;
            vm.$scope.IsLoading = true;
            vm.$scope.IsMediaDirDeleting = false;
            vm.$scope.DoSubmit = this.DoSubmit;
            vm.$scope.Close = this.Close;
            vm.$scope.GetChildren = vm.GetChildren;
            vm.$scope.URLRoot = ENV.MediaURLRoot;
            vm.$scope.ShortenFileName = vm.ShortenFileName;
            vm.$scope.ActivateMediaItem = vm.ActivateMediaItem;
            vm.SetDirectories($scope);
            vm.initAdvancedUpload($scope.inst.$scope);
            if (!vm.$scope.inst.AuthService.HasAuth(FC.Shared.Enum.Roles.GetAdmins())) {
                vm.$scope.IsMediaDirCreating = false;
                vm.$scope.IsCreating = false;
                vm.$scope.IsDeleting = false;
                vm.$scope.IsMediaDirEditing = false;
                vm.$scope.IsMediaDirDeleting = false;
                vm.$scope.ActiveDir = null;
                vm.$scope.ServerMsg = "You are not authorized to view this section.";
            }
            if (CacheManager.Contains("UserID")) {
                vm.$scope.UserID = CacheManager.Get<string>("UserID").data;
            }
            if (CacheManager.Contains("Token")) {
                vm.$scope.Token = CacheManager.Get<string>("Token").data;
            }
            //window.addEventListener("");
            window.addEventListener("FCDataLoadingComplete", function (e) {
                vm.$scope.inst.$scope.IsLoading = false;
            });
            window.addEventListener("MediaServiceFileUploaded", function (e) {
                var state: INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState> = e["detail"] as INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>;
                //vm.$scope = vm.$scope.inst.$scope;
                //vm.$scope.ServerMsg = state.Data.MSG;
                //vm.$scope.IsMediaItemCreated = true;
                //vm.$scope.IsLoading = true;

                //vm.MediaSvc.GetDirByID(vm.$scope.ActiveDir.DirectoryID).then(function (r) {
                //    vm.$scope.ActiveDir = r.Data;
                //    vm.$scope.IsLoading = false;
                //    if (state.Data.SUCCESS==true) {
                //        vm.$scope.DoCancelCRUD($scope);
                //        vm.$scope.IsMediaDirCreating = false;
                //        vm.$scope.IsCreating = false;
                //        vm.$scope.IsDeleting = false;
                //        vm.$scope.IsEditing = false;
                //        vm.$scope.IsMediaDirEditing = false;
                //        vm.$scope.IsMediaDirDeleting = false;
                //    } else {
                //        vm.$scope.IsMediaItemCreated = false;
                //        vm.$scope.IsMediaDirCreating = false;
                //        vm.$scope.IsCreating = false;
                //        vm.$scope.IsDeleting = false;
                //        vm.$scope.IsEditing = false;
                //        vm.$scope.IsMediaDirEditing = false;
                //        vm.$scope.IsMediaDirDeleting = false;
                //    }
                //});
            });

            window.addEventListener("iframeSrcChanged", function () {
                vm.SetDirectories($scope);
                var currentNum = vm.MemReg.Get<number>("PrevMediaCount") || 0;
                if ($scope.ActiveDir) {
                    vm.MediaSvc.GetDirByID($scope.ActiveDir.DirectoryID).then(function (r: INT.IServiceResponse<INT.IMediaDirectory>) {
                        vm.$scope.ActiveDir = r.Data;
                        vm.$scope.IsLoading = false;
                    });
                }
            });
            vm.MediaSvc.GetDirByID(vm.$scope.DirectoryID).then(function (r) {
                vm.$scope.ActiveDir = r.Data;
                vm.$scope.IsLoading = false;

                if (vm.$scope.ActiveDir.DirectoryID == vm.$scope.RootID) {
                    vm.$scope.ShowFolderUp = false;
                } else {
                    vm.$scope.ShowFolderUp = true;
                }
            });

            $scope.getUploadURL = function () {
                var url = vm.$sce.trustAsResourceUrl(FC.Core.Environment.MediaURLRoot + "/API/Media/Upload?dirID=" + vm.$scope.DirectoryID + "&width=0&height=0&thumb=false&Token=" + vm.$scope.Token);
                return url;
            };
            vm.$scope.Save = vm.Save;
            if (!vm.isAdvancedUpload()) {
                vm.$scope.IsAdvancedUpload = false;
            } else {

                vm.$scope.IsAdvancedUpload = true;
            }
        }

        public DoCreate($scope: VM.IMediaModalScope) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.IsCreating = true;
            $scope.IsMediaDirCreating = false;
            $scope.IsMediaItemCreating = false;
            $scope.IsMediaDirDeleting = false;
            $scope.IsMediaDirEditing = false;
        }

        public handleDroppedFiles($scope: VM.IMediaModalScope, files: Array<File>, $form: any): void {
            var vm = this;
            //TODO: This is not the way that we want but it works for now. Problem: when files is uploaded and there is a success/failure response from server. My scope seems not to be available.
            $scope = $scope.inst.$scope;
            if (!$scope.Token) {
                //$scope.DoCancelCRUD($scope);
                var state = new FC.Shared.ViewModels.RepositoryState();
                state.MSG = "You are not authorized to upload images.";
                var r: INT.IServiceResponse<VM.RepositoryState> = { Data: state, Message: "You are not authorized to upload images.", StatusCode: 500, Params: null };
                window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", { 'detail': r }));
            } else {
                this.MediaSvc.UploadFiles(files, vm.$scope.ActiveDir.DirectoryID, vm.$scope.Token).then(function (state) {
                    vm.$scope = vm.$scope.inst.$scope;
                    vm.$scope.ServerMsg = state.Data.MSG;
                    vm.$scope.IsMediaItemCreated = true;
                    vm.$scope.IsLoading = true;

                    vm.MediaSvc.GetDirByID(vm.$scope.ActiveDir.DirectoryID).then(function (r) {
                        vm.$scope.ActiveDir = r.Data;
                        vm.$scope.IsLoading = false;
                        if (state.Data.SUCCESS == true) {
                            vm.$scope.DoCancelCRUD($scope);
                            vm.$scope.IsMediaDirCreating = false;
                            vm.$scope.IsCreating = false;
                            vm.$scope.IsDeleting = false;
                            vm.$scope.IsEditing = false;
                            vm.$scope.IsMediaDirEditing = false;
                            vm.$scope.IsMediaDirDeleting = false;
                        } else {
                            vm.$scope.IsMediaItemCreated = false;
                            vm.$scope.IsMediaDirCreating = false;
                            vm.$scope.IsCreating = false;
                            vm.$scope.IsDeleting = false;
                            vm.$scope.IsEditing = false;
                            vm.$scope.IsMediaDirEditing = false;
                            vm.$scope.IsMediaDirDeleting = false;
                        }
                    });
                });
            }
        }
        public initAdvancedUpload($scope: VM.IMediaModalScope) {
            var vm = this;
            var droppedFiles: Array<File> = new Array<File>();
            var $form = $('.dropzone');
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            })
                .on('dragover dragenter', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $form.addClass('is-dragover');
                    return false;
                })
                .on('dragleave dragend drop', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $form.removeClass('is-dragover');
                    return false;
                }).on('drop', function (e) {

                    e.stopPropagation();
                    e.preventDefault();
                    $form.trigger('submit');
                    var tmp = e.originalEvent["dataTransfer"]["files"];

                    $.each(tmp, function (k, v: File) {
                        droppedFiles.push(v);
                    });
                    if (droppedFiles != null && droppedFiles != undefined) {
                        if (droppedFiles.length > 0) {
                            $scope.IsLoading = true;
                            vm.handleDroppedFiles($scope, droppedFiles, $form);
                            e.originalEvent["dataTransfer"]["files"] = null
                            droppedFiles = new Array<File>();
                        }
                    }

                    return false;
                });
        }
        public isAdvancedUpload() {
            var div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        }

        public ShortenFileName(name: string): string {
            var ext = name.split('.').reverse()[0];
            var name = name.substr(0, 5) + "..." + ext;
            return name;
        }
        private Repair(arr: INT.IMediaDirectory[]): INT.IMediaDirectory[] {
            var result = new Array<INT.IMediaDirectory>();
            arr.forEach(function (v, k) {
                if (v.DirectoryID) {
                    result.push(v);
                }
            });
            return result;
        }

        public GoBack($scope: VM.IMediaModalScope, dir: INT.IMediaDirectory): void {
            $scope = $scope.inst.$scope;
            var index = $scope.Crumb.length - 2;
            var lastIndex = $scope.Crumb.length - 1;
            if (index > -1) {
                $scope.ActiveDir = $scope.Crumb[index];
                if ($scope.Crumb[lastIndex]) {
                    delete $scope.Crumb[lastIndex];
                }
                $scope.Crumb = $scope.RepairArray($scope.Crumb);
                if ($scope.Crumb.length > 1 && $scope.ActiveDir.DirectoryID != $scope.RootID) {
                    $scope.ShowFolderUp = true;
                } else {
                    $scope.ShowFolderUp = false;
                }
            }
        }

        public Activate($scope: VM.IMediaModalScope, dir: INT.IMediaDirectory): void {
            var vm = $scope.inst;
            $scope = $scope.inst.$scope;
            $scope.ActiveDir = dir;
            if ($scope.Crumb.indexOf(dir) == -1) {
                $scope.Crumb.push(dir);
            }
            if ($scope.Crumb.length > 1 && $scope.ActiveDir.DirectoryID != $scope.RootID) {
                $scope.ShowFolderUp = true;
            } else {
                $scope.ShowFolderUp = false;
            }
            vm.SetDirectories($scope);
            //vm.MediaSvc.GetDirByID(dir.DirectoryID).then(function (r) {
            //    vm.$scope.ActiveDir = dir;
            //    vm.initAdvancedUpload($scope);
            //    $scope.IsLoading = false;
            //    if (vm.$scope.ActiveDir.DirectoryID == vm.$scope.RootID) {
            //        vm.$scope.ShowFolderUp = false;
            //    } else {
            //        vm.$scope.ShowFolderUp = true;
            //    }
            //});

        }

        public RegisterEvt(evt: string): void {
            var vm = this;
            vm.MemReg.Register("ModalMediaSaveEvent", evt);

        }
        public Save($scope: FC.Shared.ViewModels.IMediaModalScope) {
            var evt = $scope.$local[1];
            if (!evt) {
                throw new Error("SaveEvent not defined for media browser.");
            }
            window.dispatchEvent(new CustomEvent(evt as string, { "detail": $scope.SelectedMediaItem.MediaID }));
            $scope.MtModal.cancel();
        }

        public Close($scope) {
            var vm = this;
            $scope.$dismiss(vm.Modal);
        }
        public ActivateMediaItem($scope: VM.IMediaModalScope, item: INT.IMedia): void {
            $scope = $scope.inst.$scope;
            $scope.SelectedMediaItem = item;
        }

        public SetDirectories($scope: VM.IMediaModalScope): void {

            var rootDir = $scope.RootID;
            if ($scope.ActiveDir) {
                rootDir = $scope.ActiveDir.DirectoryID;
            }
            var vm = this;
            if (rootDir) {
                this.MediaSvc.GetDirByID(rootDir).then(function (r) {
                    $scope.IsLoading = false;
                    $scope.ActiveDir = r.Data;
                    if ($scope.Crumb.length == 0) {
                        $scope.Crumb[0] = $scope.ActiveDir;
                    }
                    vm.$scope.RootDir = $scope.ActiveDir;
                    // vm.$scope.Crumb.push($scope.ActiveDir);
                    if (vm.$scope.ActiveDir.DirectoryID == vm.$scope.RootID) {
                        vm.$scope.ShowFolderUp = false;
                    } else {
                        vm.$scope.ShowFolderUp = true;
                    }
                    vm.initAdvancedUpload($scope);
                });
            }
        }


        public GetChildren($scope: VM.IMediaModalScope, id: string): void {
            $scope.inst.CheckAuth($scope);
            var vm = $scope.inst;
            vm.$scope.Directories = new Array<INT.IMediaDirectory>()
            vm.$scope.MediaLoading = true;
            vm.MediaSvc.GetDirByID(id).then(function (r: INT.IServiceResponse<INT.IMediaDirectory>) {
                $scope.ActiveDir = r.Data;
            });

        }
        public DoSubmit() {
            $("#MediaModalForm").submit();
        }
        public DoCancelCRUD($scope: VM.IMediaModalScope) {
            super.DoCancelCRUD($scope);
            $scope = $scope.inst.$scope;
            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsMediaItemCreating = false;
            $scope.IsMediaItemDeleting = false;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = false;
            $scope.IsEditing = false;
            $scope.SelectedMediaItem = null;

        }

        public DoDeleteMediaDir($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory, force: boolean = false) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = true;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = true;
            $scope.DirectoryModel = dir;
        }


        public DoSaveDeleteMediaDir($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory, force: boolean = false) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;

            $scope.inst.MediaSvc.DeleteMediaDir(dir).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.IsMediaDirDeleted = true;
                    $scope.IsMediaDirDeleting = false;
                    $scope.ServerMsg = r.Data.MSG;
                } else {
                    $scope.IsMediaDirDeleting = true;
                    $scope.IsMediaDirDeleted == false;
                    $scope.ServerMsg = r.Data.MSG;
                }
                $scope.inst.SetDirectories($scope);
            });
        }

        public DoDeleteMediaItem($scope: VM.IMediaModalScope, media: MODELS.Media, force: boolean = false) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.FileModel = media;
            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = true;
            $scope.IsMediaItemDeleting = true;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = false;
        }

        public DoSaveDelete($scope: VM.IMediaModalScope, media: MODELS.Media, force: boolean = false) {
            $scope.inst.CheckAuth($scope);
            var vm = this;
            $scope = $scope.inst.$scope;
            if ($scope.FileModel) {
                if (!force) {
                    $scope.inst.MediaSvc.DeleteMedia(media).then(function (state) {
                        $scope.inst.MediaSvc.GetDirByID(media.DirectoryID).then(function (r2) {
                            $scope.ActiveDir = r2.Data;
                            $scope.IsLoading = false;
                            if (state.Data.SUCCESS == true) {
                                $scope.DoCancelCRUD($scope);
                                $scope.IsMediaDirCreating = false;
                                $scope.IsCreating = false
                                $scope.ServerMsg = state.Data.MSG;
                                $scope.IsDeleting = false;
                                $scope.IsEditing = false;
                                $scope.IsMediaDirEditing = false;
                                $scope.IsMediaDirDeleting = false;
                                $scope.IsMediaItemDeleted = true;
                            } else {
                                $scope.IsMediaItemCreated = false;
                                $scope.IsMediaDirCreating = false;
                                $scope.IsCreating = false;
                                $scope.IsDeleting = false;
                                $scope.IsEditing = false;
                                $scope.ServerMsg = state.Data.MSG;
                                $scope.IsMediaDirEditing = false;
                                $scope.IsMediaDirDeleting = false;
                            }
                        });
                    });
                } else {
                    throw new Error("Force delete is not implemented yet.");
                }
            }
        }

        public DoCreateMediaItem($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory) {
            $scope.inst.CheckAuth($scope);
            var vm = this;
            $scope = $scope.inst.$scope;
            $scope.model = {};
            var dirName = dir.Name;

            $scope.model["DirectoryID"] = $scope.DirectoryID;
            $("#fileUploader").trigger('click');
            $("#fileUploader").change(this.DoSubmit);
           
        }

        public DoSaveCreate($scope: VM.IMediaModalScope, media: FC.Shared.Models.Media) {
            throw new Error("MediaModalController::DoSaveCreate is not implemented");
        }

        public DoEditMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsEditing = true;
            $scope.IsMediaDirEditing = true;
            $scope.IsMediaDirDeleting = false;
            $scope.DirectoryModel = dir;
        }

        public DoSaveEditMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;

            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsEditing = true;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = false;
            $scope.inst.MediaSvc.EditMediaDir(dir).then(function (r) {
                if (r.Data.SUCCESS == true) {
                    $scope.IsMediaDirModified = true;
                    $scope.ServerMsg = r.Data.MSG;
                } else {
                    $scope.IsMediaDirModified = false;
                    $scope.ServerMsg = r.Data.MSG;
                }
                $scope.inst.SetDirectories($scope);

                $scope.IsMediaDirCreating = false;
                $scope.IsCreating = false;
                $scope.IsDeleting = false;
                $scope.IsEditing = false;
                $scope.IsMediaDirEditing = false;
                $scope.IsMediaDirDeleting = false;
            });


        }

        public DoCreateMediaDir($scope: VM.IMediaModalScope, dirID: string) {

            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.IsMediaDirCreating = true;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsEditing = false;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = false;
        }

        public DoSaveCreateMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory) {
            $scope.inst.CheckAuth($scope);
            $scope = $scope.inst.$scope;
            $scope.DirectoryModel = dir;
            $scope.IsMediaDirCreating = false;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsMediaDirEditing = false;
            $scope.IsMediaDirDeleting = false;
            var msg = new FC.Shared.ServiceMessages.MediaDirectoryMsg();
            var recoveredUserID = CacheManager.Get<string>("UserID");
            if (recoveredUserID) {

                msg.Author = recoveredUserID.data;
                msg.DirectoryName = dir.Name;
                msg.ParentID = $scope.ActiveDir.DirectoryID;

                $scope.inst.MediaSvc.CreateDirectory(msg).then(function (r) {

                    if (r.Data.SUCCESS == true) {
                        $scope.ServerMsg = r.Data.MSG;
                        $scope.IsCreating = false;
                        $scope.IsEditing = false;
                        $scope.IsDeleting = false;
                        $scope.IsMediaDirCreated = true;
                    } else {
                        $scope.ServerMsg = r.Data.MSG;
                        $scope.IsMediaDirCreated = false;
                    }
                });
            }
        }
    }
}
MediaModule.GetApplication().RegisterController("FC.Modules.Media.Controllers.MediaModalController", FC.Modules.Media.Controllers.MediaModalController);