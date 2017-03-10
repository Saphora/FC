namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LocationLatLong : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "Latitude", c => c.Double(nullable: false));
            AddColumn("dbo.Locations", "Longitude", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Locations", "Longitude");
            DropColumn("dbo.Locations", "Latitude");
        }
    }
}
