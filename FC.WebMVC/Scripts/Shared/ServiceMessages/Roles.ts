//TODO

module FC.Shared.Enum {
    export class Roles {
        public static Festival: string = "Festival";
        public static Artist: string = "Artist";
        public static Venue: string = "Venue";
        public static Retailer: string = "Retailer";
        public static TravelAgent: string = "TravelAgent";
        public static Advertiser: string = "Advertiser";
        public static Anonymous: string = "Anonymous";
        public static UserAdmin: string = "UserAdmin";
        public static Reporter: string = "Reporter";
        public static GenreAdmin: string = "GenreAdmin";
        public static RoleAdmin: string = "RoleAdmin";
        public static Analyzer: string = "Analyzer";
        public static EndUser: string = "EndUser";
        public static Developer: string = "Developer";
        public static Customer: string = "Customer";
        public static Journalist: string = "Journalist";
        public static Bot: string = "Bot";
        public static BannerAdmin: string = "BannerAdmin";
        public static AnnouncementAdmin: string = "AnnouncementAdmin";
        public static NewsAdmin: string = "NewsAdmin";
        public static Partner: string = "Partner";
        public static ArtistAdmin: string = "ArtistAdmin";
        public static Admin: string = "Admin";
        public static SponsorAdmin: string = "SponsorAdmin";
        public static FestivalAdmin: string = "FestivalAdmin";
        public static Owner: string = "Owner";

        public static GetAllPublic() {
            return [
                Roles.Advertiser,
                Roles.Festival,
                Roles.Venue,
                Roles.Artist,
                Roles.EndUser,
                Roles.Retailer,
                Roles.TravelAgent
            ];
        }


        public static GetAnonymous(): string[] {
            return [
                this.Anonymous,
                this.Bot
            ]
        }
        public static GetAllRoot(): string[] {
            return [
                this.UserAdmin,
                this.FestivalAdmin,
                this.Developer,
                this.Admin,
                this.Owner
            ];
        }

        public static GetAllPartner(): string[] {
            var r = [
                this.Developer,
                this.Reporter,
                this.Journalist,
                this.Partner,
                this.Analyzer,
                this.Customer,
                this.Owner
            ];
            this.GetAllRoot().forEach(function (v, k) {
                r.push(v);
            });
            this.GetAdmins().forEach(function (v, k) {
                r.push(v);
            });

            this.GetAllRoot().forEach(function (v, k) {
                r.push(v);
            });
            return r;

        }

        public static GetAll():string[] {
            return [
                this.UserAdmin,
                this.Reporter,
                this.GenreAdmin,
                this.RoleAdmin,
                this.Analyzer,
                this.EndUser,
                this.Developer,
                this.Customer,
                this.Journalist,
                this.Bot,
                this.BannerAdmin,
                this.AnnouncementAdmin,
                this.NewsAdmin,
                this.Partner,
                this.ArtistAdmin,
                this.Admin,
                this.SponsorAdmin,
                this.FestivalAdmin,
                this.Owner,
                Roles.Advertiser,
                Roles.Festival,
                Roles.Venue,
                Roles.Artist,
                Roles.EndUser,
                Roles.Retailer,
                Roles.TravelAgent
            ];
        }

        public static GetAdmins() {
            return [
                this.Developer,
                this.UserAdmin,
                this.FestivalAdmin,
                this.RoleAdmin,
                this.GenreAdmin,
                this.ArtistAdmin,
                this.BannerAdmin,
                this.NewsAdmin,
                this.SponsorAdmin,
                this.AnnouncementAdmin,
                this.Owner
            ];
        }
    }
}








