namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update20161230_2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UGenres", "UGenre_GenreID", c => c.Guid());
            AddColumn("dbo.UGenres", "UArtist_ArtistID", c => c.Guid());
            AddColumn("dbo.UGenres", "UFestival_FestivalID", c => c.Guid());
            AddColumn("dbo.UGenres", "Advertisement_AdvertisementID", c => c.Guid());
            AddColumn("dbo.UGenres", "UAnnouncement_AnnouncementID", c => c.Guid());
            AddColumn("dbo.UGenres", "UNews_NewsID", c => c.Guid());
            CreateIndex("dbo.UGenres", "UGenre_GenreID");
            CreateIndex("dbo.UGenres", "UArtist_ArtistID");
            CreateIndex("dbo.UGenres", "UFestival_FestivalID");
            CreateIndex("dbo.UGenres", "Advertisement_AdvertisementID");
            CreateIndex("dbo.UGenres", "UAnnouncement_AnnouncementID");
            CreateIndex("dbo.UGenres", "UNews_NewsID");
        }
        
        public override void Down()
        {

        }
    }
}
