namespace FC.MSDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class first : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UArtist2UFestival",
                c => new
                    {
                        A2FID = c.Guid(nullable: false),
                        ArtistID = c.Guid(),
                        FestivalID = c.Guid(),
                    })
                .PrimaryKey(t => t.A2FID)
                .ForeignKey("dbo.UArtists", t => t.ArtistID)
                .ForeignKey("dbo.UFestivals", t => t.FestivalID)
                .Index(t => t.ArtistID)
                .Index(t => t.FestivalID);
            
            CreateTable(
                "dbo.UArtists",
                c => new
                    {
                        ArtistID = c.Guid(nullable: false),
                        IsPopular = c.Boolean(nullable: false),
                        CountryID = c.Guid(),
                        MediaDirectoryID = c.Guid(),
                        Name = c.String(),
                        Description = c.String(),
                        Website = c.String(),
                        ThumbnailID = c.Guid(),
                        ProfileImageID = c.Guid(),
                        LogoID = c.Guid(),
                        FacebookURL = c.String(),
                        InstagramURL = c.String(),
                        SoundcloudURL = c.String(),
                        TwitterURL = c.String(),
                        SpotifyURL = c.String(),
                        MyspaceURL = c.String(),
                        YoutubeURL = c.String(),
                        DeezerURL = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(),
                        MetaKeys = c.String(),
                        MetaDescription = c.String(),
                        OrderDate = c.Long(nullable: false),
                        ShortText = c.String(),
                        DetailText = c.String(),
                        Link = c.String(),
                        Rating = c.String(),
                        RatingScore = c.Int(nullable: false),
                        MetaTitle = c.String(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ArtistID)
                .ForeignKey("dbo.MediaDirectories", t => t.MediaDirectoryID)
                .ForeignKey("dbo.UCountries", t => t.CountryID)
                .ForeignKey("dbo.Media", t => t.ProfileImageID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.CountryID)
                .Index(t => t.MediaDirectoryID)
                .Index(t => t.ThumbnailID)
                .Index(t => t.ProfileImageID);
            
            CreateTable(
                "dbo.MediaDirectories",
                c => new
                    {
                        DirectoryID = c.Guid(nullable: false),
                        ParentID = c.Guid(),
                        Name = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        AuthorID = c.Guid(),
                    })
                .PrimaryKey(t => t.DirectoryID);
            
            CreateTable(
                "dbo.Media",
                c => new
                    {
                        MediaID = c.Guid(nullable: false),
                        DirectoryID = c.Guid(),
                        FileName = c.String(),
                        Name = c.String(),
                        FileMimeType = c.String(),
                        CropImage = c.Boolean(nullable: false),
                        IsThumbNail = c.Boolean(nullable: false),
                        MD5Checksum = c.String(),
                        Width = c.String(),
                        Height = c.String(),
                        X = c.String(),
                        Y = c.String(),
                        CssString = c.String(),
                        HtmlString = c.String(),
                        ExternalURL = c.String(),
                        MediaURL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        MediaTypeID = c.Guid(),
                        AuthorID = c.Guid(),
                        IsDeleted = c.Boolean(nullable: false),
                        Size = c.Long(),
                        ContentLength = c.Long(),
                        ObsoleteID = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.MediaID)
                .ForeignKey("dbo.ApplicationUsers", t => t.AuthorID)
                .ForeignKey("dbo.MediaTypes", t => t.MediaTypeID)
                .ForeignKey("dbo.MediaDirectories", t => t.DirectoryID)
                .Index(t => t.DirectoryID)
                .Index(t => t.MediaTypeID)
                .Index(t => t.AuthorID);
            
            CreateTable(
                "dbo.ApplicationUsers",
                c => new
                    {
                        UserID = c.Guid(nullable: false),
                        ActivationToken = c.Guid(),
                        UserCount = c.Int(nullable: false),
                        UserName = c.String(),
                        UserPassword = c.String(nullable: false),
                        UserCode = c.String(),
                        UserFirstname = c.String(nullable: false),
                        UserLastname = c.String(nullable: false),
                        UserMiddlename = c.String(),
                        UserAddress = c.String(),
                        UserAddressNR = c.String(),
                        CountryID = c.Guid(),
                        City = c.String(),
                        ZIPCode = c.String(),
                        UserEmailAddress = c.String(nullable: false),
                        UserProfileIMG = c.String(),
                        UserActivated = c.Boolean(nullable: false),
                        UserPhoneNumber = c.String(),
                        MediaDirectoryID = c.Guid(),
                        DeletedDate = c.DateTime(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.MediaDirectories", t => t.MediaDirectoryID)
                .ForeignKey("dbo.UCountries", t => t.CountryID)
                .Index(t => t.CountryID)
                .Index(t => t.MediaDirectoryID);
            
            CreateTable(
                "dbo.UCountries",
                c => new
                    {
                        CountryID = c.Guid(nullable: false),
                        IsPopular = c.Boolean(nullable: false),
                        Name = c.String(),
                        CultureIsoName = c.String(),
                        LanguageName = c.String(),
                        Currency = c.String(),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CountryID);
            
            CreateTable(
                "dbo.MediaTypes",
                c => new
                    {
                        MediaTypeID = c.Guid(nullable: false),
                        Name = c.String(),
                        FontAwesomeIcon = c.String(),
                    })
                .PrimaryKey(t => t.MediaTypeID);
            
            CreateTable(
                "dbo.MimeTypes",
                c => new
                    {
                        MimeTypeID = c.Guid(nullable: false),
                        Name = c.String(),
                        Mime = c.String(),
                        MediaType_MediaTypeID = c.Guid(),
                    })
                .PrimaryKey(t => t.MimeTypeID)
                .ForeignKey("dbo.MediaTypes", t => t.MediaType_MediaTypeID)
                .Index(t => t.MediaType_MediaTypeID);
            
            CreateTable(
                "dbo.UGenres",
                c => new
                    {
                        GenreID = c.Guid(nullable: false),
                        ParentID = c.Guid(),
                        IsPopular = c.Boolean(nullable: false),
                        VisibleOnHome = c.Int(nullable: false),
                        Name = c.String(),
                        AlbumID = c.Guid(),
                        ThumbnailID = c.Guid(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        UGenre_GenreID = c.Guid(),
                        UArtist_ArtistID = c.Guid(),
                        UFestival_FestivalID = c.Guid(),
                        Advertisement_AdvertisementID = c.Guid(),
                        UNews_NewsID = c.Guid(),
                    })
                .PrimaryKey(t => t.GenreID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.UGenres", t => t.UGenre_GenreID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .ForeignKey("dbo.UArtists", t => t.UArtist_ArtistID)
                .ForeignKey("dbo.UFestivals", t => t.UFestival_FestivalID)
                .ForeignKey("dbo.Advertisements", t => t.Advertisement_AdvertisementID)
                .ForeignKey("dbo.UNews", t => t.UNews_NewsID)
                .Index(t => t.AlbumID)
                .Index(t => t.ThumbnailID)
                .Index(t => t.UGenre_GenreID)
                .Index(t => t.UArtist_ArtistID)
                .Index(t => t.UFestival_FestivalID)
                .Index(t => t.Advertisement_AdvertisementID)
                .Index(t => t.UNews_NewsID);
            
            CreateTable(
                "dbo.SocialProfiles",
                c => new
                    {
                        SocialProfileID = c.Guid(nullable: false),
                        URL = c.String(),
                        ProfileTypeID = c.Guid(),
                        GenericID = c.Guid(),
                        ContentType = c.Int(nullable: false),
                        UArtist_ArtistID = c.Guid(),
                        Location_LocationID = c.Guid(),
                        UFestival_FestivalID = c.Guid(),
                    })
                .PrimaryKey(t => t.SocialProfileID)
                .ForeignKey("dbo.SocialProfileTypes", t => t.ProfileTypeID)
                .ForeignKey("dbo.UArtists", t => t.UArtist_ArtistID)
                .ForeignKey("dbo.Locations", t => t.Location_LocationID)
                .ForeignKey("dbo.UFestivals", t => t.UFestival_FestivalID)
                .Index(t => t.ProfileTypeID)
                .Index(t => t.GenericID)
                .Index(t => t.UArtist_ArtistID)
                .Index(t => t.Location_LocationID)
                .Index(t => t.UFestival_FestivalID);
            
            CreateTable(
                "dbo.SocialProfileTypes",
                c => new
                    {
                        SocialProfileTypeID = c.Guid(nullable: false),
                        FontAwesomeIcon = c.String(),
                        CssClass = c.String(),
                        MediaID = c.Guid(),
                        Name = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.SocialProfileTypeID);
            
            CreateTable(
                "dbo.UFestivals",
                c => new
                    {
                        FestivalID = c.Guid(nullable: false),
                        IsPopular = c.Boolean(nullable: false),
                        CountryID = c.Guid(),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        ZIPCode = c.String(),
                        IsSoldOut = c.Int(nullable: false),
                        Name = c.String(),
                        LogoID = c.Guid(),
                        IndoorOutdoor = c.String(),
                        City = c.String(),
                        Visitors = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Description = c.String(),
                        FestivalLocationID = c.Guid(),
                        MediaDirectoryID = c.Guid(),
                        ProfileImageID = c.Guid(),
                        TopFestival = c.Boolean(nullable: false),
                        MetaKeys = c.String(),
                        MetaDescription = c.String(),
                        Title = c.String(),
                        OrderDate = c.Long(nullable: false),
                        ShortText = c.String(),
                        MetaTitle = c.String(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.FestivalID)
                .ForeignKey("dbo.MediaDirectories", t => t.MediaDirectoryID)
                .ForeignKey("dbo.UCountries", t => t.CountryID)
                .ForeignKey("dbo.Locations", t => t.FestivalLocationID)
                .ForeignKey("dbo.Media", t => t.ProfileImageID)
                .Index(t => t.CountryID)
                .Index(t => t.FestivalLocationID)
                .Index(t => t.MediaDirectoryID)
                .Index(t => t.ProfileImageID);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        LocationID = c.Guid(nullable: false),
                        Address = c.String(),
                        ZIPCode = c.String(),
                        City = c.String(),
                        CountryID = c.Guid(),
                        LocationName = c.String(),
                        Name = c.String(),
                        Website = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        MapsURL = c.String(),
                        ThumbnailID = c.Guid(),
                        MediaDirectoryID = c.Guid(),
                        ProfileImageID = c.Guid(),
                        ProfileHeaderImageID = c.Guid(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        AuthorID = c.Guid(),
                        MetaKeys = c.String(),
                        MetaDescription = c.String(),
                        MetaTitle = c.String(),
                        ModifiedDate = c.DateTime(),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.LocationID)
                .ForeignKey("dbo.MediaDirectories", t => t.MediaDirectoryID)
                .ForeignKey("dbo.UCountries", t => t.CountryID)
                .ForeignKey("dbo.Media", t => t.ProfileHeaderImageID)
                .ForeignKey("dbo.Media", t => t.ProfileImageID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.CountryID)
                .Index(t => t.ThumbnailID)
                .Index(t => t.MediaDirectoryID)
                .Index(t => t.ProfileImageID)
                .Index(t => t.ProfileHeaderImageID);
            
            CreateTable(
                "dbo.Stages",
                c => new
                    {
                        StageID = c.Guid(nullable: false),
                        Name = c.String(),
                        FestivalID = c.Guid(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.StageID)
                .ForeignKey("dbo.UFestivals", t => t.FestivalID)
                .Index(t => t.FestivalID);
            
            CreateTable(
                "dbo.LineupItems",
                c => new
                    {
                        LineupItemID = c.Guid(nullable: false),
                        StageID = c.Guid(),
                        ArtistID = c.Guid(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        StartDateKey = c.Int(nullable: false),
                        EndDateKey = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.LineupItemID)
                .ForeignKey("dbo.UArtists", t => t.ArtistID)
                .ForeignKey("dbo.Stages", t => t.StageID)
                .Index(t => t.StageID)
                .Index(t => t.ArtistID);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        TicketID = c.Guid(nullable: false),
                        AuthorID = c.Guid(),
                        Price = c.Double(nullable: false),
                        Name = c.String(),
                        TicketDescription = c.String(),
                        IsAvailable = c.Boolean(nullable: false),
                        IsEarlyBird = c.Boolean(nullable: false),
                        IsVipTicket = c.Boolean(nullable: false),
                        IsDiscount = c.Boolean(nullable: false),
                        IsCombiDeal = c.Boolean(nullable: false),
                        IsAllinclusive = c.Boolean(nullable: false),
                        ExternalTicketURL = c.Boolean(nullable: false),
                        InternalURL = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(),
                        CurrencyBase = c.String(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        UFestival_FestivalID = c.Guid(),
                    })
                .PrimaryKey(t => t.TicketID)
                .ForeignKey("dbo.ApplicationUsers", t => t.AuthorID)
                .ForeignKey("dbo.UFestivals", t => t.UFestival_FestivalID)
                .Index(t => t.AuthorID)
                .Index(t => t.UFestival_FestivalID);
            
            CreateTable(
                "dbo.Adv2Visibility",
                c => new
                    {
                        Adv2VisibilityID = c.Guid(nullable: false),
                        InternalContentID = c.Guid(),
                        InternalContentType = c.Int(nullable: false),
                        AdvertisementID = c.Guid(),
                    })
                .PrimaryKey(t => t.Adv2VisibilityID)
                .Index(t => t.InternalContentID)
                .Index(t => t.InternalContentType)
                .Index(t => t.AdvertisementID);
            
            CreateTable(
                "dbo.Advertisements",
                c => new
                    {
                        AdvertisementID = c.Guid(nullable: false),
                        Description = c.String(),
                        HTMLString = c.String(),
                        CSSString = c.String(),
                        JSString = c.String(),
                        MetaKeys = c.String(),
                        MetaDescription = c.String(),
                        AdvertisementType = c.Int(nullable: false),
                        InternalContentType = c.Int(nullable: false),
                        ResellerID = c.Guid(),
                        InternalContentID = c.Guid(),
                        Expires = c.DateTime(),
                        PublishDate = c.DateTime(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.AdvertisementID)
                .ForeignKey("dbo.Resellers", t => t.ResellerID)
                .Index(t => t.ResellerID)
                .Index(t => t.Expires)
                .Index(t => t.PublishDate);
            
            CreateTable(
                "dbo.Resellers",
                c => new
                    {
                        ResellerID = c.Guid(nullable: false),
                        Reference = c.String(),
                        Name = c.String(),
                        Website = c.String(),
                        QueryString = c.String(),
                        ThumbnailID = c.Guid(),
                        Contactname = c.String(),
                        Contactemail = c.String(),
                        InternalUserID = c.Guid(),
                        AuthorID = c.Guid(),
                        AlbumID = c.Guid(),
                        ResellerTypeID = c.Guid(),
                        ProfileImageID = c.Guid(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ResellerID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.ApplicationUsers", t => t.AuthorID)
                .ForeignKey("dbo.ApplicationUsers", t => t.InternalUserID)
                .ForeignKey("dbo.Media", t => t.ProfileImageID)
                .ForeignKey("dbo.ResellerTypes", t => t.ResellerTypeID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.ThumbnailID)
                .Index(t => t.InternalUserID)
                .Index(t => t.AuthorID)
                .Index(t => t.AlbumID)
                .Index(t => t.ResellerTypeID)
                .Index(t => t.ProfileImageID);
            
            CreateTable(
                "dbo.ResellerTypes",
                c => new
                    {
                        ResellerTypeID = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ResellerTypeID);
            
            CreateTable(
                "dbo.ResellerGenres",
                c => new
                    {
                        ResellerGenreID = c.Guid(nullable: false),
                        GenreName = c.String(),
                        Description = c.String(),
                        AuthorID = c.Guid(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        Advertisement_AdvertisementID = c.Guid(),
                    })
                .PrimaryKey(t => t.ResellerGenreID)
                .ForeignKey("dbo.Advertisements", t => t.Advertisement_AdvertisementID)
                .Index(t => t.Advertisement_AdvertisementID);
            
            CreateTable(
                "dbo.AppUserSessions",
                c => new
                    {
                        SessionID = c.Guid(nullable: false),
                        UserID = c.Guid(),
                        Token = c.Guid(),
                        Active = c.Boolean(nullable: false),
                        IPAddress = c.String(),
                        IPv6Address = c.String(),
                        HostName = c.String(),
                        HostAddress = c.String(),
                        Expires = c.DateTime(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Culture = c.String(),
                        UserAgent = c.String(),
                        ScreenWidth = c.String(),
                        ScreenHeight = c.String(),
                        Authorized = c.Boolean(nullable: false),
                        Authenticated = c.Boolean(nullable: false),
                        IsMobileDevice = c.Boolean(nullable: false),
                        BrowserName = c.String(),
                        Platform = c.String(),
                        MobileDeviceName = c.String(),
                        MobileDeviceVersion = c.String(),
                        Mode = c.Int(nullable: false),
                        Controller = c.String(),
                        Action = c.String(),
                        URI = c.String(),
                        Payload = c.String(),
                    })
                .PrimaryKey(t => t.SessionID)
                .ForeignKey("dbo.ApplicationUsers", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.Token);
            
            CreateTable(
                "dbo.CalendarCardAds",
                c => new
                    {
                        CalendarAdvID = c.Guid(nullable: false),
                        AdvertisementID = c.Guid(),
                        Title = c.String(),
                        Image = c.String(),
                        TextLine = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        CanRate = c.Boolean(nullable: false),
                        MusicGenresVisible = c.Boolean(nullable: false),
                        DeepLink = c.String(),
                        AuthorID = c.Guid(),
                    })
                .PrimaryKey(t => t.CalendarAdvID)
                .ForeignKey("dbo.Advertisements", t => t.AdvertisementID)
                .Index(t => t.AdvertisementID);
            
            CreateTable(
                "dbo.CarouselAds",
                c => new
                    {
                        CarsouselAdID = c.Guid(nullable: false),
                        AdvertisementID = c.Guid(),
                        IntervalMs = c.Int(nullable: false),
                        Direction = c.String(),
                        DeepLink1 = c.String(),
                        DeepLink2 = c.String(),
                        DeepLink3 = c.String(),
                        IsAreaLink = c.Boolean(nullable: false),
                        Area1 = c.String(),
                        Area2 = c.String(),
                        Area3 = c.String(),
                        MediaItem1ID = c.Guid(),
                        MediaItem2ID = c.Guid(),
                        MediaItem3ID = c.Guid(),
                        AlbumID = c.Guid(),
                        CarouselType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CarsouselAdID)
                .ForeignKey("dbo.Advertisements", t => t.AdvertisementID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.Media", t => t.MediaItem1ID)
                .ForeignKey("dbo.Media", t => t.MediaItem2ID)
                .ForeignKey("dbo.Media", t => t.MediaItem3ID)
                .Index(t => t.AdvertisementID)
                .Index(t => t.MediaItem1ID)
                .Index(t => t.MediaItem2ID)
                .Index(t => t.MediaItem3ID)
                .Index(t => t.AlbumID);
            
            CreateTable(
                "dbo.Favorites",
                c => new
                    {
                        FavID = c.Guid(nullable: false),
                        ContentID = c.Guid(),
                        ContentType = c.Int(nullable: false),
                        UserID = c.Guid(),
                    })
                .PrimaryKey(t => t.FavID)
                .ForeignKey("dbo.ApplicationUsers", t => t.UserID)
                .Index(t => t.ContentID)
                .Index(t => t.ContentType)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.UGenre2UArtist",
                c => new
                    {
                        G2AID = c.Guid(nullable: false),
                        GenreID = c.Guid(),
                        ArtistID = c.Guid(),
                    })
                .PrimaryKey(t => t.G2AID)
                .ForeignKey("dbo.UArtists", t => t.ArtistID)
                .ForeignKey("dbo.UGenres", t => t.GenreID)
                .Index(t => t.GenreID)
                .Index(t => t.ArtistID);
            
            CreateTable(
                "dbo.UGenre2UFestival",
                c => new
                    {
                        G2FID = c.Guid(nullable: false),
                        GenreID = c.Guid(),
                        FestivalID = c.Guid(),
                    })
                .PrimaryKey(t => t.G2FID)
                .ForeignKey("dbo.UFestivals", t => t.FestivalID)
                .ForeignKey("dbo.UGenres", t => t.GenreID)
                .Index(t => t.GenreID)
                .Index(t => t.FestivalID);
            
            CreateTable(
                "dbo.UGenre2UNews",
                c => new
                    {
                        G2NID = c.Guid(nullable: false),
                        GenreID = c.Guid(),
                        NewsID = c.Guid(),
                    })
                .PrimaryKey(t => t.G2NID)
                .ForeignKey("dbo.UGenres", t => t.GenreID)
                .ForeignKey("dbo.UNews", t => t.NewsID)
                .Index(t => t.GenreID)
                .Index(t => t.NewsID);
            
            CreateTable(
                "dbo.UNews",
                c => new
                    {
                        NewsID = c.Guid(nullable: false),
                        Title = c.String(),
                        Date = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        MediaDirectoryID = c.Guid(),
                        Text = c.String(),
                        SourceURL = c.String(),
                        SourceName = c.String(),
                        ThumbnailID = c.Guid(),
                        MetaKeys = c.String(),
                        MetaDescription = c.String(),
                        DisplayDate = c.String(),
                        ShortText = c.String(),
                        DetailText = c.String(),
                        Link = c.String(),
                        RatingScore = c.Int(nullable: false),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.NewsID)
                .ForeignKey("dbo.MediaDirectories", t => t.MediaDirectoryID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.MediaDirectoryID)
                .Index(t => t.ThumbnailID);
            
            CreateTable(
                "dbo.GenericMessages",
                c => new
                    {
                        MessageID = c.Guid(nullable: false),
                        Title = c.String(),
                        Message = c.String(),
                        Created = c.DateTime(nullable: false),
                        ExceptionType = c.String(),
                        Exception = c.String(),
                        StackTrace = c.String(),
                        InnerException = c.String(),
                        InnerStackTrace = c.String(),
                        NotifyToEmail = c.String(),
                        NotifyToPhone = c.String(),
                        LineNR = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        IsNew = c.Boolean(nullable: false),
                        IsHandled = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        NotifyByMail = c.Boolean(nullable: false),
                        IsPublic = c.Boolean(nullable: false),
                        IsUserMessage = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(nullable: false),
                        SessionID = c.Guid(),
                        UserID = c.Guid(),
                    })
                .PrimaryKey(t => t.MessageID)
                .Index(t => t.SessionID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        LanguageID = c.Guid(nullable: false),
                        TwoLetterLangName = c.String(),
                        LangName = c.String(),
                        IsoCulture = c.String(),
                        CodePage = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.LanguageID);
            
            CreateTable(
                "dbo.MenuItems",
                c => new
                    {
                        MenuItemID = c.Guid(nullable: false),
                        ParentID = c.Guid(),
                        OpositeID = c.Guid(),
                        FAIcon = c.String(),
                        Title = c.String(),
                        OnClick = c.String(),
                        IsSpecific = c.Boolean(nullable: false),
                        SectionID = c.Guid(),
                        ModifiedDate = c.DateTime(),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.MenuItemID)
                .ForeignKey("dbo.MenuSections", t => t.SectionID)
                .Index(t => t.SectionID);
            
            CreateTable(
                "dbo.MenuSections",
                c => new
                    {
                        SectionID = c.Guid(nullable: false),
                        Name = c.String(),
                        FAIcon = c.String(),
                        SortOrder = c.Int(nullable: false),
                        PageKey = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        ModifiedDate = c.DateTime(),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        ArchiveDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        AuthorID = c.Guid(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.SectionID);
            
            CreateTable(
                "dbo.MenuSection2Roles",
                c => new
                    {
                        MS2RID = c.Guid(nullable: false),
                        RoleID = c.Guid(),
                        MenuSectionID = c.Guid(),
                    })
                .PrimaryKey(t => t.MS2RID)
                .ForeignKey("dbo.Roles", t => t.RoleID)
                .ForeignKey("dbo.MenuSections", t => t.MenuSectionID)
                .Index(t => t.RoleID)
                .Index(t => t.MenuSectionID);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        RoleID = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.RoleID);
            
            CreateTable(
                "dbo.Permissions",
                c => new
                    {
                        PermissionID = c.Guid(nullable: false),
                        PermissionKey = c.String(),
                        Weight = c.Int(nullable: false),
                        Role_RoleID = c.Guid(),
                    })
                .PrimaryKey(t => t.PermissionID)
                .ForeignKey("dbo.Roles", t => t.Role_RoleID)
                .Index(t => t.Role_RoleID);
            
            CreateTable(
                "dbo.MimeType2MediaType",
                c => new
                    {
                        MT2MTID = c.Guid(nullable: false),
                        MimeTypeID = c.Guid(),
                        MediaTypeID = c.Guid(),
                    })
                .PrimaryKey(t => t.MT2MTID)
                .ForeignKey("dbo.MediaTypes", t => t.MediaTypeID)
                .ForeignKey("dbo.MimeTypes", t => t.MimeTypeID)
                .Index(t => t.MimeTypeID)
                .Index(t => t.MediaTypeID);
            
            CreateTable(
                "dbo.UNews2UCountry",
                c => new
                    {
                        C2NID = c.Guid(nullable: false),
                        CountryID = c.Guid(),
                        NewsID = c.Guid(),
                    })
                .PrimaryKey(t => t.C2NID)
                .ForeignKey("dbo.UCountries", t => t.CountryID)
                .ForeignKey("dbo.UNews", t => t.NewsID)
                .Index(t => t.CountryID)
                .Index(t => t.NewsID);
            
            CreateTable(
                "dbo.NewsListLineAds",
                c => new
                    {
                        NewsListLineAdID = c.Guid(nullable: false),
                        AdvertisementID = c.Guid(),
                        Title = c.Int(nullable: false),
                        Text = c.String(),
                        DeepLink = c.String(),
                        AlbumID = c.Guid(),
                        ThumbnailID = c.Guid(),
                        CarouselType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.NewsListLineAdID)
                .ForeignKey("dbo.Advertisements", t => t.AdvertisementID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.AdvertisementID)
                .Index(t => t.AlbumID)
                .Index(t => t.ThumbnailID);
            
            CreateTable(
                "dbo.Permission2Role",
                c => new
                    {
                        P2RID = c.Guid(nullable: false),
                        PermissionID = c.Guid(),
                        RoleID = c.Guid(),
                    })
                .PrimaryKey(t => t.P2RID)
                .ForeignKey("dbo.Permissions", t => t.PermissionID)
                .ForeignKey("dbo.Roles", t => t.RoleID)
                .Index(t => t.PermissionID)
                .Index(t => t.RoleID);
            
            CreateTable(
                "dbo.Plugins",
                c => new
                    {
                        PluginID = c.Guid(nullable: false),
                        PluginName = c.String(),
                        PluginDescription = c.String(),
                        PluginWebsite = c.String(),
                        PluginPath = c.String(),
                        AuthorID = c.Guid(),
                        Version = c.String(),
                        AlbumID = c.Guid(),
                        MediaID = c.Guid(),
                        IsDeleted = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Expires = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.PluginID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.ApplicationUsers", t => t.AuthorID)
                .ForeignKey("dbo.Media", t => t.MediaID)
                .Index(t => t.AuthorID)
                .Index(t => t.AlbumID)
                .Index(t => t.MediaID);
            
            CreateTable(
                "dbo.Product2Reseller",
                c => new
                    {
                        PR2REID = c.Guid(nullable: false),
                        ProductID = c.Guid(),
                        ResellerID = c.Guid(),
                    })
                .PrimaryKey(t => t.PR2REID)
                .ForeignKey("dbo.Products", t => t.ProductID)
                .ForeignKey("dbo.Resellers", t => t.ResellerID)
                .Index(t => t.ProductID)
                .Index(t => t.ResellerID);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ProductID = c.Guid(nullable: false),
                        Price = c.Double(nullable: false),
                        DiscountPrice = c.Double(nullable: false),
                        ResellerID = c.Guid(),
                        AuthorID = c.Guid(),
                        Name = c.String(),
                        Description = c.String(),
                        IsAvailable = c.Boolean(nullable: false),
                        IsDiscount = c.Boolean(nullable: false),
                        IsCombiDeal = c.Boolean(nullable: false),
                        IsAllinclusive = c.Boolean(nullable: false),
                        ExternalProductURL = c.Boolean(nullable: false),
                        InternalURL = c.Boolean(nullable: false),
                        ArchiveDate = c.DateTime(),
                        IsDeleted = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        CurrencyBase = c.String(),
                        ModifiedDate = c.DateTime(),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        Created = c.DateTime(),
                        Modified = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        DeleteDate = c.DateTime(),
                        Deleted = c.Boolean(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProductID)
                .ForeignKey("dbo.ApplicationUsers", t => t.AuthorID)
                .ForeignKey("dbo.Resellers", t => t.ResellerID)
                .Index(t => t.ResellerID)
                .Index(t => t.AuthorID);
            
            CreateTable(
                "dbo.ProfileHeaderAds",
                c => new
                    {
                        CalendarAdvID = c.Guid(nullable: false),
                        AdvertisementID = c.Guid(),
                        AlbumID = c.Guid(),
                        MediaID = c.Guid(),
                        Title = c.String(),
                        TextLine = c.String(),
                        Date = c.DateTime(nullable: false),
                        DeepLink = c.String(),
                    })
                .PrimaryKey(t => t.CalendarAdvID)
                .ForeignKey("dbo.Advertisements", t => t.AdvertisementID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.Media", t => t.MediaID)
                .Index(t => t.AdvertisementID)
                .Index(t => t.AlbumID)
                .Index(t => t.MediaID);
            
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        RatingID = c.Guid(nullable: false),
                        CreditAmmount = c.Int(nullable: false),
                        ContentItemID = c.Guid(),
                        Type = c.String(),
                        IP = c.String(),
                        Host = c.String(),
                        UserID = c.Guid(),
                    })
                .PrimaryKey(t => t.RatingID);
            
            CreateTable(
                "dbo.ResellerGenre2ResellerType",
                c => new
                    {
                        RG2RTID = c.Guid(nullable: false),
                        ResellerTypeID = c.Guid(),
                        ResellerGenreID = c.Guid(),
                    })
                .PrimaryKey(t => t.RG2RTID)
                .ForeignKey("dbo.ResellerGenres", t => t.ResellerGenreID)
                .ForeignKey("dbo.ResellerTypes", t => t.ResellerTypeID)
                .Index(t => t.ResellerTypeID)
                .Index(t => t.ResellerGenreID);
            
            CreateTable(
                "dbo.SeedVersions",
                c => new
                    {
                        SeedVersionID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.SeedVersionID);
            
            CreateTable(
                "dbo.SponsorAds",
                c => new
                    {
                        SponsorAdID = c.Guid(nullable: false),
                        AdvertisementID = c.Guid(),
                        Title = c.Int(nullable: false),
                        Text = c.String(),
                        DeepLink = c.String(),
                        AlbumID = c.Guid(),
                        ThumbnailID = c.Guid(),
                    })
                .PrimaryKey(t => t.SponsorAdID)
                .ForeignKey("dbo.Advertisements", t => t.AdvertisementID)
                .ForeignKey("dbo.MediaDirectories", t => t.AlbumID)
                .ForeignKey("dbo.Media", t => t.ThumbnailID)
                .Index(t => t.AdvertisementID)
                .Index(t => t.AlbumID)
                .Index(t => t.ThumbnailID);
            
            CreateTable(
                "dbo.Ticket2Festival",
                c => new
                    {
                        T2FID = c.Guid(nullable: false),
                        FestivalID = c.Guid(),
                        TicketID = c.Guid(),
                    })
                .PrimaryKey(t => t.T2FID)
                .ForeignKey("dbo.UFestivals", t => t.FestivalID)
                .ForeignKey("dbo.Tickets", t => t.TicketID)
                .Index(t => t.FestivalID)
                .Index(t => t.TicketID);
            
            CreateTable(
                "dbo.Tickets2Reseller",
                c => new
                    {
                        T2RID = c.Guid(nullable: false),
                        TicketID = c.Guid(),
                        ResellerID = c.Guid(),
                    })
                .PrimaryKey(t => t.T2RID)
                .ForeignKey("dbo.Resellers", t => t.ResellerID)
                .ForeignKey("dbo.Tickets", t => t.TicketID)
                .Index(t => t.TicketID)
                .Index(t => t.ResellerID);
            
            CreateTable(
                "dbo.Translations",
                c => new
                    {
                        TranslationID = c.Guid(nullable: false),
                        LanguageID = c.Guid(),
                        TransKey = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.TranslationID)
                .ForeignKey("dbo.Languages", t => t.LanguageID)
                .Index(t => t.LanguageID);
            
            CreateTable(
                "dbo.User2Role",
                c => new
                    {
                        U2RID = c.Guid(nullable: false),
                        UserID = c.Guid(),
                        RoleID = c.Guid(),
                    })
                .PrimaryKey(t => t.U2RID)
                .ForeignKey("dbo.Roles", t => t.RoleID)
                .ForeignKey("dbo.ApplicationUsers", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.RoleID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.User2Role", "UserID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.User2Role", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Translations", "LanguageID", "dbo.Languages");
            DropForeignKey("dbo.Tickets2Reseller", "TicketID", "dbo.Tickets");
            DropForeignKey("dbo.Tickets2Reseller", "ResellerID", "dbo.Resellers");
            DropForeignKey("dbo.Ticket2Festival", "TicketID", "dbo.Tickets");
            DropForeignKey("dbo.Ticket2Festival", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.SponsorAds", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.SponsorAds", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.SponsorAds", "AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.ResellerGenre2ResellerType", "ResellerTypeID", "dbo.ResellerTypes");
            DropForeignKey("dbo.ResellerGenre2ResellerType", "ResellerGenreID", "dbo.ResellerGenres");
            DropForeignKey("dbo.ProfileHeaderAds", "MediaID", "dbo.Media");
            DropForeignKey("dbo.ProfileHeaderAds", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.ProfileHeaderAds", "AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.Product2Reseller", "ResellerID", "dbo.Resellers");
            DropForeignKey("dbo.Product2Reseller", "ProductID", "dbo.Products");
            DropForeignKey("dbo.Products", "ResellerID", "dbo.Resellers");
            DropForeignKey("dbo.Products", "AuthorID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Plugins", "MediaID", "dbo.Media");
            DropForeignKey("dbo.Plugins", "AuthorID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Plugins", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.Permission2Role", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Permission2Role", "PermissionID", "dbo.Permissions");
            DropForeignKey("dbo.NewsListLineAds", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.NewsListLineAds", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.NewsListLineAds", "AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.UNews2UCountry", "NewsID", "dbo.UNews");
            DropForeignKey("dbo.UNews2UCountry", "CountryID", "dbo.UCountries");
            DropForeignKey("dbo.MimeType2MediaType", "MimeTypeID", "dbo.MimeTypes");
            DropForeignKey("dbo.MimeType2MediaType", "MediaTypeID", "dbo.MediaTypes");
            DropForeignKey("dbo.MenuSection2Roles", "MenuSectionID", "dbo.MenuSections");
            DropForeignKey("dbo.MenuSection2Roles", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Permissions", "Role_RoleID", "dbo.Roles");
            DropForeignKey("dbo.MenuItems", "SectionID", "dbo.MenuSections");
            DropForeignKey("dbo.UGenre2UNews", "NewsID", "dbo.UNews");
            DropForeignKey("dbo.UNews", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.UGenres", "UNews_NewsID", "dbo.UNews");
            DropForeignKey("dbo.UNews", "MediaDirectoryID", "dbo.MediaDirectories");
            DropForeignKey("dbo.UGenre2UNews", "GenreID", "dbo.UGenres");
            DropForeignKey("dbo.UGenre2UFestival", "GenreID", "dbo.UGenres");
            DropForeignKey("dbo.UGenre2UFestival", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.UGenre2UArtist", "GenreID", "dbo.UGenres");
            DropForeignKey("dbo.UGenre2UArtist", "ArtistID", "dbo.UArtists");
            DropForeignKey("dbo.Favorites", "UserID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.CarouselAds", "MediaItem3ID", "dbo.Media");
            DropForeignKey("dbo.CarouselAds", "MediaItem2ID", "dbo.Media");
            DropForeignKey("dbo.CarouselAds", "MediaItem1ID", "dbo.Media");
            DropForeignKey("dbo.CarouselAds", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.CarouselAds", "AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.CalendarCardAds", "AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.AppUserSessions", "UserID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.ResellerGenres", "Advertisement_AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.Advertisements", "ResellerID", "dbo.Resellers");
            DropForeignKey("dbo.Resellers", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.Resellers", "ResellerTypeID", "dbo.ResellerTypes");
            DropForeignKey("dbo.Resellers", "ProfileImageID", "dbo.Media");
            DropForeignKey("dbo.Resellers", "InternalUserID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Resellers", "AuthorID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Resellers", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.UGenres", "Advertisement_AdvertisementID", "dbo.Advertisements");
            DropForeignKey("dbo.UArtist2UFestival", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.Tickets", "UFestival_FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.Tickets", "AuthorID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Stages", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.LineupItems", "StageID", "dbo.Stages");
            DropForeignKey("dbo.LineupItems", "ArtistID", "dbo.UArtists");
            DropForeignKey("dbo.SocialProfiles", "UFestival_FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.UFestivals", "ProfileImageID", "dbo.Media");
            DropForeignKey("dbo.UGenres", "UFestival_FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.UFestivals", "FestivalLocationID", "dbo.Locations");
            DropForeignKey("dbo.Locations", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.SocialProfiles", "Location_LocationID", "dbo.Locations");
            DropForeignKey("dbo.Locations", "ProfileImageID", "dbo.Media");
            DropForeignKey("dbo.Locations", "ProfileHeaderImageID", "dbo.Media");
            DropForeignKey("dbo.Locations", "CountryID", "dbo.UCountries");
            DropForeignKey("dbo.Locations", "MediaDirectoryID", "dbo.MediaDirectories");
            DropForeignKey("dbo.UFestivals", "CountryID", "dbo.UCountries");
            DropForeignKey("dbo.UFestivals", "MediaDirectoryID", "dbo.MediaDirectories");
            DropForeignKey("dbo.UArtist2UFestival", "ArtistID", "dbo.UArtists");
            DropForeignKey("dbo.UArtists", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.SocialProfiles", "UArtist_ArtistID", "dbo.UArtists");
            DropForeignKey("dbo.SocialProfiles", "ProfileTypeID", "dbo.SocialProfileTypes");
            DropForeignKey("dbo.UArtists", "ProfileImageID", "dbo.Media");
            DropForeignKey("dbo.UGenres", "UArtist_ArtistID", "dbo.UArtists");
            DropForeignKey("dbo.UGenres", "ThumbnailID", "dbo.Media");
            DropForeignKey("dbo.UGenres", "UGenre_GenreID", "dbo.UGenres");
            DropForeignKey("dbo.UGenres", "AlbumID", "dbo.MediaDirectories");
            DropForeignKey("dbo.UArtists", "CountryID", "dbo.UCountries");
            DropForeignKey("dbo.UArtists", "MediaDirectoryID", "dbo.MediaDirectories");
            DropForeignKey("dbo.Media", "DirectoryID", "dbo.MediaDirectories");
            DropForeignKey("dbo.Media", "MediaTypeID", "dbo.MediaTypes");
            DropForeignKey("dbo.MimeTypes", "MediaType_MediaTypeID", "dbo.MediaTypes");
            DropForeignKey("dbo.Media", "AuthorID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.ApplicationUsers", "CountryID", "dbo.UCountries");
            DropForeignKey("dbo.ApplicationUsers", "MediaDirectoryID", "dbo.MediaDirectories");
            DropIndex("dbo.User2Role", new[] { "RoleID" });
            DropIndex("dbo.User2Role", new[] { "UserID" });
            DropIndex("dbo.Translations", new[] { "LanguageID" });
            DropIndex("dbo.Tickets2Reseller", new[] { "ResellerID" });
            DropIndex("dbo.Tickets2Reseller", new[] { "TicketID" });
            DropIndex("dbo.Ticket2Festival", new[] { "TicketID" });
            DropIndex("dbo.Ticket2Festival", new[] { "FestivalID" });
            DropIndex("dbo.SponsorAds", new[] { "ThumbnailID" });
            DropIndex("dbo.SponsorAds", new[] { "AlbumID" });
            DropIndex("dbo.SponsorAds", new[] { "AdvertisementID" });
            DropIndex("dbo.ResellerGenre2ResellerType", new[] { "ResellerGenreID" });
            DropIndex("dbo.ResellerGenre2ResellerType", new[] { "ResellerTypeID" });
            DropIndex("dbo.ProfileHeaderAds", new[] { "MediaID" });
            DropIndex("dbo.ProfileHeaderAds", new[] { "AlbumID" });
            DropIndex("dbo.ProfileHeaderAds", new[] { "AdvertisementID" });
            DropIndex("dbo.Products", new[] { "AuthorID" });
            DropIndex("dbo.Products", new[] { "ResellerID" });
            DropIndex("dbo.Product2Reseller", new[] { "ResellerID" });
            DropIndex("dbo.Product2Reseller", new[] { "ProductID" });
            DropIndex("dbo.Plugins", new[] { "MediaID" });
            DropIndex("dbo.Plugins", new[] { "AlbumID" });
            DropIndex("dbo.Plugins", new[] { "AuthorID" });
            DropIndex("dbo.Permission2Role", new[] { "RoleID" });
            DropIndex("dbo.Permission2Role", new[] { "PermissionID" });
            DropIndex("dbo.NewsListLineAds", new[] { "ThumbnailID" });
            DropIndex("dbo.NewsListLineAds", new[] { "AlbumID" });
            DropIndex("dbo.NewsListLineAds", new[] { "AdvertisementID" });
            DropIndex("dbo.UNews2UCountry", new[] { "NewsID" });
            DropIndex("dbo.UNews2UCountry", new[] { "CountryID" });
            DropIndex("dbo.MimeType2MediaType", new[] { "MediaTypeID" });
            DropIndex("dbo.MimeType2MediaType", new[] { "MimeTypeID" });
            DropIndex("dbo.Permissions", new[] { "Role_RoleID" });
            DropIndex("dbo.MenuSection2Roles", new[] { "MenuSectionID" });
            DropIndex("dbo.MenuSection2Roles", new[] { "RoleID" });
            DropIndex("dbo.MenuItems", new[] { "SectionID" });
            DropIndex("dbo.GenericMessages", new[] { "UserID" });
            DropIndex("dbo.GenericMessages", new[] { "SessionID" });
            DropIndex("dbo.UNews", new[] { "ThumbnailID" });
            DropIndex("dbo.UNews", new[] { "MediaDirectoryID" });
            DropIndex("dbo.UGenre2UNews", new[] { "NewsID" });
            DropIndex("dbo.UGenre2UNews", new[] { "GenreID" });
            DropIndex("dbo.UGenre2UFestival", new[] { "FestivalID" });
            DropIndex("dbo.UGenre2UFestival", new[] { "GenreID" });
            DropIndex("dbo.UGenre2UArtist", new[] { "ArtistID" });
            DropIndex("dbo.UGenre2UArtist", new[] { "GenreID" });
            DropIndex("dbo.Favorites", new[] { "UserID" });
            DropIndex("dbo.Favorites", new[] { "ContentType" });
            DropIndex("dbo.Favorites", new[] { "ContentID" });
            DropIndex("dbo.CarouselAds", new[] { "AlbumID" });
            DropIndex("dbo.CarouselAds", new[] { "MediaItem3ID" });
            DropIndex("dbo.CarouselAds", new[] { "MediaItem2ID" });
            DropIndex("dbo.CarouselAds", new[] { "MediaItem1ID" });
            DropIndex("dbo.CarouselAds", new[] { "AdvertisementID" });
            DropIndex("dbo.CalendarCardAds", new[] { "AdvertisementID" });
            DropIndex("dbo.AppUserSessions", new[] { "Token" });
            DropIndex("dbo.AppUserSessions", new[] { "UserID" });
            DropIndex("dbo.ResellerGenres", new[] { "Advertisement_AdvertisementID" });
            DropIndex("dbo.Resellers", new[] { "ProfileImageID" });
            DropIndex("dbo.Resellers", new[] { "ResellerTypeID" });
            DropIndex("dbo.Resellers", new[] { "AlbumID" });
            DropIndex("dbo.Resellers", new[] { "AuthorID" });
            DropIndex("dbo.Resellers", new[] { "InternalUserID" });
            DropIndex("dbo.Resellers", new[] { "ThumbnailID" });
            DropIndex("dbo.Advertisements", new[] { "PublishDate" });
            DropIndex("dbo.Advertisements", new[] { "Expires" });
            DropIndex("dbo.Advertisements", new[] { "ResellerID" });
            DropIndex("dbo.Adv2Visibility", new[] { "AdvertisementID" });
            DropIndex("dbo.Adv2Visibility", new[] { "InternalContentType" });
            DropIndex("dbo.Adv2Visibility", new[] { "InternalContentID" });
            DropIndex("dbo.Tickets", new[] { "UFestival_FestivalID" });
            DropIndex("dbo.Tickets", new[] { "AuthorID" });
            DropIndex("dbo.LineupItems", new[] { "ArtistID" });
            DropIndex("dbo.LineupItems", new[] { "StageID" });
            DropIndex("dbo.Stages", new[] { "FestivalID" });
            DropIndex("dbo.Locations", new[] { "ProfileHeaderImageID" });
            DropIndex("dbo.Locations", new[] { "ProfileImageID" });
            DropIndex("dbo.Locations", new[] { "MediaDirectoryID" });
            DropIndex("dbo.Locations", new[] { "ThumbnailID" });
            DropIndex("dbo.Locations", new[] { "CountryID" });
            DropIndex("dbo.UFestivals", new[] { "ProfileImageID" });
            DropIndex("dbo.UFestivals", new[] { "MediaDirectoryID" });
            DropIndex("dbo.UFestivals", new[] { "FestivalLocationID" });
            DropIndex("dbo.UFestivals", new[] { "CountryID" });
            DropIndex("dbo.SocialProfiles", new[] { "UFestival_FestivalID" });
            DropIndex("dbo.SocialProfiles", new[] { "Location_LocationID" });
            DropIndex("dbo.SocialProfiles", new[] { "UArtist_ArtistID" });
            DropIndex("dbo.SocialProfiles", new[] { "GenericID" });
            DropIndex("dbo.SocialProfiles", new[] { "ProfileTypeID" });
            DropIndex("dbo.UGenres", new[] { "UNews_NewsID" });
            DropIndex("dbo.UGenres", new[] { "Advertisement_AdvertisementID" });
            DropIndex("dbo.UGenres", new[] { "UFestival_FestivalID" });
            DropIndex("dbo.UGenres", new[] { "UArtist_ArtistID" });
            DropIndex("dbo.UGenres", new[] { "UGenre_GenreID" });
            DropIndex("dbo.UGenres", new[] { "ThumbnailID" });
            DropIndex("dbo.UGenres", new[] { "AlbumID" });
            DropIndex("dbo.MimeTypes", new[] { "MediaType_MediaTypeID" });
            DropIndex("dbo.ApplicationUsers", new[] { "MediaDirectoryID" });
            DropIndex("dbo.ApplicationUsers", new[] { "CountryID" });
            DropIndex("dbo.Media", new[] { "AuthorID" });
            DropIndex("dbo.Media", new[] { "MediaTypeID" });
            DropIndex("dbo.Media", new[] { "DirectoryID" });
            DropIndex("dbo.UArtists", new[] { "ProfileImageID" });
            DropIndex("dbo.UArtists", new[] { "ThumbnailID" });
            DropIndex("dbo.UArtists", new[] { "MediaDirectoryID" });
            DropIndex("dbo.UArtists", new[] { "CountryID" });
            DropIndex("dbo.UArtist2UFestival", new[] { "FestivalID" });
            DropIndex("dbo.UArtist2UFestival", new[] { "ArtistID" });
            DropTable("dbo.User2Role");
            DropTable("dbo.Translations");
            DropTable("dbo.Tickets2Reseller");
            DropTable("dbo.Ticket2Festival");
            DropTable("dbo.SponsorAds");
            DropTable("dbo.SeedVersions");
            DropTable("dbo.ResellerGenre2ResellerType");
            DropTable("dbo.Ratings");
            DropTable("dbo.ProfileHeaderAds");
            DropTable("dbo.Products");
            DropTable("dbo.Product2Reseller");
            DropTable("dbo.Plugins");
            DropTable("dbo.Permission2Role");
            DropTable("dbo.NewsListLineAds");
            DropTable("dbo.UNews2UCountry");
            DropTable("dbo.MimeType2MediaType");
            DropTable("dbo.Permissions");
            DropTable("dbo.Roles");
            DropTable("dbo.MenuSection2Roles");
            DropTable("dbo.MenuSections");
            DropTable("dbo.MenuItems");
            DropTable("dbo.Languages");
            DropTable("dbo.GenericMessages");
            DropTable("dbo.UNews");
            DropTable("dbo.UGenre2UNews");
            DropTable("dbo.UGenre2UFestival");
            DropTable("dbo.UGenre2UArtist");
            DropTable("dbo.Favorites");
            DropTable("dbo.CarouselAds");
            DropTable("dbo.CalendarCardAds");
            DropTable("dbo.AppUserSessions");
            DropTable("dbo.ResellerGenres");
            DropTable("dbo.ResellerTypes");
            DropTable("dbo.Resellers");
            DropTable("dbo.Advertisements");
            DropTable("dbo.Adv2Visibility");
            DropTable("dbo.Tickets");
            DropTable("dbo.LineupItems");
            DropTable("dbo.Stages");
            DropTable("dbo.Locations");
            DropTable("dbo.UFestivals");
            DropTable("dbo.SocialProfileTypes");
            DropTable("dbo.SocialProfiles");
            DropTable("dbo.UGenres");
            DropTable("dbo.MimeTypes");
            DropTable("dbo.MediaTypes");
            DropTable("dbo.UCountries");
            DropTable("dbo.ApplicationUsers");
            DropTable("dbo.Media");
            DropTable("dbo.MediaDirectories");
            DropTable("dbo.UArtists");
            DropTable("dbo.UArtist2UFestival");
        }
    }
}
