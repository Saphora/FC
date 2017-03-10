namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update201701142107 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SocialProfile2All", "SocialProfileID", "dbo.SocialProfiles");
            DropIndex("dbo.SocialProfile2All", new[] { "SocialProfileID" });
            DropTable("dbo.SocialProfile2All");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.SocialProfile2All",
                c => new
                    {
                        SP2ALLID = c.Guid(nullable: false),
                        SocialProfileID = c.Guid(),
                        GenericID = c.Guid(),
                        GenericType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.SP2ALLID);
            
            CreateIndex("dbo.SocialProfile2All", "SocialProfileID");
            AddForeignKey("dbo.SocialProfile2All", "SocialProfileID", "dbo.SocialProfiles", "SocialProfileID");
        }
    }
}
