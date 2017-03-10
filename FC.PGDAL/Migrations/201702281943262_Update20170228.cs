namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update20170228 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UArtists", "URLName");
            DropColumn("dbo.UArtists", "WriterName");
            DropColumn("dbo.UArtists", "CreatorName");
            DropColumn("dbo.UArtists", "UmbracoID");
            DropColumn("dbo.UCountries", "URLName");
            DropColumn("dbo.UCountries", "WriterName");
            DropColumn("dbo.UCountries", "CreatorName");
            DropColumn("dbo.UCountries", "UmbracoID");
            DropColumn("dbo.UGenres", "URLName");
            DropColumn("dbo.UGenres", "WriterName");
            DropColumn("dbo.UGenres", "CreatorName");
            DropColumn("dbo.UGenres", "UmbracoID");
            DropColumn("dbo.UFestivals", "URLName");
            DropColumn("dbo.UFestivals", "WriterName");
            DropColumn("dbo.UFestivals", "CreatorName");
            DropColumn("dbo.UFestivals", "UmbracoID");
            DropColumn("dbo.UAnnouncements", "URLName");
            DropColumn("dbo.UAnnouncements", "WriterName");
            DropColumn("dbo.UAnnouncements", "CreatorName");
            DropColumn("dbo.UAnnouncements", "UmbracoID");
            DropColumn("dbo.UCustomers", "URLName");
            DropColumn("dbo.UCustomers", "WriterName");
            DropColumn("dbo.UCustomers", "CreatorName");
            DropColumn("dbo.UCustomers", "UmbracoID");
            DropColumn("dbo.UNews", "URLName");
            DropColumn("dbo.UNews", "WriterName");
            DropColumn("dbo.UNews", "CreatorName");
            DropColumn("dbo.UNews", "UmbracoID");
            DropColumn("dbo.UThemes", "URLName");
            DropColumn("dbo.UThemes", "WriterName");
            DropColumn("dbo.UThemes", "CreatorName");
            DropColumn("dbo.UThemes", "UmbracoID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UThemes", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UThemes", "CreatorName", c => c.String());
            AddColumn("dbo.UThemes", "WriterName", c => c.String());
            AddColumn("dbo.UThemes", "URLName", c => c.String());
            AddColumn("dbo.UNews", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UNews", "CreatorName", c => c.String());
            AddColumn("dbo.UNews", "WriterName", c => c.String());
            AddColumn("dbo.UNews", "URLName", c => c.String());
            AddColumn("dbo.UCustomers", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UCustomers", "CreatorName", c => c.String());
            AddColumn("dbo.UCustomers", "WriterName", c => c.String());
            AddColumn("dbo.UCustomers", "URLName", c => c.String());
            AddColumn("dbo.UAnnouncements", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UAnnouncements", "CreatorName", c => c.String());
            AddColumn("dbo.UAnnouncements", "WriterName", c => c.String());
            AddColumn("dbo.UAnnouncements", "URLName", c => c.String());
            AddColumn("dbo.UFestivals", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UFestivals", "CreatorName", c => c.String());
            AddColumn("dbo.UFestivals", "WriterName", c => c.String());
            AddColumn("dbo.UFestivals", "URLName", c => c.String());
            AddColumn("dbo.UGenres", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UGenres", "CreatorName", c => c.String());
            AddColumn("dbo.UGenres", "WriterName", c => c.String());
            AddColumn("dbo.UGenres", "URLName", c => c.String());
            AddColumn("dbo.UCountries", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UCountries", "CreatorName", c => c.String());
            AddColumn("dbo.UCountries", "WriterName", c => c.String());
            AddColumn("dbo.UCountries", "URLName", c => c.String());
            AddColumn("dbo.UArtists", "UmbracoID", c => c.Int(nullable: false));
            AddColumn("dbo.UArtists", "CreatorName", c => c.String());
            AddColumn("dbo.UArtists", "WriterName", c => c.String());
            AddColumn("dbo.UArtists", "URLName", c => c.String());
        }
    }
}
