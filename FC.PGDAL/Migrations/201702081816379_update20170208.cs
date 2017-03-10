namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update20170208 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Lineups", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.LineupItems", "LineupID", "dbo.Lineups");
            DropForeignKey("dbo.Lineups", "StageID", "dbo.Stages");
            DropIndex("dbo.LineupItems", new[] { "LineupID" });
            DropIndex("dbo.LineupItems", new[] { "ArtistID" });
            DropIndex("dbo.Lineups", new[] { "StageID" });
            DropIndex("dbo.Lineups", new[] { "FestivalID" });
            CreateIndex("dbo.LineupItems", "ArtistID");
            AddForeignKey("dbo.LineupItems", "StageID", "dbo.Stages", "StageID");
            AddForeignKey("dbo.Stages", "FestivalID", "dbo.UFestivals", "FestivalID");
            DropColumn("dbo.LineupItems", "LineupID");
            DropTable("dbo.Lineups");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Lineups",
                c => new
                    {
                        LineupID = c.Guid(nullable: false),
                        StageID = c.Guid(),
                        FestivalID = c.Guid(),
                    })
                .PrimaryKey(t => t.LineupID);
            
            AddColumn("dbo.LineupItems", "LineupID", c => c.Guid());
            DropForeignKey("dbo.Stages", "FestivalID", "dbo.UFestivals");
            DropForeignKey("dbo.LineupItems", "StageID", "dbo.Stages");
            DropIndex("dbo.LineupItems", new[] { "ArtistID" });
            CreateIndex("dbo.Lineups", "FestivalID");
            CreateIndex("dbo.Lineups", "StageID");
            CreateIndex("dbo.LineupItems", "ArtistID");
            CreateIndex("dbo.LineupItems", "LineupID");
            AddForeignKey("dbo.Lineups", "StageID", "dbo.Stages", "StageID");
            AddForeignKey("dbo.LineupItems", "LineupID", "dbo.Lineups", "LineupID");
            AddForeignKey("dbo.Lineups", "FestivalID", "dbo.UFestivals", "FestivalID");
        }
    }
}
