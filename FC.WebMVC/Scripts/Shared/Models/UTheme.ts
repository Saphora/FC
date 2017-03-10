module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UTheme  implements INT.IUTheme {

        Name: string;
        DefaultTextColor: string;
        LinkActiveColor: string;
        LinkHoverColor: string;
        LinkDefaultColor: string;
        ThemeColor: string;
        ButtonDefaultColor: string;
        ButtonDefaultTextColor: string;
        ButtonDisabledColor: string;
        ButtonDisabledTextColor: string;
        ButtonHoverColor: string;
        ButtonHoverTextColor: string;
        ButtonActiveColor: string;
        ButtonActiveTextColor: string;
        BackgroundImage: string;
        BackgroundColor: string;
        DefaultHeartColor: string;
        ActiveHeartColor: string;
    }
}
