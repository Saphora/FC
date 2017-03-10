module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class NewsFilter {
        public constructor() {
            this.GenreIDs = new Array<string>();
            this.CountryIDs = new Array<string>();
        }
        public GenreIDs: Array<string>;
        public CountryIDs: Array<string>;
    }
}