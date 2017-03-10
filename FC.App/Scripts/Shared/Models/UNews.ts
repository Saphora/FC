module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class UNews  {
        constructor() {
        }
        NewsID: string;
        Title: string;
        Date: Date;
        Text: string;
        ThumbnailID: string;
        Thumbnail: Media;
        Genres: Array<UGenre>;
        SourceURL: string;
        SourceName: string;
        Type: string;
        Album: MediaDirectory;
        AlbumID: string;
        DisplayDate: string;
        DisplayTime: string;
        DateKey: string;
        MetaKeys: string;
        MetaDescription: string;
        
        
        
    }
}
