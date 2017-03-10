module FC.Modules.Artists.Models {
    export interface IArtistOverview extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UArtist> {
        Artists: FC.Modules.Artists.Models.ArtistListVM[];
        ShowMoreURL: string;
        ShowMore: boolean;
    }
}