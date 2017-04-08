///<reference path="../../Modules/Core/AppConfig.ts" />
///<reference path="../Util/CacheManager.ts"/>
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
module FC.Shared.Controllers {
    import CM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import ENV = FC.Core.Environment;
    import ENUM = FC.Shared.Enum;

    export enum ServiceType {
        ArtistService,
        FestivalService,
        LocationService,
        GenreService,
        TicketService,
        ResellerService,
        NewsService,
        ReportsService,
        CountryService,
        AuthService,
        ApplicationUserService,
        MenuSectionService,
        MenuItemService,
        SocialService,
        RoleService
    }

    export enum ActionType {
        GetListBy,
        GetList,
        Create,
        Read,
        Update,
        Delete,
        ForceDelete
    }


    export class META {
        PageTitle: string;
        PageDesc: string;
        PageIMG: string;
        PageKeys: string;
    }

    export class BaseController {
        protected ApplicationIsReady: boolean;
        public ActiveGenreID: number;
        public ActiveCountryID: number;
        public ActiveCountryName: string;
        public ActiveCountryIDs: Array<string>;
        public $location: any;
        public $routeParams: any;
        public $scope: FC.Shared.ViewModels.IFormVMBase<any>;
        
        public ActiveTheme: INT.IUTheme;
        public GenreService: FC.Modules.Genres.Services.GenreService;
        public FestivalService: FC.Modules.Festival.Services.FestivalService;
        public LocationService: FC.Modules.Location.Services.LocationService;
        public ArtistService: FC.Modules.Artists.Services.ArtistService;
        public NewsService: FC.Modules.News.Services.NewsService;
        public FavoriteService: FC.Modules.Favorites.Services.FavoriteService;
        public GeonamesService: FC.Modules.Location.Services.GeonamesService;
        public MenuSectionService: FC.Modules.Menu.Services.MenuSectionService;
        public MenuItemService: FC.Modules.Menu.Services.MenuItemService;
        public RoleService: FC.Core.Services.RolesService;

        //public ReportsService: FC.Modules.Report.Services.ReportsService;

        public RuleRegister: FC.Core.Validation.ValidationRuleItem[];
        public LocalizationService: FC.Core.Services.LocalizationService;
        static $inject = ['$q', '$http', '$scope', '$mdDialog'];
        public BaseIsLoading = true;
        public CacheManager: FC.Shared.Util.CacheManager;
        public NominatimSvc: FC.Core.Services.NominatimService;
        public GeoIPSvc: FC.Core.Services.GeoIPService;
        public AuthService: FC.Core.Services.AuthService;
        public $http: any;
        public $inst: any;
        public CalendarService: FC.Modules.Calendar.Services.CalendarService;
        public $q: ng.IQService;
        public CountriesSvc: FC.Modules.Countries.Services.CountriesService;
        public IsThemesLoading: boolean;
        public IsCountriesLoading: boolean;
        public IsGenresLoading: boolean;
        public IsFestivalsLoading: boolean;
        public IsLoading: boolean;
        public ActiveYear: number;
        public ActiveMonth: number;

        public initLoadingScope() {
            var vm = this;
            vm.$scope.IsThemesLoading = true;
            vm.$scope.IsCountriesLoading = true;
            vm.$scope.IsGenresLoading = true;
            vm.$scope.IsFestivalsLoading = true;
        }

        public AddValidationRule(rule: FC.Core.Validation.ValidationRuleItem) {
            this.RuleRegister.push(rule);
        }

        public SetPageKey(pageKey: string) {
            var vm = this;
            debugger;
            vm.$scope.inst.$scope.PageKey = pageKey;
        }

