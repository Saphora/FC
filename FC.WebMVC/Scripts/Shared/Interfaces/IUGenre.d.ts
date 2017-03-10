declare module FC.Shared.Interfaces {
    interface IUGenre extends IBaseModel {
        VisibleOnHome: Number;
        Name: string;
        Thumbnail: string;
        Theme: IUTheme;
    }
}
