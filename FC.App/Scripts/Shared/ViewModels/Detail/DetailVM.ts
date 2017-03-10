module FC.Shared.ViewModels {
    export class DetailVM {
        public Image: string;
        public ID: string;
        public Title: string;
        public Description: string;
        public ShortText: string;
        public Social: Array<FC.Shared.Models.SocialProfile>;
        public Website: string;
        public URL: string;
    }
}