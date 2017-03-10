module FC.Shared.Models {
    export class MediaType  {
        public MediaTypeID: string;
        public Name: string;
        public FontAwesomeIcon: string;
        public MimeTypes: Array<FC.Shared.Models.MimeType>;
    }
}