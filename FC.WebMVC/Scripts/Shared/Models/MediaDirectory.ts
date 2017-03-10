module FC.Shared.Models {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;

    export class MediaDirectory  {
        public constructor() {
            this.Media = new Array<FC.Shared.Models.Media>();
            this.Children = new Array<FC.Shared.Models.MediaDirectory>();
        }
        public DirectoryID: string;
        public ParentID: string;
        public Name: string;
        public Media: FC.Shared.Models.Media[];
        public Children: FC.Shared.Models.MediaDirectory[];
        public AuthorID: string;
        public Author: ApplicationUser;
    }
}