namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ActivationToken : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "ActivationToken", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "ActivationToken");
        }
    }
}
