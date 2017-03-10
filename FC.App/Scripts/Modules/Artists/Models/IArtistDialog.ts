module FC.Modules.Artists.Models {
    export interface IArtistDialog extends FC.Shared.ViewModels.IFormVMBase<FC.Shared.Models.UArtist[]> {
        Artists: ArtistListVM[];
    }
}