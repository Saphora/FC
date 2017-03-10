namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update201703051449 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.ApplicationUsers", new[] { "UserPassword" });
            DropIndex("dbo.ApplicationUsers", "UserEmail");
            AlterColumn("dbo.ApplicationUsers", "UserPassword", c => c.String(nullable: false));
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String(nullable: false));
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String(nullable: false));
            AlterColumn("dbo.ApplicationUsers", "UserEmailAddress", c => c.String(nullable: false));
            CreateIndex("dbo.ApplicationUsers", "UserPassword");
            CreateIndex("dbo.ApplicationUsers", "UserEmailAddress", unique: true, clustered: true, name: "UserEmail");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ApplicationUsers", "UserEmail");
            DropIndex("dbo.ApplicationUsers", new[] { "UserPassword" });
            AlterColumn("dbo.ApplicationUsers", "UserEmailAddress", c => c.String());
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String());
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String());
            AlterColumn("dbo.ApplicationUsers", "UserPassword", c => c.String());
            CreateIndex("dbo.ApplicationUsers", "UserEmailAddress", unique: true, clustered: true, name: "UserEmail");
            CreateIndex("dbo.ApplicationUsers", "UserPassword");
        }
    }
}
