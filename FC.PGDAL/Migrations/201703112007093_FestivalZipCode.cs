namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FestivalZipCode : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UFestivals", "ZIPCode", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UFestivals", "ZIPCode");
        }
    }
}
