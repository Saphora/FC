namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update20161230 : DbMigration
    {
        public override void Up()
        {
            //MANUALLY WRITTEN. THOSE INDEXES ARE NOT NEEDED BECAUSE WE USE CROSS REFERENCE TABLES.
            DropIndex("dbo.UGenres", "UGenre_GenreID");
            DropIndex("dbo.UGenres", "UArtist_ArtistID");
            DropIndex("dbo.UGenres", "UFestival_FestivalID");
            DropIndex("dbo.UGenres", "Advertisement_AdvertisementID");
            DropIndex("dbo.UGenres", "UAnnouncement_AnnouncementID");
            DropIndex("dbo.UGenres", "UNews_NewsID");
            DropColumn("dbo.UGenres", "UGenre_GenreID");
            DropColumn("dbo.UGenres", "UArtist_ArtistID");
            DropColumn("dbo.UGenres", "UFestival_FestivalID");
            DropColumn("dbo.UGenres", "Advertisement_AdvertisementID");
            DropColumn("dbo.UGenres", "UAnnouncement_AnnouncementID");
            DropColumn("dbo.UGenres", "UNews_NewsID");


        }

        public override void Down()
        {
        }
    }
}
