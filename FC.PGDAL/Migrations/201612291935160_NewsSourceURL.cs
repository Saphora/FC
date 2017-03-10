namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewsSourceURL : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UNews", "SourceURL", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UNews", "SourceURL");
        }
    }
}
