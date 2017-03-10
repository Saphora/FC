module FC.Shared.Interfaces {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export interface IMedia {
        MediaID: string;
        DirectoryID: string;
        FileName: string;
        Name: string;
        FileMimeType: string;
        Ext: string;
        Author: string;
        Directory: INT.IMediaDirectory;
    }
}