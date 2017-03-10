var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Media.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Controllers;
            (function (Controllers) {
                var ENV = FC.Core.Environment;
                var MediaModalController = (function (_super) {
                    __extends(MediaModalController, _super);
                    function MediaModalController($http, $q, $scope, $route, $routeParams, $location, $uibModal, $mdDialog, MediaSvc, $sce, $local) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$sce = $sce;
                        vm.$sce.whiteListR;
                        vm.EventManager = FC.Shared.Util.EventManager.GetInstance();
                        vm.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        this.MediaSvc = MediaSvc;
                        this.$scope = $scope;
                        this.$scope.$local = $local;
                        this.Modal = $uibModal;
                        this.Crumb = new Array();
                        vm.$scope.Crumb = this.Crumb;
                        vm.$scope.RegisterEvt = vm.RegisterEvt;
                        vm.$scope.MemReg = this.MemReg;
                        vm.$scope.Activate = vm.Activate;
                        vm.$scope.inst = this;
                        vm.$scope.ActiveDir = null;
                        if ($local[2]) {
                            vm.$scope.DirectoryID = $local[2];
                        }
                        else {
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
                            vm.$scope.UserID = CacheManager.Get("UserID").data;
                        }
                        if (CacheManager.Contains("Token")) {
                            vm.$scope.Token = CacheManager.Get("Token").data;
                        }
                        //window.addEventListener("");
                        window.addEventListener("FCDataLoadingComplete", function (e) {
                            vm.$scope.inst.$scope.IsLoading = false;
                        });
                        window.addEventListener("MediaServiceFileUploaded", function (e) {
                            var state = e["detail"];
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
                            var currentNum = vm.MemReg.Get("PrevMediaCount") || 0;
                            if ($scope.ActiveDir) {
                                vm.MediaSvc.GetDirByID($scope.ActiveDir.DirectoryID).then(function (r) {
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
                            }
                            else {
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
                        }
                        else {
                            vm.$scope.IsAdvancedUpload = true;
                        }
                    }
                    MediaModalController.prototype.DoCreate = function ($scope) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsCreating = true;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsMediaItemCreating = false;
                        $scope.IsMediaDirDeleting = false;
                        $scope.IsMediaDirEditing = false;
                    };
                    MediaModalController.prototype.handleDroppedFiles = function ($scope, files, $form) {
                        var vm = this;
                        //TODO: This is not the way that we want but it works for now. Problem: when files is uploaded and there is a success/failure response from server. My scope seems not to be available.
                        $scope = $scope.inst.$scope;
                        if (!$scope.Token) {
                            //$scope.DoCancelCRUD($scope);
                            var state = new FC.Shared.ViewModels.RepositoryState();
                            state.MSG = "You are not authorized to upload images.";
                            var r = { Data: state, Message: "You are not authorized to upload images.", StatusCode: 500, Params: null };
                            window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", { 'detail': r }));
                        }
                        else {
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
                                    }
                                    else {
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
                    };
                    MediaModalController.prototype.initAdvancedUpload = function ($scope) {
                        var vm = this;
                        var droppedFiles = new Array();
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
                            $.each(tmp, function (k, v) {
                                droppedFiles.push(v);
                            });
                            if (droppedFiles != null && droppedFiles != undefined) {
                                if (droppedFiles.length > 0) {
                                    $scope.IsLoading = true;
                                    vm.handleDroppedFiles($scope, droppedFiles, $form);
                                    e.originalEvent["dataTransfer"]["files"] = null;
                                    droppedFiles = new Array();
                                }
                            }
                            return false;
                        });
                    };
                    MediaModalController.prototype.isAdvancedUpload = function () {
                        var div = document.createElement('div');
                        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
                    };
                    MediaModalController.prototype.ShortenFileName = function (name) {
                        var ext = name.split('.').reverse()[0];
                        var name = name.substr(0, 5) + "..." + ext;
                        return name;
                    };
                    MediaModalController.prototype.Repair = function (arr) {
                        var result = new Array();
                        arr.forEach(function (v, k) {
                            if (v.DirectoryID) {
                                result.push(v);
                            }
                        });
                        return result;
                    };
                    MediaModalController.prototype.GoBack = function ($scope, dir) {
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
                            }
                            else {
                                $scope.ShowFolderUp = false;
                            }
                        }
                    };
                    MediaModalController.prototype.Activate = function ($scope, dir) {
                        var vm = $scope.inst;
                        $scope = $scope.inst.$scope;
                        $scope.ActiveDir = dir;
                        if ($scope.Crumb.indexOf(dir) == -1) {
                            $scope.Crumb.push(dir);
                        }
                        if ($scope.Crumb.length > 1 && $scope.ActiveDir.DirectoryID != $scope.RootID) {
                            $scope.ShowFolderUp = true;
                        }
                        else {
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
                    };
                    MediaModalController.prototype.RegisterEvt = function (evt) {
                        var vm = this;
                        vm.MemReg.Register("ModalMediaSaveEvent", evt);
                    };
                    MediaModalController.prototype.Save = function ($scope) {
                        var evt = $scope.$local[1];
                        if (!evt) {
                            throw new Error("SaveEvent not defined for media browser.");
                        }
                        window.dispatchEvent(new CustomEvent(evt, { "detail": $scope.SelectedMediaItem.MediaID }));
                        $scope.MtModal.cancel();
                    };
                    MediaModalController.prototype.Close = function ($scope) {
                        var vm = this;
                        $scope.$dismiss(vm.Modal);
                    };
                    MediaModalController.prototype.ActivateMediaItem = function ($scope, item) {
                        $scope = $scope.inst.$scope;
                        $scope.SelectedMediaItem = item;
                    };
                    MediaModalController.prototype.SetDirectories = function ($scope) {
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
                                }
                                else {
                                    vm.$scope.ShowFolderUp = true;
                                }
                                vm.initAdvancedUpload($scope);
                            });
                        }
                    };
                    MediaModalController.prototype.GetChildren = function ($scope, id) {
                        $scope.inst.CheckAuth($scope);
                        var vm = $scope.inst;
                        vm.$scope.Directories = new Array();
                        vm.$scope.MediaLoading = true;
                        vm.MediaSvc.GetDirByID(id).then(function (r) {
                            $scope.ActiveDir = r.Data;
                        });
                    };
                    MediaModalController.prototype.DoSubmit = function () {
                        $("#MediaModalForm").submit();
                    };
                    MediaModalController.prototype.DoCancelCRUD = function ($scope) {
                        _super.prototype.DoCancelCRUD.call(this, $scope);
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
                    };
                    MediaModalController.prototype.DoDeleteMediaDir = function ($scope, dir, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = true;
                        $scope.DirectoryModel = dir;
                    };
                    MediaModalController.prototype.DoSaveDeleteMediaDir = function ($scope, dir, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.inst.MediaSvc.DeleteMediaDir(dir).then(function (r) {
                            if (r.Data.SUCCESS == true) {
                                $scope.IsMediaDirDeleted = true;
                                $scope.IsMediaDirDeleting = false;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            else {
                                $scope.IsMediaDirDeleting = true;
                                $scope.IsMediaDirDeleted == false;
                                $scope.ServerMsg = r.Data.MSG;
                            }
                            $scope.inst.SetDirectories($scope);
                        });
                    };
                    MediaModalController.prototype.DoDeleteMediaItem = function ($scope, media, force) {
                        if (force === void 0) { force = false; }
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.FileModel = media;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = true;
                        $scope.IsMediaItemDeleting = true;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                    };
                    MediaModalController.prototype.DoSaveDelete = function ($scope, media, force) {
                        if (force === void 0) { force = false; }
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
                                            $scope.IsCreating = false;
                                            $scope.ServerMsg = state.Data.MSG;
                                            $scope.IsDeleting = false;
                                            $scope.IsEditing = false;
                                            $scope.IsMediaDirEditing = false;
                                            $scope.IsMediaDirDeleting = false;
                                            $scope.IsMediaItemDeleted = true;
                                        }
                                        else {
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
                            }
                            else {
                                throw new Error("Force delete is not implemented yet.");
                            }
                        }
                    };
                    MediaModalController.prototype.DoCreateMediaItem = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        var vm = this;
                        $scope = $scope.inst.$scope;
                        $scope.model = {};
                        var dirName = dir.Name;
                        $scope.model["DirectoryID"] = $scope.DirectoryID;
                        $("#fileUploader").trigger('click');
                        $("#fileUploader").change(this.DoSubmit);
                    };
                    MediaModalController.prototype.DoSaveCreate = function ($scope, media) {
                        throw new Error("MediaModalController::DoSaveCreate is not implemented");
                    };
                    MediaModalController.prototype.DoEditMediaDir = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsEditing = true;
                        $scope.IsMediaDirEditing = true;
                        $scope.IsMediaDirDeleting = false;
                        $scope.DirectoryModel = dir;
                    };
                    MediaModalController.prototype.DoSaveEditMediaDir = function ($scope, dir) {
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
                            }
                            else {
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
                    };
                    MediaModalController.prototype.DoCreateMediaDir = function ($scope, dirID) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.IsMediaDirCreating = true;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsEditing = false;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                    };
                    MediaModalController.prototype.DoSaveCreateMediaDir = function ($scope, dir) {
                        $scope.inst.CheckAuth($scope);
                        $scope = $scope.inst.$scope;
                        $scope.DirectoryModel = dir;
                        $scope.IsMediaDirCreating = false;
                        $scope.IsCreating = false;
                        $scope.IsDeleting = false;
                        $scope.IsMediaDirEditing = false;
                        $scope.IsMediaDirDeleting = false;
                        var msg = new FC.Shared.ServiceMessages.MediaDirectoryMsg();
                        var recoveredUserID = CacheManager.Get("UserID");
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
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsMediaDirCreated = false;
                                }
                            });
                        }
                    };
                    MediaModalController.$inject = [
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
                    return MediaModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MediaModalController = MediaModalController;
            })(Controllers = Media.Controllers || (Media.Controllers = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
MediaModule.GetApplication().RegisterController("FC.Modules.Media.Controllers.MediaModalController", FC.Modules.Media.Controllers.MediaModalController);
//# sourceMappingURL=MediaModalController.js.map