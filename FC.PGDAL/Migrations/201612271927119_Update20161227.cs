namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update20161227 : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.MaterializedFestivalListVMs", "FestivalName", c => c.String());
            //DropColumn("dbo.MaterializedFestivalListVMs", "FestilName");
        }
        
        public override void Down()
        {
            //AddColumn("dbo.MaterializedFestivalListVMs", "FestilName", c => c.String());
            //DropColumn("dbo.MaterializedFestivalListVMs", "FestivalName");
        }
    }
}
