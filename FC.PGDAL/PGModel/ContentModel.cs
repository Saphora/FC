namespace FC.PGDAL.PGModel
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using FC.Shared.Entities;

    public class ContentModel : DbContext
    {
        public ContentModel()
            : base("name=ContentModel")
        {
            this.Configuration.LazyLoadingEnabled = true; ///todo: 
        }
        private static ContentModel inst { get; set; }
        public static ContentModel GetInstance()
        {
            if (ContentModel.inst == null)
            {
                ContentModel.inst = new ContentModel();
                inst.Configuration.LazyLoadingEnabled = false;
            }
            return ContentModel.inst;
        }
        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<UFestival> Festivals { get; set; }
        public virtual DbSet<UNews> News { get; set; }

        /// <summary>
        /// N2C = News2Country
        /// </summary>
        public virtual  DbSet<UNews2UCountry> N2C { get; set; }

        /// <summary>
        /// G2N = Genre2News
        /// </summary>
        public  DbSet<UGenre2UNews> G2N { get; set; }
        public virtual DbSet<UArtist> Artists { get; set; }
        public virtual DbSet<UArtist2UFestival> A2F { get; set; }

        public virtual DbSet<UGenre> Genres { get; set; }

        /// <summary>
        /// G2A = Genre2Artist
        /// </summary>
        public virtual DbSet<UGenre2UArtist> G2A { get; set; }
        /// <summary>
        /// G2F = Genre2Festival
        /// </summary>
        public virtual DbSet<UGenre2UFestival> G2F { get; set; }
        

        public virtual DbSet<UCountry> Countries { get; set; }
        public virtual DbSet<SeedVersion> SeedVersions { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }

        public virtual DbSet<Media> Media { get; set; }
        public virtual DbSet<MediaType> MediaTypes { get; set; }
        public virtual DbSet<MimeType> MimeTypes { get; set; }

        public virtual DbSet<MenuItem> MenuItems { get; set; }
        /// <summary>
        /// MS2R = MenuSection2Roles
        /// </summary>
        public virtual DbSet<MenuSection2Roles> MS2R { get; set; }
        public virtual DbSet<MenuSection> MenuSections { get; set; }

        /// <summary>
        /// MT2MT = MimeType2MediaType
        /// </summary>
        public virtual DbSet<MimeType2MediaType> MT2MT { get; set; }

        public virtual DbSet<MediaDirectory> MediaDirectories { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<AppUserSession> AppUserSessions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }

        /// <summary>
        /// P2R = Permission2Role
        /// </summary>
        public virtual DbSet<Permission2Role> P2R { get; set; }

        /// <summary>
        /// U2R = User2Role
        /// </summary>
        public virtual DbSet<User2Role> U2R { get; set; }

        public virtual DbSet<Ticket> Tickets { get; set; }

        /// <summary>
        /// FT2F = FestivalTicket2Festival
        /// </summary>
        public virtual DbSet<Ticket2Festival> T2F { get; set; }

        public virtual DbSet<SocialProfile> SocialProfiles { get; set; }
        public virtual DbSet<SocialProfileType> SocialProfileTypes { get; set; }
        
        public virtual DbSet<Translation> Translations { get; set; }
        public virtual DbSet<Language> Languages { get; set; }

        public virtual DbSet<GenericMessage> GenericMessages { get; set; }

        public virtual DbSet<Location> Locations { get; set; }

        /// <summary>
        /// Advertisment
        /// </summary>
        public virtual DbSet<Advertisement> Advertisement { get; set; }
        public virtual DbSet<Adv2Visibility> Adv2Visibility { get; set; }
        public virtual DbSet<Plugin> Plugin { get; set; }
        public virtual DbSet<CalendarCardAd> CalendarCardAds { get; set; }
        public virtual DbSet<CarouselAd> CarouselAds { get; set; }
        public virtual DbSet<ProfileHeaderAd> ProfileHeaderAds { get; set; }
        public virtual DbSet<NewsListLineAd> NewsListLineAds { get; set; }
        public virtual DbSet<SponsorAd> SponsorAds { get; set; }
        public virtual DbSet<Reseller> Resellers { get; set; }
        public virtual DbSet<Product2Reseller> PROD2RES { get; set; }
        public virtual DbSet<Tickets2Reseller> T2R { get; set; }
        public virtual DbSet<ResellerType> ResellerTypes { get; set; }
        public virtual DbSet<ResellerGenre2ResellerType> RG2GT { get; set; }
        public virtual DbSet<ResellerGenre> ResellerGenres { get; set; }
        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Stage> Stages { get; set; }
        public virtual DbSet<LineupItem> LineupItems { get; set; }


        /* Materialized Views */
        public virtual DbSet<MaterializedArtistListVM> MaterializedArtists { get; set; }
        public virtual DbSet<MaterializedFestivalListVM> MaterializedFestivals { get; set; }
        public virtual DbSet<MaterializedNews> MaterializedNews { get; set; }

    }

}