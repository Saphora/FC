namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SocialProfile2All_SocialProfile : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.SocialProfile2All", "SocialProfileID");
            AddForeignKey("dbo.SocialProfile2All", "SocialProfileID", "dbo.SocialProfiles", "SocialProfileID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SocialProfile2All", "SocialProfileID", "dbo.SocialProfiles");
            DropIndex("dbo.SocialProfile2All", new[] { "SocialProfileID" });
        }
    }
}
