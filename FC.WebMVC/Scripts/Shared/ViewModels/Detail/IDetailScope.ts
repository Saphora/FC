module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    export interface IDetailScope<T> extends FC.Shared.ViewModels.IFormVMBase<T> {
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