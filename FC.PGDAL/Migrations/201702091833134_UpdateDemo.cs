namespace FC.PGDAL.Migrations
{
    using Shared.Config;
    using System;
    using System.Data.Entity.Migrations;

    public partial class UpdateDemo : DbMigration
    {
        public override void Up()
        {
            this.Sql("DROP MATERIALIZED VIEW dbo.\"MaterializedFestivalListVMs\"");
            this.SqlFile(FCConfig.SQL_FILE_ROOT + "/Views/FestivalListVM.sql");
            DropForeignKey("dbo.UArtists", "UFestival_FestivalID", "dbo.UFestivals");
            DropIndex("dbo.UArtists", new[] { "UFestival_FestivalID" });
            AddColumn("dbo.UArtists", "MetaTitle", c => c.String());
            AddColumn("dbo.UFestivals", "MetaTitle", c => c.String());
            AddColumn("dbo.Locations", "MetaKeys", c => c.String());
            AddColumn("dbo.Locations", "MetaDescription", c => c.String());
            AddColumn("dbo.Locations", "MetaTitle", c => c.String());
            DropColumn("dbo.UArtists", "UFestival_FestivalID");
            DropColumn("dbo.UFestivals", "CampingAvailable");
            DropColumn("dbo.UFestivals", "Address");
            DropColumn("dbo.UFestivals", "ZIPCode");
            DropColumn("dbo.UFestivals", "Website");
            DropColumn("dbo.UFestivals", "Stages");
            DropColumn("dbo.UFestivals", "FacebookURL");
            DropColumn("dbo.UFestivals", "TwitterURL");
            DropColumn("dbo.UFestivals", "YoutubeURL");
            DropColumn("dbo.UFestivals", "FlickrURL");
            DropColumn("dbo.UFestivals", "InstagramURL");
            DropColumn("dbo.UFestivals", "SpotifyURL");
            DropColumn("dbo.UFestivals", "DeezerURL");
            DropColumn("dbo.UFestivals", "SoundCloudURL");
            DropColumn("dbo.UFestivals", "AftermovieYoutubeURL");
            DropColumn("dbo.UFestivals", "Rating");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UFestivals", "Rating", c => c.String());
            AddColumn("dbo.UFestivals", "AftermovieYoutubeURL", c => c.String());
            AddColumn("dbo.UFestivals", "SoundCloudURL", c => c.String());
            AddColumn("dbo.UFestivals", "DeezerURL", c => c.String());
            AddColumn("dbo.UFestivals", "SpotifyURL", c => c.String());
            AddColumn("dbo.UFestivals", "InstagramURL", c => c.String());
            AddColumn("dbo.UFestivals", "FlickrURL", c => c.String());
            AddColumn("dbo.UFestivals", "YoutubeURL", c => c.String());
            AddColumn("dbo.UFestivals", "TwitterURL", c => c.String());
            AddColumn("dbo.UFestivals", "FacebookURL", c => c.String());
            AddColumn("dbo.UFestivals", "Stages", c => c.Int(nullable: false));
            AddColumn("dbo.UFestivals", "Website", c => c.String());
            AddColumn("dbo.UFestivals", "ZIPCode", c => c.String());
            AddColumn("dbo.UFestivals", "Address", c => c.String());
            AddColumn("dbo.UFestivals", "CampingAvailable", c => c.String());
            AddColumn("dbo.UArtists", "UFestival_FestivalID", c => c.Guid());
            DropColumn("dbo.Locations", "MetaTitle");
            DropColumn("dbo.Locations", "MetaDescription");
            DropColumn("dbo.Locations", "MetaKeys");
            DropColumn("dbo.UFestivals", "MetaTitle");
            DropColumn("dbo.UArtists", "MetaTitle");
            CreateIndex("dbo.UArtists", "UFestival_FestivalID");
            AddForeignKey("dbo.UArtists", "UFestival_FestivalID", "dbo.UFestivals", "FestivalID");
        }
    }
}
