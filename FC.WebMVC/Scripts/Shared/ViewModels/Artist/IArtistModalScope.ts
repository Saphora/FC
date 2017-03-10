module FC.Shared.ViewModels {
    import INT = FC.Shared.Interfaces;
    export interface IArtistModalScope extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.ViewModels.IArtistCRUDVm> {
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