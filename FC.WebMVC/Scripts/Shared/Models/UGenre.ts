module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UGenre  {
        public constructor() {
        }
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
