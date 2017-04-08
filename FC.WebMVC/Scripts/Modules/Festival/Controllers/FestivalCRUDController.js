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
                    function FestivalCRUDController($http, $q, $scope, $routeParams, $location, $sce, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.inst = this;
                        this.$scope.SaveFormState = this.SaveFormState;
                        this.$location = $location;
                        this.$scope.model = new FC.Shared.Models.UFestival();
                        this.$scope.MtModal = $mdDialog;
                        this.$scope.Token = CacheManager.GetCookieValue("Token");
                        window.addEventListener("LogoImageSaved", function (e) {
                            vm.$scope.model.LogoID = e.detail;
                        });
                        window.addEventListener("HeaderImageSaved", function (e) {
                            vm.$scope.model.ProfileImageID = e.detail;
                        });
                    }
                    FestivalCRUDController.prototype.GetSelectedLogo = function () {
                        var vm = this;
                        window.addEventListener("ModalMediaSaveEvent", function (e) {
                            vm.$scope.model.LogoID = e.detail;
                        });
                        return vm.$scope.model.LogoID;
                    };
                    FestivalCRUDController.prototype.OpenLogoModal = function (dirID, validationWidth, validationHeight, isThumbnail) {
                        if (isThumbnail === void 0) { isThumbnail = false; }
                        var vm = this;
                        var opts = {};
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if (vm.$scope.MtModal) {
                            vm.$scope.MtModal.hide();
                        }
                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                        opts.locals = { local: [vm.$scope.MtModal, "LogoImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
                            opts.clickOutsideToClose = true;
                        vm.$scope.MtModal.show(opts);
                    };
                    FestivalCRUDController.prototype.OpenHeaderImageModal = function (dirID, validationWidth, validationHeight, isThumbnail) {
                        if (isThumbnail === void 0) { isThumbnail = false; }
                        var vm = this;
                        var opts = {};
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if (vm.$scope.MtModal) {
                            vm.$scope.MtModal.hide();
                        }
                        opts.controller = FC.Modules.Media.Controllers.MediaModalController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/media/views/media-modal.html';
                        opts.locals = { local: [vm.$scope.MtModal, "HeaderImageSaved", dirID, this.$scope.Token, validationWidth, validationHeight, isThumbnail] },
                            opts.clickOutsideToClose = true;
                        vm.$scope.MtModal.show(opts);
                    };
                    //public ActiveGenreID: number;
                    FestivalCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
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