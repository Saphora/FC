namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update201703051547 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "Name");
        }
    }
}
