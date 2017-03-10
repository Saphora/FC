module FC.Shared.Models {
    export class ContentDetail {
        public Thumbnail: string;
        public ContentType: string;
        public MetaKeys: string;
        public MetaDescription: string;
        public GenreIds: Array<string>;
        public Author: string;
        public Title: string;
        public OrderDate: number;
        public DisplayDate: string;
        public ShortText: string;
        public DetailText: string;
        public Link: string;
        public ShowReadMore: boolean;
        public SortOrder: number;
        public Rating: string;
    }
}