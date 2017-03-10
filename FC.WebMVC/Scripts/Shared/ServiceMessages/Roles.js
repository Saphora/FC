//TODO
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Enum;
        (function (Enum) {
            var Roles = (function () {
                function Roles() {
                }
                Roles.GetAnonymous = function () {
                    return [
                        this.Anonymous,
                        this.Bot
                    ];
                };
                Roles.GetAllRoot = function () {
                    return [
                        this.UserAdmin,
                        this.FestivalAdmin,
                        this.Developer,
                        this.Admin,
                        this.Owner
                    ];
                };
                Roles.GetAllPartner = function () {
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
                };
                Roles.GetAll = function () {
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
                        this.Owner
                    ];
                };
                Roles.GetAdmins = function () {
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
                };
                Roles.Anonymous = "Anonymous";
                Roles.UserAdmin = "UserAdmin";
                Roles.Reporter = "Reporter";
                Roles.GenreAdmin = "GenreAdmin";
                Roles.RoleAdmin = "RoleAdmin";
                Roles.Analyzer = "Analyzer";
                Roles.EndUser = "EndUser";
                Roles.Developer = "Developer";
                Roles.Customer = "Customer";
                Roles.Journalist = "Journalist";
                Roles.Bot = "Bot";
                Roles.BannerAdmin = "BannerAdmin";
                Roles.AnnouncementAdmin = "AnnouncementAdmin";
                Roles.NewsAdmin = "NewsAdmin";
                Roles.Partner = "Partner";
                Roles.ArtistAdmin = "ArtistAdmin";
                Roles.Admin = "Admin";
                Roles.SponsorAdmin = "SponsorAdmin";
                Roles.FestivalAdmin = "FestivalAdmin";
                Roles.Owner = "Owner";
                return Roles;
            }());
            Enum.Roles = Roles;
        })(Enum = Shared.Enum || (Shared.Enum = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
//# sourceMappingURL=Roles.js.map