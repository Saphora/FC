namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update201703041014 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UGenres", "UAnnouncement_AnnouncementID", "dbo.UAnnouncements");
            DropIndex("dbo.UGenres", new[] { "UAnnouncement_AnnouncementID" });
            AddColumn("dbo.UArtists", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UArtists", "Created", c => c.DateTime());
            AddColumn("dbo.UArtists", "Modified", c => c.DateTime());
            AddColumn("dbo.UArtists", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.UArtists", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.UArtists", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.MediaDirectories", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Media", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Media", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Media", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Media", "URL", c => c.String());
            AddColumn("dbo.Media", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Media", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Media", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.ApplicationUsers", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ApplicationUsers", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.ApplicationUsers", "URL", c => c.String());
            AddColumn("dbo.ApplicationUsers", "Created", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "Modified", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "ArchiveDate", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "AuthorID", c => c.Guid());
            AddColumn("dbo.ApplicationUsers", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.UCountries", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UCountries", "Created", c => c.DateTime());
            AddColumn("dbo.UCountries", "Modified", c => c.DateTime());
            AddColumn("dbo.UCountries", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.UCountries", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.UCountries", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.UGenres", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UGenres", "Created", c => c.DateTime());
            AddColumn("dbo.UGenres", "Modified", c => c.DateTime());
            AddColumn("dbo.UGenres", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.UGenres", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.UGenres", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.UFestivals", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UFestivals", "Created", c => c.DateTime());
            AddColumn("dbo.UFestivals", "Modified", c => c.DateTime());
            AddColumn("dbo.UFestivals", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.UFestivals", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.UFestivals", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Locations", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Locations", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Locations", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Locations", "URL", c => c.String());
            AddColumn("dbo.Locations", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Locations", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Locations", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Stages", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Stages", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Stages", "URL", c => c.String());
            AddColumn("dbo.Stages", "ArchiveDate", c => c.DateTime());
            AddColumn("dbo.Stages", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Stages", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Stages", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Stages", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Tickets", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Tickets", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Tickets", "URL", c => c.String());
            AddColumn("dbo.Tickets", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Tickets", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Tickets", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Tickets", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.ResellerGenres", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.CalendarCardAds", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UNews", "Created", c => c.DateTime());
            AddColumn("dbo.UNews", "Modified", c => c.DateTime());
            AddColumn("dbo.UNews", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.UNews", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.UNews", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UNews", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.MenuItems", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.MenuItems", "Created", c => c.DateTime());
            AddColumn("dbo.MenuItems", "Modified", c => c.DateTime());
            AddColumn("dbo.MenuItems", "ArchiveDate", c => c.DateTime());
            AddColumn("dbo.MenuItems", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.MenuItems", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.MenuItems", "AuthorID", c => c.Guid());
            AddColumn("dbo.MenuItems", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.MenuItems", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.MenuSections", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.MenuSections", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.MenuSections", "URL", c => c.String());
            AddColumn("dbo.MenuSections", "Created", c => c.DateTime());
            AddColumn("dbo.MenuSections", "Modified", c => c.DateTime());
            AddColumn("dbo.MenuSections", "ArchiveDate", c => c.DateTime());
            AddColumn("dbo.MenuSections", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.MenuSections", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.MenuSections", "AuthorID", c => c.Guid());
            AddColumn("dbo.MenuSections", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Products", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "URL", c => c.String());
            AddColumn("dbo.Products", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Products", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Products", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Resellers", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Resellers", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Resellers", "URL", c => c.String());
            AddColumn("dbo.Resellers", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Resellers", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Resellers", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Resellers", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.ResellerTypes", "IsDeleted", c => c.Boolean(nullable: false));
            AlterColumn("dbo.UArtists", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.UCountries", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.UGenres", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.UFestivals", "ModifiedDate", c => c.DateTime());
            AlterColumn("dbo.UNews", "ArchiveDate", c => c.DateTime());
            AlterColumn("dbo.UNews", "ModifiedDate", c => c.DateTime());
            DropColumn("dbo.UArtists", "UpdateDate");
            DropColumn("dbo.UArtists", "CreateDate");
            DropColumn("dbo.MediaDirectories", "Deleted");
            DropColumn("dbo.UCountries", "UpdateDate");
            DropColumn("dbo.UCountries", "CreateDate");
            DropColumn("dbo.UGenres", "UpdateDate");
            DropColumn("dbo.UGenres", "CreateDate");
            DropColumn("dbo.UGenres", "UAnnouncement_AnnouncementID");
            DropColumn("dbo.UFestivals", "UpdateDate");
            DropColumn("dbo.UFestivals", "CreateDate");
            DropColumn("dbo.ResellerGenres", "Deleted");
            DropColumn("dbo.CalendarCardAds", "Deleted");
            DropColumn("dbo.UNews", "UpdateDate");
            DropColumn("dbo.ResellerTypes", "Deleted");
            DropTable("dbo.UAnnouncements");
            DropTable("dbo.UCustomers");
            DropTable("dbo.UThemes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.UThemes",
                c => new
                    {
                        ThemeID = c.Guid(nullable: false),
                        GenreIntID = c.String(),
                        Name = c.String(),
                        DefaultTextColor = c.String(),
                        LinkActiveColor = c.String(),
                        LinkHoverColor = c.String(),
                        LinkDefaultColor = c.String(),
                        ThemeColor = c.String(),
                        ButtonActiveColor = c.String(),
                        ButtonActiveTextColor = c.String(),
                        ButtonDefaultColor = c.String(),
                        ButtonDefaultTextColor = c.String(),
                        ButtonDisabledColor = c.String(),
                        ButtonDisabledTextColor = c.String(),
                        ButtonHoverColor = c.String(),
                        ButtonHoverTextColor = c.String(),
                        BackgroundImage = c.String(),
                        BackgroundColor = c.String(),
                        ActiveHeartColor = c.String(),
                        DefaultHeartColor = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        UpdateDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        AuthorID = c.Guid(),
                    })
                .PrimaryKey(t => t.ThemeID);
            
            CreateTable(
                "dbo.UCustomers",
                c => new
                    {
                        CustomerID = c.Guid(nullable: false),
                        CompanyName = c.String(),
                        ContactName = c.String(),
                        CompanyWebsite = c.String(),
                        CompanyEmail = c.String(),
                        CompanyPhone = c.String(),
                        CompanyCountry = c.String(),
                        CompanyAddress = c.String(),
                        ContactEmail = c.String(),
                        ContactPhone = c.String(),
                        CompanyPostalCode = c.String(),
                        CompanyFacebookURL = c.String(),
                        CompanyLinkedInURL = c.String(),
                        CompanyTwitterURL = c.String(),
                        CompanyBankName = c.String(),
                        CompanyBankBIC = c.String(),
                        CompanyTaxNr = c.String(),
                        CompanyVat = c.String(),
                        CompanyIBAN = c.String(),
                        CompanyBankAccountName = c.String(),
                        enabled = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        UpdateDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        AuthorID = c.Guid(),
                    })
                .PrimaryKey(t => t.CustomerID);
            
            CreateTable(
                "dbo.UAnnouncements",
                c => new
                    {
                        AnnouncementID = c.Guid(nullable: false),
                        Title = c.String(),
                        Date = c.String(),
                        Image = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        URL = c.String(),
                        UpdateDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        AuthorID = c.Guid(),
                    })
                .PrimaryKey(t => t.AnnouncementID);
            
            AddColumn("dbo.ResellerTypes", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UNews", "UpdateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.CalendarCardAds", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ResellerGenres", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UFestivals", "CreateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UFestivals", "UpdateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UGenres", "UAnnouncement_AnnouncementID", c => c.Guid());
            AddColumn("dbo.UGenres", "CreateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UGenres", "UpdateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UCountries", "CreateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UCountries", "UpdateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.MediaDirectories", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.UArtists", "CreateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.UArtists", "UpdateDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UNews", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UNews", "ArchiveDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UFestivals", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UGenres", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UCountries", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.UArtists", "ModifiedDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.ResellerTypes", "IsDeleted");
            DropColumn("dbo.Resellers", "IsActive");
            DropColumn("dbo.Resellers", "IsDeleted");
            DropColumn("dbo.Resellers", "DeleteDate");
            DropColumn("dbo.Resellers", "CreatedDate");
            DropColumn("dbo.Resellers", "URL");
            DropColumn("dbo.Resellers", "SortOrder");
            DropColumn("dbo.Resellers", "ModifiedDate");
            DropColumn("dbo.Products", "IsActive");
            DropColumn("dbo.Products", "DeleteDate");
            DropColumn("dbo.Products", "CreatedDate");
            DropColumn("dbo.Products", "URL");
            DropColumn("dbo.Products", "SortOrder");
            DropColumn("dbo.Products", "ModifiedDate");
            DropColumn("dbo.Products", "IsDeleted");
            DropColumn("dbo.MenuSections", "IsActive");
            DropColumn("dbo.MenuSections", "AuthorID");
            DropColumn("dbo.MenuSections", "DeleteDate");
            DropColumn("dbo.MenuSections", "CreatedDate");
            DropColumn("dbo.MenuSections", "ArchiveDate");
            DropColumn("dbo.MenuSections", "Modified");
            DropColumn("dbo.MenuSections", "Created");
            DropColumn("dbo.MenuSections", "URL");
            DropColumn("dbo.MenuSections", "ModifiedDate");
            DropColumn("dbo.MenuSections", "IsDeleted");
            DropColumn("dbo.MenuItems", "IsActive");
            DropColumn("dbo.MenuItems", "IsDeleted");
            DropColumn("dbo.MenuItems", "AuthorID");
            DropColumn("dbo.MenuItems", "DeleteDate");
            DropColumn("dbo.MenuItems", "CreatedDate");
            DropColumn("dbo.MenuItems", "ArchiveDate");
            DropColumn("dbo.MenuItems", "Modified");
            DropColumn("dbo.MenuItems", "Created");
            DropColumn("dbo.MenuItems", "ModifiedDate");
            DropColumn("dbo.UNews", "IsActive");
            DropColumn("dbo.UNews", "IsDeleted");
            DropColumn("dbo.UNews", "DeleteDate");
            DropColumn("dbo.UNews", "CreatedDate");
            DropColumn("dbo.UNews", "Modified");
            DropColumn("dbo.UNews", "Created");
            DropColumn("dbo.CalendarCardAds", "IsDeleted");
            DropColumn("dbo.ResellerGenres", "IsDeleted");
            DropColumn("dbo.Tickets", "IsActive");
            DropColumn("dbo.Tickets", "IsDeleted");
            DropColumn("dbo.Tickets", "DeleteDate");
            DropColumn("dbo.Tickets", "CreatedDate");
            DropColumn("dbo.Tickets", "URL");
            DropColumn("dbo.Tickets", "SortOrder");
            DropColumn("dbo.Tickets", "ModifiedDate");
            DropColumn("dbo.Stages", "IsActive");
            DropColumn("dbo.Stages", "IsDeleted");
            DropColumn("dbo.Stages", "DeleteDate");
            DropColumn("dbo.Stages", "CreatedDate");
            DropColumn("dbo.Stages", "ArchiveDate");
            DropColumn("dbo.Stages", "URL");
            DropColumn("dbo.Stages", "SortOrder");
            DropColumn("dbo.Stages", "ModifiedDate");
            DropColumn("dbo.Locations", "IsActive");
            DropColumn("dbo.Locations", "DeleteDate");
            DropColumn("dbo.Locations", "CreatedDate");
            DropColumn("dbo.Locations", "URL");
            DropColumn("dbo.Locations", "SortOrder");
            DropColumn("dbo.Locations", "ModifiedDate");
            DropColumn("dbo.Locations", "IsDeleted");
            DropColumn("dbo.UFestivals", "IsActive");
            DropColumn("dbo.UFestivals", "DeleteDate");
            DropColumn("dbo.UFestivals", "CreatedDate");
            DropColumn("dbo.UFestivals", "Modified");
            DropColumn("dbo.UFestivals", "Created");
            DropColumn("dbo.UFestivals", "IsDeleted");
            DropColumn("dbo.UGenres", "IsActive");
            DropColumn("dbo.UGenres", "DeleteDate");
            DropColumn("dbo.UGenres", "CreatedDate");
            DropColumn("dbo.UGenres", "Modified");
            DropColumn("dbo.UGenres", "Created");
            DropColumn("dbo.UGenres", "IsDeleted");
            DropColumn("dbo.UCountries", "IsActive");
            DropColumn("dbo.UCountries", "DeleteDate");
            DropColumn("dbo.UCountries", "CreatedDate");
            DropColumn("dbo.UCountries", "Modified");
            DropColumn("dbo.UCountries", "Created");
            DropColumn("dbo.UCountries", "IsDeleted");
            DropColumn("dbo.ApplicationUsers", "IsActive");
            DropColumn("dbo.ApplicationUsers", "AuthorID");
            DropColumn("dbo.ApplicationUsers", "DeleteDate");
            DropColumn("dbo.ApplicationUsers", "ArchiveDate");
            DropColumn("dbo.ApplicationUsers", "Modified");
            DropColumn("dbo.ApplicationUsers", "Created");
            DropColumn("dbo.ApplicationUsers", "URL");
            DropColumn("dbo.ApplicationUsers", "SortOrder");
            DropColumn("dbo.ApplicationUsers", "IsDeleted");
            DropColumn("dbo.Media", "IsActive");
            DropColumn("dbo.Media", "DeleteDate");
            DropColumn("dbo.Media", "CreatedDate");
            DropColumn("dbo.Media", "URL");
            DropColumn("dbo.Media", "SortOrder");
            DropColumn("dbo.Media", "ModifiedDate");
            DropColumn("dbo.Media", "IsDeleted");
            DropColumn("dbo.MediaDirectories", "IsDeleted");
            DropColumn("dbo.UArtists", "IsActive");
            DropColumn("dbo.UArtists", "DeleteDate");
            DropColumn("dbo.UArtists", "CreatedDate");
            DropColumn("dbo.UArtists", "Modified");
            DropColumn("dbo.UArtists", "Created");
            DropColumn("dbo.UArtists", "IsDeleted");
            CreateIndex("dbo.UGenres", "UAnnouncement_AnnouncementID");
            AddForeignKey("dbo.UGenres", "UAnnouncement_AnnouncementID", "dbo.UAnnouncements", "AnnouncementID");
        }
    }
}
