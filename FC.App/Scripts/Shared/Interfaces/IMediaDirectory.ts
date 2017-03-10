module FC.Shared.Interfaces {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IMediaDirectory {
        DirectoryID: string;
        ParentID: string;
        Name: string;
        Children: FC.Shared.Models.MediaDirectory[];
        Media: FC.Shared.Models.Media[];
        Author:FC.Shared.Models.ApplicationUser;
        AuthorID: string;
    }
}