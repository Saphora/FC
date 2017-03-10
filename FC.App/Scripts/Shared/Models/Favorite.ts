module FC.Shared.Models {
    export class Favorite {
        public FavID:string;
        public ContentID:string;
        public ContentType: FC.Shared.Enum.InternalContentType;
        public UserID: string;
        public User: FC.Shared.Models.ApplicationUser;
    }
}