using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Enum
{
    public class Roles
    {
        public static string UserAdmin= "UserAdmin";
        public static string Reporter= "Reporter";
        public static string GenreAdmin= "GenreAdmin";
        public static string RoleAdmin= "RoleAdmin";
        public static string Analyzer= "Analyzer";
        public static string EndUser= "EndUser";
        public static string Developer= "Developer";
        public static string Customer= "Customer";
        public static string Journalist= "Journalist";
        public static string Bot= "Bot";
        public static string BannerAdmin= "BannerAdmin";
        public static string AnnouncementAdmin= "AnnouncementAdmin";
        public static string NewsAdmin= "NewsAdmin";
        public static string Partner= "Partner";
        public static string ArtistAdmin= "ArtistAdmin";
        public static string Admin= "Admin";
        public static string SponsorAdmin= "SponsorAdmin";
        public static string FestivalAdmin= "FestivalAdmin";
        public static string Owner = "Owner";

        public static string[] GetAllRoot() {
            return new string[] {
                Roles.UserAdmin,
                Roles.FestivalAdmin,
                Roles.Developer,
                Roles.Admin,
                Roles.Owner
            };
        }

        public static string[] GetAllPartner() {
            return new string[] {
                Roles.Developer,
                Roles.Reporter,
                Roles.Journalist,
                Roles.Partner,
                Roles.Analyzer,
                Roles.Customer,
                Roles.Owner
            };
        }

        public static string[] GetAll() {
            return new string[] {
                Roles.UserAdmin,
                Roles.Owner,
                Roles.Reporter,
                Roles.GenreAdmin,
                Roles.RoleAdmin,
                Roles.Analyzer,
                Roles.EndUser,
                Roles.Developer,
                Roles.Customer,
                Roles.Journalist,
                Roles.Bot,
                Roles.BannerAdmin,
                Roles.AnnouncementAdmin,
                Roles.NewsAdmin,
                Roles.Partner,
                Roles.ArtistAdmin,
                Roles.Admin,
                Roles.SponsorAdmin,
                Roles.FestivalAdmin
            };
        }

        public static string[] GetAdmins()
        {
            return new string[] {
                Roles.Developer,
                Roles.UserAdmin,
                Roles.FestivalAdmin,
                Roles.RoleAdmin,
                Roles.GenreAdmin,
                Roles.ArtistAdmin,
                Roles.BannerAdmin,
                Roles.NewsAdmin,
                Roles.SponsorAdmin,
                Roles.Owner,
                Roles.AnnouncementAdmin,
                Roles.UserAdmin,
                Roles.Admin
            };
        }
    }
}
