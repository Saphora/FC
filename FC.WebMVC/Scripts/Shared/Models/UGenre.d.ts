declare module FC.Shared.Models {
    class UGenre extends BaseModel implements FC.Shared.Interfaces.IUGenre {
        constructor(g: FC.Shared.Interfaces.IUGenre);
        VisibleOnHome: Number;
        Name: string;
        Thumbnail: string;
        Theme: UTheme;
    }
}
