module STD.Models {
    export interface INavBarVM extends FC.Shared.ViewModels.IFormVMBase<any> {
        GenreCount: number;
        ArtistCount: number;
        LocationCount: number;
        Language: string;
        CountryCount: number;
    }
}