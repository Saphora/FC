namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ApplicationUserRemoveRequired : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String());
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String(nullable: false));
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String(nullable: false));
        }
    }
}