        /**
         * @param modelPropertyName this is the key of the model. model[modelKey].
         */
        public DoValidate(modelPropertyName:string=null) {
            var vm = this;
            var model = vm.$scope.model;
            if (modelPropertyName) {
                
                model = vm.$scope[modelPropertyName];
            }
            vm.$scope.ModelIsValid = true;
            this.RuleRegister.forEach(function (v: Core.Validation.ValidationRuleItem, index: number) {
                var msgEl = $('<span class="invalid-msg" id="invalid_'+v.FieldName+'"></span>');
                var regex = new RegExp(v.Rule.Regex,"g");
                var fieldName = "";
                if (v.FieldLabel) {
                    fieldName = v.FieldLabel;
                } else {
                    fieldName = v.FieldName
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
                        } else {
                            $("#invalid_" + v.FieldName).remove();
                            //$("#" + v.FieldName).removeClass('invalid');
                            //$("#" + v.FieldName).addClass('valid');
                        }

                    } else if (!model[v.FieldName] && v.Rule.Required == true) {
                        if (v.Rule.Required) {
                            $('#invalid_' + v.FieldName).remove();
                            vm.$scope.ModelIsValid = false;
                            msgEl.html('<i class="fa fa-exclamation-triangle"></i><span>' + v.Rule.RequiredMsg.replace("$FIELD_NAME$", fieldName) + '</span>');
                            $("#" + v.FieldName).after(msgEl);
                        }
                    }
                }
            });
        }

        public GetPageNum(): number {
            var vm = this;
            if (vm.$scope.PageNum) {
                if (vm.$scope.PageNum <= 0) {
                    vm.$scope.PageNum = 1;
                }
            } else {
                vm.$scope.PageNum = 1;
            }
            return vm.$scope.PageNum;
        }

        public SetPageNum(page:number): void {
            var vm = this;
            if (page) {
                vm.$scope.PageNum = parseInt(page.toString());
                if (vm.$scope.PageNum <= 0) {
                    vm.$scope.PageNum = 1;
                }
            }
        }

        constructor($http, $q:ng.IQService, $scope:FC.Shared.ViewModels.IFormVMBase<any>, $location: ng.ILocationService, $routeParams: any, $mdDialog:angular.material.MDDialogService) {
            var vm = this;
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.$scope = $scope;
            this.$scope.inst = this;
            this.$scope.Now = new Date();
            this.$http = $http;
            this.$q = $q;
            this.$scope.$q = $q;
            this.$scope['CONFIRMATION'] = FC.Core.Controllers.CONFIRMATION;
            if ($routeParams["page"]) {
                this.SetPageNum(parseInt($routeParams["page"]));
            } else {
                this.SetPageNum(1);
            }

            if ($routeParams["year"]) {
                this.$scope.ActiveYear = $routeParams["year"];
            } else {
                this.$scope.ActiveYear = new Date().getFullYear();
            }
            if ($routeParams["month"]) {
                this.$scope.ActiveMonth = $routeParams["month"];
            } else {
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
            this.RuleRegister = new Array<FC.Core.Validation.ValidationRuleItem>();
           
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
        
        public IsFavorite(contentID: string): boolean {
            var vm = this;
            return vm.$scope.UserFavorites.Contains("ContentID", contentID);
        }

        public SetUserFavorites(): void {
            throw new Error("BaseController.SetUserFavorites is obsolete");
        }

        public DoMarkFavorite(contentID: string, type: string) {
            var vm = this;
            var it: FC.Shared.Enum.InternalContentType;
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
                var opts: ng.material.MDDialogOptions = {};
                var $scope: FC.Shared.ViewModels.IFormVMBase<any> = vm.$scope;
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

        }

        public DoUnMarkFavorite(contentID: string) {
            var vm = this;
            

            vm.FavoriteService.UnmarkFavorite(contentID).then(function (r) {
                var opts: ng.material.MDDialogOptions = {};
                var $scope: FC.Shared.ViewModels.IFormVMBase<any> = vm.$scope;
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

        }


        public HtmlSafe = function ($sce: angular.ISCEService, data) {
            var vm = this;
            return $sce.trustAsHtml(data);
        }
        public SetMETA(meta: META, $scope: FC.Shared.ViewModels.IFormVMBase<any> = null) {
            if (!$scope) {
                $scope = this.$scope;
            }
            $scope.META = meta;
            window.dispatchEvent(new CustomEvent("META-REFRESH", { detail: $scope.META }));
        }

        public GoNativeBack(): void {
            history.go(-1);
        }

        public ShowLoginModal(): void {
            var vm = this;
            var $scope = vm.$scope;

            var opts: ng.material.MDDialogOptions = {};
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

        public ShowLogoutModal(): void {

            var vm = this;
            var $scope = vm.$scope;
            var opts: ng.material.MDDialogOptions = {};
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
        }

        /**
         * 
         * @param $scope
         * @param forceLogin default is true. When true, user will forced to login.
         */
        public CheckAuth($scope: FC.Shared.ViewModels.IFormVMBase<any>, forceLogin:boolean=true):void {
            this.AuthService.HasAuth(FC.Shared.Enum.Roles.GetAdmins()).then(function (r) {
                var opts: ng.material.MDDialogOptions = {};
                if (r == true) {
                    $scope.IsAuthorized = true;
                } else {
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
        }
        public RecoverModel<T>(model :T, $scope:FC.Shared.ViewModels.IVMBase): T {
            var vm = this;
            var r = FC.Shared.CoreModel.Recovery.RecoverModel<T>($scope.FormID, model);
            return r;
        }

        public FinishForm($scope: FC.Shared.ViewModels.IFormVMBase<any>) {
            FC.Shared.CoreModel.Recovery.FinishForm($scope.FormID);
        }

        /*
        * @$scope: IVMBase
        * @name: <string> the name of the field
        * @value: <any> the value of the field
        */
        public SaveFieldState($scope: FC.Shared.ViewModels.IFormVMBase<MODELS.BaseModel>, name: string, value: any): void {
            var model: MODELS.BaseModel = $scope.model;
            FC.Shared.CoreModel.Recovery.Add($scope.FormID, name, value);
            $scope.inst.SaveFormState($scope);
            $scope.inst.DoValidate();

        }

        public RestoreModel($scope: FC.Shared.ViewModels.IFormVMBase<any>) {
            $.each($scope.model, function (i, v) {
                FC.Shared.CoreModel.Recovery.Add($scope.FormID, i, v);
            });
        }

        public GetFieldState($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string): void {
            //if ($scope.model) {
            //    $scope.model[name] = FC.Shared.CoreModel.Recovery.Get<string>($scope.FormID, name);
            //}
        }
        public SaveFormState($scope: FC.Shared.ViewModels.IFormVMBase<any>): void {
            FC.Shared.CoreModel.Recovery.SaveState($scope.FormID, $scope.$location.path());
        }

        public SplitToColData(columnCount: number, data: any[])
        {
            var vm = this;
            vm.$scope.ColData1 = new Array<any>();
            vm.$scope.ColData2 = new Array<any>();
            vm.$scope.ColData3 = new Array<any>();
            vm.$scope.ColData4 = new Array<any>();
            if (columnCount > 4) {
                throw new Error("Invalid column quantity max = 4");
            }
            if (columnCount < 1) {
                throw new Error("Invalid column quantity min = 1")
            }
            if (data == null || data == undefined) {
                data = new Array<any>();
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
                        index = 0
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
                } else {
                    index++;
                }
            });
        }

        public MediaIsObsolete(mediaID: string): boolean {
            if (mediaID) {
                if (mediaID.toString().length > 10) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        public ExplodeTagString($sce: ng.ISCEService, tagString: string): string {
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
            } else {
                return "";
            }
        }

        public ShortenText(text: string) {
            var txt: string[] = text.split(' ');
            var result = "";
            txt.forEach(function (word, index) {
                if (index == 10) {
                    result += word + " ";
                }
                result += "";
            });
        }

        public FormatDate(d: Date) {
            if (d) {
                d = new Date(d.toString());
                return d.toLocaleDateString();
            }
        }
        

        private _detectCount = 0;
        private _timeout = null;
        protected detectByLang($scope) {
            var vm = this;
            $AppConfig.CurrentCountry = navigator.language;

        }


        public SetUserYearAndMonth() {
            if (!this.CacheManager.Contains("user-month")) {
                this.CacheManager.WriteStorage("user-month", new Date().getMonth() + 1, 9999999999999999999999);
            }
            if (!this.CacheManager.Contains("user-year")) {
                this.CacheManager.WriteStorage("user-year", new Date().getFullYear(), 9999999999999999999999);
            }
        }

        public SetCountryCache() {
            var vm = this;
            if (!vm.CacheManager.Contains("sys-countries")) {
                if (vm.$scope.MemReg.Get("sys-countries-set") == null) {
                    vm.CountriesSvc.GetAll().then(function (r: INT.IServiceResponse<MODELS.UCountry[]>) {
                        vm.CacheManager.WriteStorage("sys-countries", r.Data, 999999999999999999999);
                        vm.$scope.IsCountriesLoading = false;
                        vm.$scope.SysCountries = r.Data;
                        var tmp = new Array<MODELS.UCountry>()
                        r.Data.forEach(function (v, i) {
                            if (v.IsPopular == true) {
                                tmp.push(v);
                            }
                        });
                        CacheManager.WriteStorage("UserCountries", tmp, 99999999999999999999);

                    });
                    vm.$scope.MemReg.Register("sys-countries-set", true);
                }
            } else {
                vm.$scope.SysCountries = CacheManager.Get<FC.Shared.Models.UCountry[]>("sys-countries").data;
            }
        }

        public SetGenreData(force: boolean=false) {
            var vm = this;
            if (!vm.CacheManager.Contains("sys-genres") || force == true) {
                if (vm.$scope.MemReg.Get("sys-genres-set") == null) {
                    vm.GenreService.GetAllGenres().then(function (r: INT.IServiceResponse<MODELS.UGenre[]>) {
                        vm.CacheManager.WriteStorage("sys-genres", r.Data, 9999999999999999999);
                        vm.$scope.SysGenres = r.Data;
                    });
                    vm.$scope.MemReg.Register("sys-genres-set", true);
                }
            } else {
                vm.$scope.SysGenres = CacheManager.Get<FC.Shared.Models.UGenre[]>("sys-genres").data;
            }
        }

        public ClearNullIndexes(arr: Array<any>): Array<any> {
            console.warn("BaseController::ClearNullIndexes is obsolete, use BaseController::RepairArray instead");
            var result = new Array<any>();
            $.each(arr, function (k, v) {
                if (v != null) {
                    result.push(v);
                }
            });
            return result;
        }

        public RepairArray(arr: Array<any>): Array<any> {
            var result = new Array<any>();
            $.each(arr, function (k, v) {
                if (v != null) {
                    result.push(v);
                }
            });
            return result;
        }

        public HasAuth(roles?: string[]): ng.IPromise<boolean> {
            return this.AuthService.HasAuth(roles); 
        }

        public DoCancelSearch($scope: FC.Shared.ViewModels.IFormVMBase<any>): void {
            $scope.DoCancelSearch;
        }

        public DoCancelCRUD($scope: FC.Shared.ViewModels.IFormVMBase<any>): void {

            $scope = $scope.inst.$scope;
            $scope.IsCreating = false;
            $scope.IsDeleting = false;
            $scope.IsEditing = false;
            $scope.IsSearching = false;
            $scope.IsViewDetail = false;

        }

        public DoAddSaveListener(ev) {
            var vm = this;
            if (!this.$scope.MemReg.GetAny("CRUDLISTENERS")) {
                this.$scope.MemReg.Register("CRUDLISTENERS", "CRUDLISTENERS");
                window.addEventListener("SAVE_SUCCESS", function (e) {
                    var opts: ng.material.MDDialogOptions = {};
                    var $scope: FC.Shared.ViewModels.IFormVMBase<any> = e['detail'];
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
                    var opts: ng.material.MDDialogOptions = {};
                    var $scope: FC.Shared.ViewModels.IFormVMBase<any> = e['detail'];
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
        }

        public DoSaveCRUD(action: ActionType, st: ServiceType, $scope: FC.Shared.ViewModels.IFormVMBase<any>, modelKey=null): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            var vm = this;
            var model: any = $scope.model;

            if (modelKey) { //overide default model behavior.
                if ($scope[modelKey]) {
                    model = $scope[modelKey];
                }
            }
           
            var result: ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> = null;
            var instance: INT.IServiceBase<any>;
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
                //case ServiceType.ApplicationUserService:
                //    instance = new FC.Core.Services.AuthService(this.$http, this.$location);
                //break;
                //case ServiceType.AuthService:
                //    instance = new FC.Core.Services.AuthService(this.$http, this.$location);
                //break;
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
                        } else {
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
                    window.addEventListener("CONFIRM_DELETE", function (e: CustomEventInit) {
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
                                } else {
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
                        } else {
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
                        } else {
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
        }

        private _handleCreateAction(svc: any, model: any): void {

        }
        private _handleUpdateAction(svc: any, model: any): void {

        }

        public ConfirmDelete($scope: FC.Shared.ViewModels.IFormVMBase<any>): void {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
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
        }

        public Warn($scope: FC.Shared.ViewModels.IFormVMBase<any>, msg): void {
            var vm = this;
            var opts: ng.material.MDDialogOptions = {};
            //$scope.MemReg.Register("ServerMsg", $scope.ServerMsg);

            if ($scope.MtModal) {
                $scope.MtModal.hide();
            }
            opts.controller = FC.Core.Controllers.AlertController;
            opts.controllerAs = 'vm';
            opts.locals = { local: { ServerMsg: $scope.ServerMsg, model: msg } };
            opts.templateUrl = '/Scripts/modules/details/views/dialogs/alerts/warning.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts);
        }

        public SetLogoutURL(url:string): string {
            var vm = this;
            vm.$scope.LogoutURL = '/#/logout/' + btoa(url);
            return vm.$scope.LogoutURL;
        }
    }
}