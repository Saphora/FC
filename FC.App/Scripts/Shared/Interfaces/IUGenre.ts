module FC.Shared.Interfaces {
    export interface IUGenre extends IBaseModel {
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
