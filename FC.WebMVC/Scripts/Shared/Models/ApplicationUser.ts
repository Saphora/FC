module FC.Shared.Models {
    export class ApplicationUser {
        public UserID           : string;
        public UserCount        : string;
        public  UserName         : string;
        public  UserPassword     : string;
        public  UserCode         : string;
        public  UserFirstname    : string;
        public  UserLastname     : string;
        public  UserMiddlename   : string;
        public  UserAddress      : string;
        public  UserAddressNR    : string;
        public  UserEmailAddress : string;
        public  UserProfileIMG   : string;
        public  UserActivated    : string;
        public  UserPhoneNumber  : string;
        public  UserFacebookID   : string;
        public  UserTwitterID    : string;
        public  UserInstagramID : string;
        public Roles: FC.Shared.Models.Role[];
        public Social: Array<SocialProfile>;
    }
}