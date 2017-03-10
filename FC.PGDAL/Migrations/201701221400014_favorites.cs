namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class favorites : DbMigration
    {
        public override void Up()
        {
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Favorites", "UserID", "dbo.ApplicationUsers");
            DropIndex("dbo.Favorites", new[] { "UserID" });
            DropIndex("dbo.Favorites", new[] { "ContentType" });
            DropIndex("dbo.Favorites", new[] { "ContentID" });
            DropTable("dbo.Favorites");
        }
    }
}
