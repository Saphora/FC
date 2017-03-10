///<reference path="../../Modules/Core/AppConfig.ts" />
///<reference path="../Util/CacheManager.ts"/>
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Controllers;
        (function (Controllers) {
            var ENV = FC.Core.Environment;
            (function (ServiceType) {
                ServiceType[ServiceType["ArtistService"] = 0] = "ArtistService";
                ServiceType[ServiceType["FestivalService"] = 1] = "FestivalService";
                ServiceType[ServiceType["LocationService"] = 2] = "LocationService";
                ServiceType[ServiceType["GenreService"] = 3] = "GenreService";
                ServiceType[ServiceType["TicketService"] = 4] = "TicketService";
                ServiceType[ServiceType["ResellerService"] = 5] = "ResellerService";
                ServiceType[ServiceType["NewsService"] = 6] = "NewsService";
                ServiceType[ServiceType["ReportsService"] = 7] = "ReportsService";
                ServiceType[ServiceType["CountryService"] = 8] = "CountryService";
                ServiceType[ServiceType["AuthService"] = 9] = "AuthService";
                ServiceType[ServiceType["ApplicationUserService"] = 10] = "ApplicationUserService";
                ServiceType[ServiceType["MenuSectionService"] = 11] = "MenuSectionService";
                ServiceType[ServiceType["MenuItemService"] = 12] = "MenuItemService";
                ServiceType[ServiceType["SocialService"] = 13] = "SocialService";
                ServiceType[ServiceType["RoleService"] = 14] = "RoleService";
            })(Controllers.ServiceType || (Controllers.ServiceType = {}));
            var ServiceType = Controllers.ServiceType;
            (function (ActionType) {
                ActionType[ActionType["GetListBy"] = 0] = "GetListBy";
                ActionType[ActionType["GetList"] = 1] = "GetList";
                ActionType[ActionType["Create"] = 2] = "Create";
                ActionType[ActionType["Read"] = 3] = "Read";
                ActionType[ActionType["Update"] = 4] = "Update";
                ActionType[ActionType["Delete"] = 5] = "Delete";
                ActionType[ActionType["ForceDelete"] = 6] = "ForceDelete";
            })(Controllers.ActionType || (Controllers.ActionType = {}));
            var ActionType = Controllers.ActionType;
            var META = (function () {
                function META() {
                }
                return META;
            }());
            Controllers.META = META;
            var BaseController = (function () {
                function BaseController($http, $q, $scope, $location, $routeParams, $mdDialog) {
                    this.BaseIsLoading = true;
                    this.HtmlSafe = function ($sce, data) {
                        var vm = this;
                        return $sce.trustAsHtml(data);
                    };
                    this._detectCount = 0;
                    this._timeout = null;
                    var vm = this;
                    this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                    this.IsUpdated();
                    this.$scope = $scope;
                    this.$scope.inst = this;
                    this.$scope.Now = new Date();
                    this.$http = $http;
                    this.$q = $q;
                    this.$scope.$q = $q;
                    this.$scope['CONFIRMATION'] = FC.Core.Controllers.CONFIRMATION;
                    if ($routeParams["page"]) {
                        this.SetPageNum(parseInt($routeParams["page"]));
                    }
                    else {
                        this.SetPageNum(1);
                    }
                    if ($routeParams["year"]) {
                        this.$scope.ActiveYear = $routeParams["year"];
                    }
                    else {
                        this.$scope.ActiveYear = new Date().getFullYear();
                    }
                    if ($routeParams["month"]) {
                        this.$scope.ActiveMonth = $routeParams["month"];
                    }
                    else {
                        this.$scope.ActiveMonth = new Date().getMonth() + 1;
                    }
                    this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                    this.CountriesSvc = new FC.Modules.Countries.Services.CountriesService($http, $q);
                    this.GeoIPSvc = new FC.Core.Services.GeoIPService($http, $q);
                    this.AuthService = new FC.Core.Services.AuthService($http, $q);
                    this.FestivalService = new FC.Modules.Festival.Services.FestivalService($http, $q);
                    this.LocationService = new FC.Modules.Location.Services.LocationService($http, $q);
                    this.ArtistService = new FC.Modules.Artists.Services.ArtistService($http, $q);
                    this.NewsService = new FC.Modules.News.Services.NewsService($http, $q);
                    this.FavoriteService = new FC.Modules.Favorites.Services.FavoriteService($http, $q);
                    this.GeonamesService = new FC.Modules.Location.Services.GeonamesService($http, $q);
                    this.MenuSectionService = new FC.Modules.Menu.Services.MenuSectionService($http, $q);
                    this.MenuItemService = new FC.Modules.Menu.Services.MenuItemService($http, $q);
                    this.RoleService = new FC.Core.Services.RolesService($http, $q);
                    //public ReportsService: FC.Modules.Report.Services.ReportsService;
                    this.$location = $location;
                    this.$routeParams = $routeParams;
                    this.$inst = this;
                    this.$scope.IsLoading = true;
                    this.$scope.MEDIA_ROOT_ID = FC.Core.Environment.MEDIA_ROOT_ID;
                    this.$scope.ENV = FC.Core.Environment;
                    //avoid multiple calls to API. this is caused by inheriting from basecontroller.
                    this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                    this.$scope.MediaIsObsolete = this.MediaIsObsolete;
                    this.$scope.FormatDate = this.FormatDate;
                    this.$scope.RecoverModel = this.RecoverModel;
                    this.$scope.GetFieldState = this.GetFieldState;
                    this.$scope.SaveFieldState = this.SaveFieldState;
                    this.$scope.SaveFormState = this.SaveFormState;
                    this.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                    this.$scope.RepairArray = this.RepairArray;
                    this.$scope.FinishForm = this.FinishForm;
                    this.$scope.DoCancelCRUD = this.DoCancelCRUD;
                    CONFIG = new FC.Core.AppConfig();
                    this.initLoadingScope();
                    this.SetCountryCache();
                    this.SetUserYearAndMonth();
                    this.SetGenreData();
                    this.SetPageNum($routeParams['page']);
                    this.RuleRegister = new Array();
                    this.DoAddSaveListener(null);
                    this.$scope.TinymceOptions = {
                        plugins: 'link image code, media',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    };
                    this.$scope.META = new META();
                    this.$scope.META.PageTitle = "Discover the most amazing festivals! BETA 1.0";
                    this.$scope.META.PageKeys = "Festival, Artists, Calendar, Agenda, EDM, Dance, Hardcore, Hardrock, metal, festivals, overview, oversight";
                    this.$scope.META.PageDesc = "Festival Calendar is THE most complete guide for your Festival, with news, updates, and many more!";
                    this.$scope.META.PageIMG = "";
                    window.addEventListener("FCDataLoadingComplete", function (e) {
                        vm.$scope.IsLoading = false;
                    });
                }
                BaseController.prototype.initLoadingScope = function () {
                    var vm = this;
                    vm.$scope.IsThemesLoading = true;
                    vm.$scope.IsCountriesLoading = true;
                    vm.$scope.IsGenresLoading = true;
                    vm.$scope.IsFestivalsLoading = true;
                };
                BaseController.prototype.AddValidationRule = function (rule) {
                    this.RuleRegister.push(rule);
                };
                BaseController.prototype.SetPageKey = function (pageKey) {
                    var vm = this;
                    debugger;
                    vm.$scope.inst.$scope.PageKey = pageKey;
                };
                /**
                 * @param modelPropertyName this is the key of the model. model[modelKey].
                 */
                BaseController.prototype.DoValidate = function (modelPropertyName) {
                    if (modelPropertyName === void 0) { modelPropertyName = null; }
                    var vm = this;
                    var model = vm.$scope.model;
                    if (modelPropertyName) {
                        model = vm.$scope[modelPropertyName];
                    }
                    vm.$scope.ModelIsValid = true;
                    this.RuleRegister.forEach(function (v, index) {
                        var msgEl = $('<span class="invalid-msg" id="invalid_' + v.FieldName + '"></span>');
                        var regex = new RegExp(v.Rule.Regex, "g");
                        var fieldName = "";
                        if (v.FieldLabel) {
                            fieldName = v.FieldLabel;
                        }
                        else {
                            fieldName = v.FieldName;
                        }
                        if ($("#" + v.FieldName).hasClass('ng-dirty') || $("#" + v.FieldName).hasClass('ng-untouched')) {
                            if (model[v.FieldName]) {
                                if (model[v.FieldName].length == 0 && v.Rule.Required == true) {
                                    if (v.Rule.Required) {
                                        $('#invalid_' + v.FieldName).remove();
                                        vm.$scope.ModelIsValid = false;
                                        msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + v.Rule.RequiredMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                        $("#" + v.FieldName).after(msgEl);
                                    }
                                }
                                else if (v.Rule.MaxLength <= model[v.FieldName].length) {
                                    //$("#" + v.FieldName).addClass('invalid');
                                    vm.$scope.ModelIsValid = false;
                                    $('#invalid_' + v.FieldName).remove();
                                    vm.$scope.ModelIsValid = false;
                                    var toLongMsg = "The input of field $FIELD_NAME$ is too long.";
                                    msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + toLongMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                }
                                else if (!regex.test(model[v.FieldName])) {
                                    //$("#" + v.FieldName).removeClass('valid');
                                    //$("#" + v.FieldName).addClass('invalid');
                                    if ($("#invalid_" + v.FieldName).length > 0) {
                                        $("#invalid_" + v.FieldName).remove();
                                    }
                                    msgEl.html('<i id="invalid_' + v.FieldName + '" class="fa fa-exclamation-triangle"></i><span>' + v.Rule.InvalidMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                    vm.$scope.ModelIsValid = false;
                                }
                                else {
                                    $("#invalid_" + v.FieldName).remove();
                                }
                            }
                            else if (!model[v.FieldName] && v.Rule.Required == true) {
                                if (v.Rule.Required) {
                                    $('#invalid_' + v.FieldName).remove();
                                    vm.$scope.ModelIsValid = false;
                                    msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + v.Rule.RequiredMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                                    $("#" + v.FieldName).after(msgEl);
                                }
                            }
                        }
                    });
                };
                BaseController.prototype.GetPageNum = function () {
                    var vm = this;
                    if (vm.$scope.PageNum) {
                        if (vm.$scope.PageNum <= 0) {
                            vm.$scope.PageNum = 1;
                        }
                    }
                    else {
                        vm.$scope.PageNum = 1;
                    }
                    return vm.$scope.PageNum;
                };
                BaseController.prototype.SetPageNum = function (page) {
                    var vm = this;
                    if (page) {
                        vm.$scope.PageNum = parseInt(page.toString());
                        if (vm.$scope.PageNum <= 0) {
                            vm.$scope.PageNum = 1;
                        }
                    }
                };
                BaseController.prototype.IsFavorite = function (contentID) {
                    var vm = this;
                    return vm.$scope.UserFavorites.Contains("ContentID", contentID);
                };
                BaseController.prototype.SetUserFavorites = function () {
                    var vm = this;
                    vm.FavoriteService.GetUserFavorites().then(function (r) {
                        vm.$scope.UserFavorites = new FC.List(r.Data);
                    });
                };
                BaseController.prototype.DoMarkFavorite = function (contentID, type) {
                    var vm = this;
                    var it;
                    switch (type) {
                        case "artist":
                            it = FC.Shared.Enum.InternalContentType.Artist;
                            break;
                        case "festival":
                            it = FC.Shared.Enum.InternalContentType.Festival;
                            break;
                        case "location":
                            it = FC.Shared.Enum.InternalContentType.Location;
                            break;
                        case "news":
                            it = FC.Shared.Enum.InternalContentType.News;
                            break;
                        case "genre":
                            it = FC.Shared.Enum.InternalContentType.Genre;
                            break;
                        case "report":
                            it = FC.Shared.Enum.InternalContentType.Report;
                            break;
                        default:
                            throw new Error("Unknown type " + type + ".");
                    }
                    vm.FavoriteService.MarkFavorite(contentID, it).then(function (r) {
                        var opts = {};
                        var $scope = vm.$scope;
                        vm.SetUserFavorites();
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if ($scope.MtModal) {
                            $scope.MtModal.hide();
                        }
                        opts.controller = FC.Core.Controllers.AlertController;
                        opts.locals = { local: { ServerMsg: r.Data.MSG } };
                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                        });
                    });
                };
                BaseController.prototype.DoUnMarkFavorite = function (contentID) {
                    var vm = this;
                    vm.FavoriteService.UnmarkFavorite(contentID).then(function (r) {
                        var opts = {};
                        var $scope = vm.$scope;
                        //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                        if ($scope.MtModal) {
                            $scope.MtModal.hide();
                        }
                        vm.SetUserFavorites();
                        opts.controller = FC.Core.Controllers.AlertController;
                        opts.locals = { local: { ServerMsg: r.Data.MSG } };
                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                            window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                        });
                    });
                };
                BaseController.prototype.SetMETA = function (meta, $scope) {
                    if ($scope === void 0) { $scope = null; }
                    if (!$scope) {
                        $scope = this.$scope;
                    }
                    $scope.META = meta;
                    window.dispatchEvent(new CustomEvent("META-REFRESH", { detail: $scope.META }));
                };
                BaseController.prototype.GoNativeBack = function () {
                    history.go(-1);
                };
                BaseController.prototype.ShowLoginModal = function () {
                    var vm = this;
                    var $scope = vm.$scope;
                    var opts = {};
                    window.addEventListener("AUTH_SUCCESS", function () {
                        $scope.MtModal.hide();
                        $scope.IsAuthorized = true;
                    });
                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                    opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = false;
                    $scope.MtModal.show(opts);
                    $scope.IsAuthorized = false;
                };
                BaseController.prototype.ShowLogoutModal = function () {
                    var vm = this;
                    var $scope = vm.$scope;
                    var opts = {};
                    window.addEventListener("AUTH_SUCCESS", function () {
                        $scope.MtModal.hide();
                        $scope.IsAuthorized = true;
                    });
                    opts.controller = FC.Modules.Auth.Controllers.AuthController;
                    opts.templateUrl = '/Scripts/modules/auth/views/logout.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = false;
                    $scope.MtModal.show(opts);
                    $scope.IsAuthorized = false;
                };
                /**
                 *
                 * @param $scope
                 * @param forceLogin default is true. When true, user will forced to login.
                 */
                BaseController.prototype.CheckAuth = function ($scope, forceLogin) {
                    if (forceLogin === void 0) { forceLogin = true; }
                    this.AuthService.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                        var opts = {};
                        if (r == true) {
                            $scope.IsAuthorized = true;
                        }
                        else {
                            if (forceLogin) {
                                window.addEventListener("AUTH_SUCCESS", function () {
                                    $scope.MtModal.hide();
                                    $scope.IsAuthorized = true;
                                });
                                opts.controller = FC.Modules.Auth.Controllers.AuthController;
                                opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                                opts.parent = document.body;
                                opts.clickOutsideToClose = false;
                                $scope.MtModal.show(opts);
                                $scope.IsAuthorized = false;
                            }
                            $scope.IsAuthorized = false;
                        }
                    });
                };
                BaseController.prototype.RecoverModel = function (model, $scope) {
                    var vm = this;
                    var r = FC.Shared.CoreModel.Recovery.RecoverModel($scope.FormID, model);
                    return r;
                };
                BaseController.prototype.FinishForm = function ($scope) {
                    FC.Shared.CoreModel.Recovery.FinishForm($scope.FormID);
                };
                /*
                * @$scope: IVMBase
                * @name: <string> the name of the field
                * @value: <any> the value of the field
                */
                BaseController.prototype.SaveFieldState = function ($scope, name, value) {
                    var model = $scope.model;
                    FC.Shared.CoreModel.Recovery.Add($scope.FormID, name, value);
                    $scope.inst.SaveFormState($scope);
                    $scope.inst.DoValidate();
                };
                BaseController.prototype.RestoreModel = function ($scope) {
                    $.each($scope.model, function (i, v) {
                        FC.Shared.CoreModel.Recovery.Add($scope.FormID, i, v);
                    });
                };
                BaseController.prototype.GetFieldState = function ($scope, name) {
                    //if ($scope.model) {
                    //    $scope.model[name] = FC.Shared.CoreModel.Recovery.Get<string>($scope.FormID, name);
                    //}
                };
                BaseController.prototype.SaveFormState = function ($scope) {
                    FC.Shared.CoreModel.Recovery.SaveState($scope.FormID, $scope.$location.path());
                };
                BaseController.prototype.SplitToColData = function (columnCount, data) {
                    var vm = this;
                    vm.$scope.ColData1 = new Array();
                    vm.$scope.ColData2 = new Array();
                    vm.$scope.ColData3 = new Array();
                    vm.$scope.ColData4 = new Array();
                    if (columnCount > 4) {
                        throw new Error("Invalid column quantity max = 4");
                    }
                    if (columnCount < 1) {
                        throw new Error("Invalid column quantity min = 1");
                    }
                    if (data == null || data == undefined) {
                        data = new Array();
                    }
                    var index = 0;
                    var settedColCount = 0;
                    data.forEach(function (v, i) {
                        if (columnCount >= 1 && index == 0) {
                            if (index == 0) {
                                vm.$scope.ColData1.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 1) {
                                index = 0;
                            }
                        }
                        if (columnCount >= 2 && index == 1) {
                            if (index == 1) {
                                vm.$scope.ColData2.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 2) {
                                index == 0;
                            }
                        }
                        if (columnCount >= 3 && index == 2) {
                            if (index == 2) {
                                vm.$scope.ColData3.push(v);
                                settedColCount++;
                            }
                            if (columnCount == 3) {
                                index = 0;
                            }
                        }
                        if (columnCount == 4 && index == 3) {
                            if (index == 3) {
                                vm.$scope.ColData4.push(v);
                                settedColCount++;
                                index = 0;
                            }
                        }
                        if (settedColCount == columnCount) {
                            index = 0;
                            settedColCount = 0;
                        }
                        else {
                            index++;
                        }
                    });
                };
                BaseController.prototype.MediaIsObsolete = function (mediaID) {
                    if (mediaID) {
                        if (mediaID.toString().length > 10) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };
                BaseController.prototype.ExplodeTagString = function ($sce, tagString) {
                    var tpl = '<i class="fa fa-tag"/><ul class="taglist">';
                    if (tagString) {
                        var array = tagString.split(',');
                        array.forEach(function (v, i) {
                            if (i <= 2) {
                                tpl += '<li class="taglist-item"> ' + v.trim().toLowerCase() + '</li>';
                            }
                        });
                        tpl += '</ul>';
                        return $sce.trustAsHtml(tpl);
                    }
                    else {
                        return "";
                    }
                };
                BaseController.prototype.ShortenText = function (text) {
                    var txt = text.split(' ');
                    var result = "";
                    txt.forEach(function (word, index) {
                        if (index == 10) {
                            result += word + " ";
                        }
                        result += "";
                    });
                };
                BaseController.prototype.FormatDate = function (d) {
                    if (d) {
                        d = new Date(d.toString());
                        return d.toLocaleDateString();
                    }
                };
                BaseController.prototype.IsUpdated = function () {
                    var vm = this;
                    if (vm.CacheManager.Contains("version")) {
                        vm.CacheManager.GetStorage("version", function (r) {
                            if (r.data != ENV.GetVersion()) {
                                vm.CacheManager.DeleteStorage("sys-genres");
                                vm.CacheManager.DeleteStorage("user-genres");
                                vm.CacheManager.DeleteStorage("active-theme");
                                vm.CacheManager.DeleteStorage("sys-countries");
                                vm.CacheManager.DeleteStorage("user-location");
                                vm.CacheManager.DeleteStorage("user-countries");
                                vm.CacheManager.DeleteStorage("sys-months");
                                vm.CacheManager.DeleteStorage("sys-years");
                                vm.CacheManager.WriteStorage("version", ENV.GetVersion());
                                window.location.reload();
                            }
                        });
                    }
                    else {
                        vm.CacheManager.DeleteStorage("sys-genres");
                        vm.CacheManager.DeleteStorage("user-genres");
                        vm.CacheManager.DeleteStorage("active-theme");
                        vm.CacheManager.DeleteStorage("sys-countries");
                        vm.CacheManager.DeleteStorage("user-location");
                        vm.CacheManager.DeleteStorage("user-countries");
                        vm.CacheManager.DeleteStorage("sys-months");
                        vm.CacheManager.DeleteStorage("sys-years");
                        vm.CacheManager.WriteStorage("version", ENV.GetVersion());
                    }
                };
                BaseController.prototype.detectByLang = function ($scope) {
                    var vm = this;
                    $AppConfig.CurrentCountry = navigator.language;
                };
                BaseController.prototype.SetUserYearAndMonth = function () {
                    if (!this.CacheManager.Contains("user-month")) {
                        this.CacheManager.WriteStorage("user-month", new Date().getMonth() + 1, 9999999999999999999999);
                    }
                    if (!this.CacheManager.Contains("user-year")) {
                        this.CacheManager.WriteStorage("user-year", new Date().getFullYear(), 9999999999999999999999);
                    }
                };
                BaseController.prototype.SetCountryCache = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-countries")) {
                        if (vm.$scope.MemReg.Get("sys-countries-set") == null) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 999999999999999999999);
                                vm.$scope.IsCountriesLoading = false;
                                vm.$scope.SysCountries = r.Data;
                                var tmp = new Array();
                                r.Data.forEach(function (v, i) {
                                    if (v.IsPopular == true) {
                                        tmp.push(v);
                                    }
                                });
                                CacheManager.Write("UserCountries", tmp, 99999999999999999999);
                            });
                            vm.$scope.MemReg.Register("sys-countries-set", true);
                        }
                    }
                    else {
                        vm.$scope.SysCountries = CacheManager.Get("sys-countries").data;
                    }
                };
                BaseController.prototype.SetGenreData = function (force) {
                    if (force === void 0) { force = false; }
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-genres") || force == true) {
                        if (vm.$scope.MemReg.Get("sys-genres-set") == null) {
                            vm.GenreService.GetAllGenres().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-genres", r.Data, 9999999999999999999);
                                vm.$scope.SysGenres = r.Data;
                            });
                            vm.$scope.MemReg.Register("sys-genres-set", true);
                        }
                    }
                    else {
                        vm.$scope.SysGenres = CacheManager.Get("sys-genres").data;
                    }
                };
                BaseController.prototype.ClearNullIndexes = function (arr) {
                    console.warn("BaseController::ClearNullIndexes is obsolete, use BaseController::RepairArray instead");
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.prototype.RepairArray = function (arr) {
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.prototype.HasAuth = function (roles) {
                    return this.AuthService.HasAuth(roles);
                };
                BaseController.prototype.DoCancelSearch = function ($scope) {
                    $scope.DoCancelSearch;
                };
                BaseController.prototype.DoCancelCRUD = function ($scope) {
                    $scope = $scope.inst.$scope;
                    $scope.IsCreating = false;
                    $scope.IsDeleting = false;
                    $scope.IsEditing = false;
                    $scope.IsSearching = false;
                    $scope.IsViewDetail = false;
                };
                BaseController.prototype.DoAddSaveListener = function (ev) {
                    var vm = this;
                    if (!this.$scope.MemReg.GetAny("CRUDLISTENERS")) {
                        this.$scope.MemReg.Register("CRUDLISTENERS", "CRUDLISTENERS");
                        window.addEventListener("SAVE_SUCCESS", function (e) {
                            var opts = {};
                            var $scope = e['detail'];
                            //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                            if ($scope.MtModal) {
                                $scope.MtModal.hide();
                            }
                            opts.controller = FC.Core.Controllers.AlertController;
                            opts.locals = { local: { ServerMsg: $scope.ServerMsg } };
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-success.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE_SUCCESS"));
                            });
                        });
                        window.addEventListener("SAVE_FAILURE", function (e) {
                            var opts = {};
                            var $scope = e['detail'];
                            $scope.MtModal.hide();
                            opts.controller = FC.Core.Controllers.AlertController;
                            opts.locals = { local: { ServerMsg: $scope.ServerMsg } };
                            opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/save-failure.html';
                            opts.parent = document.body;
                            opts.targetEvent = ev;
                            opts.clickOutsideToClose = true;
                            $scope.MtModal.show(opts).then(function (answer) {
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE"));
                                window.dispatchEvent(new CustomEvent("MODAL_CLOSE_FAIL"));
                            });
                        });
                    }
                };
                BaseController.prototype.DoSaveCRUD = function (action, st, $scope, modelKey) {
                    if (modelKey === void 0) { modelKey = null; }
                    var vm = this;
                    var model = $scope.model;
                    if (modelKey) {
                        if ($scope[modelKey]) {
                            model = $scope[modelKey];
                        }
                    }
                    var result = null;
                    var instance;
                    switch (st) {
                        case ServiceType.ArtistService:
                            instance = new FC.Modules.Artists.Services.ArtistService(this.$http, this.$location);
                            break;
                        case ServiceType.FestivalService:
                            instance = new FC.Modules.Festival.Services.FestivalService(this.$http, this.$location);
                            break;
                        case ServiceType.CountryService:
                            instance = new FC.Modules.Countries.Services.CountriesService(this.$http, this.$location);
                            break;
                        case ServiceType.LocationService:
                            instance = new FC.Modules.Location.Services.LocationService(this.$http, this.$location);
                            break;
                        case ServiceType.NewsService:
                            instance = new FC.Modules.News.Services.NewsService(this.$http, this.$location);
                            break;
                        case ServiceType.ReportsService:
                            //  instance = new FC.Modules.Reports.Services.ReportsService(this.$http, this.$location);
                            console.info("Service ReportsService is not implemented.");
                            break;
                        case ServiceType.GenreService:
                            instance = new FC.Modules.Genres.Services.GenreService(this.$http, this.$location);
                            break;
                        case ServiceType.SocialService:
                            instance = new FC.Modules.Social.Services.SocialService(this.$http, this.$location);
                            break;
                        case ServiceType.MenuItemService:
                            instance = new FC.Modules.Menu.Services.MenuItemService(this.$http, this.$location);
                            break;
                        case ServiceType.MenuSectionService:
                            instance = new FC.Modules.Menu.Services.MenuSectionService(this.$http, this.$location);
                            break;
                    }
                    if (!instance) {
                        throw new Error("Instance is null in method DoSaveCRUD.");
                    }
                    switch (action) {
                        case ActionType.Create:
                            result = instance.Create(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsCreated = true;
                                    $scope.IsCreating = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsCreated = false;
                                    $scope.IsCreating = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot create the item. Please try again later.";
                                $scope.IsCreated = false;
                                $scope.IsCreating = false;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                        case ActionType.Delete:
                            vm.ConfirmDelete($scope);
                            window.addEventListener("CONFIRM_DELETE", function (e) {
                                if (e.detail == "OK") {
                                    result = instance.Delete(model);
                                    $scope.IsLoading = true;
                                    result.then(function (r) {
                                        if (r.Data.SUCCESS) {
                                            $scope.DoCancelCRUD($scope);
                                            $scope.ServerMsg = r.Data.MSG;
                                            $scope.IsDeleted = true;
                                            $scope.IsDeleting = false;
                                            window.dispatchEvent(new CustomEvent("REFRESH"));
                                            window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                        }
                                        else {
                                            $scope.ServerMsg = r.Data.MSG;
                                            $scope.IsDeleted == false;
                                            $scope.IsDeleting = true;
                                            window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                        }
                                        $scope.IsLoading = false;
                                    }).catch(function (r) {
                                        $scope.ServerMsg = "Cannot delete the item. Please try again later.";
                                        $scope.IsDeleted == false;
                                        $scope.IsDeleting = false;
                                        $scope.IsLoading = false;
                                        window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                    });
                                }
                            });
                            break;
                        case ActionType.Update:
                            result = instance.Update(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsEdited = true;
                                    $scope.IsEditing = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsEdited = false;
                                    $scope.IsEditing = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot modify the item. Please try again later.";
                                $scope.IsEdited = false;
                                $scope.IsEditing = true;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                        case ActionType.ForceDelete:
                            result = instance.ForceDelete(model);
                            $scope.IsLoading = true;
                            result.then(function (r) {
                                if (r.Data.SUCCESS) {
                                    $scope.DoCancelCRUD($scope);
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsDeleted = true;
                                    $scope.IsDeleting = false;
                                    window.dispatchEvent(new CustomEvent("REFRESH"));
                                    window.dispatchEvent(new CustomEvent("SAVE_SUCCESS", { 'detail': $scope }));
                                }
                                else {
                                    $scope.ServerMsg = r.Data.MSG;
                                    $scope.IsDeleted == false;
                                    $scope.IsDeleting = false;
                                    window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                                }
                                $scope.IsLoading = false;
                            }).catch(function (r) {
                                $scope.ServerMsg = "Cannot delete the item. Please try again later.";
                                $scope.IsDeleted == false;
                                $scope.IsDeleting = false;
                                $scope.IsLoading = false;
                                window.dispatchEvent(new CustomEvent("SAVE_FAILURE", { 'detail': $scope }));
                            });
                            break;
                    }
                    return result;
                };
                BaseController.prototype._handleCreateAction = function (svc, model) {
                };
                BaseController.prototype._handleUpdateAction = function (svc, model) {
                };
                BaseController.prototype.ConfirmDelete = function ($scope) {
                    var vm = this;
                    var opts = {};
                    //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);
                    if ($scope.MtModal) {
                        $scope.MtModal.hide();
                    }
                    opts.controller = FC.Core.Controllers.AlertController;
                    opts.controllerAs = 'vm';
                    opts.locals = { local: { ServerMsg: $scope.ServerMsg, model: $scope.model } };
                    opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/delete-confirm.html';
                    opts.parent = document.body;
                    opts.clickOutsideToClose = true;
                    $scope.MtModal.show(opts);
                };
                BaseController.prototype.SetLogoutURL = function (url) {
                    var vm = this;
                    vm.$scope.LogoutURL = '/#/logout/' + btoa(url);
                    return vm.$scope.LogoutURL;
                };
                BaseController.$inject = ['$q', '$http', '$scope', '$mdDialog'];
                return BaseController;
            }());
            Controllers.BaseController = BaseController;
        })(Controllers = Shared.Controllers || (Shared.Controllers = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=BaseController.js.map