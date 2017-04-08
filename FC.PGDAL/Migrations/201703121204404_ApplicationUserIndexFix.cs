namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ApplicationUserIndexFix : DbMigration
    {
        public override void Up()
        {
            this.Sql("UPDATE dbo.\"Roles\" SET \"ApplicationUser_UserID\" = NULL");
            this.Sql("UPDATE dbo.\"SocialProfiles\" SET \"ApplicationUser_UserID\" = NULL");

            DropForeignKey("dbo.Roles", "ApplicationUser_UserID", "dbo.ApplicationUsers");
            DropForeignKey("dbo.SocialProfiles", "ApplicationUser_UserID", "dbo.ApplicationUsers");
            DropIndex("dbo.Roles", new[] { "ApplicationUser_UserID" });
            DropIndex("dbo.SocialProfiles", new[] { "ApplicationUser_UserID" });
            DropColumn("dbo.Roles", "ApplicationUser_UserID");
            DropColumn("dbo.SocialProfiles", "ApplicationUser_UserID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SocialProfiles", "ApplicationUser_UserID", c => c.Guid());
            AddColumn("dbo.Roles", "ApplicationUser_UserID", c => c.Guid());
            CreateIndex("dbo.SocialProfiles", "ApplicationUser_UserID");
            CreateIndex("dbo.Roles", "ApplicationUser_UserID");
            AddForeignKey("dbo.SocialProfiles", "ApplicationUser_UserID", "dbo.ApplicationUsers", "UserID");
            AddForeignKey("dbo.Roles", "ApplicationUser_UserID", "dbo.ApplicationUsers", "UserID");
        }
    }
}
