namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedMandatories : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.UFestivals", new[] { "City" });
            AlterColumn("dbo.UFestivals", "City", c => c.String());
            CreateIndex("dbo.UFestivals", "City");
        }
        
        public override void Down()
        {
            DropIndex("dbo.UFestivals", new[] { "City" });
            AlterColumn("dbo.UFestivals", "City", c => c.String(nullable: false));
            CreateIndex("dbo.UFestivals", "City");
        }
    }
}
