namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SocialProfile_GenericID_ContentType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SocialProfiles", "GenericID", c => c.Guid());
            AddColumn("dbo.SocialProfiles", "ContentType", c => c.Int(nullable: false));
            CreateIndex("dbo.SocialProfiles", "GenericID");
        }
        
        public override void Down()
        {
            DropIndex("dbo.SocialProfiles", new[] { "GenericID" });
            DropColumn("dbo.SocialProfiles", "ContentType");
            DropColumn("dbo.SocialProfiles", "GenericID");
        }
    }
}
