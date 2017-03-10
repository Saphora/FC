module FC.Shared.ViewModels {
    export interface SaveFieldState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string, value: any): void;
    }
    export interface GetFieldState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>, name: string): void;
    }
    export interface SaveFormState {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>);
    }
    export interface RecoverModel<T> {
        (model:T, $scope: FC.Shared.ViewModels.IVMBase): T
    }
    export interface FinishForm {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
    }
    export interface BindForm {
        ($scope: FC.Shared.ViewModels.IFormVMBase<any>): void;
    }
    export interface DestroyAlerts {
        ($scope: FC.Shared.ViewModels.IVMBase):void
    }
    export interface IFormVMBase<T> extends IVMBase {
        $sce: ng.ISCEService;
        $http: ng.IHttpService;
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
    export interface IVMBase extends ng.IScope {
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
        IsThemesLoading : boolean;
        IsCountriesLoading : boolean;
        IsGenresLoading : boolean;
        IsFestivalsLoading: boolean;
        FormatDate: Function;
        RepairArray: Function;
        MemReg: FC.Shared.Util.MemReg;
        ServerMsg: string;
        LogoutURL: string;
        ColData1: any[];
        ColData2: any[];
        ColData3: any[];
        ColData4: any[];
        $dismiss: any;
    }
}