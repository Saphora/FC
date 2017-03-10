namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Sortable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SocialProfiles", "ApplicationUser_UserID", c => c.Guid());
            AddColumn("dbo.Locations", "Name", c => c.String());
            AddColumn("dbo.Tickets", "Name", c => c.String());
            AddColumn("dbo.Stages", "Name", c => c.String());
            CreateIndex("dbo.SocialProfiles", "ApplicationUser_UserID");
            AddForeignKey("dbo.SocialProfiles", "ApplicationUser_UserID", "dbo.ApplicationUsers", "UserID");
            DropColumn("dbo.ApplicationUsers", "UserFacebookID");
            DropColumn("dbo.ApplicationUsers", "UserTwitterID");
            DropColumn("dbo.ApplicationUsers", "UserInstagramID");
            DropColumn("dbo.Tickets", "TicketName");
            DropColumn("dbo.Stages", "StageName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stages", "StageName", c => c.String());
            AddColumn("dbo.Tickets", "TicketName", c => c.String());
            AddColumn("dbo.ApplicationUsers", "UserInstagramID", c => c.String());
            AddColumn("dbo.ApplicationUsers", "UserTwitterID", c => c.String());
            AddColumn("dbo.ApplicationUsers", "UserFacebookID", c => c.String());
            DropForeignKey("dbo.SocialProfiles", "ApplicationUser_UserID", "dbo.ApplicationUsers");
            DropIndex("dbo.SocialProfiles", new[] { "ApplicationUser_UserID" });
            DropColumn("dbo.Stages", "Name");
            DropColumn("dbo.Tickets", "Name");
            DropColumn("dbo.Locations", "Name");
            DropColumn("dbo.SocialProfiles", "ApplicationUser_UserID");
        }
    }
}
