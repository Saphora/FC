module FC.Modules.News.Models {
    export class NewsVm {
        public Title: string;
        public Content: string;
        public DisplayDate: string;
        public GenreID: string;
        public Type: string;
        public Img: string;
        public Link: string;
        public SortDate: Date;
        public UmbracoID: number;
        constructor(data: NewsVm) {
            this.Title = data.Title;
            this.Content = data.Content;
            this.DisplayDate = data.DisplayDate;
            this.GenreID = data.GenreID;
            this.Type = data.Type;
            this.Img = data.Img;
            this.Link = "/#/News/" + data.UmbracoID + "/" + this.GenreID;
            this.SortDate = data.SortDate;
            this.UmbracoID = data.UmbracoID;
        }
    }
}