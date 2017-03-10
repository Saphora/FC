namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update201701141524 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SocialProfileTypes", "CssClass", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SocialProfileTypes", "CssClass");
        }
    }
}
