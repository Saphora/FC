declare module FC.Shared.Models {
    class UTheme extends BaseModel implements FC.Shared.Interfaces.IUTheme {
        constructor(t: FC.Shared.Interfaces.IUTheme);
        Name: string;
        DefaultTextColor: string;
        LinkActiveColor: string;
        LinkHoverColor: string;
        ThemeColor: string;
        ButtonActiveColor: string;
        ButtonTextColor: string;
        BackgroundImage: string;
        BackgroundColor: string;
    }
}
