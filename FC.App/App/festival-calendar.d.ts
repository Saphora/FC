declare module FC.Shared.Models {
    class SystemHeaders {
        Token: string;
        UserDateTime: number;
        Culture: string;
        Accept: string;
        ContentType: string;
        constructor(headers?: SystemHeaders);
    }
}
declare module FC.Shared.Util {
    enum CacheMode {
        Cookie = 1,
        LocalStorage = 2,
        Server = 3,
    }
    class Storage<T> {
        expires: number;
        data: T;
    }
    class CacheManager {
        $scope: ng.IScope;
        HasErrors: boolean;
        Errors: Array<string>;
        Expires: number;
        private static __inst;
        constructor(instKey?: string);
        static GetInstKey(): string;
        static GetInstance(): FC.Shared.Util.CacheManager;
        StripNullElements(arr: Array<any>): Array<any>;
        WriteStorage(key: string, obj: any, ms?: number): void;
        Write<T>(key: string, obj: T, ms?: number): void;
        /**
         * @param storageKey the localstorage identifier key.
         * @param key  the key of the object
         * @param value the value to match against.
         * @param successCallback when data is not expired and the storage containst
         * @param dataEmptyCallback when the data is empty
         * @param expiredCallback when cache is expired... not really usefull at the moment.
         */
        GetByValue(storageKey: string, key: string, value: string, successCallback: Function, dataEmptyCallback?: Function, expiredCallback?: Function): void;
        GetByValueContains(storageKey: string, key: string, value: string, successCallback: Function, dataEmptyCallback?: Function, expiredCallback?: Function): void;
        GetStorage(key: string, successCallback?: Function, expiredCallback?: Function): Storage<any>;
        Get<T>(key: string, successCallback?: Function, expiredCallback?: Function): Storage<T>;
        DeleteStorage(key: any): void;
        ClearStorage(): void;
        Contains(key: any): boolean;
    }
}
declare module FC.Core {
    enum EnvironmentType {
        Local = 0,
        Remote = 1,
    }
    class Environment {
        static UpdateBuild(): string;
        static UpdateCache(): string;
        static UpdateRelease(): string;
        static GetVersion(): string;
        private static VERSION;
        static GeoIPURL: string;
        static LocalBaseURL: string;
        static RemoteBaseURL: string;
        static GeoServicesURL: string;
        static MediaURLRoot: string;
        static MEDIA_ROOT_ID: string;
        static FESTIVAL_DIR_ROOT_ID: string;
        static ARTIST_DIR_ROOT_ID: string;
        static NEWS_DIR_ROOT_ID: string;
        static APPUSER_DIR_ROOT_ID: string;
        static REPORT_DIR_ROOT_ID: string;
        static GetBaseURL(et: EnvironmentType): string;
    }
    interface IAppClient {
        Location: string;
        ScreenWidth: Number;
        ScreenHeight: Number;
        ViewportWidth: Number;
        ViewportHeight: Number;
        Browser: string;
        SafeConnection: boolean;
        UserCulture: string;
        CurrentTicks: Number;
    }
    class AppClient {
        constructor(client: IAppClient);
        CurrentTicks: number;
        UserCulture: string;
        Location: string;
        ScreenWidth: Number;
        ScreenHeight: Number;
        ViewportWidth: Number;
        ViewportHeight: Number;
        Browser: string;
        SafeConnection: boolean;
    }
    class Localization {
        ISOCurrencySymbol: string;
        NegativeSign: string;
        PositiveSign: string;
        TimeSeparator: string;
        CurrencyNativeName: string;
        RegionEnglishName: string;
        RegionName: string;
        CultureIsoName: string;
        CultureCountryName: string;
        CultureMoneySign: string;
        CultureDateSeparator: string;
        CultureCurrencySeparator: string;
        CurrencyCultureDecimalDigits: number;
        NumberDecimalDigits: number;
        NumberDecimalSeparator: string;
    }
    class AppConfig {
        constructor();
        CurrentCountry: string;
        DefaultGenreID: number;
        CurrentEnvironment: EnvironmentType;
        URLRoot: string;
        UserDateTime: Date;
        UserName: string;
        UserID: number;
        AnonUser: boolean;
        IsSignedInWithSpotify: boolean;
        IsSignedInWithFacebook: boolean;
        IsSignedInWithTwitter: boolean;
        IsSignedInLocal: boolean;
        Localization: Localization;
        GeoLocation: Geolocation;
        Client: AppClient;
        ServiceHeaders: FC.Shared.Models.SystemHeaders;
    }
}
declare var $AppConfig: FC.Core.AppConfig;
declare module FC.Core {
    import INT = FC.Shared.Interfaces;
    abstract class ServiceBase {
        Loading: FC.Shared.Util.LoadQueue;
        protected $http: ng.IHttpService;
        protected $q: ng.IQService;
        protected CacheManager: FC.Shared.Util.CacheManager;
        protected GetCompleted: any;
        protected Config: FC.Core.AppConfig;
        constructor($http: ng.IHttpService, $q: ng.IQService);
        abstract GetList(): ng.IPromise<INT.IServiceResponse<IList<any>>>;
        protected Upload<T>(url: string, files: Array<File>): ng.IPromise<INT.IServiceResponse<T>>;
        protected Get<T>(url: string, params?: any): ng.IPromise<INT.IServiceResponse<T>>;
        protected GetRaw(url: string, params?: any, headers?: any): ng.IPromise<any>;
        protected GetRawTyped<T>(url: string, params?: any, headers?: any): ng.IPromise<T>;
        protected JSONP<T>(url: string, params?: any): ng.IPromise<INT.IServiceResponse<T>>;
        protected RawJSONP(url: string, params?: any, headers?: any): ng.IPromise<any>;
        protected PostRaw<T>(url: string, params?: any, headers?: any): ng.IPromise<T>;
        protected Post<T, T2>(url: string, svcMsg: FC.Shared.Models.ServiceMessage<T2>): ng.IPromise<INT.IServiceResponse<T>>;
        protected handlerResponded<T>(url: string, response: any, params?: any): any;
        protected handlerRespondedRaw(response: any, params?: any): any;
    }
}
declare module FC {
}
declare module FC.Core {
    function IsNullOrEmpty(obj: any): boolean;
    function StrFormat(template: string, args: Array<string>): string;
    class FCModule {
        name: string;
        modules: Array<string>;
        app: ng.IModule;
        constructor(name: string, modules: Array<string>);
        RegisterController(controllerName: string, controller: Function): void;
        RegisterService(serviceName: string, service: Function): void;
        RegisterModule(moduleName: string, module: any): void;
        GetModule(name: string): any;
        AddRoute(urlFormat: string, tplName: string, controllerName: string, controllerAlias: any): void;
    }
}
declare var ApplicationDependencies: string[];
declare let CONFIG: FC.Core.AppConfig;
declare var Application: FC.Core.FCModule;
declare var CacheManager: FC.Shared.Util.CacheManager;
declare let fx: any;
declare let accounting: any;
declare let ThemeData: Array<FC.Shared.Interfaces.IUTheme>;
declare let PhoneCodes: any;
declare let ActionType: FC.Shared.Controllers.ActionType;
declare let ServiceType: FC.Shared.Controllers.ServiceType;
declare module FC.Modules.Artists {
    class Artists {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var ArtistsModule: FC.Modules.Artists.Artists;
declare module FC.Core.CoreModel {
    class KeyValuePair<TKey, TValue> {
        Key: TKey;
        Value: TValue;
        constructor(key?: TKey, value?: TValue);
    }
    class Dictionary<TKey, TValue> {
        data: Array<KeyValuePair<TKey, TValue>>;
        strData: {};
        constructor(dict?: any);
        GetAllKeys(): TKey[];
        Add(key: TKey, value: TValue, scope?: Dictionary<TKey, TValue>): void;
        GetAll(): Array<KeyValuePair<TKey, TValue>>;
        Delete(key: TKey, source?: Dictionary<TKey, TValue>): void;
        ContainsKey(key: TKey, source?: Dictionary<TKey, TValue>): boolean;
        Get(k: TKey, source?: Dictionary<TKey, TValue>): TValue;
        GetAllArray(): any;
        GetByValue(v: TValue): KeyValuePair<TKey, TValue>;
    }
}
declare module FC.Shared.Controllers {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    enum ServiceType {
        ArtistService = 0,
        FestivalService = 1,
        LocationService = 2,
        GenreService = 3,
        TicketService = 4,
        ResellerService = 5,
        NewsService = 6,
        ReportsService = 7,
        CountryService = 8,
        AuthService = 9,
        ApplicationUserService = 10,
        MenuSectionService = 11,
        MenuItemService = 12,
        SocialService = 13,
        RoleService = 14,
    }
    enum ActionType {
        GetListBy = 0,
        GetList = 1,
        Create = 2,
        Read = 3,
        Update = 4,
        Delete = 5,
        ForceDelete = 6,
    }
    class META {
        PageTitle: string;
        PageDesc: string;
        PageIMG: string;
        PageKeys: string;
    }
    class BaseController {
        protected ApplicationIsReady: boolean;
        ActiveGenreID: number;
        ActiveCountryID: number;
        ActiveCountryName: string;
        ActiveCountryIDs: Array<string>;
        $location: any;
        $routeParams: any;
        $scope: FC.Shared.ViewModels.IFormVMBase<any>;
        ThemingSvc: FC.Modules.Theming.Services.ThemingService;
        ActiveTheme: INT.IUTheme;
        GenreService: FC.Modules.Genres.Services.GenreService;
        FestivalService: FC.Modules.Festival.Services.FestivalService;
        LocationService: FC.Modules.Location.Services.LocationService;
        ArtistService: FC.Modules.Artists.Services.ArtistService;
        NewsService: FC.Modules.News.Services.NewsService;
        FavoriteService: FC.Modules.Favorites.Services.FavoriteService;
        GeonamesService: FC.Modules.Location.Services.GeonamesService;
        MenuSectionService: FC.Modules.Menu.Services.MenuSectionService;
        MenuItemService: FC.Modules.Menu.Services.MenuItemService;
        RoleService: FC.Core.Services.RolesService;
        RuleRegister: FC.Core.Validation.ValidationRuleItem[];
        LocalizationService: FC.Core.Services.LocalizationService;
        static $inject: string[];
        BaseIsLoading: boolean;
        CacheManager: FC.Shared.Util.CacheManager;
        NominatimSvc: FC.Core.Services.NominatimService;
        GeoIPSvc: FC.Core.Services.GeoIPService;
        AuthService: FC.Core.Services.AuthService;
        $http: any;
        $inst: any;
        CalendarService: FC.Modules.Calendar.Services.CalendarService;
        $q: ng.IQService;
        CountriesSvc: FC.Modules.Countries.Services.CountriesService;
        IsThemesLoading: boolean;
        IsCountriesLoading: boolean;
        IsGenresLoading: boolean;
        IsFestivalsLoading: boolean;
        IsLoading: boolean;
        ActiveYear: number;
        ActiveMonth: number;
        initLoadingScope(): void;
        AddValidationRule(rule: FC.Core.Validation.ValidationRuleItem): void;
        SetPageKey(pageKey: string): void;
        /**
         * @param modelPropertyName this is the key of the model. model[modelKey].
         */
        DoValidate(modelPropertyName?: string): void;
        GetPageNum(): number;
        SetPageNum(page: number): void;
        constructor($http: any, $q: ng.IQService, $scope: FC.Shared.ViewModels.IFormVMBase<any>, $location: ng.ILocationService, $routeParams: any, $mdDialog: angular.material.MDDialogService);
        IsFavorite(contentID: string): boolean;
        SetUserFavorites(): void;
        DoMarkFavorite(contentID: string, type: string): void;
        DoUnMarkFavorite(contentID: string): void;
        HtmlSafe: ($sce: ng.ISCEService, data: any) => any;
        SetMETA(meta: META, $scope?: FC.Shared.ViewModels.IFormVMBase<any>): void;
        GoNativeBack(): void;
        ShowLoginModal(): void;
        ShowLogoutModal(): void;
        /**
         *
         * @param $scope
         * @param forceLogin default is true. When true, user will forced to login.
         */
        CheckAuth($scope: FC.Shared.ViewModels.IFormVMBase<any>, forceLogin?: boolean): void;
        RecoverModel<T>(model: T, $scope: FC.Shared.ViewModels.IVMBase): T;
        FinishForm($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        SaveFieldState($scope: FC.Shared.ViewModels.IFormVMBase<MODELS.BaseModel>, name: string, value: any): void;
        RestoreModel($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        GetFieldState($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string): void;
        SaveFormState($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        MediaIsObsolete(mediaID: string): boolean;
        ExplodeTagString($sce: ng.ISCEService, tagString: string): string;
        ShortenText(text: string): void;
        FormatDate(d: Date): string;
        IsUpdated(): void;
        private _detectCount;
        private _timeout;
        protected detectByLang($scope: any): void;
        SetUserYearAndMonth(): void;
        SetCountryCache(): void;
        SetGenreData(force?: boolean): void;
        ClearNullIndexes(arr: Array<any>): Array<any>;
        RepairArray(arr: Array<any>): Array<any>;
        HasAuth(roles?: string[]): ng.IPromise<boolean>;
        DoCancelSearch($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        DoCancelCRUD($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        DoAddSaveListener(ev: any): void;
        DoSaveCRUD(action: ActionType, st: ServiceType, $scope: FC.Shared.ViewModels.IFormVMBase<any>, modelKey?: any): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        private _handleCreateAction(svc, model);
        private _handleUpdateAction(svc, model);
        ConfirmDelete($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
        SetLogoutURL(url: string): string;
    }
}
declare module FC.Modules.Artists.Controllers {
    class ArtistDetailController extends FC.Shared.Controllers.BaseController {
        private _inst;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, FestivalService: FC.Modules.Festival.Services.FestivalService, NewsService: FC.Modules.News.Services.NewsService, RatesService: FC.Modules.Rates.Services.RatesService, BannerService: FC.Modules.Banners.Services.BannerService, UrlManagerService: FC.Core.Services.URLManagerService, $sce: any, GenreService: FC.Modules.Genres.Services.GenreService);
    }
}
declare module FC.Modules.Artists.Controllers {
    class ArtistDialogController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        GenreService: FC.Modules.Genres.Services.GenreService;
        ArtistService: FC.Modules.Artists.Services.ArtistService;
        FestivalService: FC.Modules.Festival.Services.FestivalService;
        LocationService: FC.Modules.Location.Services.LocationService;
        TicketService: FC.Modules.Ticket.Services.TicketService;
        URLManSvc: FC.Core.Services.URLManagerService;
        $sce: any;
        $scope: Models.IArtistDialog;
        vm: any;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $uibModal: any, $scope: any, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, UrlManagerService: FC.Core.Services.URLManagerService, $sce: ng.ISCEService, GenreService: FC.Modules.Genres.Services.GenreService, ArtistsService: FC.Modules.Artists.Services.ArtistService, FestivalService: FC.Modules.Festival.Services.FestivalService, CalendarService: FC.Modules.Calendar.Services.CalendarService, LocationService: FC.Modules.Location.Services.LocationService, TicketService: FC.Modules.Ticket.Services.TicketService);
        private setData(sortIndex);
    }
}
declare module FC.Modules.Artists.Controllers {
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class ArtistModalController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Artists.Controllers.ArtistModalController;
        ShowTravelInfo: boolean;
        GenreService: FC.Modules.Genres.Services.GenreService;
        ArtistService: FC.Modules.Artists.Services.ArtistService;
        URLManSvc: FC.Core.Services.URLManagerService;
        BannerService: FC.Modules.Banners.Services.BannerService;
        Modal: any;
        ArtistModal: any;
        $sce: any;
        MediaPickerSaveEvent: string;
        $scope: VM.IArtistModalScope;
        vm: any;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $mdDialog: angular.material.MDDialogService, $scope: any, $route: any, $routeParams: any, $location: any, ThemingService: FC.Modules.Theming.Services.ThemingService, LocalizationService: FC.Core.Services.LocalizationService, UrlManagerService: FC.Core.Services.URLManagerService, $sce: any, GenreService: FC.Modules.Genres.Services.GenreService, ArtistsService: FC.Modules.Artists.Services.ArtistService, local: any[]);
        Close($scope: VM.IArtistModalScope): void;
        private AddListeners($scope);
        ToggleSelected($scope: VM.IArtistModalScope, state: boolean): void;
        SaveArtist($scope: VM.IArtistModalScope): void;
        DoSaveEdit($scope: VM.IArtistModalScope): void;
        DoCreateArtist($scope: VM.IArtistModalScope): void;
        DoEditArtist($scope: VM.IArtistModalScope, artist: Models.ArtistListVM): void;
        DoDeleteArtist($scope: VM.IArtistModalScope, artist: MODELS.UArtist): void;
        DoSaveDelete($scope: VM.IArtistModalScope): void;
        DoSaveForceDelete($scope: VM.IArtistModalScope): void;
        Filter(scope: any): void;
        Deactivate($scope: VM.IArtistModalScope, artist: Models.ArtistListVM, saveEvt: string, model: Array<Models.ArtistListVM>): void;
        Activate($scope: VM.IArtistModalScope, artist: Models.ArtistListVM): void;
        IsActive($scope: VM.IArtistModalScope, artist: Models.ArtistListVM): boolean;
        SetArtistList(): void;
        SaveModal($scope: VM.IArtistModalScope): void;
        Cancel($scope: any): void;
    }
}
declare module FC.Modules.Artists.Controllers {
    class ArtistOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.IArtistOverview;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, FestivalService: FC.Modules.Festival.Services.FestivalService, NewsService: FC.Modules.News.Services.NewsService, RatesService: FC.Modules.Rates.Services.RatesService, $sce: any, GenreService: FC.Modules.Genres.Services.GenreService);
        DoEdit(partialName: string, $scope: Models.IArtistOverview, model: FC.Shared.Models.UArtist): void;
        DoSort(sortIndex: string): void;
        setArtists(): void;
        DoDelete(artist: FC.Shared.Models.UArtist): void;
    }
}
declare module FC.Modules.Artists.Models {
    class ArtistListVM {
        GenreNames: string;
        ArtistName: string;
        CountryName: string;
        ThumbnailID: string;
        LogoID: string;
        IsPublished: boolean;
        ArtistID: string;
    }
}
declare module FC.Modules.Artists.Models {
    interface IArtistDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UArtist[]> {
        Artists: ArtistListVM[];
    }
}
declare module FC.Modules.Artists.Models {
    interface IArtistOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UArtist> {
        Artists: FC.Modules.Artists.Models.ArtistListVM[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}
declare module FC.Modules.Artists.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class ArtistService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.UArtist> {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        Search(keyword: string): ng.IPromise<INT.IServiceResponse<INT.IArtistListVm[]>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<INT.IArtistListVm[]>>;
        GetSorted(sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<FC.Modules.Artists.Models.ArtistListVM[]>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<MODELS.UArtist[]>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.UArtist>>;
        GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<MODELS.UArtist[]>>;
        Create(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Auth {
    class Auth {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var AuthModule: FC.Modules.Auth.Auth;
declare module FC.Core.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import SM = FC.Shared.ServiceMessages;
    class AuthService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        static Token: string;
        static SessionID: string;
        static UserID: string;
        static IsAuthorized: boolean;
        static IsAuthenticated: boolean;
        static Session: MODELS.AppUserSession;
        static User: MODELS.ApplicationUser;
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        HasAuth(roles: string[]): ng.IPromise<boolean>;
        IsAuth(model: SM.IsAuthMsg): ng.IPromise<INT.IServiceResponse<MODELS.AppUserSession>>;
        Login(model: SM.LoginMsg): ng.IPromise<INT.IServiceResponse<MODELS.AppUserSession>>;
        Logout(model: SM.LogoutMsg): ng.IPromise<INT.IServiceResponse<boolean>>;
    }
}
declare module FC.Modules.Auth.Controllers {
    class AuthController extends FC.Shared.Controllers.BaseController {
        private _inst;
        CacheManager: FC.Shared.Util.CacheManager;
        AuthSvc: FC.Core.Services.AuthService;
        $scope: FC.Shared.ViewModels.IAuthVM;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, AuthService: FC.Core.Services.AuthService, $sce: any);
        initialize($scope: FC.Shared.ViewModels.IAuthVM): void;
        StartLogout($scope: FC.Shared.ViewModels.IAuthVM): void;
        SubmitLoginForm($scope: FC.Shared.ViewModels.IAuthVM): void;
        SubmitRegisterForm($scope: any): void;
    }
}
declare module FC.Modules.Auth.Directives {
    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    interface AuthDirectiveScope extends VM.IFormVMBase<any> {
        inst: any;
        directories: INT.IMediaDirectory[];
        children: INT.IMediaDirectory[];
        Activate: Function;
        subChildHtml: string;
        ActiveDir: INT.IMediaDirectory;
    }
    class AuthDirective {
        link: (scope: AuthDirectiveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        AuthService: FC.Core.Services.AuthService;
        $http: ng.IHttpService;
        $q: ng.IQService;
        $scope: AuthDirectiveScope;
        private _element;
        private _attrs;
        replace: boolean;
        $compile: any;
        constructor($route: any, $routeParams: any, $location: any, $http: ng.IHttpService, $q: ng.IQService, $compile: any);
        static factory(): ($route: any, $routeParams: any, $location: any, $http: any, $q: any, $compile: any) => AuthDirective;
    }
}
declare module FC.Modules.Banners {
    class Banners {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var BannerModule: FC.Modules.Banners.Banners;
declare module FC.Modules.Banners.Services {
    import INT = FC.Shared.Interfaces;
    class BannerService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        GetBanners(filter: FC.Shared.ServiceMessages.BannerFilter): ng.IPromise<FC.Shared.Interfaces.IServiceResponse<FC.Shared.Models.UBanner[]>>;
    }
}
declare module FC.Core {
    class Auth {
        constructor();
    }
}
declare module FC.Core.Controllers {
    import VM = FC.Shared.ViewModels;
    class CONFIRMATION {
        static OK: string;
        static CANCEL: string;
        static FORCE: string;
        static EDIT: string;
        static CREATE: string;
        static DELETE: string;
        static PUBLISH: string;
        static FORCE_DELETE: string;
    }
    class AlertController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        $scope: VM.IDetailScope<any>;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: VM.IDetailScope<any>, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService, local: any);
        DoDeleteConfirm(confirm: string): void;
        Close($scope: VM.IFormVMBase<any>): void;
    }
}
declare module FC.Core.Controllers {
    import VM = FC.Shared.ViewModels;
    class HeadController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        URLManSvc: FC.Core.Services.URLManagerService;
        $sce: any;
        $scope: VM.IFormVMBase<any>;
        vm: any;
        MtModal: angular.material.MDDialogService;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: VM.IDetailScope<any>, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService);
        Close($scope: VM.IFormVMBase<any>): void;
    }
}
declare module STD.Controllers {
    class RolePickerController extends FC.Shared.Controllers.BaseController {
        inst: STD.Controllers.RolePickerController;
        URLManSvc: FC.Core.Services.URLManagerService;
        $sce: any;
        $scope: STD.IRolePicker;
        value: any;
        MtModal: angular.material.MDDialogService;
        static $inject: string[];
        constructor($e: any, $http: ng.IHttpService, $q: ng.IQService, $scope: STD.IRolePicker, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        OpenRolesModal(): void;
        DoChange(): void;
        Close(): void;
    }
}
declare module STD.Controllers {
    class RolePickerDialogController extends FC.Shared.Controllers.BaseController {
        inst: STD.Controllers.RolePickerController;
        $sce: any;
        $scope: STD.Models.IRolePickerDialog;
        value: any;
        MtModal: angular.material.MDDialogService;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: STD.Models.IRolePickerDialog, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        DoSelectAll(): void;
        DoChange(): void;
        Close(): void;
    }
}
declare module STD.Controllers {
    import VM = FC.Shared.ViewModels;
    class StdDatePickerController extends FC.Shared.Controllers.BaseController {
        inst: STD.Controllers.StdDatePickerController;
        URLManSvc: FC.Core.Services.URLManagerService;
        $sce: any;
        $scope: STD.IStdDatePicker;
        value: any;
        MtModal: angular.material.MDDialogService;
        static $inject: string[];
        constructor($e: any, $http: ng.IHttpService, $q: ng.IQService, $scope: STD.IStdDatePicker, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        DoChange($scope: STD.IStdDatePicker): void;
        Close($scope: VM.IFormVMBase<any>): void;
    }
}
declare module STD {
    import VM = FC.Shared.ViewModels;
    interface IRolePicker extends VM.IFormVMBase<any> {
        inst: any;
        ID: string;
        value: FC.List<FC.Shared.Models.Role>;
        ModelName: string;
        Label: string;
    }
    class RolePickerDirective implements ng.IDirective {
        link: (scope: IRolePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        AuthService: FC.Core.Services.AuthService;
        $http: ng.IHttpService;
        $q: ng.IQService;
        $scope: IRolePicker;
        private _element;
        private _attrs;
        templateUrl: string;
        controller: typeof Controllers.RolePickerController;
        controllerAs: string;
        replace: boolean;
        $compile: any;
        require: string[];
        scope: {
            value: string;
        };
        bindToController: IRolePicker;
        constructor($route: any, $routeParams: any, $location: any, $http: ng.IHttpService, $q: ng.IQService, $compile: any);
        static factory(): ($route: any, $routeParams: any, $location: any, $http: any, $q: any, $compile: any) => RolePickerDirective;
    }
}
declare module STD {
    import VM = FC.Shared.ViewModels;
    interface IStdDatePicker extends VM.IFormVMBase<any> {
        inst: any;
        ID: string;
        Day: string;
        Month: string;
        Year: string;
        Hours: string;
        Minutes: string;
        Seconds: string;
        ChangeEvent: string;
        DoChange: Function;
        PrevYear: string;
        NextYear: string;
        CurrentYear: string;
        Days: string[];
        MODEL: any;
        ModelName: string;
        Label: string;
        CurrentValue: string;
        TimeVisible: boolean;
        DateVisible: boolean;
        DayVisible: boolean;
        IconVisible: boolean;
        Columns: string;
        value: Date;
    }
    interface IStdDatePickerValue {
        value: any;
    }
    class DatePickerDirective implements ng.IDirective {
        link: (scope: IStdDatePicker, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        AuthService: FC.Core.Services.AuthService;
        $http: ng.IHttpService;
        $q: ng.IQService;
        $scope: IStdDatePicker;
        private _element;
        private _attrs;
        templateUrl: string;
        controller: typeof Controllers.StdDatePickerController;
        replace: boolean;
        $compile: any;
        require: string[];
        scope: {
            value: string;
        };
        bindToController: IStdDatePicker;
        constructor($route: any, $routeParams: any, $location: any, $http: ng.IHttpService, $q: ng.IQService, $compile: any);
        static factory(): ($route: any, $routeParams: any, $location: any, $http: any, $q: any, $compile: any) => DatePickerDirective;
    }
}
declare module FC.Core.Directives {
}
declare module STD.Models {
    interface IRolePickerDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Role> {
        ActiveRoles: FC.IList<FC.Shared.Models.Role>;
        Activated: FC.Shared.Models.Role;
        SysRoles: FC.IList<FC.Shared.Models.Role>;
    }
}
declare module FC.Core.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class GeoIPService extends FC.Core.ServiceBase {
        static $inject: string[];
        private Localization;
        private Euro;
        private Rates;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Media>>>;
        GetByIP(ip?: string): ng.IPromise<INT.IServiceResponse<INT.IFreeGeoIPModel>>;
    }
}
declare module FC.Core.Services {
    import INT = FC.Shared.Interfaces;
    class Coordinate {
        x: number;
        y: number;
    }
    class NominatimService extends FC.Core.ServiceBase {
        static $inject: string[];
        private Localization;
        private Euro;
        private Rates;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        GetCoordByCode(code: string): ng.IPromise<Coordinate>;
    }
}
declare module FC.Core.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class RolesService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Role>>>;
        Create(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Core.Validation {
    enum ValidationRule {
        Email = 0,
        Zip = 1,
        Website = 2,
        Name = 3,
        Phone = 4,
        Number = 5,
        Word = 6,
        Text = 7,
        Sentence = 8,
        Any = 9,
        FacebookURL = 10,
        TwitterURL = 11,
        InstagramURL = 12,
        YoutubeURL = 13,
        FlickrURL = 14,
        GoogleURL = 15,
        LinkedInURL = 16,
        MySpaceURL = 17,
        SoundcloudURL = 18,
        PinterestURL = 19,
        DeezerURL = 20,
        SpotifyURL = 21,
        Guid = 22,
    }
    class ValidationRuleItem {
        Rule: Validation;
        FieldName: string;
        FieldLabel: string;
    }
    class Validation {
        HasRegex: boolean;
        Regex: string;
        Required: boolean;
        MaxLength: number;
        Rule: ValidationRule;
        InvalidMsg: string;
        RequiredMsg: string;
        private setRegex(r);
        constructor(rule: ValidationRule, required?: boolean);
    }
}
declare module FC.Core.Validation {
    class ValidationError {
        Fieldname: string;
        Message: string;
    }
}
declare module FC.Core.Validation {
    class Validator {
        v: FC.Core.Validation.Validation;
        Validate(value: any, rule: FC.Core.Validation.ValidationRule, required?: boolean): boolean;
    }
}
declare module FC.Modules.Countries {
    class Countries {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var CountriesModule: FC.Modules.Countries.Countries;
declare module FC.Modules.Countries.Controllers {
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class CountryFilterController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Countries.Controllers.CountryFilterController;
        ShowTravelInfo: boolean;
        GenreService: FC.Modules.Genres.Services.GenreService;
        ArtistService: FC.Modules.Artists.Services.ArtistService;
        CalendarService: FC.Modules.Calendar.Services.CalendarService;
        URLManSvc: FC.Core.Services.URLManagerService;
        BannerService: FC.Modules.Banners.Services.BannerService;
        MemReg: FC.Shared.Util.MemReg;
        Modal: any;
        _TmpModal: any;
        $sce: any;
        MediaPickerSaveEvent: string;
        $scope: VM.ICountryFilterVm;
        vm: any;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $mdDialog: any, $scope: any, $route: any, $routeParams: any, $location: any, $sce: any);
        IsActive(country: FC.Shared.Models.UCountry): boolean;
        ToggleCountry($scope: VM.ICountryFilterVm, country: MODELS.UCountry): void;
        SetCountryList(): void;
        Save($scope: VM.ICountryFilterVm): void;
        Close($scope: VM.ICountryFilterVm): void;
        Reset($scope: VM.ICountryFilterVm): void;
    }
}
declare module FC.Modules.Countries.Controllers {
    class CountryOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.ICountryOverview;
        CountriesService: FC.Modules.Countries.Services.CountriesService;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, FestivalService: FC.Modules.Festival.Services.FestivalService, NewsService: FC.Modules.News.Services.NewsService, RatesService: FC.Modules.Rates.Services.RatesService, $sce: any, CountriesService: FC.Modules.Countries.Services.CountriesService);
        DoSort(sortIndex: string): void;
        setCountries(): void;
        DoDelete(Country: FC.Shared.Models.UCountry): void;
    }
}
declare module FC.Modules.Countries.Models {
    interface ICountryOverview extends FC.Shared.ViewModels.IFormVMBase<any> {
        Countries: FC.Shared.Models.UCountry[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}
declare module FC.Modules.Countries.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class CountriesService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UCountry>>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UCountry[]>>;
        GetSorted(sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UCountry[]>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetCountry(id: string): ng.IPromise<INT.IServiceResponse<INT.IUCountry>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<INT.IUCountry[]>>;
        GetByCode(code: string): ng.IPromise<INT.IServiceResponse<INT.IUCountry>>;
        Create(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Delete(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Update(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        ForceDelete(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
    }
}
declare module FC.Modules.Details {
    class Details {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        static $inject: string[];
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var DetailsModule: FC.Modules.Details.Details;
declare module FC.Modules.Details.Controllers {
    import VM = FC.Shared.ViewModels;
    class ArtistDetailsController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        $scope: VM.IDetailScope<FC.Shared.Models.UArtist>;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $uibModal: any, $scope: FC.Shared.ViewModels.IDetailScope<FC.Shared.Models.UArtist>, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        Close($scope: VM.IDetailScope<FC.Shared.Models.Location>, $parent: VM.IDetailScope<FC.Shared.Models.Location>): void;
        LogoSaveListener(): void;
        DoEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.UArtist>, ev: any): void;
        private setArtistDetailData(detailID);
        private setLocationDetailData(detailID);
        determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute): void;
    }
}
declare module FC.Modules.Details.Controllers {
    import VM = FC.Shared.ViewModels;
    class LocationDetailsController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        $scope: VM.IDetailScope<FC.Shared.Models.Location>;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: FC.Shared.ViewModels.IDetailScope<FC.Shared.Models.Location>, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService, GenreService: FC.Modules.Genres.Services.GenreService, ArtistsService: FC.Modules.Artists.Services.ArtistService, FestivalService: FC.Modules.Festival.Services.FestivalService, CalendarService: FC.Modules.Calendar.Services.CalendarService, LocationService: FC.Modules.Location.Services.LocationService);
        Close($scope: VM.IDetailScope<FC.Shared.Models.Location>, $parent: VM.IDetailScope<FC.Shared.Models.Location>): void;
        LogoSaveListener(): void;
        DoEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.Location>, ev: any): void;
        private setNewsDetailData(detailID);
        private setArtistDetailData(detailID);
        private setReportDetailData(detailID);
        private setLocationDetailData(detailID);
        determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute): void;
    }
}
declare module FC.Modules.Details.Controllers {
    import VM = FC.Shared.ViewModels;
    class DetailsController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        $scope: VM.IDetailScope<FC.Shared.Models.UFestival>;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: any, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService, GenreService: FC.Modules.Genres.Services.GenreService, ArtistsService: FC.Modules.Artists.Services.ArtistService, FestivalService: FC.Modules.Festival.Services.FestivalService, CalendarService: FC.Modules.Calendar.Services.CalendarService, LocationService: FC.Modules.Location.Services.LocationService);
        Close($scope: VM.IDetailScope<FC.Shared.Models.UFestival>, $parent: VM.IDetailScope<FC.Shared.Models.UFestival>): void;
        ListenRefresh(): void;
        LocationSaveListener(): void;
        LogoSaveListener(): void;
        ArtistSaveListener(): void;
        DoStartEdit(partialName: string, $scope: VM.IDetailScope<FC.Shared.Models.UFestival>, ev: any): void;
        private setFestivalDetailData(detailID);
        private setLocationDetailData(detailID);
        determineDetailType($routeParams: ng.RouteData, $route: ng.route.IRoute): void;
    }
}
declare module FC.Modules.Details.Controllers {
    import VM = FC.Shared.ViewModels;
    class FestivalDetailDialogController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        $scope: VM.IDetailScope<FC.Shared.Models.UFestival>;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: any, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        private setFestivalDetailData(detailID);
    }
}
declare module FC.Modules.Details.Models {
    interface IFestivalDetailDialog extends FC.Shared.ViewModels.IFormVMBase<any> {
        StartTime: string;
        EndTime: string;
    }
}
declare module FC.Modules.Details.Models {
    interface IFestivalDateDialog extends FC.Shared.ViewModels.IFormVMBase<any> {
        MtModal: ng.material.MDDialogService;
    }
}
declare module FC.Modules.Details.Models {
    interface IFestivalNameDialog extends FC.Shared.ViewModels.IFormVMBase<any> {
        MtModal: ng.material.MDDialogService;
        DoSaveEditName: Function;
    }
}
declare module FC.Modules.Favorites {
    class Favorites {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var FavoritesModule: FC.Modules.Favorites.Favorites;
declare module FC.Modules.Favorites.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class FavoriteService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Favorite>>>;
        MarkFavorite(contentID: string, contentType: FC.Shared.Enum.InternalContentType): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        GetUserFavorites(): ng.IPromise<INT.IServiceResponse<IList<FC.Shared.Models.Favorite>>>;
        IsFavorite(contentID: string): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        UnmarkFavorite(contentID: string): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Festival.Models {
    class FestivalListVM {
        GenreNames: string;
        ZIPCode: string;
        FestivalName: string;
        CountryName: string;
        City: string;
        IsPublished: boolean;
        StartDate: Date;
        EndDate: Date;
        ProfileImageID: string;
        LogoID: string;
        FestivalID: string;
        StartDateExplosion: FC.Shared.ViewModels.DateVM;
        EndDateExplosion: FC.Shared.ViewModels.DateVM;
    }
}
declare module FC.Modules.Festival.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class LineupService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.LineupItem>>>;
        GetByStage(stageID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.LineupItem>>>;
        Create(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Festival.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class StageService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Stage>>>;
        GetByFestival(festivalID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Stage>>>;
        Create(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Genres {
    class Genres {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var GenresModule: FC.Modules.Genres.Genres;
declare module FC.Modules.Genres.Controllers {
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class GenreFilterController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Genres.Controllers.GenreFilterController;
        $scope: VM.IGenreFilterVM;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $mdDialog: any, $scope: any, $route: any, $routeParams: any, $location: any, $sce: any);
        IsActive(genre: FC.Shared.Models.UGenre): boolean;
        ToggleGenre($scope: VM.IGenreFilterVM, genre: MODELS.UGenre): void;
        SetGenreList(): void;
        Save($scope: VM.IGenreFilterVM): void;
        Close($scope: VM.IGenreFilterVM): void;
        Reset($scope: VM.IGenreFilterVM): void;
    }
}
declare module FC.Modules.Genres.Controllers {
    class GenreOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.IGenreOverview;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, FestivalService: FC.Modules.Festival.Services.FestivalService, NewsService: FC.Modules.News.Services.NewsService, RatesService: FC.Modules.Rates.Services.RatesService, $sce: any, GenreService: FC.Modules.Genres.Services.GenreService);
        DoSort(sortIndex: string): void;
        setGenres(): void;
        DoDelete(Genre: FC.Shared.Models.UGenre): void;
    }
}
declare module FC.Modules.Genres.Models {
    interface IGenreOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UGenre> {
        ShowMoreURL: string;
        ShowMore: boolean;
        Genres: FC.Shared.Models.UGenre[];
    }
}
declare module FC.Modules.Location {
    class Location {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        static $inject: string[];
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var LocationModule: FC.Modules.Location.Location;
declare module FC.Modules.Location.Controllers {
    import SCM = FC.Shared.CoreModel;
    class LocationCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.ILocationCRUDVM;
        Recovery: SCM.Recovery;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: any, $scope: Models.ILocationCRUDVM, $route: ng.route.IRouteProvider, $routeParams: any, $location: any, $sce: any, $mdDialog: any);
        private removeCharacters(zipcode);
        AutoFill(): void;
        AddValidation(): void;
        DoSaveCreate($scope: Models.ILocationCRUDVM): void;
        DoSaveEdit($scope: Models.ILocationCRUDVM): void;
        DoSaveDelete($scope: Models.ILocationCRUDVM): void;
        RecoverModel(): void;
    }
}
declare module FC.Modules.Location.Controllers {
    class LocationOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.ILocationOverview;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, FestivalService: FC.Modules.Festival.Services.FestivalService, NewsService: FC.Modules.News.Services.NewsService, RatesService: FC.Modules.Rates.Services.RatesService, $sce: any, GenreService: FC.Modules.Genres.Services.GenreService);
        DoEdit(partialName: string, $scope: Models.ILocationOverview, model: FC.Shared.Models.Location): void;
        DoSort(sortIndex: string): void;
        setLocations(): void;
        DoDelete(Location: FC.Shared.Models.Location): void;
    }
}
declare module FC.Modules.Location.Controllers {
    class LocationDialogController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Location.Controllers.LocationDialogController;
        $scope: Models.ILocationDialog;
        MtModal: angular.material.MDDialogService;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: any, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        SetCountry($scope: Models.ILocationDialog, countryID: string): void;
        AddLocationThumbSavedListener($scope: Models.ILocationDialog): void;
        AddProfileImageSavedListener($scope: Models.ILocationDialog): void;
        DoEdit($scope: Models.ILocationDialog, model: FC.Shared.Models.Location): void;
        DoCreate($scope: Models.ILocationDialog, countryID: string): void;
        DoSaveCreate($scope: Models.ILocationDialog): void;
        GetLocations($scope: Models.ILocationDialog, countryID: string): void;
        DoSaveEdit($scope: Models.ILocationDialog): void;
        DoSave($scope: Models.ILocationDialog): void;
    }
}
declare module FC.Modules.Location.Models {
    interface ILocationCRUDVM extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        WizardStep: number;
        LocationID: string;
        LatLongSet: boolean;
        MapsURL: string;
        MapsReady: boolean;
    }
}
declare module FC.Modules.Location.Models {
    import MODELS = FC.Shared.Models;
    interface ILocationDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        MtModal: ng.material.MDDialogService;
        GetLocations: Function;
        Locations: MODELS.Location[];
        SetCountry: Function;
        CountryName: string;
        PhoneCodes: any;
        PhoneCode: string;
        SelectedImagePath: string;
    }
}
declare module FC.Modules.Location.Models {
    interface ILocationOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.Location> {
        Locations: FC.Shared.Models.Location[];
        LocationID: string;
        Key: string;
        CountrySortID: string;
        SearchKey: string;
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}
declare module FC.Modules.Menu.Models {
    interface IMenuCRUD extends FC.Shared.ViewModels.IFormVMBase<any> {
        MenuSections: List<FC.Shared.Models.MenuSection>;
        MenuItems: List<FC.Shared.Models.MenuItem>;
        MenuItemModel: FC.Shared.Models.MenuItem;
        MenuSectionModel: FC.Shared.Models.MenuSection;
    }
}
declare module FC.Modules.Location.Services {
    import INT = FC.Shared.Interfaces;
    class GeonamesService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        /**
         * The gets the english city name by postalcode & two letter country code
         * @param postalcode (6832) etc.
         * @param country (NL, UK, US) etc.
         */
        Search(postalcode: any, country: any): ng.IPromise<any>;
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
    }
}
declare module FC.Modules.Location.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class LocationService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>>;
        Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>>;
        GetSorted(countryID: string, sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>>;
        GetPagedCount(countryID: string, page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetLocation(LocationId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Location>>;
        GetByCountry(countryID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>>;
        Create(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Update(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Delete(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        ForceDelete(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
    }
}
declare module FC.Modules.Menu {
    class Menu {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var MenuModule: FC.Modules.Menu.Menu;
declare module FC.Modules.Menu.Controllers {
    class MenuCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.IMenuCRUD;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, $sce: ng.ISCEService);
        DoSave(action: string, sectionOrItem: string): void;
        setData(): void;
    }
}
declare module FC.Modules.Menu.Controllers {
    import MODELS = FC.Shared.Models;
    class MenuOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.IMenuOverview;
        MenuSectionService: FC.Modules.Menu.Services.MenuSectionService;
        MenuItemService: FC.Modules.Menu.Services.MenuItemService;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, $sce: any, MenuSectionService: FC.Modules.Menu.Services.MenuSectionService, MenuItemService: FC.Modules.Menu.Services.MenuItemService);
        DoSort(sortIndex: string): void;
        setMenu(): void;
        DoDelete(section: FC.Shared.Models.MenuSection): void;
        DoDeleteMenuItem(item: MODELS.MenuItem): void;
    }
}
declare module FC.Modules.Genres.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class GenreService extends FC.Core.ServiceBase {
        static $inject: string[];
        private rootGenres;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UGenre>>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UGenre[]>>;
        GetSorted(sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UGenre[]>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        Search(key: string): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.UGenre>>;
        GetAllRoot(): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>>;
        GetAllGenres(): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>>;
        GetAllChildGenres(): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>>;
        GetAllDefault(): ng.IPromise<INT.IServiceResponse<Array<INT.IUGenre>>>;
        GetAllDefaultIds(): ng.IPromise<INT.IServiceResponse<Array<string>>>;
        Filter(filter: INT.IGenreFilter): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>>;
        GetFestival(festivalId: number): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.FestivalDetailScope>>;
        Regenerate(): any;
        Create(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Shared.Interfaces {
    interface IUGenre extends IBaseModel {
        VisibleOnHome: number;
        Name: string;
        Thumbnail: string;
        Theme: IUTheme;
        Children: Array<IUGenre>;
        GenreID: string;
        ThemeID: string;
        ParentID: string;
        Image: string;
    }
}
declare module FC.Modules.Menu.Controllers {
    class QuickMenuController extends FC.Shared.Controllers.BaseController {
        static $inject: string[];
        CacheManager: FC.Shared.Util.CacheManager;
        $scope: Models.IQuickMenu;
        QuickMenuService: Services.QuickMenuService;
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: angular.material.MDDialogService);
        HandleMIClick(clickStr: string): void;
        init(pageKey: string): void;
    }
}
declare module FC.Modules.Menu.Models {
    interface IMenuOverview extends FC.Shared.ViewModels.IFormVMBase<any> {
        MenuSections: List<FC.Shared.Models.MenuSection>;
        MenuItems: FC.Shared.Models.MenuItem[];
        Roles: FC.Shared.Models.Role[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}
declare module FC.Modules.News.Models {
    interface INewsDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews> {
        News: FC.Shared.Models.UNews[];
        PageNum: number;
    }
}
declare module FC.Modules.Menu.Models {
    interface IQuickMenu extends FC.Shared.ViewModels.IFormVMBase<any> {
        PageKey: string;
        MenuSections: FC.Shared.Models.MenuSection[];
    }
}
declare module FC.Modules.Menu.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class MenuItemService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.MenuItem> {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        GetBySectionID(sectionID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        GetSorted(sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuItem>>;
        GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>>;
        Create(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Menu.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class MenuSectionService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.MenuSection> {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>>;
        Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>>;
        GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>>;
        GetSorted(sortIndex: string, page?: number): ng.IPromise<INT.IServiceResponse<IList<FC.Shared.Models.MenuSection>>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuSection>>;
        GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuSection[]>>;
        Create(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Menu.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class QuickMenuService extends FC.Core.ServiceBase {
        static $inject: string[];
        private rootGenres;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>>;
        GetMenu(pageKey?: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.MenuSection[]>>;
    }
}
declare module FC.Modules.News {
    class News {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var NewsModule: FC.Modules.News.News;
declare module FC.Modules.News.Controllers {
    class NewsCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: Models.INewsCRUD;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, $sce: ng.ISCEService);
        DoSave(action: string): void;
        NewsImageSaved(e: CustomEventInit): void;
        DateChanged(e: CustomEventInit): void;
        setData(): void;
    }
}
declare module FC.Modules.News.Controllers {
    class NewsDialogController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.News.Controllers.NewsDialogController;
        $scope: Models.INewsDialog;
        NewsService: FC.Modules.News.Services.NewsService;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $scope: Models.INewsDialog, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $sce: ng.ISCEService);
        ShowMore($scope: Models.INewsDialog): void;
        RegisterModel($scope: Models.INewsDialog): void;
        DoCreate($scope: Models.INewsDialog): void;
        DoEdit($scope: Models.INewsDialog): void;
        DoDelete($scope: Models.INewsDialog): void;
        Close($scope: Models.INewsDialog): void;
    }
}
declare module FC.Modules.News.Controllers {
    class NewsOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst;
        ShowTravelInfo: boolean;
        GenreService: FC.Modules.Genres.Services.GenreService;
        ArtistService: FC.Modules.Artists.Services.ArtistService;
        URLManSvc: FC.Core.Services.URLManagerService;
        BannerService: FC.Modules.Banners.Services.BannerService;
        $sce: any;
        $scope: Models.INewsOverview;
        vm: any;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, $sce: any);
        DateChanged(options: CustomEventInit): void;
        setDetailData(): void;
        DoDelete(): void;
        setData(): void;
    }
}
declare module FC.Modules.News.Models {
    interface INewsCRUD extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews> {
        Date: Date;
        Overview: FC.Shared.Models.UNews[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}
declare module FC.Modules.News.Models {
    interface INewsOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UNews[]> {
        Date: Date;
        ShowMoreURL: string;
        ShowMore: boolean;
        Detail: FC.Shared.Models.UNews;
    }
}
declare module FC.Modules.Social {
    class Social {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var SocialModule: FC.Modules.Social.Social;
declare module FC.Modules.Social.Controllers {
    class SocialDialogController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Details.Controllers.DetailsController;
        SocialService: FC.Modules.Social.Services.SocialService;
        URLManSvc: FC.Core.Services.URLManagerService;
        $sce: any;
        $scope: Models.ISocialDialog;
        $genericID: string;
        $contentType: FC.Shared.Enum.SocialMediaBindable;
        vm: any;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $uibModal: any, $scope: any, $mdDialog: angular.material.MDDialogService, $route: ng.route.IRoute, $routeParams: ng.RouteData, $location: ng.ILocationService, $profiles: FC.Shared.Models.SocialProfile[], $genericId: string, $contentType: FC.Shared.Enum.SocialMediaBindable, UrlManagerService: FC.Core.Services.URLManagerService, $sce: ng.ISCEService, $socialService: FC.Modules.Social.Services.SocialService);
        listen(): void;
        SetRule(): void;
        DoCreate(step: number): void;
        private setData();
    }
}
declare module FC.Modules.Social.Models {
    interface ISocialDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.SocialProfile> {
        ProfileTypes: FC.Shared.Models.SocialProfileType[];
        SelectedTypeID: string;
        SocialProfiles: FC.Shared.Models.SocialProfile[];
        WizardCreateStep: number;
        CreateModel: FC.Shared.Models.SocialProfile;
        GenericID: string;
        ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
declare module FC.Modules.Social.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class SocialService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.SocialProfile> {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfileType>>>;
        GetAllTypes(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfileType>>>;
        GetPagedCount(page: number, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfile>>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.SocialProfile>>;
        GetByContentID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.SocialProfile>>;
        GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfile>>>;
        Create(msg: FC.Shared.ServiceMessages.SocialProfileMsg): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Shared.Models {
    class Ticket {
        TicketID: string;
        AuthorID: string;
        Price: number;
        Author: FC.Shared.Models.ApplicationUser;
        TicketName: string;
        TicketDescription: string;
        IsAvailable: boolean;
        IsEarlyBird: boolean;
        IsVipTicket: boolean;
        IsDiscount: boolean;
        IsCombiDeal: boolean;
        IsAllinclusive: boolean;
        ExternalTicketURL: string;
        InternalURL: string;
        Created: string;
        Modified: string;
        ArchiveDate: string;
        Deleted: boolean;
        CurrencyBase: string;
    }
}
declare module FC.Modules.Ticket {
    class Ticket {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        static $inject: string[];
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var TicketModule: FC.Modules.Ticket.Ticket;
declare module FC.Modules.Ticket.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class TicketService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Ticket>>>;
        GetTicket(TicketId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Ticket>>;
        GetByFestival(festivalID: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Ticket>>;
        Create(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Update(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Delete(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        ForceDelete(Ticket: FC.Shared.Models.Ticket): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
    }
}
declare module FC.Shared.CoreModel {
    class FormDirty {
        FormID: string;
        FormName: string;
        FormLocation: string;
    }
    class Recovery {
        private static inst;
        private static MemReg;
        Register: FC.Core.CoreModel.Dictionary<string, FC.Core.CoreModel.Dictionary<string, string>>;
        constructor();
        static RepairArray<T>(arr: Array<T>): Array<T>;
        static RecoverModel<T>(formID: string, model: T): T;
        static Add(formID: string, fieldName: string, value: string): void;
        static WriteFormDirty(formID: string, location: string, formName: string): void;
        static DetectDirty(): void;
        static ClearFormDirty(formID: string): void;
        static ClearAllDirty(): void;
        static Get<T>(formID: string, fieldName: string): string;
        static SaveState(formID: string, locationPath: string): void;
        static FinishForm(formID: string): void;
    }
}
declare module FC.Shared.Enum {
    enum AuthMode {
        FACEBOOK = 0,
        SPOTIFY = 1,
        DEEZER = 2,
        MYSPACE = 3,
        TWITTER = 4,
        YOUTUBE = 5,
        GOOGLE = 6,
        LOCAL = 7,
    }
}
declare module FC.Shared.Enum {
    class CurrencyBase {
        static AED: string;
        static AFN: string;
        static ALL: string;
        static AMD: string;
        static ANG: string;
        static AOA: string;
        static ARS: string;
        static AUD: string;
        static AWG: string;
        static AZN: string;
        static BAM: string;
        static BBD: string;
        static BDT: string;
        static BGN: string;
        static BHD: string;
        static BIF: string;
        static BMD: string;
        static BND: string;
        static BOB: string;
        static BRL: string;
        static BSD: string;
        static BTN: string;
        static BWP: string;
        static BYN: string;
        static BZD: string;
        static CAD: string;
        static CDF: string;
        static CHF: string;
        static CLP: string;
        static CNY: string;
        static COP: string;
        static CRC: string;
        static CUC: string;
        static CUP: string;
        static CVE: string;
        static CZK: string;
        static DJF: string;
        static DKK: string;
        static DOP: string;
        static DZD: string;
        static EGP: string;
        static ERN: string;
        static ETB: string;
        static EUR: string;
        static FJD: string;
        static FKP: string;
        static GBP: string;
        static GEL: string;
        static GGP: string;
        static GHS: string;
        static GIP: string;
        static GMD: string;
        static GNF: string;
        static GTQ: string;
        static GYD: string;
        static HKD: string;
        static HNL: string;
        static HRK: string;
        static HTG: string;
        static HUF: string;
        static IDR: string;
        static ILS: string;
        static IMP: string;
        static INR: string;
        static IQD: string;
        static IRR: string;
        static ISK: string;
        static JEP: string;
        static JMD: string;
        static JOD: string;
        static JPY: string;
        static KES: string;
        static KGS: string;
        static KHR: string;
        static KMF: string;
        static KPW: string;
        static KRW: string;
        static KWD: string;
        static KYD: string;
        static KZT: string;
        static LAK: string;
        static LBP: string;
        static LKR: string;
        static LRD: string;
        static LSL: string;
        static LYD: string;
        static MAD: string;
        static MDL: string;
        static MGA: string;
        static MKD: string;
        static MMK: string;
        static MNT: string;
        static MOP: string;
        static MRO: string;
        static MUR: string;
        static MVR: string;
        static MWK: string;
        static MXN: string;
        static MYR: string;
        static MZN: string;
        static NAD: string;
        static NGN: string;
        static NIO: string;
        static NOK: string;
        static NPR: string;
        static NZD: string;
        static OMR: string;
        static PAB: string;
        static PEN: string;
        static PGK: string;
        static PHP: string;
        static PKR: string;
        static PLN: string;
        static PYG: string;
        static QAR: string;
        static RON: string;
        static RSD: string;
        static RUB: string;
        static RWF: string;
        static SAR: string;
        static SBD: string;
        static SCR: string;
        static SDG: string;
        static SEK: string;
        static SGD: string;
        static SHP: string;
        static SLL: string;
        static SOS: string;
        static SPL: string;
        static SRD: string;
        static STD: string;
        static SVC: string;
        static SYP: string;
        static SZL: string;
        static THB: string;
        static TJS: string;
        static TMT: string;
        static TND: string;
        static TOP: string;
        static TRY: string;
        static TTD: string;
        static TVD: string;
        static TWD: string;
        static TZS: string;
        static UAH: string;
        static UGX: string;
        static USD: string;
        static UYU: string;
        static UZS: string;
        static VEF: string;
        static VND: string;
        static VUV: string;
        static WST: string;
        static XAF: string;
        static XCD: string;
        static XDR: string;
        static XOF: string;
        static XPF: string;
        static YER: string;
        static ZAR: string;
        static ZMW: string;
        static ZWD: string;
        static ToArray(): string[];
    }
}
declare module FC.Shared.Enum {
    enum GenericMessageStatus {
        DBError = 100,
        SystemError = 200,
        GenericError = 300,
        AuthorizationError = 400,
        HTTPError = 500,
        UIError = 600,
        InvalidTestResult = 700,
        SensitiveDataError = 800,
        SecurityBreach = 900,
        Warning = 1000,
        Info = 2000,
        Message = 3000,
    }
}
declare module FC.Shared.Enum {
    enum InternalContentType {
        Festival = 0,
        Discount = 1,
        User = 2,
        Profile = 3,
        Ticket = 4,
        Location = 5,
        News = 6,
        Report = 7,
        Genre = 8,
        Artist = 9,
    }
}
declare module FC.Shared.Enum {
    enum SocialMediaBindable {
        Festival = 0,
        Artist = 1,
        News = 2,
        Genre = 3,
        User = 4,
        Location = 5,
        Reseller = 6,
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    import VM = FC.Shared.ViewModels;
    interface ICreate {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    interface IDelete {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    interface IForceDelete {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    interface IUpdate {
        (model: any): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
    interface IServiceBase<T> {
        Create: ICreate;
        Delete: IDelete;
        Update: IUpdate;
        ForceDelete: IForceDelete;
    }
}
declare module FC.Shared.Models {
    class Favorite {
        FavID: string;
        ContentID: string;
        ContentType: FC.Shared.Enum.InternalContentType;
        UserID: string;
        User: FC.Shared.Models.ApplicationUser;
    }
}
declare module FC.Shared.Models {
    class FestivalTicket {
        IsAllinclusive: boolean;
        IsCombiDeal: boolean;
        IsDiscount: boolean;
        CurrencyBase: string;
        constructor(currencyBase: string);
    }
}
declare module FC.Shared.Models {
    class LineupItem {
        LineupItemID: string;
        StageID: string;
        ArtistID: string;
        Artist: UArtist;
        StartDate: Date;
        EndDate: Date;
        StartDateKey: number;
        EndDateKey: number;
        StartDateExplosion: FC.Shared.ViewModels.DateVM;
        EndDateExplosion: FC.Shared.ViewModels.DateVM;
    }
}
declare module FC.Shared.Models {
    class Location {
        LocationID: string;
        Address: string;
        ZIPCode: string;
        City: string;
        CountryID: string;
        Country: UCountry;
        LocationName: string;
        Website: string;
        Email: string;
        Phone: string;
        Social: Array<SocialProfile>;
        MapsURL: string;
        ProfileHeaderImageID: string;
        ProfileHeaderImage: Media;
        ThumbnailID: string;
        Thumbnail: Media;
        MediaDirectoryID: string;
        Album: MediaDirectory;
        ProfileImageID: string;
        ProfileImage: Media;
        Created: Date;
        Modified: Date;
        ArchiveDate: Date;
        Deleted: boolean;
        AuthorID: string;
        Latitude: number;
        Longitude: number;
    }
}
declare module FC.Shared.Models {
    class MediaType {
        MediaTypeID: string;
        Name: string;
        FontAwesomeIcon: string;
        MimeTypes: Array<FC.Shared.Models.MimeType>;
    }
}
declare module FC.Shared.Models {
    class MenuItem {
        MenuItemID: string;
        ParentID: string;
        OpositeID: string;
        SortOrder: number;
        FAIcon: string;
        Title: string;
        URL: string;
        OnClick: string;
        IsSpecific: boolean;
        SectionID: string;
        Name: string;
        Deleted: boolean;
        IsPublished: boolean;
    }
}
declare module FC.Shared.Models {
    class MenuSection {
        SectionID: string;
        Name: string;
        FAIcon: string;
        SortOrder: string;
        PageKey: string;
        MenuItems: MenuItem[];
        Deleted: boolean;
        IsPublished: boolean;
    }
}
declare module FC.Shared.Models {
    class MimeType {
        MimeTypeID: string;
        Name: string;
        Mime: string;
    }
}
declare module FC.Shared.Models {
    class SocialProfile {
        SocialProfileID: string;
        URL: string;
        ProfileType: SocialProfileType;
        ProfileTypeID: string;
        GenericID: string;
        ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
declare module FC.Shared.Models {
    class SocialProfileType {
        SocialProfileTypeID: string;
        FontAwesomeIcon: string;
        MediaID: string;
        Name: string;
        Created: Date;
        Modified: Date;
    }
}
declare module FC.Shared.Models {
    class Stage {
        StageID: string;
        Name: string;
        FestivalID: string;
        Created: string;
        Modified: string;
        Deleted: boolean;
        IsPublished: boolean;
        AuthorID: string;
        LineUp: List<LineupItem>;
    }
}
declare module FC.Shared.Models {
    class ZIPSearchResult {
        adminCode2: string;
        adminCode1: string;
        adminName2: string;
        lng: number;
        countryCode: string;
        postalCode: string;
        adminName1: string;
        ISO3166_2: string;
        placeName: string;
        lat: number;
    }
}
declare module FC.Shared.Enum {
    class Roles {
        static Anonymous: string;
        static UserAdmin: string;
        static Reporter: string;
        static GenreAdmin: string;
        static RoleAdmin: string;
        static Analyzer: string;
        static EndUser: string;
        static Developer: string;
        static Customer: string;
        static Journalist: string;
        static Bot: string;
        static BannerAdmin: string;
        static AnnouncementAdmin: string;
        static NewsAdmin: string;
        static Partner: string;
        static ArtistAdmin: string;
        static Admin: string;
        static SponsorAdmin: string;
        static FestivalAdmin: string;
        static Owner: string;
        static GetAnonymous(): string[];
        static GetAllRoot(): string[];
        static GetAllPartner(): string[];
        static GetAll(): string[];
        static GetAdmins(): string[];
    }
}
declare module FC.Shared.Models {
    class ApplicationUser {
        UserID: string;
        UserCount: string;
        UserName: string;
        UserPassword: string;
        UserCode: string;
        UserFirstname: string;
        UserLastname: string;
        UserMiddlename: string;
        UserAddress: string;
        UserAddressNR: string;
        UserEmailAddress: string;
        UserProfileIMG: string;
        UserActivated: string;
        UserPhoneNumber: string;
        UserFacebookID: string;
        UserTwitterID: string;
        UserInstagramID: string;
        Roles: FC.Shared.Models.Role[];
        Social: Array<SocialProfile>;
    }
}
declare module FC.Shared.Models {
    class AppUserSession {
        SessionID: string;
        UserID: string;
        User: ApplicationUser;
        Token: string;
        Active: boolean;
        IPAddress: string;
        IPv6Address: string;
        LoginCount: number;
        HostName: string;
        HostAddress: string;
        Country: string;
        Expires: string;
        Created: Date;
        Modified: Date;
        Culture: string;
        UserAgent: string;
        ScreenWidth: string;
        ScreenHeight: string;
        Authorized: boolean;
        Authenticated: boolean;
        IsMobileDevice: boolean;
        BrowserName: string;
        Platform: string;
        MobileDeviceName: string;
        MobileDeviceVersion: string;
        Mode: FC.Shared.Enum.AuthMode;
        Controller: string;
        Action: string;
        URI: string;
        Payload: string;
    }
}
declare module FC.Shared.Models {
    class Permission {
        PermissionID: string;
        PermissionKey: string;
        Weight: number;
    }
}
declare module FC.Shared.Models {
    class Role {
        RoleID: string;
        Name: string;
        Permissions: FC.Shared.Models.Permission[];
    }
}
declare module FC.Shared.ServiceMessages {
    class IsAuthMsg {
        SessionID: string;
        Token: string;
        Roles: Array<string>;
    }
}
declare module FC.Shared.ServiceMessages {
    class LogoutMsg {
        SessionID: string;
        UserID: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class RegisterMsg {
        Password: string;
        AcceptTerms: boolean;
        UserEmailAddress: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class LoginMsg {
        Username: string;
        PassOrCode: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class SocialProfileMsg {
        SocialProfile: FC.Shared.Models.SocialProfile;
        GenericID: string;
        ContentType: FC.Shared.Enum.SocialMediaBindable;
    }
}
declare module FC {
    enum Operator {
        GreaterThen = 0,
        SmallerThen = 1,
        Larger = 2,
        Smaller = 3,
        Equality = 4,
        Inequality = 5,
        LargerEqual = 6,
        SmallerEqual = 7,
    }
    enum Logical {
        Or = 0,
        And = 1,
    }
    interface IWhere {
        Key: string;
        Value: string;
        /**
        *@Operator '!= / == / > / < / >= / <= '
        */
        Operator: string;
    }
    interface IList<T> extends Array<T> {
        /**
         * Get the first element in list.
         */
        First(): T;
        /**
         * Get the last element in list.
         */
        Last(): T;
        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        Find(key: string, value: any): T;
        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        Contains(key: string, value: string): boolean;
        /**
         * Add item to list.
         * @param item
         */
        Add(item: T): void;
        /**
         * Add multiple to list.
         * @param items
         */
        AddRange(items: List<T>): void;
        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        RemoveRange(range: List<T>, keyName: string): List<T>;
        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        Remove(item: T, keyName: string): List<T>;
        /**
         * Remove null values when deleted from array.
         */
        Repair(): List<T>;
    }
    class List<T> extends Array<T> implements Array<T>, IList<T> {
        /**
         * An array with extension methods.
         * @param data when data is not null, the passed array is transformed to a list.
         */
        constructor(data?: T[]);
        /**
         * Get the first element in list.
         */
        First(): T;
        /**
         * Get the last element in list.
         */
        Last(): T;
        /**
         * The key in object to match value against.
         * @param key the key.
         * @param value the value to match against.
         */
        Find(key: string, value: any): T;
        /**
         * Returns true when value matches.
         * @param key
         * @param value
         */
        Contains(key: string, value: string): boolean;
        /**
         * Add item to list.
         * @param item
         */
        Add(item: T): void;
        /**
         * Add multiple to list.
         * @param items
         */
        AddRange(items: List<T>): void;
        /**
         * @param range the items to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        RemoveRange(range: List<T>, keyName: string): List<T>;
        /**
         * @param item the item to delete from the list.
         * @param keyName the name of the key to delete. e.g. ID,Name etc..
         */
        Remove(item: T, keyName: string): List<T>;
        /**
         * Remove null values when deleted from array.
         */
        Repair(): List<T>;
    }
}
declare module FC.Shared.Util {
    class QueueMsg {
        key: string;
        completed: boolean;
        failed: boolean;
    }
    class LoadQueue {
        queue: QueueMsg[];
        static lqinst: LoadQueue;
        static GetInstance(): LoadQueue;
        TriggerComplete(key: string): void;
        TriggerFailure(key: string): void;
        Listen(key: string): void;
    }
}
declare module FC.Shared.Util {
    enum ValidationRule {
        Email = 0,
        Zip = 1,
        Website = 2,
        Phone = 3,
        Number = 4,
        Word = 5,
        Text = 6,
        Sentence = 7,
        Any = 8,
        FacebookURL = 9,
        TwitterURL = 10,
        InstagramURL = 11,
        YoutubeURL = 12,
        FlickrURL = 13,
        GoogleURL = 14,
        LinkedInURL = 15,
        MySpaceURL = 16,
        SoundcloudURL = 17,
        PinterestURL = 18,
        DeezerURL = 19,
        SpotifyURL = 20,
        Guid = 21,
        BigText = 22,
        ShortText = 23,
        Time = 24,
    }
    class _VALIDATOR_REGITEM {
        fieldID: string;
        rule: ValidationRule;
        msg: string;
        required: boolean;
    }
    class Validator {
        HasRegex: boolean;
        Regex: string;
        Required: boolean;
        MaxLength: number;
        Rule: ValidationRule;
        InvalidMsg: string;
        RequiredMsg: string;
        private static instance;
        private _register;
        static GetInstance(): Validator;
        Validate(rule: ValidationRule, fieldID: string, fieldValue: string): void;
        constructor(instKey: string);
        private setRegex(r);
    }
}
declare module FC.Shared.ViewModels {
    class ArtistListVM {
        ArtistID: string;
        Thumbnail: FC.Shared.Models.Media;
        Name: string;
        CountryName: string;
    }
}
declare module FC.Shared.ViewModels {
    interface IAuthVM extends IFormVMBase<any> {
        inst: FC.Modules.Auth.Controllers.AuthController;
        HasAuth: boolean;
        LoginFormVM: ServiceMessages.LoginMsg;
        SubmitLoginForm: Function;
        RegisterFormVM: ServiceMessages.RegisterMsg;
        SubmitRegisterForm: Function;
        StartLogout: Function;
        initialize: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface ICalendarVm extends IFormVMBase<any> {
        MediaURLRoot: string;
        Festivals: FC.Shared.ViewModels.IFestivalVM[];
        ActiveGenres: FC.Shared.Models.UGenre[];
        SysGenres: FC.Shared.Models.UGenre[];
        ActiveCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ActiveMonth: number;
        ActiveMonthNum: number;
        ActiveYear: number;
        Banners: FC.Shared.Models.UBanner[];
        IsFestivalsLoading: boolean;
        SearchNoResults: boolean;
        Searching: boolean;
        HasSearchResults: boolean;
        BaseIsLoading: boolean;
        Festivals_COL1: FC.Shared.Models.UFestival[];
        Festivals_COL2: FC.Shared.Models.UFestival[];
        Col1Banner: FC.Shared.Models.UBanner;
        Col2Banner: FC.Shared.Models.UBanner;
        Col2BannerKey: number;
        Col1BannerKey: number;
    }
}
declare module FC.Shared.ViewModels {
    interface ICountryFilterVm extends IFormVMBase<any> {
        SelectedCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ToggleCountry: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface ICountryModalVm extends IFormVMBase<any> {
        ActiveCountries: FC.Shared.Models.UCountry[];
        SysCountries: FC.Shared.Models.UCountry[];
        ActiveCountryCount: number;
        HasCount: boolean;
        IsOpen: boolean;
        $dismiss: any;
    }
}
declare module FC.Shared.ViewModels {
    class DateVM {
        Month: string;
        Day: string;
        Y1: string;
        Y2: string;
        Y3: string;
        Y4: string;
        Year: string;
        AgoString: string;
        Hour: string;
        Minute: string;
    }
}
declare module FC.Shared.ViewModels {
    class DetailVM {
        Image: string;
        ID: string;
        Title: string;
        Description: string;
        ShortText: string;
        Social: Array<FC.Shared.Models.SocialProfile>;
        Website: string;
        URL: string;
    }
}
declare module FC.Shared.ViewModels {
    interface IFestivalVM {
        City: string;
        Country: FC.Shared.Models.UCountry;
        DateExplosion: FC.Shared.ViewModels.DateVM;
        Location: string;
        FestivalID: string;
        DateString: string;
        Daycount: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        IMG: string;
        Name: string;
        GenreCount: string;
        URL: string;
        MediaObsolete: boolean;
        SpotifyURL: string;
        Visitors: string;
        IsTopFestival: string;
        FacebookUR: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        CountryName: string;
        OrderDate: number;
    }
}
declare module FC.Shared.ViewModels {
    import MOD = FC.Shared.Models;
    interface IFestivalCRUDVM extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UFestival> {
        inst: FC.Modules.Festival.Controllers.FestivalCRUDController;
        MediaURLRoot: string;
        formID: string;
        FestivalID: string;
        FestivalLogoPath: string;
        SysArtists: Array<MOD.UArtist>;
        SysGenres: Array<MOD.UGenre>;
        SysCountries: Array<MOD.UCountry>;
        MediaPickerSaveEvt: string;
        HasAuth: boolean;
        StartYear: string;
        StartMonth: string;
        StartDay: string;
        EndYear: string;
        EndMonth: string;
        EndDay: string;
        SelectedStartMonthDays: string[];
        SelectedEndMonthDays: string[];
        WizardStep: number;
        GetMediaPickerFieldState: Function;
        GetArtistPickerFieldState: Function;
        Recovery: FC.Shared.CoreModel.Recovery;
        GetDaysInMonthStart: Function;
        GetDaysInMonthEnd: Function;
        DoStartDateBlur: Function;
        DoEndDateBlur: Function;
        startDateStr: string;
        endDateStr: string;
        MinDateStart: Date;
        MaxDateStart: Date;
        MaxDateEnd: Date;
        MinDateEnd: Date;
        DoChangeStartDate: Function;
        DoEndDateChange: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface IGenreFilterVM extends IFormVMBase<any> {
        SelectedGenres: FC.Shared.Models.UGenre[];
        SysGenres: FC.Shared.Models.UGenre[];
        IsGenresLoading: boolean;
        ToggleGenre: Function;
        Save: Function;
        Reset: Function;
        Close: Function;
        IsActive: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface IGenreModalVm extends IFormVMBase<any> {
        ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SysGenres: FC.Shared.Models.UGenre[];
        IsGenresLoading: boolean;
        animationsEnabled: boolean;
        ToggleState: Function;
        SaveState: Function;
        IsActive: Function;
        Controller: FC.Modules.Filtering.Controllers.FilterController;
    }
}
declare module FC.Shared.ViewModels {
    interface IDetailScope<T> extends FC.Shared.ViewModels.IFormVMBase<T> {
        inst: any;
        Detail: FC.Shared.ViewModels.DetailVM;
        Festival: FC.Shared.Models.UFestival;
        StartTime: string;
        EndTime: string;
        Artist: FC.Shared.Models.UArtist;
        NewsItem: FC.Shared.Models.UNews;
        Location: FC.Shared.Models.Location;
        User: FC.Shared.Models.ApplicationUser;
        HeadLines: Array<FC.Shared.Models.UNews>;
        SimilarEvents: Array<FC.Shared.Models.UFestival>;
        ProfileHeaderImg: string;
        DoEditProfileHeader: Function;
        MtModal: angular.material.MDDialogService;
        MtModal2: angular.material.MDDialogService;
        DoStartEdit: Function;
        Close: Function;
        OpenMediaModal: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface INewsVM extends IFormVMBase<FC.Shared.Models.UNews> {
    }
}
declare module FC.Shared.ViewModels {
    interface SaveFieldState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string, value: any): void;
    }
    interface GetFieldState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string): void;
    }
    interface SaveFormState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>): any;
    }
    interface RecoverModel<T> {
        (model: T, $scope: FC.Shared.ViewModels.IVMBase): T;
    }
    interface FinishForm {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
    }
    interface BindForm {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
    }
    interface DestroyAlerts {
        ($scope: FC.Shared.ViewModels.IVMBase): void;
    }
    interface IFormVMBase<T> extends IVMBase {
        $sce: ng.ISCEService;
        $local: any;
        UserFavorites: List<FC.Shared.Models.Favorite>;
        META: FC.Shared.Controllers.META;
        MEDIA_ROOT_ID: string;
        ENV: FC.Core.Environment;
        RecoverModel: RecoverModel<T>;
        TinymceOptions: any;
        SaveEventName: string;
        SaveFailEventName: string;
        model: T;
        MediaURLRoot: string;
        MtModal: angular.material.MDDialogService;
        Close: Function;
        GetFieldState: GetFieldState;
        SaveFieldState: SaveFieldState;
        SaveFormState: SaveFormState;
        FinishForm: FinishForm;
        DoCreate: Function;
        DoDelete: Function;
        DoEdit: Function;
        DoSaveEdit: Function;
        DoSaveDelete: Function;
        DoSaveForceDelete: Function;
        DoSaveCreate: Function;
        DoDetail: Function;
        DoSave: Function;
        DoCancelCRUD: Function;
        DoSearch: Function;
        DoCancelSearch: Function;
        SearchResult: Array<any>;
        SearchKey: string;
        IsSearching: boolean;
        IsCreating: boolean;
        IsCreated: boolean;
        IsEditing: boolean;
        IsEdited: boolean;
        IsDeleting: boolean;
        IsDeleted: boolean;
        IsForceDeleted: boolean;
        IsViewDetail: boolean;
        IsLoading: boolean;
        IsSubmitting: boolean;
        IsValidating: boolean;
        IsValidated: boolean;
        ModelIsValid: boolean;
        IsFailure: boolean;
        IsSuccess: boolean;
        IsAuthorized: boolean;
    }
    interface IVMBase extends ng.IScope {
        $location: ng.ILocationService;
        $route: ng.route.IRouteService;
        $routeParams: any;
        $q: ng.IQService;
        inst: any;
        PageKey: string;
        FormID: string;
        BindedFormID: string;
        PageNum: number;
        UserID: string;
        SessionID: string;
        Now: Date;
        ActiveYear: number;
        ActiveMonth: number;
        DestroyAlerts: DestroyAlerts;
        SysGenres: FC.Shared.Models.UGenre[];
        SysCountries: FC.Shared.Models.UCountry[];
        MediaIsObsolete: Function;
        IsThemesLoading: boolean;
        IsCountriesLoading: boolean;
        IsGenresLoading: boolean;
        IsFestivalsLoading: boolean;
        FormatDate: Function;
        RepairArray: Function;
        MemReg: FC.Shared.Util.MemReg;
        ServerMsg: string;
        LogoutURL: string;
        $dismiss: any;
    }
}
declare module FC.Shared.ViewModels {
    interface IMenuVM extends FC.Shared.ViewModels.IFormVMBase<any> {
        ToggleMobile: Function;
        ToggleGenreFilter: Function;
        ToggleCountryFilter: Function;
        CloseMenu: Function;
        GenreCount: number;
        CountryCount: number;
        ArtistCount: number;
        FestivalCount: number;
        OpenLoginModal: Function;
        OpenMyProfileModal: Function;
    }
}
declare module FC.Shared.ViewModels {
    class RepositoryState {
        SUCCESS: boolean;
        EXISTS: boolean;
        INVALID: boolean;
        DBERROR: boolean;
        ERROR: boolean;
        MSG: string;
        NOT_AUTHORIZED: boolean;
        ValidationErrors: Array<FC.Shared.ViewModels.ValidationError>;
        AffectedID: string;
    }
}
declare module FC.Shared.ViewModels {
    class ValidationError {
        Fieldname: string;
        Message: string;
    }
}
declare module FC.Modules.Calendar {
    class Calendar {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var CalendarModule: FC.Modules.Calendar.Calendar;
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    import UTIL = FC.Shared.Util;
    class BaseModel implements INT.IBaseModel {
        protected _validationRegister: FC.Shared.Util._VALIDATOR_REGITEM[];
        protected validator: UTIL.Validator;
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    interface IFestivalMonthItem extends INT.IBaseModel {
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: INT.IUCountry;
        City: string;
        Location: string;
        TicketPrice: string;
        DailyTicketPrice: string;
        Visitors: string;
        StartDate: string;
        EndDate: string;
        Genres: string;
        IsTopFestival: string;
        Stages: string;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SpotifyURL: string;
        DeezerURL: string;
        CultureEndDate: string;
        CultureStartDate: string;
        DayCount: string;
    }
}
declare module FC.Modules.Calendar.Models {
    import INT = FC.Shared.Interfaces;
    class FestivalMonthItem extends FC.Shared.Models.BaseModel implements FC.Shared.Interfaces.IFestivalMonthItem {
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: INT.IUCountry;
        City: string;
        Location: string;
        TicketPrice: string;
        DailyTicketPrice: string;
        Visitors: string;
        StartDate: string;
        EndDate: string;
        Genres: string;
        GenreList: Array<string>;
        IsTopFestival: string;
        Stages: string;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SpotifyURL: string;
        DeezerURL: string;
        CultureStartDate: string;
        CultureEndDate: string;
        DayCount: string;
        constructor(f: INT.IFestivalMonthItem);
    }
}
declare module FC.Modules.Calendar.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class CalendarService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        GetMonths(): ng.IPromise<INT.IServiceResponse<Array<string>>>;
        GetFestivals(genre: number, month: number, year: number): ng.IPromise<INT.IServiceResponse<Array<INT.IFestivalMonthItem>>>;
        GetFestivalsByCountry(genre: number, month: number, year: number, country: number): ng.IPromise<INT.IServiceResponse<Array<INT.IFestivalMonthItem>>>;
        GetDaysInMonth(year: number, month: number): ng.IPromise<INT.IServiceResponse<string[]>>;
        GetFilteredFestivals(month: number, year: number, genres: Array<MODELS.UGenre>, countries: Array<MODELS.UCountry>): ng.IPromise<INT.IServiceResponse<VM.IFestivalVM[]>>;
        GetByMonthYear(month: number, year: number): ng.IPromise<INT.IServiceResponse<VM.IFestivalVM[]>>;
    }
}
declare module FC.Core.Services {
    import INT = FC.Shared.Interfaces;
    class LocalizationService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        GetLocaleInfo(): ng.IPromise<INT.IServiceResponse<Localization>>;
        Regenerate(): any;
    }
}
declare module FC.Core.Services {
    class URLManagerService extends FC.Core.ServiceBase {
        private URLCollection;
        Html5Mode: boolean;
        UrlHash: string;
        $http: ng.IHttpService;
        $q: any;
        $sce: ng.ISCEService;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: any, $sce: ng.ISCEService);
        GetList(): ng.IPromise<FC.Shared.Interfaces.IServiceResponse<any>>;
        AddURL(scope: string, key: string, url: string): void;
        GetURL(scope: string, key: string, urlArgs: Array<string>): string;
    }
}
declare module FC.Modules.Festival {
    class Festival {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        static $inject: string[];
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var FestivalModule: FC.Modules.Festival.Festival;
declare module FC.Modules.Festival.Controllers {
    import SCM = FC.Shared.CoreModel;
    class FestivalCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst;
        $scope: FC.Shared.ViewModels.IFestivalCRUDVM;
        Recovery: SCM.Recovery;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: any, $scope: FC.Shared.ViewModels.IFestivalCRUDVM, $route: ng.route.IRouteProvider, $routeParams: any, $location: any, $sce: any, $mdDialog: any);
        DoChangeStartDate($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        DoSaveCreate($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        DoSaveEdit($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        DoSaveDelete($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        RecoverModel(): void;
        GetMediaPickerFieldState($scope: FC.Shared.ViewModels.IFestivalCRUDVM, name: string): void;
        GetArtistPickerFieldState($scope: FC.Shared.ViewModels.IFestivalCRUDVM, name: string): void;
        SaveFormState($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        AddListeners($scope: FC.Shared.ViewModels.IFestivalCRUDVM): void;
        private _InitGenres();
    }
}
declare module FC.Modules.Genres.Controllers {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class GenrePickerController extends FC.Shared.Controllers.BaseController {
        inst: FC.Modules.Genres.Controllers.GenrePickerController;
        $scope: VM.IGenrePickerScope;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $mdDialog: any, $scope: any, $route: any, $routeParams: any, $location: any, $sce: any);
        DoSearch($scope: VM.IGenrePickerScope): void;
        DoCancelSearch($scope: VM.IGenrePickerScope): void;
        Close($scope: VM.IGenrePickerScope): void;
        ToggleSelected($scope: VM.IGenrePickerScope, state: boolean): void;
        DoCreate($scope: VM.IGenrePickerScope): void;
        DoEdit($scope: VM.IGenrePickerScope, genre: MODELS.UGenre): void;
        DoDelete($scope: VM.IGenrePickerScope, genre: MODELS.UGenre): void;
        DoSaveEditGenre($scope: VM.IGenrePickerScope): void;
        DoSaveDeleteGenre($scope: VM.IGenrePickerScope): void;
        DoSaveForceDeleteGenre($scope: VM.IGenrePickerScope): void;
        Filter(): void;
        Deactivate($scope: VM.IGenrePickerScope, genre: INT.IUGenre, saveEvt: string, model: Array<MODELS.UGenre>): void;
        Activate($scope: VM.IGenrePickerScope, genre: MODELS.UGenre, formID: string, saveEvt?: string): void;
        RegisterEvt(evt: string): void;
        IsActive($scope: VM.IGenrePickerScope, genre: INT.IUGenre): boolean;
        SetGenreList(): void;
        DoAddGenre($scope: VM.IGenrePickerScope): void;
        Cancel($scope: VM.IFormVMBase<MODELS.UGenre>): void;
        Save($scope: VM.IFormVMBase<MODELS.UGenre>): void;
    }
}
declare module FC.Modules.Festival.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class FestivalService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UFestival>>>;
        GetUpcoming(): ng.IPromise<INT.IServiceResponse<FC.Modules.Festival.Models.FestivalListVM[]>>;
        GetFestival(festivalId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UFestival>>;
        Create(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Update(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        Delete(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        ForceDelete(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
    }
}
declare module FC.Modules.Filtering {
    class Filtering {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var FilteringModule: FC.Modules.Filtering.Filtering;
declare module FC.Modules.Filtering.Controllers {
    import MODELS = FC.Shared.Models;
    class CountryModalController extends FC.Shared.Controllers.BaseController {
        CountryData: Array<MODELS.UCountry>;
        CacheManager: FC.Shared.Util.CacheManager;
        ActiveMonthName: string;
        ActiveCountryIDs: Array<string>;
        GenreData: any;
        Modal: any;
        ShowMore: number;
        $scope: FC.Shared.ViewModels.ICountryModalVm;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any);
        OpenCountryModal(size: any): void;
        SetActiveCountriesScope(): void;
        IsOpen(id: any): boolean;
        ToggleItem(id: any): void;
        Reset(): void;
        Remember(): void;
    }
}
declare module FC.Modules.Filtering.Controllers {
    import INT = FC.Shared.Interfaces;
    class FilterController extends FC.Shared.Controllers.BaseController {
        private CalendarSvc;
        CalendarMonths: Array<string>;
        CalendarYears: Array<number>;
        CountryData: Array<INT.IUCountry>;
        CountryID: number;
        private UrlManager;
        ActiveYear: number;
        ActiveMonth: number;
        CacheManager: FC.Shared.Util.CacheManager;
        ActiveMonthName: string;
        ActiveGenres: FC.Core.CoreModel.Dictionary<string, FC.Shared.Models.UGenre>;
        SysGenres: INT.IUGenre[];
        Modal: any;
        ShowMore: number;
        $scope: FC.Shared.ViewModels.IGenreModalVm;
        months: string[];
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any);
        IsActive(genre: FC.Shared.Models.UGenre, scope: FC.Shared.ViewModels.IGenreModalVm): boolean;
        ToggleState(genre: FC.Shared.Models.UGenre, scope: FC.Shared.ViewModels.IGenreModalVm): void;
        OpenModal(size: any): void;
    }
}
declare module FC.Modules.Loading.Controllers {
    class LoadController extends FC.Shared.Controllers.BaseController {
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any);
    }
}
declare module FC.Modules.Loading.Directives {
    function LoadingDirective(): ng.IDirective;
}
declare module FC.Modules.Loading {
    class Loading {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var LoadingModule: FC.Modules.Loading.Loading;
declare module FC.Modules.Media {
    class Media {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var MediaModule: FC.Modules.Media.Media;
declare module FC.Modules.Media.Controllers {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class MediaModalController extends FC.Shared.Controllers.BaseController {
        private MediaSvc;
        private EventManager;
        private MemReg;
        Modal: any;
        MediaModal: any;
        ShowMore: number;
        $scope: FC.Shared.ViewModels.IMediaModalScope;
        Crumb: Array<INT.IMediaDirectory>;
        MediaPickerSaveEvt: string;
        private $sce;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $uibModal: any, $mdDialog: any, MediaSvc: FC.Modules.Media.Services.MediaService, $sce: any, $local: any);
        DoCreate($scope: VM.IMediaModalScope): void;
        handleDroppedFiles($scope: VM.IMediaModalScope, files: Array<File>, $form: any): void;
        initAdvancedUpload($scope: VM.IMediaModalScope): void;
        isAdvancedUpload(): boolean;
        ShortenFileName(name: string): string;
        private Repair(arr);
        GoBack($scope: VM.IMediaModalScope, dir: INT.IMediaDirectory): void;
        Activate($scope: VM.IMediaModalScope, dir: INT.IMediaDirectory): void;
        RegisterEvt(evt: string): void;
        Save($scope: FC.Shared.ViewModels.IMediaModalScope): void;
        Close($scope: any): void;
        ActivateMediaItem($scope: VM.IMediaModalScope, item: INT.IMedia): void;
        SetDirectories($scope: VM.IMediaModalScope): void;
        GetChildren($scope: VM.IMediaModalScope, id: string): void;
        DoSubmit(): void;
        DoCancelCRUD($scope: VM.IMediaModalScope): void;
        DoDeleteMediaDir($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory, force?: boolean): void;
        DoSaveDeleteMediaDir($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory, force?: boolean): void;
        DoDeleteMediaItem($scope: VM.IMediaModalScope, media: MODELS.Media, force?: boolean): void;
        DoSaveDelete($scope: VM.IMediaModalScope, media: MODELS.Media, force?: boolean): void;
        DoCreateMediaItem($scope: VM.IMediaModalScope, dir: MODELS.MediaDirectory): void;
        DoSaveCreate($scope: VM.IMediaModalScope, media: FC.Shared.Models.Media): void;
        DoEditMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory): void;
        DoSaveEditMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory): void;
        DoCreateMediaDir($scope: VM.IMediaModalScope, dirID: string): void;
        DoSaveCreateMediaDir($scope: VM.IMediaModalScope, dir: FC.Shared.Models.MediaDirectory): void;
    }
}
declare module FC.Modules.Media.Directives {
    import INT = FC.Shared.Interfaces;
    class Crumb {
        DirectoryID: string;
        DirName: string;
        Parent: Crumb;
        Level: number;
    }
    interface IMBScope extends ng.IScope {
        _INST: any;
        directories: INT.IMediaDirectory[];
        children: INT.IMediaDirectory[];
        Activate: Function;
        subChildHtml: string;
        ActiveDir: INT.IMediaDirectory;
    }
    class MediaBrowserDirective {
        link: (scope: IMBScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, $http, $q, $compile) => void;
        ThemingSvc: FC.Modules.Theming.Services.ThemingService;
        MediaSvc: FC.Modules.Media.Services.MediaService;
        $http: ng.IHttpService;
        $q: ng.IQService;
        $scope: IMBScope;
        private _element;
        private _attrs;
        template: string;
        templateUrl: string;
        controller: typeof Controllers.MediaModalController;
        controllerAs: string;
        replace: boolean;
        crumbPath: Crumb[];
        $compile: any;
        constructor($route: any, $routeParams: any, $location: any, $http: ng.IHttpService, $q: ng.IQService, $compile: any);
        static factory(): ($route: any, $routeParams: any, $location: any, $http: any, $q: any, $compile: any) => MediaBrowserDirective;
    }
}
declare module FC.Modules.Media.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class MediaService extends FC.Core.ServiceBase {
        static $inject: string[];
        Token: FC.Shared.Util.Storage<string>;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Media>>>;
        GetRoot(): ng.IPromise<INT.IServiceResponse<FC.Shared.Interfaces.IMediaDirectory>>;
        GetDirectories(): ng.IPromise<INT.IServiceResponse<FC.Shared.Interfaces.IMediaDirectory[]>>;
        GetByID(id: string): ng.IPromise<INT.IServiceResponse<INT.IMedia>>;
        GetDirByID(id: string): ng.IPromise<INT.IServiceResponse<INT.IMediaDirectory>>;
        GetDirectoryMedia(id: string): ng.IPromise<INT.IServiceResponse<INT.IMedia[]>>;
        GetAllChildren(parentId: string): ng.IPromise<INT.IServiceResponse<INT.IMediaDirectory[]>>;
        CreateDirectory(dir: FC.Shared.ServiceMessages.MediaDirectoryMsg): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        UploadFiles(files: Array<File>, dirID: string, token: string, width?: number, height?: number, thumb?: boolean): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>>;
        DeleteMedia(media: FC.Shared.Models.Media): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        DeleteMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDeleteMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        EditMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Menu.Controllers {
    import VM = FC.Shared.ViewModels;
    class MenuController extends FC.Shared.Controllers.BaseController {
        static $inject: string[];
        CacheManager: FC.Shared.Util.CacheManager;
        $scope: FC.Shared.ViewModels.IMenuVM;
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: angular.material.MDDialogService);
        OpenLoginModal($scope: VM.IMenuVM): void;
        OpenMyProfileModal($scope: VM.IMenuVM): void;
        ToggleGenreFilter($scope: VM.IMenuVM): void;
        ToggleCountryFilter($scope: VM.IMenuVM): void;
        ToggleMobile($scope: VM.IMenuVM): void;
    }
}
declare module FC.Shared.Models {
    class UNews {
        constructor();
        NewsID: string;
        Title: string;
        Date: Date;
        Text: string;
        ThumbnailID: string;
        Thumbnail: Media;
        Genres: Array<UGenre>;
        SourceURL: string;
        SourceName: string;
        Type: string;
        Album: MediaDirectory;
        AlbumID: string;
        DisplayDate: string;
        DisplayTime: string;
        DateKey: string;
        MetaKeys: string;
        MetaDescription: string;
    }
}
declare module FC.Modules.News.Controllers {
    import INT = FC.Shared.Interfaces;
    class NewsController extends FC.Shared.Controllers.BaseController {
        ActiveNewsID: number;
        NewsItem: INT.IUNews;
        private NewsSvc;
        GenreService: FC.Modules.Genres.Services.GenreService;
        $scope: FC.Shared.ViewModels.INewsVM;
        UserGenres: Array<string>;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, NewsSvc: FC.Modules.News.Services.NewsService);
        private _Init();
    }
}
declare module FC.Modules.News.Models {
    class NewsVm {
        Title: string;
        Content: string;
        DisplayDate: string;
        GenreID: string;
        Type: string;
        Img: string;
        Link: string;
        SortDate: Date;
        UmbracoID: number;
        constructor(data: NewsVm);
    }
}
declare module FC.Modules.News.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    class NewsService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UNews>>>;
        GetNews(genreId: number): ng.IPromise<INT.IServiceResponse<Array<INT.IContentDetail>>>;
        GetNewsById(newsId: string): ng.IPromise<INT.IServiceResponse<MODELS.UNews>>;
        GetPaged(page: number, month: string, year: string): ng.IPromise<INT.IServiceResponse<MODELS.UNews[]>>;
        GetPagedCount(page: number, month: string, year: string): ng.IPromise<INT.IServiceResponse<number>>;
        GetFilteredNews(genres: Array<string>): ng.IPromise<INT.IServiceResponse<Array<INT.IContentDetail>>>;
        Create(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Update(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        Delete(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
        ForceDelete(News: MODELS.UNews): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>;
    }
}
declare module FC.Modules.Rates.Model {
    import CM = FC.Core.CoreModel;
    class Rates {
        constructor(data: Rates);
        Base: string;
        Date: Date;
        Rates: CM.Dictionary<string, number>;
    }
}
declare module FC.Modules.Rates {
    class Rates {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var RatesModule: FC.Modules.Rates.Rates;
declare module FC.Modules.Rates.Services {
    import INT = FC.Shared.Interfaces;
    class RatesService extends FC.Core.ServiceBase {
        static $inject: string[];
        private Localization;
        private Euro;
        private Rates;
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        EurToUc(eur: number, localization: INT.IUserLocalization, callback: Function, scope: ng.IScope): void;
        Regenerate(): any;
    }
}
declare module FC.Modules.Rating {
    class Rating {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var RatingModule: FC.Modules.Rating.Rating;
declare module FC.Modules.Rating.Controllers {
    class RatingController extends FC.Shared.Controllers.BaseController {
        RatingSvc: FC.Modules.Rating.Services.RatingService;
        Stars: string[];
        $scope: any;
        static $inject: string[];
        constructor($http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, $mdDialog: any, RatingService: FC.Modules.Rating.Services.RatingService);
        GetRates(contentItemID: string, type: string): void;
        Rate(contentItemID: string, type: string, index: any): void;
    }
}
declare module FC.Modules.Rating.Directives {
    class RatingDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        template: string;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Theming.Services.ThemingService) => RatingDirective;
    }
}
declare module FC.Modules.Rating.Services {
    import INT = FC.Shared.Interfaces;
    class RatingService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<any>>;
        GetRate(ContentItemID: string, ContentItemType: string): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RatingVm>>;
        Rate(ContentItemID: string, ContentItemType: string, CreditAmmount: number): ng.IPromise<INT.IServiceResponse<string>>;
    }
}
declare module FC.Modules.Search {
    class Search {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var SearchModule: FC.Modules.Search.Search;
declare module FC.Modules.Search.Controllers {
    class SearchController extends FC.Shared.Controllers.BaseController {
        $scope: FC.Shared.Scopes.ISearchScope;
        SearchService: FC.Modules.Search.Services.SearchService;
        CacheManager: FC.Shared.Util.CacheManager;
        static $inject: string[];
        constructor($mdDialog: any, $http: any, $q: any, $scope: any, $route: any, $routeParams: any, $location: any, SearchService: FC.Modules.Search.Services.SearchService);
        initializeServices(SearchSvc: FC.Modules.Search.Services.SearchService): void;
        initializeScope($scope: any): void;
        private OpenModal(ctr);
        DoSearch($scope: FC.Modules.Search.Controllers.SearchController): void;
    }
}
declare module FC.Shared.Scopes {
    interface ISearchScope extends FC.Shared.ViewModels.IFormVMBase<any> {
        DoSearch: Function;
        DoSubmit: Function;
        OpenModal: Function;
        Keyword: string;
        URLRoot: string;
        ActiveCountries: Array<number>;
        ArtistResultVisible: boolean;
        FestivalResultVisible: boolean;
        NewsResultVisible: boolean;
        GenreResultVisible: boolean;
        IsSearching: boolean;
        IsLoading: boolean;
        GenreData: any;
        CountryData: any;
        IsFestivalsLoading: boolean;
        IsGenresLoading: boolean;
        IsArtistsLoading: boolean;
    }
}
declare module FC.Modules.Search.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class SearchService extends FC.Core.ServiceBase {
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UTheme>>>;
        Search(filter: FC.Shared.ServiceMessages.SearchFilter): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>>;
    }
}
declare module FC.Modules.Theming {
    class Theming {
        private NgModule;
        private app;
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
        constructor(NgModule: ng.IModule, app: FC.Core.FCModule);
    }
}
declare var ThemingModule: FC.Modules.Theming.Theming;
declare module FC.Modules.Theming.Services {
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    class ThemingService extends FC.Core.ServiceBase {
        static $inject: string[];
        ActiveGenreID: number;
        ActiveTheme: INT.IUTheme;
        CacheManager: FC.Shared.Util.CacheManager;
        private $location;
        private $routeParams;
        constructor(http: ng.IHttpService, q: any, $route: ng.route.IRoute, routeParams: any, location: any);
        GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UTheme>>>;
        GetByID(id: number): ng.IPromise<INT.IServiceResponse<INT.IUTheme>>;
        GetAll(): ng.IPromise<INT.IServiceResponse<INT.IUTheme[]>>;
        private getActiveThemeFromCache();
        GetActiveTheme(): ng.IPromise<INT.IServiceResponse<INT.IUTheme>>;
    }
}
declare module FC.Modules.Theming.Directives {
    class BackImgDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        color(color: string): string;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Services.ThemingService) => BackImgDirective;
    }
}
declare module FC.Modules.Theming.Directives {
    class CollapsibleDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Services.ThemingService) => BackImgDirective;
    }
}
declare module FC.Modules.Theming.Directives {
    class SelectModalDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Services.ThemingService) => SelectModalDirective;
    }
}
declare module FC.Modules.Theming.Directives {
    class ThemingDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        private CacheManager;
        color(color: string): string;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        private setThemeStyles(attrs, element, ActiveTheme, vm);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Services.ThemingService) => ThemingDirective;
    }
}
declare module FC.Modules.Theming.Directives {
    class ToggleClassDirective {
        link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        scope: {};
        private _element;
        private _attrs;
        constructor($route: any, $routeParams: any, $location: any, ThemingSvc: FC.Modules.Theming.Services.ThemingService);
        static factory(): ($route: any, $routeParams: any, $location: any, ThemingSvc: Services.ThemingService) => ToggleClassDirective;
    }
}
declare module INT.Core {
    interface IFCModule {
        $Application: FC.Core.FCModule;
        GetApplication(): FC.Core.FCModule;
    }
}
declare module FC.Shared.CoreModel {
    class RegionInfo {
        CurrencyEnglishName: string;
        CurrencyNativeName: string;
        CurrencySymbol: string;
        DisplayName: string;
        EnglishName: string;
        GeoId: number;
        IsMetric: boolean;
        ISOCurrencySymbol: string;
        Name: string;
        NativeName: string;
        ThreeLetterISORegionName: string;
        ThreeLetterWindowsRegionName: string;
        TwoLetterISORegionName: string;
    }
}
declare module FC.Shared.Enums {
    enum BannerFormat {
        Multi_FlexBanner = 921600,
        Desktop_FlexBanner = 1115520,
        Mobile_FlexBanner = 786432,
        Desktop_Banner_A_172_x_500 = 86000,
        Desktop_Banner_A_172_x_400 = 68800,
        Desktop_Banner_A_172_x_300 = 51600,
        Desktop_Banner_A_172_x_250 = 43000,
        Desktop_Banner_A_172_x_200 = 34400,
        Desktop_Banner_A_172_x_150 = 25800,
        Desktop_Banner_A_172_x_100 = 17200,
        Desktop_Banner_A_172_x_50 = 8600,
        Desktop_Banner_B_556_x_50 = 27800,
        Desktop_Banner_B_556_x_100 = 55600,
        Desktop_Banner_B_556_x_150 = 83400,
        Desktop_Banner_B_556_x_200 = 111200,
        Desktop_Banner_B_556_x_250 = 139000,
        Desktop_Banner_B_556_x_300 = 166800,
        Desktop_Banner_C_336_x_50 = 16800,
        Desktop_Banner_C_336_x_100 = 33600,
        Desktop_Banner_C_336_x_150 = 50400,
        Desktop_Banner_C_336_x_200 = 67200,
        Desktop_Banner_D_364_x_50 = 18200,
        Desktop_Banner_D_364_x_150 = 54600,
        Desktop_Banner_D_364_x_200 = 72800,
        Desktop_Banner_D_364_x_250 = 91000,
        Desktop_Banner_D_364_x_300 = 109200,
        Mobile_Banner_A_740_x_300 = 222000,
        Mobile_Banner_A_740_x_350 = 259000,
        Mobile_Banner_A_740_x_100 = 74000,
        Mobile_Banner_A_740_x_150 = 111000,
        Mobile_Banner_A_740_x_200 = 148000,
        Mobile_Banner_A_740_x_250 = 185000,
        Mobile_Banner_A_740_x_400 = 296000,
        Mobile_Banner_B_320_x_50 = 16000,
        Mobile_Banner_B_320_x_100 = 32000,
        Mobile_Banner_B_320_x_150 = 48000,
        Mobile_Banner_B_320_x_200 = 64000,
        Mobile_Banner_B_320_x_250 = 80000,
        Mobile_Banner_B_320_x_320 = 102400,
        Mobile_Banner_C_636_x_50 = 31800,
        Mobile_Banner_C_636_x_100 = 63600,
        Mobile_Banner_C_636_x_150 = 95400,
        Mobile_Banner_C_636_x_200 = 127200,
        Mobile_Banner_C_636_x_250 = 159000,
        Mobile_Banner_C_636_x_320 = 203520,
        Mobile_Banner_D_313_x_50 = 15650,
        Mobile_Banner_D_313_x_100 = 31300,
        Mobile_Banner_D_313_x_150 = 46950,
        Mobile_Banner_D_313_x_200 = 62600,
        Mobile_Banner_D_313_x_250 = 78250,
        Mobile_Banner_D_313_x_320 = 100160,
        Mobile_Banner_E_365_x_50 = 18250,
        Mobile_Banner_E_365_x_100 = 36500,
        Mobile_Banner_E_365_x_150 = 54750,
        Mobile_Banner_E_365_x_200 = 73000,
        Mobile_Banner_E_365_x_250 = 91250,
        Mobile_Banner_E_365_x_320 = 116800,
        Mobile_Banner_F_370_x_50 = 18250,
        Mobile_Banner_F_370_x_100 = 36500,
        Mobile_Banner_F_370_x_150 = 54750,
        Mobile_Banner_F_370_x_200 = 73000,
        Mobile_Banner_F_370_x_250 = 91250,
        Mobile_Banner_F_370_x_300 = 109500,
        Mobile_Banner_F_370_x_370 = 135050,
    }
}
declare module FC.Shared.Interfaces {
    interface IArtistListVm {
        Name: string;
        Logo: string;
        ArtistID: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IFreeGeoIPModel {
        ip: string;
        country_code: string;
        country_name: string;
        region_code: string;
        region_name: string;
        city: string;
        zip_code: string;
        time_zone: string;
        latitude: string;
        longitude: string;
        metro_code: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IBaseModel {
    }
}
declare module FC.Shared.Interfaces {
    interface ICalendar {
        Months: FC.Core.CoreModel.Dictionary<number, string>;
        Days: FC.Core.CoreModel.Dictionary<number, number>;
        Year: number;
    }
}
declare module FC.Shared.Interfaces {
    interface IContentDetail {
        Thumbnail: string;
        ContentType: string;
        MetaKeys: string;
        MetaDescription: string;
        Genres: Array<number>;
        Author: string;
        Title: string;
        OrderDate: number;
        DisplayDate: string;
        ShortText: string;
        DetailText: string;
        Link: string;
        ShowReadMore: boolean;
        SortOrder: number;
        Rating: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IFestivalFilter {
        GenreIDs: Array<string>;
        CountryIDs: Array<string>;
        FestivalID: string;
        MonthNum: number;
        YearNum: number;
    }
}
declare module FC.Shared.Interfaces {
    interface IGenreFilter {
        GenreID: string;
        ParentID: string;
        Name: string;
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    interface IMedia {
        MediaID: string;
        DirectoryID: string;
        FileName: string;
        Name: string;
        FileMimeType: string;
        Ext: string;
        Author: string;
        Directory: INT.IMediaDirectory;
    }
}
declare module FC.Shared.Interfaces {
    interface IMediaDirectory {
        DirectoryID: string;
        ParentID: string;
        Name: string;
        Children: FC.Shared.Models.MediaDirectory[];
        Media: FC.Shared.Models.Media[];
        Author: FC.Shared.Models.ApplicationUser;
        AuthorID: string;
    }
}
declare module FC.Shared.Interfaces {
    interface INewsFilter {
        GenreIDs: Array<string>;
        CountryIDs: Array<string>;
    }
}
declare module FC.Shared.Interfaces {
    interface INewsVm {
        Title: string;
        Content: string;
        DisplayDate: string;
        GenreID: string;
        Type: string;
        Img: string;
        Link: string;
        SortDate: Date;
        UmbracoID: number;
    }
}
declare module FC.Shared.Interfaces {
    interface IRegionInfo {
        CurrencyEnglishName: string;
        CurrencyNativeName: string;
        CurrencySymbol: string;
        DisplayName: string;
        EnglishName: string;
        GeoId: number;
        IsMetric: boolean;
        ISOCurrencySymbol: string;
        Name: string;
        NativeName: string;
        ThreeLetterISORegionName: string;
        ThreeLetterWindowsRegionName: string;
        TwoLetterISORegionName: string;
    }
}
declare module FC.Shared.Interfaces {
    interface ISearchResult {
        UmbracoID: number;
        Name: string;
        Genres: Array<number>;
        Country: string;
        Image: string;
        Type: string;
        Location: string;
        Date: Date;
    }
}
declare module FC.Shared.Interfaces {
    interface IServiceResponse<T> {
        Data: T;
        Message: string;
        StatusCode: number;
        Params: Array<string>;
    }
}
declare module FC.Shared.Interfaces {
    interface ISimpleDateTime {
        CultureName: string;
        BaseDate: Date;
        DayNum: Number;
        DayName: string;
        MonthNum: Number;
        MonthName: string;
        Year: Number;
        Ticks: Number;
        TimeStr: string;
        DateStr: string;
        Hour: Number;
        Minute: Number;
        Second: Number;
        ServerMessage: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUAnnouncement extends IBaseModel {
        Title: string;
        Date: string;
        Image: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        AnnouncementID: string;
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    interface IUArtist extends IBaseModel {
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        Image: string;
        FacebookURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SoundCloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MySpaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        ArtistID: string;
        CountryID: string;
        Album: FC.Shared.Models.MediaDirectory;
        AlbumID: string;
        Social: Array<FC.Shared.Models.SocialProfile>;
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    interface IUBanner extends IBaseModel {
        Link: string;
        ImageURL: string;
        HTML: string;
        Title: string;
        CustomerID: string;
        BannerID: string;
        Customer: FC.Shared.Models.UCustomer;
        Visibility: INT.IUVisibility;
        StartDate: Date;
        EndDate: Date;
        Genres: Array<FC.Shared.Models.UGenre>;
    }
}
declare module FC.Shared.Interfaces {
    import INT = FC.Shared.Interfaces;
    interface IUCountry extends IBaseModel {
        Name: string;
        IsPopular: boolean;
        CultureIsoName: string;
        LanguageName: string;
        Currency: string;
        RegionInfo: Array<INT.IRegionInfo>;
        CountryID: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUCustomer extends IBaseModel {
        CustomerID: string;
        CompanyName: string;
        ContactName: string;
        CompanyWebsite: string;
        CompanyEmail: string;
        CompanyPhone: string;
        CompanyAddress: string;
        CompanyPostalCode: string;
        CompanyFacebookURL: string;
        CompanyLinkedInURL: string;
        CompanyTwitterURL: string;
        CompanyBankName: string;
        CompanyBankBIC: string;
        CompanyTaxNr: string;
        CompanyVat: string;
        CompanyIBAN: string;
        CompanyBankAccountName: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUFestival extends IBaseModel {
        FestivalID: string;
        CountryID: string;
        Name: string;
        Logo: string;
        IndoorOutdoor: string;
        Country: IUCountry;
        City: string;
        Location: string;
        TicketPrice: number;
        DailyTicketPrice: number;
        Visitors: string;
        StartDate: Date;
        EndDate: Date;
        CampingAvailable: string;
        Genres: Array<number>;
        IsTopFestival: boolean;
        Description: string;
        Artists: Array<number>;
        Address: string;
        ZIPCode: string;
        Website: string;
        Stages: number;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        InstagramURL: string;
        DeezerURL: string;
        MySpaceURL: string;
        SoundCloudURL: string;
        AftermovieYoutubeURL: string;
        CultureStartDate: string;
        CultureEndDate: string;
        CalcPrice: string;
        CalcDailyPrice: string;
        FriendlyStartDate: ISimpleDateTime;
        FriendlyEndDate: ISimpleDateTime;
        IsSoldOut: string;
        Rating: string;
        SafeLocation: string;
        AlbumID: string;
        Album: FC.Shared.Models.MediaDirectory;
        Social: Array<FC.Shared.Models.SocialProfile>;
        Thumbnail: FC.Shared.Models.Media;
        ThumbnailID: string;
        Tickets: Array<FC.Shared.Models.FestivalTicket>;
    }
}
declare module FC.Shared.Interfaces {
    interface IUNews extends IBaseModel {
        Title: string;
        Date: Date;
        Text: string;
        Img: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        Type: string;
        DisplayDate: string;
        NewsID: string;
        Album: FC.Shared.Models.MediaDirectory;
        AlbumID: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUserLocalization {
        ISOCurrencySymbol: string;
        NegativeSign: string;
        PositiveSign: string;
        TimeSeparator: string;
        CurrencyNativeName: string;
        RegionEnglishName: string;
        RegionName: string;
        CultureIsoName: string;
        CultureCountryName: string;
        CultureMoneySign: string;
        CultureDateSeparator: string;
        CultureCurrencySeparator: string;
        CurrencyCultureDecimalDigits: Number;
        NumberDecimalDigits: Number;
        NumberDecimalSeparator: string;
        TwoLetterCountryName: string;
        ThreeLetterCountryName: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUTheme extends IBaseModel {
        Name: string;
        DefaultTextColor: string;
        LinkActiveColor: string;
        LinkHoverColor: string;
        LinkDefaultColor: string;
        ThemeColor: string;
        BackgroundImage: string;
        BackgroundColor: string;
        DefaultHeartColor: string;
        ActiveHeartColor: string;
        ButtonActiveColor: string;
        ButtonActiveTextColor: string;
        ButtonDefaultColor: string;
        ButtonDefaultTextColor: string;
        ButtonDisabledColor: string;
        ButtonDisabledTextColor: string;
        ButtonHoverColor: string;
        ButtonHoverTextColor: string;
    }
}
declare module FC.Shared.Interfaces {
    interface IUVisibility {
        Desktop: boolean;
        SmDesktop: boolean;
        Mobile: boolean;
        SmMobile: boolean;
        ColLGCls: string;
        ColMDCls: string;
        ColSMCls: string;
        ColXSCls: string;
    }
}
declare module FC.Shared.Models {
    class MediaDirectory {
        constructor();
        DirectoryID: string;
        ParentID: string;
        Name: string;
        Media: FC.Shared.Models.Media[];
        Children: FC.Shared.Models.MediaDirectory[];
        AuthorID: string;
        Author: ApplicationUser;
    }
}
declare module FC.Shared.Models {
    class Media {
        MediaID: string;
        DirectoryID: string;
        FileName: string;
        Name: string;
        FileMimeType: string;
        Ext: string;
        Author: ApplicationUser;
        Width: number;
        Height: number;
        MediaType: MediaType;
        ExternalURL: string;
        Directory: MediaDirectory;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class Calendar implements INT.ICalendar {
        Months: FC.Core.CoreModel.Dictionary<number, string>;
        Days: FC.Core.CoreModel.Dictionary<number, number>;
        Year: number;
    }
}
declare module FC.Shared.Models {
    class ContentDetail {
        Thumbnail: string;
        ContentType: string;
        MetaKeys: string;
        MetaDescription: string;
        GenreIds: Array<string>;
        Author: string;
        Title: string;
        OrderDate: number;
        DisplayDate: string;
        ShortText: string;
        DetailText: string;
        Link: string;
        ShowReadMore: boolean;
        SortOrder: number;
        Rating: string;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class FreeGeoIPModel implements INT.IFreeGeoIPModel {
        ip: string;
        country_code: string;
        country_name: string;
        region_code: string;
        region_name: string;
        city: string;
        zip_code: string;
        time_zone: string;
        latitude: string;
        longitude: string;
        metro_code: string;
    }
}
declare module FC.Shared.ServiceMessages {
    import INT = FC.Shared.Interfaces;
    class FestivalFilter implements INT.IFestivalFilter {
        GenreIDs: Array<string>;
        CountryIDs: Array<string>;
        FestivalID: string;
        MonthNum: number;
        YearNum: number;
    }
}
declare module FC.Shared.Models {
    class NewsFilter {
        constructor();
        GenreIDs: Array<string>;
        CountryIDs: Array<string>;
    }
}
declare module FC.Shared.ServiceMessages {
    class GenreFilter {
        constructor(filter?: GenreFilter);
        GenreID: string;
        ParentID: string;
        Name: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class MediaDirectoryMsg {
        ParentID: string;
        DirectoryName: string;
        Author: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class RatingMsg {
        ContentItemID: string;
        ContentType: string;
        CreditAmmount: number;
    }
}
declare module FC.Shared.Util {
    class FCEvent {
        RegisterKey: string;
        Event: CustomEvent;
    }
    class EventManager {
        private static inst;
        constructor(instKey?: string);
        static GetInstance(): EventManager;
        EventRegister: Array<FCEvent>;
        RegisterEvt(key: string, evt: FCEvent): void;
        DispatchEvt(key: string): void;
    }
}
declare module FC.Shared.Util {
    class MemReg {
        private static inst;
        private registry;
        private maxObjSize;
        constructor(instKey?: string);
        /**
         * @param key
         * @param value (Absolute max is 1Megabyte, please be carefull with usage, it stores values in memory for application wide usage).
         */
        Register(key: string, value: any): void;
        Get<T>(key: any): T;
        GetAny(key: any): any;
        static GetInstance(): MemReg;
    }
}
declare module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    class ArtistSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Type: string;
        Date: Date;
        Location: string;
    }
}
declare module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    class FestivalSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        City: string;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Date: Date;
        CultureStartDate: string;
        Type: string;
        Location: string;
    }
}
declare module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    class GenreSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Type: string;
        Location: string;
        Date: Date;
    }
}
declare module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    interface IArtistCRUDVm extends FC.Shared.Interfaces.IBaseModel {
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<FC.Shared.Interfaces.IUGenre>;
        Image: string;
        FacebookURL: string;
        InstagramURL: string;
        SoundCloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MySpaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        ArtistID: string;
        CountryID: string;
        FlickrURL: string;
    }
}
declare module FC.Shared.ViewModels {
    interface IArtistModalScope extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.ViewModels.IArtistCRUDVm> {
        inst: FC.Modules.Artists.Controllers.ArtistModalController;
        model: FC.Shared.Models.UArtist;
        ArtistSearchKey: string;
        URLRoot: string;
        FormID: string;
        ArtistImagePath: string;
        MediaPickerSaveEvt: string;
        SysArtists: FC.Modules.Artists.Models.ArtistListVM[];
        SelectedArtists: FC.Modules.Artists.Models.ArtistListVM[];
        DoCancelCreateArtist: Function;
        MediaIsObsolete: Function;
        IsActive: Function;
        ToggleSelected: Function;
        Close: Function;
        SelectedHidden: boolean;
        ArtistCreated: boolean;
        ServerMsg: string;
        $dismiss: any;
        SaveModal: Function;
    }
}
declare module FC.Shared.ViewModels {
    interface IGenrePickerScope extends IFormVMBase<FC.Shared.Models.UGenre> {
        inst: FC.Modules.Genres.Controllers.GenrePickerController;
        model: FC.Shared.Models.UGenre;
        GenreSearchKey: string;
        SysGenres: Models.UGenre[];
        RootGenres: Models.UGenre[];
        SelectedGenres: Models.UGenre[];
        URLRoot: string;
        ArtistImagePath: string;
        Image: string;
        $dismiss: any;
        GenreCreated: boolean;
        GenreModified: boolean;
        GenreDeleted: boolean;
        SearchResult: Models.UGenre[];
        SearchKey: string;
        DoSearch: Function;
        DoCancelSearch: Function;
        Save: Function;
        Activate: Function;
        IsActive: Function;
        ToggleSelected: Function;
        Close: Function;
        SelectedHidden: boolean;
    }
}
declare module FC.Shared.ViewModels {
    interface IMediaModalScope extends FC.Shared.ViewModels.IFormVMBase<any> {
        MediaPickerSaveEvt: string;
        model: Object;
        FileName: string;
        RegisterEvt: Function;
        ShortenFileName: Function;
        Save: Function;
        MemReg: FC.Shared.Util.MemReg;
        DirectoryID: string;
        RootDir: FC.Shared.Interfaces.IMediaDirectory;
        ParentDir: FC.Shared.Interfaces.IMediaDirectory;
        Children: FC.Shared.Interfaces.IMediaDirectory[];
        Crumb: FC.Shared.Interfaces.IMediaDirectory[];
        Directories: FC.Shared.Interfaces.IMediaDirectory[];
        ActiveDir: FC.Shared.Interfaces.IMediaDirectory;
        SelectedMediaItem: FC.Shared.Interfaces.IMedia;
        FileModel: FC.Shared.Models.Media;
        DirectoryModel: FC.Shared.Models.MediaDirectory;
        RootID: string;
        inst: FC.Modules.Media.Controllers.MediaModalController;
        Activate: Function;
        ActivateMediaItem: Function;
        Close: Function;
        GoBack: Function;
        IsAdvancedUpload: boolean;
        DoDeleteMediaItem: Function;
        DoDeleteMediaDir: Function;
        DoCreateMediaItem: Function;
        DoCreateMediaDir: Function;
        DoEditMediaDir: Function;
        DoSaveEditMediaDir: Function;
        DoSaveDeleteMediaItem: Function;
        DoSaveDeleteMediaDir: Function;
        DoSaveCreateMediaItem: Function;
        DoSaveCreateMediaDir: Function;
        DoCancelCRUD: Function;
        IsMediaDirCreating: boolean;
        IsMediaDirCreated: boolean;
        IsMediaDirEditing: boolean;
        IsMediaDirModified: boolean;
        IsMediaItemCreating: boolean;
        IsMediaItemCreated: boolean;
        IsMediaItemDeleting: boolean;
        IsMediaItemDeleted: boolean;
        IsMediaDirDeleting: boolean;
        IsMediaDirDeleted: boolean;
        getUploadURL: Function;
        GetChildren: Function;
        DoSubmit: Function;
        Back: Function;
        MediaLoading: boolean;
        ChildHTML: string;
        URLRoot: string;
        NewDirName: string;
        ShowFolderUp: boolean;
        Token: string;
        $dismiss: any;
        Modal: any;
    }
}
declare module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    class NewsSearchResult implements INT.ISearchResult {
        UmbracoID: number;
        Country: string;
        Name: string;
        Genres: Array<number>;
        Image: string;
        Type: string;
        Location: string;
        Date: Date;
    }
}
declare module FC.Shared.ViewModels {
    class RatingVm {
        Counter: number;
        StarCount: number;
        Star1Active: boolean;
        Star2Active: boolean;
        Star3Active: boolean;
        Star4Active: boolean;
        Star5Active: boolean;
        DisplayCount: string;
    }
}
declare module FC.Shared.ViewModels {
    class SearchResult {
        Artists: Array<ArtistSearchResult>;
        Festivals: Array<FestivalSearchResult>;
        Genres: Array<GenreSearchResult>;
    }
}
declare module FC.Shared.Models {
    class ServiceMessage<T> {
        constructor(data: T);
        Data: T;
        Headers: SystemHeaders;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class ServiceResponse<T> {
        constructor(r: INT.IServiceResponse<T>);
        Data: T;
        Message: string;
        StatusCode: number;
        Params: Array<string>;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class SimpleDateTime implements INT.ISimpleDateTime {
        constructor(s: INT.ISimpleDateTime);
        CultureName: string;
        BaseDate: Date;
        DayNum: Number;
        DayName: string;
        MonthNum: Number;
        MonthName: string;
        Year: Number;
        Ticks: Number;
        TimeStr: string;
        DateStr: string;
        Hour: Number;
        Minute: Number;
        Second: Number;
        ServerMessage: string;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UAnnouncement implements INT.IUAnnouncement {
        constructor(a: INT.IUAnnouncement);
        AnnouncementID: string;
        Title: string;
        Date: string;
        Image: string;
        Genres: Array<UGenre>;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UArtist {
        constructor();
        ProfileImageID: string;
        ProfileImage: Media;
        Thumbnail: Media;
        ThumbnailID: string;
        ArtistID: string;
        CountryID: string;
        LogoID: string;
        Logo: Media;
        Name: string;
        Description: string;
        Country: INT.IUCountry;
        Website: string;
        Genres: Array<UGenre>;
        Social: Array<SocialProfile>;
        Album: MediaDirectory;
        MediaDirectoryID: string;
        ShortText: string;
        Image: string;
        FacebookURL: string;
        FlickrURL: string;
        InstagramURL: string;
        SoundcloudURL: string;
        TwitterURL: string;
        SpotifyURL: string;
        MyspaceURL: string;
        YoutubeURL: string;
        DeezerURL: string;
        SoundCloudURL: string;
        MySpaceURL: string;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UBanner implements INT.IUBanner {
        constructor(b: INT.IUBanner);
        Customer: FC.Shared.Models.UCustomer;
        BannerID: string;
        Link: string;
        Visibility: FC.Shared.Models.UVisibility;
        ImageURL: string;
        HTML: string;
        Title: string;
        CustomerID: string;
        Genres: Array<FC.Shared.Models.UGenre>;
        BannerTitleVisible: boolean;
        StartDate: Date;
        EndDate: Date;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UCountry implements INT.IUCountry {
        constructor(c?: INT.IUCountry);
        CountryID: string;
        Name: string;
        IsPopular: boolean;
        CultureIsoName: string;
        LanguageName: string;
        Currency: string;
        RegionInfo: Array<FC.Shared.CoreModel.RegionInfo>;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UCustomer implements INT.IUCustomer {
        constructor();
        CustomerID: string;
        CompanyName: string;
        ContactName: string;
        CompanyWebsite: string;
        CompanyEmail: string;
        CompanyPhone: string;
        ContactPhone: string;
        ContactEmail: string;
        CompanyAddress: string;
        CompanyPostalCode: string;
        CompanyFacebookURL: string;
        CompanyLinkedInURL: string;
        CompanyTwitterURL: string;
        CompanyBankName: string;
        CompanyBankBIC: string;
        CompanyTaxNr: string;
        CompanyVat: string;
        CompanyIBAN: string;
        CompanyBankAccountName: string;
        Enabled: boolean;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UFestival implements INT.IBaseModel {
        constructor();
        DateExplosion: FC.Shared.ViewModels.DateVM;
        MediaDirectoryID: string;
        Album: MediaDirectory;
        SocialProfiles: Array<SocialProfile>;
        Tickets: Array<FestivalTicket>;
        ProfileImageID: string;
        ProfileImage: Media;
        Thumbnail: Media;
        ThumbnailID: string;
        FestivalLocationID: string;
        FestivalLocation: Location;
        FestivalID: string;
        CountryID: string;
        ContentType: string;
        MetaKeys: string;
        MetaDescription: string;
        Author: string;
        Title: string;
        OrderDate: number;
        DisplayDate: string;
        ShortText: string;
        DetailText: string;
        Link: string;
        ShowReadMore: boolean;
        SortOrder: number;
        IsSoldOut: string;
        Rating: string;
        Name: string;
        LogoID: string;
        IndoorOutdoor: string;
        Country: INT.IUCountry;
        City: string;
        Location: string;
        TicketPrice: number;
        DailyTicketPrice: number;
        Visitors: string;
        StartDate: Date;
        StartTime: string;
        EndDate: Date;
        EndTime: string;
        CampingAvailable: string;
        Genres: Array<number>;
        IsTopFestival: boolean;
        FacebookURL: string;
        TwitterURL: string;
        YoutubeURL: string;
        FlickrURL: string;
        DeezerURL: string;
        MySpaceURL: string;
        SoundCloudURL: string;
        InstagramURL: string;
        Description: string;
        Artists: Array<UArtist>;
        Address: string;
        ZIPCode: string;
        Website: string;
        Stages: number;
        StageList: List<Stage>;
        AftermovieYoutubeURL: string;
        CarInfo: string;
        BikeInfo: string;
        TaxiInfo: string;
        CultureStartDate: string;
        CultureEndDate: string;
        CalcPrice: string;
        CalcDailyPrice: string;
        FriendlyStartDate: SimpleDateTime;
        FriendlyEndDate: SimpleDateTime;
        SafeLocation: string;
    }
}
declare module FC.Shared.Models {
    import MODELS = FC.Shared.Models;
    class UGenre {
        constructor();
        ParentID: string;
        GenreID: string;
        ThemeID: string;
        Children: Array<MODELS.UGenre>;
        VisibleOnHome: number;
        Name: string;
        Thumbnail: string;
        Theme: UTheme;
        Image: string;
        IsPopular: boolean;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UserLocalization implements INT.IUserLocalization {
        constructor(UL: INT.IUserLocalization);
        ISOCurrencySymbol: string;
        NegativeSign: string;
        PositiveSign: string;
        TimeSeparator: string;
        CurrencyNativeName: string;
        RegionEnglishName: string;
        RegionName: string;
        CultureIsoName: string;
        CultureCountryName: string;
        CultureMoneySign: string;
        CultureDateSeparator: string;
        CultureCurrencySeparator: string;
        CurrencyCultureDecimalDigits: Number;
        NumberDecimalDigits: Number;
        NumberDecimalSeparator: string;
        TwoLetterCountryName: string;
        ThreeLetterCountryName: string;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UTheme implements INT.IUTheme {
        Name: string;
        DefaultTextColor: string;
        LinkActiveColor: string;
        LinkHoverColor: string;
        LinkDefaultColor: string;
        ThemeColor: string;
        ButtonDefaultColor: string;
        ButtonDefaultTextColor: string;
        ButtonDisabledColor: string;
        ButtonDisabledTextColor: string;
        ButtonHoverColor: string;
        ButtonHoverTextColor: string;
        ButtonActiveColor: string;
        ButtonActiveTextColor: string;
        BackgroundImage: string;
        BackgroundColor: string;
        DefaultHeartColor: string;
        ActiveHeartColor: string;
    }
}
declare module FC.Shared.Models {
    import INT = FC.Shared.Interfaces;
    class UVisibility extends FC.Shared.Models.BaseModel implements INT.IUVisibility {
        Desktop: boolean;
        SmDesktop: boolean;
        Mobile: boolean;
        SmMobile: boolean;
        ColLGCls: string;
        ColMDCls: string;
        ColSMCls: string;
        ColXSCls: string;
    }
}
declare module FC.Shared.ServiceMessages {
    class SearchFilter {
        Keyword: string;
        ActiveCountries: Array<string>;
    }
}
declare module FC.Shared.ServiceMessages {
    class BannerFilter {
        Genres: Array<string>;
        Layout: string;
        StartDate: Date;
        EndDate: Date;
    }
}
declare module FC.Shared.ViewModels {
    class BlockModel {
        Title: string;
    }
}
import Model = FC.Shared.Models;
declare module FC.Shared.ViewModels {
    class FestivalDetailScope {
        FestivalDetails: Model.UFestival;
        Artists: Array<Model.UArtist>;
        Genres: Array<Model.UGenre>;
        News: Array<Model.UNews>;
    }
}
declare module FC.Shared.ViewModels {
    class SearchScope {
        DoSearch: Function;
        Keyword: string;
        ActiveCountries: Array<number>;
    }
}
