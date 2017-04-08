namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class firstnameLastnameValidation : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String(nullable: false));
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ApplicationUsers", "UserLastname", c => c.String());
            AlterColumn("dbo.ApplicationUsers", "UserFirstname", c => c.String());
        }
    }
}
