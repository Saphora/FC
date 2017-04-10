namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DateVMDateNum : DbMigration
    {
        public override void Up()
        {
            //DropTable("dbo.MaterializedArtistListVMs");
            //DropTable("dbo.MaterializedFestivalListVMs");
            //DropTable("dbo.MaterializedNews");
        }
        
        public override void Down()
        {
            //CreateTable(
            //    "dbo.MaterializedNews",
            //    c => new
            //        {
            //            NewsID = c.Guid(nullable: false),
            //            AuthorID = c.Guid(),
            //            Title = c.String(),
            //            MediaDirectoryID = c.Guid(),
            //            MetaKeys = c.String(),
            //            MetaDescription = c.String(),
            //            ModifiedDate = c.DateTime(),
            //            ThumbnailID = c.Guid(),
            //            SourceURL = c.String(),
            //            SourceName = c.String(),
            //            DisplayDate = c.String(),
            //            DisplayTime = c.String(),
            //            DateKey = c.String(),
            //        })
            //    .PrimaryKey(t => t.NewsID);
            
            //CreateTable(
            //    "dbo.MaterializedFestivalListVMs",
            //    c => new
            //        {
            //            FestivalID = c.Guid(nullable: false),
            //            GenreNames = c.String(),
            //            ZIPCode = c.String(),
            //            FestivalName = c.String(),
            //            CountryName = c.String(),
            //            City = c.String(),
            //            IsPublished = c.Boolean(nullable: false),
            //            StartDate = c.DateTime(),
            //            EndDate = c.DateTime(),
            //            ProfileImageID = c.Guid(),
            //            LogoID = c.Guid(),
            //            StartDateExplosion_Y1 = c.String(),
            //            StartDateExplosion_Y2 = c.String(),
            //            StartDateExplosion_Y3 = c.String(),
            //            StartDateExplosion_Y4 = c.String(),
            //            StartDateExplosion_Month = c.String(),
            //            StartDateExplosion_Day = c.String(),
            //            StartDateExplosion_Hour = c.String(),
            //            StartDateExplosion_Minute = c.String(),
            //            StartDateExplosion_AgoString = c.String(),
            //            StartDateExplosion_Year = c.String(),
            //            EndDateExplosion_Y1 = c.String(),
            //            EndDateExplosion_Y2 = c.String(),
            //            EndDateExplosion_Y3 = c.String(),
            //            EndDateExplosion_Y4 = c.String(),
            //            EndDateExplosion_Month = c.String(),
            //            EndDateExplosion_Day = c.String(),
            //            EndDateExplosion_Hour = c.String(),
            //            EndDateExplosion_Minute = c.String(),
            //            EndDateExplosion_AgoString = c.String(),
            //            EndDateExplosion_Year = c.String(),
            //        })
            //    .PrimaryKey(t => t.FestivalID);
            
            //CreateTable(
            //    "dbo.MaterializedArtistListVMs",
            //    c => new
            //        {
            //            ArtistID = c.Guid(nullable: false),
            //            GenreNames = c.String(),
            //            ArtistName = c.String(),
            //            CountryName = c.String(),
            //            ThumbnailID = c.Guid(),
            //            LogoID = c.Guid(),
            //            MediaDirectoryID = c.Guid(),
            //            IsPublished = c.Boolean(nullable: false),
            //        })
            //    .PrimaryKey(t => t.ArtistID);
            
        }
    }
}
